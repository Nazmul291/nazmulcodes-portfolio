import React, { useEffect, useRef } from 'react';
import { useFetcher } from '@remix-run/react';
import { Mail, CheckCircle2, ShieldCheck, ArrowRight, Rss, Loader2, AlertCircle } from 'lucide-react';

interface ActionData {
  success?: boolean;
  message?: string;
  error?: string;
}

export const TechDigestStrip: React.FC = () => {
  const fetcher = useFetcher<ActionData>();
  const formRef = useRef<HTMLFormElement>(null);

  const isSubmitting = fetcher.state === 'submitting';
  const isSuccess = fetcher.data?.success;
  const errorMessage = fetcher.data?.error;
  const successMessage = fetcher.data?.message;

  // সফল সাবমিটের পর ইনপুট ক্লিয়ার করা
  useEffect(() => {
    if (isSuccess) {
      formRef.current?.reset();
    }
  }, [isSuccess]);

  return (
    <section className="section-padding" style={{ position: 'relative', background: 'var(--bg-secondary)' }}>
      <div className="site-container">
        <div
          className="glass-card"
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            borderRadius: 'var(--radius-xl, 20px)',
            border: '1px solid var(--border-subtle)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            {/* Header Badge */}
            <div
              className="section-badge"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '1.25rem' }}
            >
              <Rss size={13} />
              <span>Engineering Publication Dispatch</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.35rem)',
                fontWeight: 800,
                lineHeight: 1.25,
                marginBottom: '1rem',
                color: 'var(--text-primary)',
              }}
            >
              The Shopify Architect <span className="text-gradient">Dispatch</span>
            </h2>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
              Subscribe to get monthly, zero-fluff breakdowns on Shopify platform API shifts, Liquid micro-optimizations, and real-world app infrastructure.
            </p>

            {/* Success Notification */}
            {isSuccess ? (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '1rem 1.75rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid var(--accent-emerald)',
                  color: 'var(--accent-emerald)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                }}
              >
                <CheckCircle2 size={18} />
                <span>{successMessage}</span>
              </div>
            ) : (
              /* Remix Fetcher Form */
              <fetcher.Form
                ref={formRef}
                method="post"
                action="/?index" // হোমপেজের অ্যাকশনে হিট করার জন্য
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  justifyContent: 'center',
                  maxWidth: '480px',
                  margin: '0 auto 1.25rem auto',
                }}
              >
                <div style={{ position: 'relative', flex: '1 1 260px' }}>
                  <Mail
                    size={18}
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-muted)',
                    }}
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="engineer@company.com"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem 0.85rem 2.65rem',
                      background: 'var(--bg-surface)',
                      border: errorMessage ? '1px solid #ef4444' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ whiteSpace: 'nowrap', gap: '0.5rem', flex: '0 0 auto' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </fetcher.Form>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: '#ef4444',
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                }}
              >
                <AlertCircle size={14} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Trust Signal */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
              }}
            >
              <ShieldCheck size={14} />
              <span>Strictly technical content. No spam, ever. Unsubscribe anytime.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};