import { Code, ArrowUp, Layers, Globe } from 'lucide-react';
import { siteConfig } from '~/data/siteConfig';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="site-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Brand Info */}
          <div>
            <div className="brand-logo" style={{ marginBottom: '1rem' }}>
              <div className="brand-icon">
                <Code size={20} />
              </div>
              <span>
                Nazmul<span className="text-emerald">Codes</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Bespoke Shopify App & Theme Engineering. Crafting lightning-fast Online Store 2.0 storefronts and scalable Shopify App Store applications for modern brands.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div className="status-pill" style={{ fontSize: '0.78rem', padding: '0.25rem 0.65rem' }}>
                <span className="pulse-dot"></span>
                <span>Available for New Projects</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Core Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <li><a href="#hero" className="nav-link">Home</a></li>
              <li><a href="#apps" className="nav-link">Shopify App Store Apps</a></li>
              <li><a href="#showcase" className="nav-link">Project Portfolio (33+)</a></li>
              <li><a href="#services" className="nav-link">Engineering Services</a></li>
              <li><a href="#estimator" className="nav-link">Project Cost Estimator</a></li>
              <li><a href="#reviews" className="nav-link">Client Testimonials</a></li>
            </ul>
          </div>

          {/* Featured Highlights */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Featured Case Studies
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <li>
                <a href="https://apps.shopify.com/demandmind-forecasting" target="_blank" rel="noreferrer" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Layers size={14} className="text-emerald" />
                  <span>DemandMind AI Forecasting</span>
                </a>
              </li>
              <li>
                <a href="https://apps.shopify.com/stock-alert-4" target="_blank" rel="noreferrer" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Layers size={14} className="text-cyan" />
                  <span>Stockly Real-Time Inventory App</span>
                </a>
              </li>
              <li>
                <a href="https://apps.shopify.com/shoppable-posts" target="_blank" rel="noreferrer" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Layers size={14} className="text-indigo" />
                  <span>Shoppable Posts Blog App</span>
                </a>
              </li>
              <li>
                <a href="https://clinique-dentaire-aurea-2.myshopify.com" target="_blank" rel="noreferrer" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Globe size={14} className="text-emerald" />
                  <span>Clinique Dentaire Aurea</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Let’s Connect
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Direct email: <a href={`mailto:${siteConfig.email}`} className="text-emerald">{siteConfig.email}</a>
            </p>
            <a
              href={siteConfig.upworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ width: '100%' }}
            >
              <span>Hire on Upwork</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-subtle)',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} NazmulCodes (Nazmul Hawlader). All rights reserved. Built with Remix & Vanilla CSS.
          </div>

          <button
            onClick={scrollToTop}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
