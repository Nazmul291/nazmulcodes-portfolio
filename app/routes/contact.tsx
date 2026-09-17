import React, { useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Link, useOutletContext } from '@remix-run/react';
import {
  Mail,
  Send,
  MessageSquare,
  Clock,
  MapPin,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Calculator,
  Calendar,
} from 'lucide-react';
import { Navbar } from '~/components/Navbar';
import { Footer } from '~/components/Footer';
import { AdSlot } from '~/components/AdSlot';
import { siteConfig } from '~/data/siteConfig';
import { UpworkIcon } from '~/components/UpworkIcon';
import { GithubIcon, LinkedinIcon } from '~/components/BrandIcons';

export const meta: MetaFunction = () => {
  return [
    { charSet: 'utf-8' },
    { title: 'Contact Nazmul Hawlader | Hire Senior Shopify & Full-Stack Engineer | NazmulCodes' },
    {
      name: 'description',
      content:
        'Get in touch with Nazmul Hawlader for custom Shopify app development, high-speed Liquid storefronts, headless Hydrogen builds, and enterprise technical consulting. 100% Job Success on Upwork.',
    },
    { name: 'keywords', content: 'contact Shopify developer, hire Shopify expert, Nazmul Hawlader contact, hire full-stack developer Upwork, custom Shopify app consultation' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'Contact Nazmul Hawlader | Hire Senior Shopify & Full-Stack Engineer' },
    {
      property: 'og:description',
      content:
        'Have a Shopify app, custom storefront, or performance challenge? Submit your project details for a guaranteed response within 12-24 hours.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://nazmulcodes.org/contact' },
    { property: 'og:image', content: 'https://nazmulcodes.org/assets/images/profile/nazmul-lg.webp' },
  ];
};

