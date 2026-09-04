import React from 'react';
import { Star, MessageSquareQuote, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { testimonialsData } from '~/data/testimonials';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="section-padding">
      <div className="site-container">
        <div className="section-header">
          <div className="section-badge">
            <MessageSquareQuote size={14} />
            <span>Client Endorsements</span>
          </div>
          <h2 className="section-title">
            Trusted by <span className="text-gradient">Founders & Engineering Leaders</span>
          </h2>
          <p className="section-subtitle">
            What clients, product managers, and Shopify store owners say about working with Nazmul.
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
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '1.5rem', flex: 1 }}>
                "{t.content}"
              </p>

              {/* Project & Role Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-subtle)',
                marginTop: 'auto'
              }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--accent-emerald)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{t.role}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>{t.company}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Project: {t.projectRef}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
