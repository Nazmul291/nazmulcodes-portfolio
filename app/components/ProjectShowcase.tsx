import React, { useState, useMemo } from 'react';
import { Search, LayoutGrid, List, SlidersHorizontal, Sparkles, Layers, Globe, ExternalLink } from 'lucide-react';
import { ProjectItem, ProjectCategory } from '~/types/project';
import { categoriesList } from '~/data/projects';
import { ProjectCard } from './ProjectCard';

interface ProjectShowcaseProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects, onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [projects]);

  // Filter projects by category, search query, and selected tag
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Category match
      if (selectedCategory !== 'all' && !project.category.includes(selectedCategory)) {
        return false;
      }

      // Tag match
      if (selectedTag && !project.tags.includes(selectedTag)) {
        return false;
      }

      // Search match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = project.title.toLowerCase().includes(q);
        const matchClient = project.clientName.toLowerCase().includes(q);
        const matchSummary = project.summary.toLowerCase().includes(q);
        const matchTags = project.tags.some(t => t.toLowerCase().includes(q));
        const matchDeliverables = project.deliverables.some(d => d.toLowerCase().includes(q));
        if (!matchTitle && !matchClient && !matchSummary && !matchTags && !matchDeliverables) {
          return false;
        }
      }

      return true;
    });
  }, [projects, selectedCategory, selectedTag, searchQuery]);

  return (
    <section id="showcase" className="section-padding">
      <div className="site-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <SlidersHorizontal size={14} />
            <span>Proven Track Record</span>
          </div>
          <h2 className="section-title">
            Featured <span className="text-gradient">Portfolio & Case Studies</span>
          </h2>
          <p className="section-subtitle">
            Explore 33+ real-world Shopify embedded apps, bespoke Liquid storefronts, high-converting advertorials, and custom engineering projects.
          </p>
        </div>

        {/* Filter Hub */}
        <div className="filter-hub">
          <div className="filter-controls">
            {/* Category Pills */}
            <div className="category-pills">
              {categoriesList.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as ProjectCategory)}
                  className={`filter-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                >
                  <span>{cat.label}</span>
                  <span className="pill-count">{cat.count}</span>
                </button>
              ))}
            </div>

            {/* Search and View Controls */}
            <div className="filter-search-bar">
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by client, tech stack (React, Polaris, Liquid, Python...), feature..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search portfolio projects"
                />
              </div>

              {/* View Mode Switches */}
              <div className="view-toggles">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  title="Grid card view"
                >
                  <LayoutGrid size={15} />
                  <span>Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                  title="Matrix list view"
                >
                  <List size={15} />
                  <span>Matrix</span>
                </button>
              </div>
            </div>

            {/* Quick Tech Tag Filters */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Quick Filters:</span>
              {['Shopify App', 'Shopify Liquid', 'React', 'Shopify Polaris', 'Core Web Vitals', 'B2B Shopify', 'GraphQL', 'Python'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`tag-badge ${selectedTag === tag ? 'app-badge' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  {tag} {selectedTag === tag ? '✕' : ''}
                </button>
              ))}
              {(selectedTag || searchQuery || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSelectedTag(null);
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', fontSize: '0.8rem', cursor: 'pointer', marginLeft: '0.5rem' }}
                >
                  Reset All Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          <div>
            Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredProjects.length}</strong> of {projects.length} verified client projects
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        )}

        {/* Interactive Matrix / Table View */}
        {viewMode === 'table' && (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            overflowX: 'auto',
            boxShadow: 'var(--shadow-md)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem 1.5rem' }}>Project & Client</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Category & Role</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Key Stack</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Impact / Metrics</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background var(--transition-fast)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-surface)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{project.title.split('—')[0]}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)' }}>{project.clientName}</div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{project.projectType}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{project.role}</div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', maxWidth: '280px' }}>
                        {project.tags.slice(0, 3).map((t, i) => (
                          <span key={i} className="tag-badge" style={{ fontSize: '0.72rem' }}>{t}</span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      {project.metrics && project.metrics.length > 0 ? (
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                          {project.metrics[0].value} <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>({project.metrics[0].label})</span>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Verified</span>
                      )}
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button
                          onClick={() => onSelectProject(project)}
                          className="btn btn-secondary btn-sm"
                        >
                          <span>Deep Dive</span>
                        </button>
                        {project.appStoreUrl && (
                          <a
                            href={project.appStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tag-badge app-badge"
                            title="Shopify App Store"
                          >
                            <Layers size={13} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tag-badge"
                            title="Live Store"
                          >
                            <Globe size={13} />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
