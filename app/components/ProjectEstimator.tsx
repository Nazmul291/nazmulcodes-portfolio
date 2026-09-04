import React, { useState } from 'react';
import { Calculator, Check, Sparkles, Clock, DollarSign, ExternalLink, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteConfig } from '~/data/siteConfig';
import { UpworkIcon } from '~/components/UpworkIcon';

interface ProjectEstimatorProps {
  onPreFillInquiry?: (details: { scope: string; timeline: string; estimate: string }) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = () => {
  const [selectedScope, setSelectedScope] = useState<'app' | 'theme' | 'speed' | 'configurator'>('theme');
  const [designState, setDesignState] = useState<'figma-ready' | 'need-design' | 'existing-theme'>('figma-ready');
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'rush'>('standard');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const scopeOptions = [
    {
      id: 'theme',
      title: 'Custom Liquid Storefront / Sections',
      desc: 'Hand-coded Online Store 2.0 sections, 0 page builder bloat, 100% theme editor settings',
      baseDays: 7,
      basePrice: '$1,500 – $3,500'
    },
    {
      id: 'app',
      title: 'Official Shopify Embedded / Public App',
      desc: 'React, Polaris, App Bridge, GraphQL Admin APIs, Python/Node backend, Billing API',
      baseDays: 14,
      basePrice: '$2,800 – $6,000'
    },
    {
      id: 'speed',
      title: 'Speed & Core Web Vitals Optimization',
      desc: 'Lighthouse 90+ score guarantee, 0 CLS, sub-second LCP, jQuery removal',
      baseDays: 4,
      basePrice: '$800 – $1,800'
    },
    {
      id: 'configurator',
      title: 'Custom Configurator / B2B Portal',
      desc: 'Nested variant selector, live pricing formula, wholesale tiers, 0 app fees',
      baseDays: 8,
      basePrice: '$1,800 – $4,000'
    }
  ];

  const calculateEstimate = () => {
    let days = 7;
    let priceRange = '$1,500 – $3,500';

    if (selectedScope === 'theme') {
      days = designState === 'figma-ready' ? 7 : designState === 'need-design' ? 12 : 5;
      priceRange = designState === 'figma-ready' ? '$1,800 – $3,500' : designState === 'need-design' ? '$2,800 – $4,800' : '$1,200 – $2,200';
    } else if (selectedScope === 'app') {
      days = 14;
      priceRange = '$3,000 – $6,500';
    } else if (selectedScope === 'speed') {
      days = 4;
      priceRange = '$800 – $1,800';
    } else if (selectedScope === 'configurator') {
      days = 8;
      priceRange = '$1,800 – $3,800';
    }

    if (deliverySpeed === 'rush') {
      days = Math.max(3, Math.round(days * 0.65));
    }

    return { days, priceRange };
  };

  const currentEstimate = calculateEstimate();

  const handleApplyAndHire = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.7 }
    });

    const activeScope = scopeOptions.find(s => s.id === selectedScope)?.title || 'Custom Shopify Project';
    const brief = `Shopify Project Scope: ${activeScope} | Timeline: ~${currentEstimate.days} Days | Budget: ${currentEstimate.priceRange}`;
    navigator.clipboard.writeText(brief);
    setCopiedPrompt(true);

    window.open(siteConfig.upworkUrl, '_blank', 'noopener,noreferrer');
    setTimeout(() => setCopiedPrompt(false), 4000);
  };

  return (
    <section id="estimator" className="section-padding">
      <div className="site-container">
        <div className="section-header">
          <div className="section-badge">
            <Calculator size={14} />
            <span>Transparent Project Scoping</span>
          </div>
          <h2 className="section-title">
            Interactive <span className="text-gradient">Cost & Timeline Calculator</span>
          </h2>
          <p className="section-subtitle">
            Configure your technical requirements to receive an instant timeline estimate and proposed budget range for your project.
          </p>
        </div>

        <div className="estimator-card">
          {/* Step 1: Select Project Scope */}
          <div style={{ marginBottom: '2rem' }}>
            <label className="form-label" style={{ marginBottom: '1rem', display: 'block', fontSize: '1rem' }}>
              1. Select Project Type & Scope:
            </label>
            <div className="estimator-options-grid">
              {scopeOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedScope(opt.id as any)}
                  className={`estimator-option-btn ${selectedScope === opt.id ? 'selected' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{opt.title}</span>
                    {selectedScope === opt.id && <Check size={18} className="text-emerald" />}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Design Readiness */}
          <div style={{ marginBottom: '2rem' }}>
            <label className="form-label" style={{ marginBottom: '1rem', display: 'block', fontSize: '1rem' }}>
              2. Design / UI State:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {[
                { id: 'figma-ready', label: 'Figma / XD Prototypes Ready', desc: 'Direct pixel-perfect conversion' },
                { id: 'existing-theme', label: 'Modifying Live Shopify Theme', desc: 'Custom section additions / tweaks' },
                { id: 'need-design', label: 'Need UI/UX Design & Wireframing', desc: 'Design from concept to finish' }
              ].map(d => (
                <button
                  key={d.id}
                  onClick={() => setDesignState(d.id as any)}
                  className={`estimator-option-btn ${designState === d.id ? 'selected' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{d.label}</span>
                    {designState === d.id && <Check size={16} className="text-emerald" />}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{d.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Delivery Speed */}
          <div style={{ marginBottom: '2.5rem' }}>
            <label className="form-label" style={{ marginBottom: '1rem', display: 'block', fontSize: '1rem' }}>
              3. Delivery Priority:
            </label>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {[
                { id: 'standard', label: 'Standard Delivery', desc: 'High attention to polish & QA' },
                { id: 'rush', label: '⚡ Rush Priority Sprint', desc: 'Dedicated focus for fast launch' }
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => setDeliverySpeed(s.id as any)}
                  className={`estimator-option-btn ${deliverySpeed === s.id ? 'selected' : ''}`}
                  style={{ flex: 1, minWidth: '220px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{s.label}</span>
                    {deliverySpeed === s.id && <Check size={16} className="text-emerald" />}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Estimated Results Strip & Inquiry CTA */}
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.75rem 2rem',
            border: '1px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <Clock size={15} />
                  <span>Estimated Turnaround</span>
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  ~{currentEstimate.days} Business Days
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <DollarSign size={15} />
                  <span>Estimated Investment</span>
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                  {currentEstimate.priceRange}
                </div>
              </div>
            </div>

            <button
              onClick={handleApplyAndHire}
              className="btn btn-primary btn-lg"
            >
              <UpworkIcon size={20} />
              <span>{copiedPrompt ? 'Scope Copied & Opening Upwork...' : 'Hire on Upwork'}</span>
              <ExternalLink size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
