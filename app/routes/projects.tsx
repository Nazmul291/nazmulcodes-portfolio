import React, { useState } from 'react';
import { useOutletContext } from '@remix-run/react';
import { Navbar } from '~/components/Navbar';
import type { MetaFunction } from '@remix-run/node';
import { StocklySpotlight } from '~/components/StocklySpotlight';
import { ProjectShowcase } from '~/components/ProjectShowcase';
import { Footer } from '~/components/Footer';
import { projectsData } from '~/data/projects';
import { ProjectItem } from '~/types/project';

const ProjectEstimator = React.lazy(() =>
  import('~/components/ProjectEstimator').then((m) => ({ default: m.ProjectEstimator }))
);

const ProjectModal = React.lazy(() =>
  import('~/components/ProjectModal').then((m) => ({ default: m.ProjectModal }))
);

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  return [
    ...parentMeta,
    { title: 'Case Studies & Production Architecture | NazmulCodes' },
    { name: 'description', content: 'Explore custom Shopify applications, high-performance themes, and developer tools built by Nazmul Hawlader.' },
    { tagName: 'link', rel: 'canonical', href: 'https://www.nazmulcodes.org/projects' },
  ];
};

export default function Index() {
  const { theme, toggleTheme } = useOutletContext<{ theme: 'dark' | 'light'; toggleTheme: () => void }>();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const stocklyProject = projectsData.find(p => p.id === 'stock-alert');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.25rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' }}>
        Shopify Apps, Tools & <span className="text-gradient">Client Projects</span>
      </h1>

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        <ProjectShowcase projects={projectsData} onSelectProject={setSelectedProject} />
        <StocklySpotlight project={stocklyProject} onSelectProject={setSelectedProject} />
        <React.Suspense fallback={<div style={{ minHeight: '400px' }} />}>
          <ProjectEstimator />
        </React.Suspense>
        {/* <HireSection /> */}
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
