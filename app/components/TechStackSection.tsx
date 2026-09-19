import React from 'react';
import { Code, Cpu, Globe2, ArrowRight } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const stackCategories = [
    {
      category: 'Shopify Core Ecosystem',
      icon: <Globe2 size={20} className="text-emerald" />,
      accentColor: 'var(--accent-emerald)',
      skills: [
        { name: 'Shopify Liquid & OS 2.0', level: 'Deep Schemas & Zero Bloat' },
        { name: 'Shopify App Bridge v3', level: 'Embedded Admin Apps' },
        { name: 'Shopify Polaris UI', level: 'Design System & Patterns' },
        { name: 'GraphQL Admin & Storefront API', level: 'High-Volume Query Architecture' },
        { name: 'Theme App Extensions', level: 'Isolated App Blocks' },
        { name: 'Recurring Billing API', level: 'Subscription SaaS Modeling' },
        { name: 'Markets & Multi-Currency', level: 'Global Localization' },
        { name: 'Metafields & Metaobjects', level: 'Custom Data Architecture' }
      ]
    },
    {
      category: 'Front-End & Modern Web',
      icon: <Code size={20} className="text-cyan" />,
      accentColor: 'var(--accent-cyan)',
      skills: [
        { name: 'React 18 / 19', level: 'Modern State & Client Embeds' },
        { name: 'Remix & Modern SSR', level: 'Headless Architecture' },
        { name: 'TypeScript', level: 'Strict Type-Safe Systems' },
        { name: 'Modern Vanilla JS (ES6+)', level: 'Zero jQuery Overhead' },
        { name: 'Modern CSS & BEM', level: 'Sub-second LCP & 0 CLS' },
        { name: 'Tailwind CSS', level: 'Scalable Utility Styling' },
        { name: 'WCAG AA Accessibility', level: 'Keyboard & Screen Reader First' }
      ]
    },
    {
      category: 'Backend, AI & Cloud Infrastructure',
      icon: <Cpu size={20} className="text-indigo" />,
      accentColor: '#818cf8',
      skills: [
        { name: 'Python (FastAPI / Flask)', level: 'Demand Forecasting & APIs' },
        { name: 'Node.js (Express / Fastify)', level: 'Event-Driven Webhooks' },
        { name: 'Machine Learning (Prophet)', level: 'Sales Velocity Models' },
        { name: 'PostgreSQL & Supabase', level: 'Relational Schemas' },
        { name: 'Redis Queue & Caching', level: 'Idempotent Sync Pipelines' },
        { name: 'Fly.io & Docker Containers', level: 'Automated Deployments' }
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
            Core Engineering &amp; <span className="text-gradient">Topics We Cover</span>
          </h2>
          <p className="section-subtitle">
            In-depth architecture breakdowns, performance case studies, and engineering solutions across the modern Shopify and web stack.
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
                    <span style={{ fontSize: '0.75rem', color: group.accentColor, fontWeight: 500 }}>{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Link to Articles */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a
            href="/blog/engineering-shopify-plus-b2b-wholesale-storefronts"
            target="_blank"
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <span>Explore Engineering Case Studies &amp; Articles</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
};