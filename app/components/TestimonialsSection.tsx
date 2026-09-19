import React from 'react';
import { Star, MessageSquareQuote, ShieldCheck, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { testimonialsData } from '~/data/testimonials';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="section-padding">
      <div className="site-container">
        <div className="section-header">
          <div className="section-badge">
            <MessageSquareQuote size={14} />
            <span>Production Impact & Feedback</span>
          </div>
          <h2 className="section-title">
            Trusted by <span className="text-gradient">Founders & Engineering Leaders</span>
          </h2>
          <p className="section-subtitle">
            Feedback from founders, e-commerce managers, and store owners on theme speed, custom apps, and technical execution.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.75rem'
        }}>
          {testimonialsData.map((t) => (
            <div key={t.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* Rating and Highlight */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} style={{ fill: 'var(--accent-amber)', color: 'var(--accent-amber)' }} />
                  ))}
                </div>

                <span className="tag-badge app-badge" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                  {t.projectTypeTag || t.highlight}
                </span>
              </div>

              {/* Quote Content */}
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '1.25rem', flex: 1 }}>
                "{t.content}"
              </p>

              {/* Verified Metric Badge */}
              {(t.metric || t.outcome) && (
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.3rem 0.65rem',
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.76rem',
                  color: 'var(--accent-emerald)',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  width: 'fit-content'
                }}>
                  <CheckCircle2 size={13} style={{ flexShrink: 0 }} />
                  <span>{t.metric || t.outcome}</span>
                </div>
              )}

              {/* Project & Role Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.85rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-subtle)',
                marginTop: 'auto'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--accent-emerald)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    overflow: 'hidden'
                  }}>
                    {t.avatarUrl ? (
                      <img src={t.avatarUrl} alt={t.role} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <ShieldCheck size={20} />
                    )}
                  </div>

                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{t.role}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>{t.company}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Project: {t.projectRef}</div>
                  </div>
                </div>

                {t.caseStudyUrl && (
                  <a
                    href={t.caseStudyUrl}
                    title="Read Technical Breakdown"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none'
                    }}
                  >
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};