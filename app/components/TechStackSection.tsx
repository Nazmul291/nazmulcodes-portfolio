import React from 'react';
import { Code, Database, Cpu, Globe2, ShieldCheck, Sparkles } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const stackCategories = [
    {
      category: 'Shopify Core Ecosystem',
      icon: <Globe2 size={20} className="text-emerald" />,
      skills: [
        { name: 'Shopify Liquid', level: 'Expert / Theme Architect' },
        { name: 'Shopify App Bridge v3', level: 'Production Apps' },
        { name: 'Shopify Polaris UI', level: 'Admin Design System' },
        { name: 'Admin & Storefront GraphQL API', level: 'High-Volume Queries' },
        { name: 'Theme App Extensions & App Blocks', level: 'Isolated Theme Embeds' },
        { name: 'Shopify Recurring Billing API', level: 'Subscription SaaS' },
        { name: 'Shopify Markets & Multi-Currency', level: 'Internationalization' },
        { name: 'Shopify Metafields & Metaobjects', level: 'Custom Data Modeling' }
      ]
    },
    {
      category: 'Front-End & Modern Web',
      icon: <Code size={20} className="text-cyan" />,
      skills: [
        { name: 'React 18 / 19', level: 'Advanced SPA & Embeds' },
        { name: 'Remix / Next.js', level: 'Full-Stack SSR' },
        { name: 'TypeScript', level: 'Strict Type-Safe Systems' },
        { name: 'Vanilla Modern JavaScript (ES6+)', level: 'Zero jQuery Bloat' },
        { name: 'Modern CSS & BEM Architecture', level: 'Zero Layout Shifts' },
        { name: 'Tailwind CSS / CSS Modules', level: 'Rapid Styling' },
        { name: 'WCAG AA Accessibility', level: 'Screen Reader & Contrast' }
      ]
    },
    {
      category: 'Backend, AI & Cloud Infrastructure',
      icon: <Cpu size={20} className="text-indigo" />,
      skills: [
        { name: 'Python (FastAPI / Flask)', level: 'High-Throughput APIs' },
        { name: 'Node.js (Express / Fastify)', level: 'Event-Driven Webhooks' },
        { name: 'Machine Learning (Prophet / Scikit)', level: 'Sales Forecasting' },
        { name: 'PostgreSQL & Supabase', level: 'Relational Schemas' },
        { name: 'Redis Queue & Caching', level: 'Idempotent Sync' },
        { name: 'Fly.io & Docker Containers', level: 'Cloud Deployment' }
      ]
    }
  ];

  return (
    <section id="stack" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="site-container">
        <div className="section-header">
          <div className="section-badge">
            <Cpu size={14} />
            <span>Technical Mastery</span>
          </div>
          <h2 className="section-title">
            Skills & <span className="text-gradient">Technology Stack</span>
          </h2>
          <p className="section-subtitle">
            A battle-tested technology toolkit designed for high-conversion storefronts, compliant Shopify apps, and robust server architectures.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem'
        }}>
          {stackCategories.map((group, idx) => (
            <div key={idx} className="glass-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {group.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{group.category}</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {group.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{skill.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 500 }}>{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
