import React from 'react';
import {
  Sparkles,
  ExternalLink,
  Layers,
  ArrowRight,
  TrendingUp,
  BellRing,
  PackageCheck,
  CheckCircle2,
  Boxes,
  Zap,
  ShieldCheck,
  Cpu,
  RefreshCw,
  Send,
  EyeOff,
  Clock,
  Award
} from 'lucide-react';
import { ProjectItem } from '~/types/project';

interface StocklySpotlightProps {
  project?: ProjectItem;
  onSelectProject: (project: ProjectItem) => void;
}

export const StocklySpotlight: React.FC<StocklySpotlightProps> = ({ project, onSelectProject }) => {
  return (
    <section id="stockly-spotlight" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background glow effects */}
      <div className="ambient-orb orb-emerald" style={{ top: '10%', left: '5%', opacity: 0.15 }} />
      <div className="ambient-orb orb-cyan" style={{ bottom: '10%', right: '5%', opacity: 0.15 }} />

      <div className="site-container">
        {/* Main Founder Spotlight Card */}
        <div className="spotlight-card">
          {/* Top Header Badge */}
          <div className="spotlight-header">
            <div className="spotlight-badges">
              <div className="spotlight-badge-primary">
                <Award size={14} className="text-emerald" />
                <span>FOUNDER &amp; LEAD ARCHITECT SPOTLIGHT</span>
              </div>
              <div className="tag-badge featured-badge" style={{ fontSize: '0.76rem' }}>
                <Sparkles size={12} />
                <span>Proprietary SaaS Product</span>
              </div>
            </div>

            <a
              href="https://apps.shopify.com/stock-alert-4"
              target="_blank"
              rel="noopener noreferrer"
              className="tag-badge"
              style={{
                textDecoration: 'none',
                background: 'rgba(6, 182, 212, 0.1)',
                color: 'var(--accent-cyan)',
                borderColor: 'rgba(6, 182, 212, 0.3)',
                fontSize: '0.78rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                alignSelf: 'flex-start'
              }}
            >
              <span>Live on Shopify App Store</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Hero App Overview */}
          <div className="spotlight-hero">
            <div className="spotlight-icon-wrapper">
              <img
                src="/assets/images/apps/stockly.webp"
                alt="Stockly App Icon"
                width={88}
                height={88}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Official Shopify App Store SaaS
                </span>
                <span style={{ color: 'var(--text-muted)' }}>&bull;</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Created by NazmulCodes</span>
              </div>
              <h2 className="spotlight-title">
                Stockly: <span className="text-gradient">Inventory &amp; Reorder</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.6, maxWidth: '750px' }}>
                Conceived, architected, and bootstrapped by Nazmul Hawlader. Stockly empowers modern Shopify merchants with sales-velocity demand forecasting, automated supplier purchase orders, and real-time multi-channel staff notifications.
              </p>
            </div>
          </div>

          {/* Two Core Pillars Grid */}
          <div className="spotlight-pillars-grid">
            {/* Pillar 1: Inventory Optimization */}
            <div className="spotlight-pillar-card pillar-cyan">
              <div className="spotlight-pillar-header">
                <div className="spotlight-pillar-icon" style={{
                  background: 'rgba(6, 182, 212, 0.15)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  color: 'var(--accent-cyan)'
                }}>
                  <TrendingUp size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                    Core Pillar 1
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Inventory Optimization
                  </h3>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                Automated demand intelligence and reordering workflows designed to eliminate stockouts and optimize working capital.
              </p>

              <ul className="spotlight-pillar-list">
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} className="text-cyan" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Sales Velocity Forecasting:</strong> Predicts exact stockout runways and safety stock buffers based on 7-day and 30-day velocity.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} className="text-cyan" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>1-Click Purchase Orders (PO):</strong> Generates automated supplier purchase orders factoring in lead times and minimum quantities.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} className="text-cyan" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Multi-Location Transfers:</strong> Seamlessly balances inventory between regional warehouses and retail POS locations.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} className="text-cyan" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Dead Stock Alerts:</strong> Identifies slow-moving capital to prevent warehouse overstock holding costs.</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2: Stock & Staff Notifications */}
            <div className="spotlight-pillar-card pillar-emerald">
              <div className="spotlight-pillar-header">
                <div className="spotlight-pillar-icon" style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: 'var(--accent-emerald)'
                }}>
                  <BellRing size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                    Core Pillar 2
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Stock &amp; Staff Notifications
                  </h3>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                Real-time operational alerts for store managers, warehouse teams, and automated back-in-stock recovery for shoppers.
              </p>

              <ul className="spotlight-pillar-list">
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} className="text-emerald" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Real-Time Slack &amp; Email:</strong> Instant notifications to staff channels the exact millisecond inventory breaches safe thresholds.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} className="text-emerald" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Customer Back-in-Stock Alerts:</strong> Captures high-intent customer emails on sold-out products and sends automated restock alerts.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} className="text-emerald" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Auto-Hide Sold-Out Products:</strong> Automatically hides out-of-stock items to prevent overselling, republishes on restock.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} className="text-emerald" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Shopify Flow &amp; Webhooks:</strong> Deep integration with Shopify Flow, Klaviyo, and ERPs for automated operations.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Action Strip */}
          <div className="spotlight-actions-strip">
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              <strong>Works with:</strong> Shopify Flow &bull; Shopify Admin &bull; Slack &bull; Klaviyo &bull; Webhooks
            </div>

            <div className="spotlight-actions-buttons">
              {project && (
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '0.5rem' }}
                >
                  <Layers size={15} />
                  <span>Technical Case Study</span>
                </button>
              )}

              <a
                href="https://apps.shopify.com/stock-alert-4"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
                style={{ gap: '0.5rem' }}
              >
                <span>Install on Shopify App Store</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
