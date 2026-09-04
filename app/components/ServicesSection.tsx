import React from 'react';
import { Layers, Code2, Zap, Cpu, CheckCircle2, Sparkles, ArrowRight, Target, Palette, ExternalLink } from 'lucide-react';
import { servicesData } from '~/data/services';
import { siteConfig } from '~/data/siteConfig';

export const ServicesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers size={28} className="text-emerald" />;
      case 'Code2': return <Code2 size={28} className="text-cyan" />;
      case 'Zap': return <Zap size={28} className="text-amber" />;
      case 'Target': return <Target size={28} className="text-rose" style={{ color: '#f43f5e' }} />;
      case 'Cpu': return <Cpu size={28} className="text-indigo" />;
      case 'Palette': return <Palette size={28} className="text-emerald" />;
      default: return <Sparkles size={28} className="text-emerald" />;
    }
  };

  return (
    <section id="services" className="section-padding" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="site-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} />
            <span>Specialized Capabilities</span>
          </div>
          <h2 className="section-title">
            Specialized <span className="text-gradient">Shopify Engineering</span> Services
          </h2>
          <p className="section-subtitle">
            From official Shopify App Store apps and custom direct-response funnels to speed optimization and complete Figma-to-theme migrations.
          </p>
        </div>

        {/* Services Grid (6 Cards) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem'
        }}>
          {servicesData.map((service) => (
            <div key={service.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* Top Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-medium)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {getIcon(service.icon)}
                </div>

                {service.badge && (
                  <span className="tag-badge app-badge">
                    {service.badge}
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                {service.title}
              </h3>
              <div style={{ fontSize: '0.88rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '1rem' }}>
                {service.tagline}
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                {service.description}
              </p>

              {/* Features List */}
              <div style={{ marginBottom: '1.5rem', flex: 1 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  What's Included:
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {service.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={16} className="text-emerald" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', marginTop: 'auto' }}>
                <a
                  href={siteConfig.upworkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <span>Hire on Upwork for this Service</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