export default function ContactPage() {
  const { theme, toggleTheme } = useOutletContext<{ theme: 'dark' | 'light'; toggleTheme: () => void }>();

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [storeUrl, setStoreUrl] = useState('');
  const [service, setService] = useState('Custom Shopify App Development');
  const [budget, setBudget] = useState('$3,000 - $7,000');
  const [timeline, setTimeline] = useState('Within 2 to 4 weeks');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(siteConfig.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct mailto link with encoded parameters as instant fallback
    const subject = encodeURIComponent(`Project Inquiry: ${service} - ${name}`);
    const bodyContent = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nStore/Company: ${storeUrl || 'N/A'}\nService: ${service}\nEstimated Budget: ${budget}\nTarget Timeline: ${timeline}\n\nProject Scope & Requirements:\n${message}`
    );

    // Open user's email client
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${bodyContent}`;
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main style={{ flex: 1, paddingTop: '6.5rem', paddingBottom: '5rem' }}>
        <div className="site-container" style={{ maxWidth: '1080px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div
              className="section-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                marginBottom: '1rem',
              }}
            >
              <Sparkles size={14} />
              <span>Let's Build Something Exceptional</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 800, marginBottom: '1.25rem', lineHeight: 1.25 }}>
              Get in Touch & <span className="text-gradient">Start Your Project</span>
            </h1>

            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '720px', margin: '0 auto', lineHeight: 1.7 }}>
              Have an official Shopify app concept, custom Liquid theme, performance optimization requirement, or enterprise consultation inquiry? Send a message below or contact me directly.
            </p>
          </div>

          {/* Quick SLA & Guarantees Bar */}
          <div
            className="glass-card"
            style={{
              padding: '1.25rem 1.75rem',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-medium)',
              marginBottom: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Clock size={18} className="text-emerald" />
              <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Guaranteed Response: <strong style={{ color: 'var(--text-primary)' }}>12-24 Hours</strong>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <ShieldCheck size={18} className="text-cyan" />
              <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Upwork Top Rated: <strong style={{ color: 'var(--text-primary)' }}>100% Job Success</strong>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <MapPin size={18} className="text-emerald" />
              <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Timezone: <strong style={{ color: 'var(--text-primary)' }}>UTC+6 (US & EU Overlap)</strong>
              </span>
            </div>
          </div>

          {/* Main Grid: Form + Direct Channels */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '3.5rem' }}>
            {/* Left: Project Inquiry Form */}
            <div
              className="glass-card"
              style={{
                padding: 'clamp(1.75rem, 4vw, 2.5rem)',
                borderRadius: 'var(--radius-2xl)',
                border: '1px solid var(--border-medium)',
              }}
            >
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Send a Project Brief
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
                Fill out the details below to receive a diagnostic scope breakdown and estimated delivery milestones.
              </p>

              {submitted ? (
                <div
                  style={{
                    padding: '2rem',
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: 'var(--radius-lg)',
                    textAlign: 'center',
                  }}
                >
                  <CheckCircle2 size={42} className="text-emerald" style={{ margin: '0 auto 1rem auto' }} />
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    Email Draft Initialized!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    Your project details have been formatted into an email draft. If your mail client did not launch automatically, you can email me directly at:
                  </p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-surface)', padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
                    <code style={{ fontSize: '0.95rem', color: 'var(--accent-emerald)' }}>{siteConfig.email}</code>
                    <button
                      onClick={handleCopyEmail}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                      title="Copy Email"
                    >
                      {copiedEmail ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn btn-secondary btn-sm"
                    >
                      Edit Submission
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label htmlFor="name" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Sarah Jenkins"
                        className="modal-input"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                        Work Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sarah@company.com"
                        className="modal-input"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="storeUrl" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      Store / Website URL (Optional)
                    </label>
                    <input
                      id="storeUrl"
                      type="url"
                      value={storeUrl}
                      onChange={(e) => setStoreUrl(e.target.value)}
                      placeholder="https://yourstore.com"
                      className="modal-input"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="service" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      Primary Service Needed *
                    </label>
                    <select
                      id="service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="modal-input"
                      style={{ width: '100%' }}
                    >
                      <option value="Custom Shopify App Development">Official / Custom Shopify App (Remix + GraphQL)</option>
                      <option value="High-Speed Liquid Storefront">Bespoke Liquid Theme (0 Page Builders, 95+ Vitals)</option>
                      <option value="Checkout Extensibility & Functions">Shopify Plus Checkout Extensibility & Wasm Functions</option>
                      <option value="Store Speed & Web Vitals Optimization">Performance Optimization (Sub-1s LCP, 0 CLS)</option>
                      <option value="Headless Commerce / Hydrogen">Headless Commerce (Remix + Hydrogen + Oxygen)</option>
                      <option value="Enterprise Technical Consultation">Technical Architecture Consultation / Code Audit</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label htmlFor="budget" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                        Estimated Budget
                      </label>
                      <select
                        id="budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="modal-input"
                        style={{ width: '100%' }}
                      >
                        <option value="$1,000 - $3,000">$1,000 – $3,000 (Focused optimization / small build)</option>
                        <option value="$3,000 - $7,000">$3,000 – $7,000 (Standard app / custom storefront)</option>
                        <option value="$7,000 - $15,000">$7,000 – $15,000 (Enterprise SaaS / complex migration)</option>
                        <option value="$15,000+">$15,000+ (Full-scale ecosystem / long-term retainer)</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeline" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                        Target Timeline
                      </label>
                      <select
                        id="timeline"
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="modal-input"
                        style={{ width: '100%' }}
                      >
                        <option value="Urgent (1 to 2 weeks)">Urgent (1 to 2 weeks)</option>
                        <option value="Within 2 to 4 weeks">Within 2 to 4 weeks (Standard)</option>
                        <option value="Within 1 to 2 months">Within 1 to 2 months</option>
                        <option value="Flexible / Long-term Retainer">Flexible / Ongoing Advisory</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      Project Description & Objectives *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please outline your project goals, key bottlenecks, desired deliverables, and any relevant links or design references..."
                      className="modal-input"
                      style={{ width: '100%', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '0.95rem 1.5rem',
                      fontSize: '1.02rem',
                      fontWeight: 700,
                      marginTop: '0.5rem',
                    }}
                  >
                    <Send size={18} />
                    <span>Send Project Inquiry</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right: Direct Channels, Upwork, and Credentials */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Upwork Top-Rated Consultation Card */}
              <div
                className="glass-card"
                style={{
                  padding: '2rem',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-medium)',
                  background: 'linear-gradient(135deg, rgba(20, 168, 0, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(20, 168, 0, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#14a800',
                    }}
                  >
                    <UpworkIcon size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                      Hire via Upwork
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: '#14a800', fontWeight: 600 }}>Top Rated • 100% Job Success</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Prefer the security of Upwork escrow, milestone billing, and contract protection? You can hire me directly through my verified Top-Rated profile.
                </p>

                <a
                  href={siteConfig.upworkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%', justifyContent: 'center', background: '#14a800', borderColor: '#14a800' }}
                >
                  <UpworkIcon size={16} />
                  <span>Open Upwork Contract</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* Direct Email Card */}
              <div
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(16, 185, 129, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-emerald)',
                    }}
                  >
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                      Direct Email
                    </h3>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Response within 12 hours</span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    marginTop: '0.75rem',
                  }}
                >
                  <a
                    href={`mailto:${siteConfig.email}`}
                    style={{ color: 'var(--accent-emerald)', textDecoration: 'none', fontWeight: 600, fontSize: '0.92rem' }}
                  >
                    {siteConfig.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check size={13} className="text-emerald" /> : <Copy size={13} />}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Professional Social & Code Repositories */}
              <div
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                  Developer Profiles & Code
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Explore verified code repositories, open-source utilities, and professional history:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <a
                    href={siteConfig.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ justifyContent: 'flex-start', gap: '0.65rem' }}
                  >
                    <GithubIcon size={16} />
                    <span>GitHub Profile (@Nazmul291)</span>
                    <ExternalLink size={12} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
                  </a>
                  <a
                    href={siteConfig.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ justifyContent: 'flex-start', gap: '0.65rem' }}
                  >
                    <LinkedinIcon size={16} />
                    <span>LinkedIn Profile</span>
                    <ExternalLink size={12} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
                  </a>
                </div>
              </div>

              {/* Instant Cost Estimator Promo Card */}
              <div
                className="glass-card"
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-subtle)',
                  background: 'rgba(6, 182, 212, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <Calculator size={18} className="text-cyan" />
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                    Need a Quick Ballpark Estimate?
                  </h4>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 0.85rem 0' }}>
                  Try our interactive multi-parameter project cost calculator to view estimated investment and timeline tiers.
                </p>
                <a
                  href="/#estimator"
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem' }}
                >
                  <span>Launch Cost Estimator</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom FAQ Section */}
          <div style={{ marginTop: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
                Frequently Asked Collaboration Questions
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem' }}>
                Clear answers regarding communication, billing security, and engagement models.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              <div className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 0, marginBottom: '0.6rem' }}>
                  How quickly can we kick off a new project?
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  Depending on current sprint capacity, most projects kick off within 3 to 7 business days following requirement alignment and initial milestone agreement.
                </p>
              </div>

              <div className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 0, marginBottom: '0.6rem' }}>
                  Do you work on fixed-price milestones or hourly rates?
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  Both models are available. Well-defined projects (e.g., custom app builds, theme speed overhauls) typically run on fixed-price milestone escrow. Open-ended consulting or ongoing retainers run on hourly contracts via Upwork.
                </p>
              </div>

              <div className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 0, marginBottom: '0.6rem' }}>
                  How do you handle timezones for North American and European clients?
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  I structure my working day to provide 3 to 5 hours of direct real-time overlap with US Eastern (EST), US Pacific (PST), and Central European (CET) business hours for meetings, Slack communication, and deployment reviews.
                </p>
              </div>

              <div className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 0, marginBottom: '0.6rem' }}>
                  Do you provide a warranty or post-launch support?
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  Yes. Every custom build includes a complimentary 30-day bug-free warranty period following delivery to ensure all edge cases are addressed in live production.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
