import React from 'react';
import { X, ExternalLink, Sparkles, CheckCircle, Cpu, FileCode2, Globe, Layers, ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '~/types/project';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {project.logoUrl && (
              <img
                src={project.logoUrl}
                alt={project.title}
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: 'var(--radius-md)',
                  objectFit: 'cover',
                  border: '1px solid var(--border-medium)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                  flexShrink: 0
                }}
              />
            )}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <span className="project-client">{project.clientName}</span>
                {project.timeline && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>• {project.timeline}</span>
                )}
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{project.title}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close case study modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Quick Info & Links Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '1.75rem'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Role on Project</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>{project.role}</div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {project.appStoreUrl && (
                <a
                  href={project.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <Layers size={14} />
                  <span>Shopify App Store</span>
                  <ExternalLink size={12} />
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <Globe size={14} />
                  <span>Live Storefront</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>

          {/* Metrics Spotlight */}
          {project.metrics && project.metrics.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {project.metrics.map((m, idx) => (
                <div key={idx} style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)', marginBottom: '0.2rem' }}>
                    {m.value}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{m.label}</div>
                  {m.subtext && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.subtext}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Overview & Description */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={16} className="text-cyan" />
              <span>Project Overview</span>
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              {project.description}
            </p>
          </div>

          {/* Challenges & Solutions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--accent-amber)' }}>
                Key Technical Challenges
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {project.keyChallenges.map((c, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--accent-amber)', marginTop: '2px' }}>•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--accent-emerald)' }}>
                Engineered Solutions
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {project.solutions.map((s, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle size={15} className="text-emerald" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technical Architecture */}
          {project.architecture && (
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Cpu size={16} className="text-emerald" />
                <span>System Architecture</span>
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '0.75rem',
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)'
              }}>
                {project.architecture.frontend && (
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Frontend Stack</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{project.architecture.frontend}</div>
                  </div>
                )}
                {project.architecture.backend && (
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Backend / Cloud</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{project.architecture.backend}</div>
                  </div>
                )}
                {project.architecture.database && (
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Database & Cache</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{project.architecture.database}</div>
                  </div>
                )}
                {project.architecture.deployment && (
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Deployment Target</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{project.architecture.deployment}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Code Highlight */}
          {project.codeHighlight && (
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileCode2 size={16} className="text-cyan" />
                <span>Architecture Code Highlight ({project.codeHighlight.filename})</span>
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                {project.codeHighlight.explanation}
              </p>
              <pre className="code-snippet-box">
                <code>{project.codeHighlight.code}</code>
              </pre>
            </div>
          )}

          {/* Deliverables List */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Key Deliverables
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.6rem' }}>
              {project.deliverables.map((d, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.65rem 0.9rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-secondary)',
                  fontSize: '0.88rem'
                }}>
                  <CheckCircle size={15} className="text-emerald" style={{ flexShrink: 0 }} />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Bottom CTA */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Need a similar high-performance Shopify solution?
            </div>
            <a
              href="#contact"
              onClick={onClose}
              className="btn btn-primary"
            >
              <span>Discuss Your Project</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
