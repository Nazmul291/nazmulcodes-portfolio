import React, { useState } from 'react';
import { useOutletContext } from '@remix-run/react';
import { Navbar } from '~/components/Navbar';
import { Hero } from '~/components/Hero';
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

export default function Index() {
  const { theme, toggleTheme } = useOutletContext<{ theme: 'dark' | 'light'; toggleTheme: () => void }>();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const stocklyProject = projectsData.find(p => p.id === 'stock-alert');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

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
