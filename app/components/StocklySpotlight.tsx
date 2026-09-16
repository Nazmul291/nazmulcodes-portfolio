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
        <div className="glass-card" style={{
          padding: 'clamp(2rem, 5vw, 3.5rem)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          background: 'linear-gradient(135deg, rgba(15, 22, 38, 0.95) 0%, rgba(10, 16, 30, 0.98) 100%)',
          boxShadow: 'var(--shadow-lg), 0 0 50px rgba(16, 185, 129, 0.12)',
          borderRadius: 'var(--radius-2xl)'
        }}>
          {/* Top Header Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div className="status-pill" style={{
                background: 'rgba(16, 185, 129, 0.15)',
                borderColor: 'rgba(16, 185, 129, 0.4)',
                color: 'var(--accent-emerald)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.04em'
              }}>
                <Award size={15} className="text-emerald" />
                <span>FOUNDER &amp; LEAD ARCHITECT SPOTLIGHT</span>
              </div>
              <div className="tag-badge featured-badge" style={{ fontSize: '0.78rem' }}>
                <Sparkles size={13} />
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
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <span>Live on Shopify App Store</span>
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Hero App Overview */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '1.75rem',
            alignItems: 'center',
            marginBottom: '2.5rem'
          }}>
            <div style={{
              width: 'clamp(64px, 10vw, 92px)',
              height: 'clamp(64px, 10vw, 92px)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              background: 'var(--bg-tertiary)',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <img
                src="/assets/images/apps/stockly.webp"
                alt="Stockly App Icon"
                width={92}
                height={92}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Official Shopify App Store SaaS
                </span>
                <span style={{ color: 'var(--text-muted)' }}>&bull;</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Created by NazmulCodes</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.6rem' }}>
                Stockly: <span className="text-gradient">Inventory &amp; Reorder</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.6, maxWidth: '750px' }}>
                Conceived, architected, and bootstrapped by Nazmul Hawlader. Stockly empowers modern Shopify merchants with sales-velocity demand forecasting, automated supplier purchase orders, and real-time multi-channel staff notifications.
              </p>
            </div>
          </div>

          {/* Two Core Pillars Grid (Requested by User) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
            marginBottom: '2.5rem'
          }}>
            {/* Pillar 1: Inventory Optimization */}
            <div style={{
              background: 'rgba(18, 26, 43, 0.85)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.75rem',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(6, 182, 212, 0.15)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)'
                }}>
                  <TrendingUp size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                    Core Pillar 1
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Inventory Optimization
                  </h3>
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Automated demand intelligence and reordering workflows designed to eliminate stockouts and optimize working capital.
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} className="text-cyan" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Sales Velocity Demand Forecasting:</strong> Predicts exact stockout runways and safety stock buffers based on 7-day and 30-day velocity.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} className="text-cyan" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>1-Click Purchase Orders (PO):</strong> Generates automated supplier purchase orders factoring in vendor lead times and minimum order quantities.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} className="text-cyan" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Multi-Location Stock Transfers:</strong> Seamlessly balances inventory between regional warehouses and retail POS locations.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} className="text-cyan" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Dead Stock &amp; Stagnant Inventory Alerts:</strong> Identifies slow-moving capital to prevent warehouse overstock holding costs.</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2: Stock & Staff Notifications */}
            <div style={{
              background: 'rgba(18, 26, 43, 0.85)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.75rem',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-emerald)'
                }}>
                  <BellRing size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                    Core Pillar 2
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Stock &amp; Staff Notifications
                  </h3>
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Real-time operational alerts for store managers, warehouse teams, and automated back-in-stock recovery for shoppers.
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} className="text-emerald" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Real-Time Slack &amp; Email Alerts:</strong> Instant notifications to staff channels the exact millisecond inventory breaches safe thresholds.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} className="text-emerald" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Automated Back-in-Stock Customer Alerts:</strong> Captures high-intent customer emails on sold-out products and sends restock notifications.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} className="text-emerald" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Auto-Hide Sold-Out Products:</strong> Automatically hides out-of-stock items to prevent overselling, and automatically republishes on restock.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} className="text-emerald" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Shopify Flow &amp; Webhook Triggers:</strong> Deep integration with Shopify Flow, Klaviyo, and external ERPs for seamless operations.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Action Strip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                <strong>Works with:</strong> Shopify Flow &bull; Shopify Admin &bull; Slack &bull; Klaviyo &bull; Webhooks
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
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
