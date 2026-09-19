import { Link } from '@remix-run/react';
import { Code, ArrowUp, Layers, Globe, Shield } from 'lucide-react';
import { siteConfig } from '~/data/siteConfig';
import {
  GithubIcon,
  LinkedinIcon,
  StackOverflowIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  UpworkIcon,
  FreelancerIcon,
  GuruIcon,
  ArcDevIcon,
} from '~/components/BrandIcons';

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
            <Link to="/" className="brand-logo" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
              <div className="brand-icon">
                <Code size={20} />
              </div>
              <span>
                Nazmul<span className="text-emerald">Codes</span>
              </span>
            </Link>
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
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Core Navigation
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <li><a href="/" className="nav-link">Home</a></li>
              <li>
                <Link to="/contact" className="nav-link" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
                  Contact Us / Start Project
                </Link>
              </li>
              <li>
                <Link to="/about" className="nav-link">About Me</Link>
              </li>
              <li>
                <Link to="/blog" className="nav-link" style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>
                  Engineering Blog (35+ Guides)
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Shield size={13} className="text-emerald" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Shield size={13} className="text-emerald" />
                  <span>Terms & Conditions</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Highlights */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Featured Case Studies
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <li>
                <a href="https://kilo.nazmulcodes.org/" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Layers size={14} className="text-emerald" />
                  <span>Kilo — Fast Media Compressor</span>
                </a>
              </li>
              <li>
                <a href="https://apps.shopify.com/stock-alert-4" target="_blank" rel="noopener noreferrer nofollow" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Layers size={14} className="text-cyan" />
                  <span>Stockly Real-Time Inventory App</span>
                </a>
              </li>
              <li>
                <a href="https://apps.shopify.com/demandmind-forecasting" target="_blank" rel="noopener noreferrer nofollow" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Layers size={14} className="text-indigo" />
                  <span>DemandMind (Client Project Frontend)</span>
                </a>
              </li>
              <li>
                <a href="https://apps.shopify.com/shoppable-posts" target="_blank" rel="noopener noreferrer nofollow" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Layers size={14} className="text-indigo" />
                  <span>Shoppable Posts Blog App</span>
                </a>
              </li>
              <li>
                <a href="https://clinique-dentaire-aurea-2.myshopify.com" target="_blank" rel="noopener noreferrer nofollow" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Globe size={14} className="text-emerald" />
                  <span>Clinique Dentaire Aurea</span>
                </a>
              </li>
              <li>
                <Link to="/blog/my-story-from-zero-to-shopify-app-founder" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="text-emerald">★</span>
                  <span>My Story: From Zero to Founder</span>
                </Link>
              </li>
              <li>
                <Link to="/blog/how-i-achieve-95-mobile-lighthouse-scores-on-heavy-ecommerce-stores" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="text-cyan">★</span>
                  <span>95+ Mobile Lighthouse Guide</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch & Social Profiles */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.85rem', color: 'var(--text-primary)' }}>
              Let’s Connect
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Direct email: <a href={`mailto:${siteConfig.email}`} className="text-emerald">{siteConfig.email}</a>
            </p>
            <a
              href={siteConfig.upworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ width: '100%', marginBottom: '1.25rem', gap: '0.5rem' }}
            >
              <UpworkIcon size={16} />
              <span>Hire on Upwork</span>
            </a>

            {/* Social & Technical Profiles */}
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, marginBottom: '0.55rem' }}>
                Technical & Social Profiles
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon size={17} />
                </a>
                <a
                  href={siteConfig.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon size={16} />
                </a>
                <a
                  href={siteConfig.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="X (Twitter) Profile"
                  aria-label="X (Twitter) Profile"
                >
                  <TwitterIcon size={15} />
                </a>
                <a
                  href={siteConfig.stackoverflowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="Stack Overflow Profile"
                  aria-label="Stack Overflow Profile"
                >
                  <StackOverflowIcon size={16} />
                </a>
                <a
                  href={siteConfig.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="Facebook Profile"
                  aria-label="Facebook Profile"
                >
                  <FacebookIcon size={16} />
                </a>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="Instagram Profile"
                  aria-label="Instagram Profile"
                >
                  <InstagramIcon size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Freelance & Engineering Marketplaces Strip */}
        <div style={{
          padding: '1.5rem 0',
          borderTop: '1px solid var(--border-subtle)',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
              Verified Freelance & Engineering Marketplaces
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Hire with full escrow & milestone guarantee across trusted platforms:
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href={siteConfig.upworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="platform-pill"
              title="Hire Nazmul on Upwork"
            >
              <UpworkIcon size={15} color="#14a800" />
              <span>Upwork</span>
            </a>
            <a
              href={siteConfig.freelancerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="platform-pill"
              title="Hire Nazmul on Freelancer.com"
            >
              <FreelancerIcon size={15} color="#29b2fe" />
              <span>Freelancer.com</span>
            </a>
            <a
              href={siteConfig.guruUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="platform-pill"
              title="Hire Nazmul on Guru"
            >
              <GuruIcon size={16} color="#57bb63" />
              <span>Guru</span>
            </a>
            <a
              href={siteConfig.arcDevUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="platform-pill"
              title="Hire Nazmul on Arc.dev"
            >
              <ArcDevIcon size={14} color="#06b6d4" />
              <span>Arc.dev</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-subtle)',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} NazmulCodes (Nazmul Hawlader). All rights reserved. Built with Remix & Vanilla CSS.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="nav-link" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Contact Us
            </Link>
            <Link to="/privacy" className="nav-link" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Privacy Policy
            </Link>
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
      </div>
    </footer>
  );
};
