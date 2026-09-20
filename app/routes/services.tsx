import React, { useState } from 'react';
import { useOutletContext } from '@remix-run/react';
import { Navbar } from '~/components/Navbar';
import type { MetaFunction } from '@remix-run/node';
import { ServicesSection } from '~/components/ServicesSection';
import { TechStackSection } from '~/components/TechStackSection';
import { TestimonialsSection } from '~/components/TestimonialsSection';
import { HireSection } from '~/components/HireSection';
import { Footer } from '~/components/Footer';
import { projectsData } from '~/data/projects';
import { ProjectItem } from '~/types/project';


const ProjectModal = React.lazy(() =>
  import('~/components/ProjectModal').then((m) => ({ default: m.ProjectModal }))
);

export const meta: MetaFunction = () => [
  { title: 'Engineering Consulting & Technical Audits | NazmulCodes' },
  { name: 'description', content: 'End-to-end Shopify app development, theme speed optimization, GraphQL integrations, and custom migrations.' },
  { tagName: 'link', rel: 'canonical', href: 'https://www.nazmulcodes.org/services' },
];

export default function Index() {
  const { theme, toggleTheme } = useOutletContext<{ theme: 'dark' | 'light'; toggleTheme: () => void }>();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const stocklyProject = projectsData.find(p => p.id === 'stock-alert');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.25rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' }}>
        Bespoke Shopify Engineering & <span className="text-gradient">Consulting Services</span>
      </h1>

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        {/* Flagship SaaS: Founder Spotlight */}
        <ServicesSection />
        <TechStackSection />
        <TestimonialsSection />
        <HireSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Deep Dive Project Case Study Modal (Deferred until project selected) */}
      {selectedProject && (
        <React.Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </React.Suspense>
      )}
    </div>
  );
}
