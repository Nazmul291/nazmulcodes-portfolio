import React, { useState } from 'react';
import { ExternalLink, Check, Copy, ShieldCheck, Sparkles, Mail, Award, Clock, Star, Code2 } from 'lucide-react';
import { siteConfig } from '~/data/siteConfig';

export const HireSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="site-container">
        <div className="glass-card" style={{
          padding: 'clamp(1.75rem, 5vw, 3.5rem)',
          border: '1px solid var(--border-glow)',
          background: 'linear-gradient(135deg, rgba(15, 22, 38, 0.95) 0%, rgba(13, 20, 36, 0.98) 100%)',
          boxShadow: 'var(--shadow-lg), 0 0 60px rgba(16, 185, 129, 0.12)'
        }}>
          <div className="hire-grid">
            {/* Left Column: Direct Upwork Value Proposition */}
            <div>
              <div className="section-badge" style={{ marginBottom: '1.25rem' }}>
                <Award size={14} />
                <span>Upwork Verified Shopify Expert</span>
              </div>

              <h2 className="section-title" style={{ textAlign: 'left', lineHeight: 1.2 }}>
                Ready to Build on <span className="text-gradient">Upwork with Confidence</span>?
              </h2>

              <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '600px' }}>
                All contracts, project milestones, and custom Shopify engineering engagements are securely processed through Upwork. Enjoy full escrow protection, transparent deliverables, and direct communication.
              </p>

              {/* Upwork Trust Guarantees */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.95rem' }}>
                  <ShieldCheck size={18} className="text-emerald" style={{ flexShrink: 0 }} />
                  <span><strong>100% Escrow Protection</strong> — Release funds only upon verified delivery & QA</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.95rem' }}>
                  <ShieldCheck size={18} className="text-emerald" style={{ flexShrink: 0 }} />
                  <span><strong>Milestone-Based Billing</strong> — Fixed-price sprints or flexible hourly retainers</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.95rem' }}>
                  <ShieldCheck size={18} className="text-emerald" style={{ flexShrink: 0 }} />
                  <span><strong>100% Code Ownership</strong> — Complete IP transfer & theme documentation included</span>
                </div>
              </div>

              {/* Primary Actions */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <a
                  href={siteConfig.upworkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                  style={{ gap: '0.75rem' }}
                >
                  <Sparkles size={20} />
                  <span>Hire Nazmul on Upwork</span>
                  <ExternalLink size={18} />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="btn btn-secondary btn-lg"
                  title="Copy business email"
                >
                  {copied ? <Check size={18} className="text-emerald" /> : <Copy size={18} />}
                  <span>{copied ? 'Email Copied!' : 'Copy info@nazmulcodes.org'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Premium Lifestyle-2 Profile & Contact Dossier */}
            <div style={{
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.5rem',
              border: '1px solid var(--border-medium)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)'
            }}>
              {/* Lifestyle-2 Image Spotlight */}
              <div style={{
                position: 'relative',
                width: '100%',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                aspectRatio: '4 / 3',
                background: 'var(--bg-tertiary)'
              }}>
                <picture>
                  <source srcSet="/assets/images/lifestyle/lifestyle-2.webp" type="image/webp" />
                  <img
                    src="/assets/images/lifestyle/lifestyle-2.png"
                    alt="Nazmul Hawlader — Senior Shopify Engineer"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </picture>

                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(8, 12, 20, 0.85) 0%, transparent 60%)',
                  pointerEvents: 'none'
                }} />

                {/* Overlay Tag */}
                <div style={{
                  position: 'absolute',
                  bottom: '0.75rem',
                  left: '0.75rem',
                  right: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{
                    background: 'rgba(8, 12, 20, 0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--border-glow)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)'
                  }}>
                    {siteConfig.name}
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    background: 'rgba(245, 158, 11, 0.15)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--accent-amber)',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}>
                    <Star size={12} style={{ fill: 'currentColor' }} />
                    <span>5.0 Rating</span>
                  </div>
                </div>
              </div>

              {/* Direct Info & Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Mail size={18} className="text-cyan" style={{ flexShrink: 0 }} />
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Official Business Email</div>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', wordBreak: 'break-all' }}
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Clock size={18} className="text-emerald" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Availability Status</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--accent-emerald)' }}>
                      🟢 {siteConfig.availability}
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={siteConfig.upworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.25rem' }}
              >
                <span>View Full Upwork Profile</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
