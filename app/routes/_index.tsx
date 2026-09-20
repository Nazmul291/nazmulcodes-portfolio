import React, { useState } from 'react';
import { useOutletContext, useLoaderData } from '@remix-run/react';
import { Navbar } from '~/components/Navbar';
import { BlogHero } from '~/components/Hero';
import { Footer } from '~/components/Footer';
import { projectsData } from '~/data/projects';
import { ProjectItem } from '~/types/project';
import { FeaturedBlogs } from '~/components/FeaturedBlogs';
import { getPublishedPosts } from '~/models/blog.server';
import { BlogCategoryDirectory } from '~/components/BlogCategoryDirectory';
import { TechDigestStrip } from '~/components/TechDigestStrip';
import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node';
import { createSubscriber } from '~/models/subscriber.server';

export const loader = async () => {
  const posts = await getPublishedPosts();
  return { posts };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get('email');

  if (typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
    return Response.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 }
    );
  }

  try {
    const result = await createSubscriber(email);
    return {
      success: true,
      message: result.created
        ? "Welcome aboard! You're subscribed to the dispatch."
        : "You're already on the subscriber list!",
    };
  } catch (error) {
    return Response.json(
      { error: 'Unable to subscribe right now. Please try again.' },
      { status: 500 }
    );
  }
};

export const meta: MetaFunction = () => {
  return [
    { title: 'NazmulCodes | Senior Shopify Expert & Full-Stack Engineer' },
    { name: 'description', content: 'Bespoke Shopify Apps, Liquid Themes, and Performance Optimization.' },
    { tagName: 'link', rel: 'canonical', href: 'https://www.nazmulcodes.org/' },
  ];
};

export default function Index() {
  const { theme, toggleTheme } = useOutletContext<{ theme: 'dark' | 'light'; toggleTheme: () => void }>();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const stocklyProject = projectsData.find(p => p.id === 'stock-alert');
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <BlogHero />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        {/* Flagship SaaS: Founder Spotlight */}
        <FeaturedBlogs posts={posts} />
        <BlogCategoryDirectory />
        <TechDigestStrip />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
