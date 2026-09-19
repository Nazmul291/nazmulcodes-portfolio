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

export const loader = async () => {
  const posts = await getPublishedPosts();
  return { posts };
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
