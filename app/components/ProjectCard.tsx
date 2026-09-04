import React from 'react';
import { ExternalLink, ArrowRight, Sparkles, Zap, Globe } from 'lucide-react';
import { ProjectItem } from '~/types/project';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const hasExternalUrl = Boolean(project.appStoreUrl || project.liveUrl);

  return (
    <div className="glass-card project-card">
      {/* Header with Type & Status */}
      <div className="project-card-header">
        <div className="app-identity-group">
          {project.logoUrl && (
            <img
              src={project.logoUrl}
              alt={project.title}
              className="app-logo-img"
              style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-sm)' }}
            />
          )}
          <div className="app-title-group">
            <span className="project-client">{project.clientName}</span>
            <h3 className="project-title">{project.title.split('—')[0]}</h3>
          </div>
        </div>

        {project.appStoreUrl ? (
          <span className="tag-badge app-badge" title="Published Shopify App" style={{ flexShrink: 0 }}>
            <Sparkles size={12} />
            App Store
          </span>
        ) : project.featured ? (
          <span className="tag-badge featured-badge" style={{ flexShrink: 0 }}>
            <Zap size={12} />
            Featured
          </span>
        ) : null}
      </div>

      {/* Summary */}
      <p className="project-summary">
        {project.summary}
      </p>

      {/* Metrics Strip */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="project-metrics-strip">
          {project.metrics.slice(0, 2).map((m, idx) => (
            <div key={idx} className="project-metric-item">
              <span className="project-metric-val">{m.value}</span>
              <span className="project-metric-lbl">{m.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tech Tags */}
      <div className="project-tags-list">
        {project.tags.slice(0, 3).map((tag, idx) => (
          <span key={idx} className="tag-badge">
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className="tag-badge" style={{ color: 'var(--text-muted)' }}>
            +{project.tags.length - 3}
          </span>
        )}
      </div>

      {/* Card Footer Actions (50% / 50% Equal Width Grid) */}
      <div className="project-card-footer" style={{
        display: 'grid',
        gridTemplateColumns: hasExternalUrl ? '1fr 1fr' : '1fr',
        gap: '0.75rem',
        paddingTop: '1.25rem',
        borderTop: '1px solid var(--border-subtle)',
        marginTop: 'auto'
      }}>
        <button
          onClick={() => onSelect(project)}
          className="btn btn-secondary btn-sm"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <span>Case Study</span>
          <ArrowRight size={14} />
        </button>

        {project.appStoreUrl ? (
          <a
            href={project.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
            style={{ width: '100%', justifyContent: 'center' }}
            title="View live listing on Shopify App Store"
          >
            <span>App Store</span>
            <ExternalLink size={14} />
          </a>
        ) : project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
            style={{ width: '100%', justifyContent: 'center' }}
            title="Visit live store website"
          >
            <span>Live Site</span>
            <ExternalLink size={14} />
          </a>
        ) : null}
      </div>
    </div>
  );
};
