import React, { useState } from 'react';
import { useOutletContext } from '@remix-run/react';
import { Navbar } from '~/components/Navbar';
import { Hero } from '~/components/Hero';
import { FeaturedApps } from '~/components/FeaturedApps';
import { ProjectShowcase } from '~/components/ProjectShowcase';
import { ServicesSection } from '~/components/ServicesSection';
import { ProjectEstimator } from '~/components/ProjectEstimator';
import { TechStackSection } from '~/components/TechStackSection';
import { TestimonialsSection } from '~/components/TestimonialsSection';
import { HireSection } from '~/components/HireSection';
import { Footer } from '~/components/Footer';
import { ProjectModal } from '~/components/ProjectModal';
import { projectsData } from '~/data/projects';
import { ProjectItem } from '~/types/project';

export default function Index() {
  const { theme, toggleTheme } = useOutletContext<{ theme: 'dark' | 'light'; toggleTheme: () => void }>();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        <Hero />
        <FeaturedApps projects={projectsData} onSelectProject={setSelectedProject} />
        <ProjectShowcase projects={projectsData} onSelectProject={setSelectedProject} />
        <ServicesSection />
        <ProjectEstimator />
        <TechStackSection />
        <TestimonialsSection />
        <HireSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Deep Dive Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
