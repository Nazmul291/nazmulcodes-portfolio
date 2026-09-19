import React from 'react';
import { ArrowRight, BookOpen, Sparkles, CheckCircle2, ShieldCheck, Zap, ExternalLink, Star, Award, Code2 } from 'lucide-react';
import { statsData } from '~/data/testimonials';
import { siteConfig } from '~/data/siteConfig';
import { UpworkIcon } from '~/components/UpworkIcon';

export const AboutHero: React.FC = () => {
  return (
    <section id="hero" style={{ paddingBottom: '5rem', }}>
      {/* Ambient background glows */}

      <div>
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: 'var(--radius-lg, 12px)',
          overflow: 'hidden',
          background: 'var(--bg-tertiary, #0d121f)',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
          border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))'
        }}>
          <iframe
            src="https://player.vimeo.com/video/1228313966?h=7d8ef713bb"
            title="Shopify & Full-Stack Developer | Custom Apps, High-Converting Stores & Scalable Architecture"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0
            }}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export const BlogHero: React.FC = () => {
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
                  width={48}
                  height={48}
                  loading="eager"
                  decoding="async"
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
                <span>Shopify Architecture, Technical Guides & E-Commerce Engineering</span>
              </div>
            </div>

            <h1 className="hero-title">
              Deep Dives into <span className="text-gradient">Shopify Architecture</span>, Modern Web Dev & Performance.
            </h1>

            <p className="hero-subtitle">
              Welcome to <strong>NazmulCodes</strong> by <strong>Nazmul Hawlader</strong>. A publication dedicated to actionable engineering guides, Online Store 2.0 theme architecture, Shopify app workflows, and sub-second Core Web Vitals optimization.
            </p>

            {/* Quick Proof Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem' }}>
                <CheckCircle2 size={18} className="text-emerald" style={{ flexShrink: 0 }} />
                <span><strong>Production-Tested Insights</strong> — Real-world architecture breakdowns from published apps & stores</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem' }}>
                <CheckCircle2 size={18} className="text-emerald" style={{ flexShrink: 0 }} />
                <span><strong>Modern Theme Engineering</strong> — In-depth Liquid schemas, headless patterns, and zero bloat</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem' }}>
                <CheckCircle2 size={18} className="text-emerald" style={{ flexShrink: 0 }} />
                <span><strong>Performance Optimization</strong> — Actionable case studies on achieving &lt;1.1s LCP & 100 Lighthouse scores</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="hero-ctas">
              <a href="#articles" className="btn btn-primary btn-lg">
                <BookOpen size={20} />
                <span>Explore Technical Guides</span>
                <ArrowRight size={18} />
              </a>

              <a href="/projects" className="btn btn-secondary btn-lg">
                <span>View Client Work & Apps</span>
                <ExternalLink size={18} />
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
                  <source media="(max-width: 640px)" srcSet="/assets/images/lifestyle/lifestyle-1-sm.webp" type="image/webp" />
                  <source srcSet="/assets/images/lifestyle/lifestyle-1.webp" type="image/webp" />
                    <img
                      src="/assets/images/lifestyle/lifestyle-1.webp"
                      alt="Nazmul Hawlader — Senior Shopify & Full-Stack Engineer"
                      width={480}
                      height={480}
                      {...{ fetchpriority: "high" }}
                      loading="eager"
                      decoding="async"
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
                      33+ Case Studies & Apps Shipped
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
