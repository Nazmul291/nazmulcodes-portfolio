import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap, ExternalLink, Star, Award, Code2 } from 'lucide-react';
import { statsData } from '~/data/testimonials';
import { siteConfig } from '~/data/siteConfig';
import { UpworkIcon } from '~/components/UpworkIcon';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero-wrapper">
      {/* Ambient background glows */}
      <div className="ambient-orb orb-emerald"></div>
      <div className="ambient-orb orb-cyan"></div>

      <div className="site-container">
        <div className="hero-grid" style={{ alignItems: 'center' }}>
          {/* Left Column: Headline & Value Proposition */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img
                  src={siteConfig.avatarUrl}
                  alt={siteConfig.name}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--accent-emerald)',
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.35)'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: '1px',
                  right: '1px',
                  width: '12px',
                  height: '12px',
                  backgroundColor: 'var(--accent-emerald)',
                  borderRadius: '50%',
                  border: '2px solid var(--bg-primary)'
                }} />
              </div>
              <div className="section-badge" style={{ marginBottom: 0 }}>
                <Sparkles size={14} />
                <span>Senior Full-Stack Shopify & E-Commerce Engineer</span>
              </div>
            </div>

            <h1 className="hero-title">
              Engineering <span className="text-gradient">High-Performance</span> Shopify Apps & Custom Storefronts.
            </h1>

            <p className="hero-subtitle">
              Hi, I’m <strong>Nazmul Hawlader</strong> (NazmulCodes). I build published Shopify App Store applications (React/Polaris/GraphQL/Python) and hand-crafted Online Store 2.0 themes with <strong>zero page builder bloat</strong>, sub-second load speeds, and deep merchant customizability.
            </p>

            {/* Quick Proof Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem' }}>
                <CheckCircle2 size={18} className="text-emerald" style={{ flexShrink: 0 }} />
                <span><strong>Official Shopify App Store Developer</strong> — DemandMind AI & Stockly</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem' }}>
                <CheckCircle2 size={18} className="text-emerald" style={{ flexShrink: 0 }} />
                <span><strong>Zero Page Builder Lag</strong> — 100% Native Liquid sections with deep schema settings</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem' }}>
                <CheckCircle2 size={18} className="text-emerald" style={{ flexShrink: 0 }} />
                <span><strong>Core Web Vitals Perfection</strong> — 90–100 Lighthouse scores, 0 CLS, &lt;1.1s LCP</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="hero-ctas">
              <a
                href={siteConfig.upworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <UpworkIcon size={20} />
                <span>Hire on Upwork</span>
                <ExternalLink size={18} />
              </a>

              <a href="#showcase" className="btn btn-secondary btn-lg">
                <span>Explore 33+ Client Projects</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* Right Column: Premium Lifestyle Workspace Showcase */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '480px',
              borderRadius: 'var(--radius-2xl)',
              padding: '0.85rem',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
              border: '1px solid var(--border-glow)',
              boxShadow: 'var(--shadow-lg), 0 0 50px rgba(16, 185, 129, 0.15)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem'
            }}>
              {/* Main Lifestyle Image Container */}
              <div style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                aspectRatio: '1 / 1',
                background: 'var(--bg-tertiary)'
              }}>
                <picture>
                  <source srcSet="/assets/images/lifestyle/lifestyle-1.webp" type="image/webp" />
                  <img
                    src="/assets/images/lifestyle/lifestyle-1.png"
                    alt="Nazmul Hawlader — Senior Shopify & Full-Stack Engineer"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </picture>
              </div>

              {/* Verified Status Bar (Positioned outside/below the image) */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.92)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-lg)',
                padding: '0.85rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-emerald)',
                    flexShrink: 0
                  }}>
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Shopify Partner Verified
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      33+ Stores & Apps Shipped
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  background: 'rgba(245, 158, 11, 0.12)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  padding: '0.3rem 0.6rem',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--accent-amber)',
                  fontSize: '0.82rem',
                  fontWeight: 700
                }}>
                  <Star size={13} style={{ fill: 'currentColor' }} />
                  <span>5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Strip */}
        <div className="stats-strip">
          {statsData.map((stat) => (
            <div key={stat.id} className="stat-item">
              <span className="stat-value text-gradient">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-subtext">{stat.subtext}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
