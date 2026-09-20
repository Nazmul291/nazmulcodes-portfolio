import React from 'react';
import { Link } from '@remix-run/react';
import { Layers, Zap, Cpu, Server, Compass, ArrowRight } from 'lucide-react';

interface TopicCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  subtopics: string[];
  filterParam: string;
}

export const TOPICS: TopicCategory[] = [
  {
    id: 'shopify-liquid',
    name: 'Shopify & Liquid Internals',
    icon: <Layers size={22} className="text-accent" />,
    description: 'Deep dives into Storefront APIs, native theme architecture, section rendering, and custom headless checkouts.',
    subtopics: ['Liquid Performance', 'Storefront GraphQL', 'Theme App Extensions', 'Cart Attributes'],
    filterParam: 'Shopify & E-Commerce',
  },
  {
    id: 'performance-vitals',
    name: 'Performance & Web Vitals',
    icon: <Zap size={22} style={{ color: 'var(--accent-emerald)' }} />,
    description: 'Engineering sub-second store experiences, sub-layout hydration, and resolving INP & LCP bottlenecks.',
    subtopics: ['INP Optimization', 'Asset Lazy Hydration', 'LCP Strategy', 'Image Pipeline'],
    filterParam: 'Performance & Web Vitals',
  },
  {
    id: 'react-polaris-apps',
    name: 'React, Remix & Polaris Apps',
    icon: <Cpu size={22} style={{ color: 'var(--accent-cyan)' }} />,
    description: 'Architecting official Shopify embedded applications with App Bridge, session tokens, and enterprise-grade UI.',
    subtopics: ['Remix Architecture', 'Shopify App Bridge', 'Polaris UI/UX', 'Webhook Handlers'],
    filterParam: 'React & Frontend',
  },
  {
    id: 'backend-scalability',
    name: 'Full-Stack & Resilient APIs',
    icon: <Server size={22} style={{ color: '#a855f7' }} />,
    description: 'Robust server-side pipelines, Redis caching layers, background queues, and secure third-party integrations.',
    subtopics: ['GraphQL Mutations', 'Redis Queues', 'PostgreSQL Optimization', 'Auth Security'],
    filterParam: 'Full-Stack & APIs',
  },
];

export const BlogCategoryDirectory: React.FC = () => {
  return (
    <section id="topics" className="section-padding" style={{ position: 'relative', background: 'var(--bg-primary)' }}>
      <div className="site-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Compass size={14} />
            <span>Topical Architecture</span>
          </div>
          <h2 className="section-title">
            Explore by <span className="text-gradient">Engineering Discipline</span>
          </h2>
          <p className="section-subtitle">
            Structured publications, benchmarks, and production patterns categorized by core technological domain.
          </p>
        </div>

        {/* Categories Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {TOPICS.map((topic) => (
            <div
              key={topic.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                padding: '1.75rem',
                transition: 'transform var(--transition-fast), border-color var(--transition-fast)',
              }}
            >
              {/* Icon & Category Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {topic.icon}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  {topic.name}
                </h3>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                {topic.description}
              </p>

              {/* Focus Pillars / Subtopics */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.75rem' }}>
                {topic.subtopics.map((sub, sIdx) => (
                  <span
                    key={sIdx}
                    style={{
                      fontSize: '0.74rem',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {sub}
                  </span>
                ))}
              </div>

              {/* Link to Filtered Blog Category */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginTop: 'auto' }}>
                <Link
                  to={`/blog?category=${encodeURIComponent(topic.filterParam)}`}
                  rel="nofollow"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: 'var(--accent-emerald)',
                    textDecoration: 'none',
                  }}
                >
                  <span>Browse Articles</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};