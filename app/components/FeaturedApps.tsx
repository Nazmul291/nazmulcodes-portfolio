import React from 'react';
import { ExternalLink, Layers, Sparkles, TrendingUp, BellRing, ShoppingBag, ArrowRight } from 'lucide-react';
import { ProjectItem } from '~/types/project';

interface FeaturedAppsProps {
  onSelectProject: (project: ProjectItem) => void;
  projects: ProjectItem[];
}

export const FeaturedApps: React.FC<FeaturedAppsProps> = ({ onSelectProject, projects }) => {
  const featuredApps = projects.filter(p => p.appStoreUrl || p.id === 'kilo-media-compression');

  return (
    <section id="apps" className="section-padding" style={{ position: 'relative', background: 'var(--bg-secondary)' }}>
      <div className="site-container">
        <div className="section-header">
          <div className="section-badge">
            <Layers size={14} />
            <span>Official Apps & Specialized Tools</span>
          </div>
          <h2 className="section-title">
            Featured <span className="text-gradient">Apps & E-Commerce Tools</span>
          </h2>
          <p className="section-subtitle">
            Engineered from ground up with React, Shopify Polaris, App Bridge, WebAssembly/Canvas API, and sub-second performance.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem',
        }}>
          {featuredApps.map((app) => (
            <div key={app.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* App Identity Header (Horizontal side-by-side on mobile, elegant on desktop) */}
              <div className="app-card-header">
                <div className="app-identity-group">
                  <div className="app-logo-box">
                    {app.logoUrl ? (
                      <img
                        src={app.logoUrl}
                        alt={app.title}
                        className="app-logo-img"
                        width={48}
                        height={48}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="app-logo-fallback">
                        {app.id.includes('demand') ? <TrendingUp size={24} /> :
                         app.id.includes('stock') ? <BellRing size={24} /> :
                         <ShoppingBag size={24} />}
                      </div>
                    )}
                  </div>

                  <div className="app-title-group">
                    <div className="app-client-type">{app.projectType}</div>
                    <h3 className="app-card-title">{app.title.split('—')[0]}</h3>
                  </div>
                </div>

                <div className="app-badge-wrapper">
                  <span className="tag-badge app-badge">
                    <Sparkles size={12} />
                    <span>{app.appStoreUrl ? 'App Store' : 'Web App'}</span>
                  </span>
                </div>
              </div>

              {/* Summary */}
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>
                {app.summary}
              </p>

              {/* Metrics Box */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '1.5rem'
              }}>
                {app.metrics.slice(0, 2).map((m, idx) => (
                  <div key={idx}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>{m.value}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                {app.tags.slice(0, 4).map((tag, tIdx) => (
                  <span key={tIdx} className="tag-badge">{tag}</span>
                ))}
              </div>

              {/* Card Footer Actions (50% / 50% Equal Width Grid) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: (app.appStoreUrl || app.liveUrl) ? '1fr 1fr' : '1fr',
                gap: '0.75rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-subtle)',
                marginTop: 'auto'
              }}>
                <button
                  onClick={() => onSelectProject(app)}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                  aria-label={`View technical case study for ${app.title}`}
                >
                  <span>Case Study</span>
                  <ArrowRight size={14} />
                </button>

                {app.appStoreUrl ? (
                  <a
                    href={app.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                    title={`View ${app.title} on Shopify App Store`}
                    aria-label={`Install ${app.title} from Shopify App Store`}
                  >
                    <span>App Store</span>
                    <ExternalLink size={14} />
                  </a>
                ) : app.liveUrl ? (
                  <a
                    href={app.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                    title={`Launch ${app.title}`}
                    aria-label={`Launch ${app.title}`}
                  >
                    <span>Open Tool</span>
                    <ExternalLink size={14} />
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
