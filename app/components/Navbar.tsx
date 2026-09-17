import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, ArrowUpRight, Code, Sparkles } from 'lucide-react';
import { siteConfig } from '~/data/siteConfig';
import { UpworkIcon } from '~/components/UpworkIcon';
import { GithubIcon } from '~/components/BrandIcons';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="navbar">
      <div className="site-container navbar-inner">
        {/* Brand Logo */}
        <a href="/#hero" className="brand-logo">
          <div className="brand-icon">
            <Code size={20} />
          </div>
          <span>
            Nazmul<span className="text-emerald">Codes</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          <li>
            <a href="/#showcase" className="nav-link">Projects</a>
          </li>
          <li>
            <a href="/#services" className="nav-link">Services</a>
          </li>
          <li>
            <a href="/blog" className="nav-link">Blog</a>
          </li>
          <li>
            <a href="/about" className="nav-link">My Story</a>
          </li>
          <li>
            <a href="/#estimator" className="nav-link">Cost Estimator</a>
          </li>
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          {/* Live Availability Status (Desktop Only) */}
          <div className="status-pill desktop-only" title="Currently open for high-impact contracts & custom development">
            <span className="pulse-dot"></span>
            <span>Open for Q1/Q2 Projects</span>
          </div>

          {/* GitHub Profile Link (Desktop Only in Top Bar, Available in Mobile Menu Drawer) */}
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="theme-toggle-btn desktop-only"
            aria-label="GitHub Profile (@Nazmul291)"
            title="View GitHub Profile (@Nazmul291)"
          >
            <GithubIcon size={18} />
          </a>

          {/* Theme Toggle Button (Visible on both Desktop & Mobile) */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle light/dark theme"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Hire / Contact CTA on Upwork (Desktop Only) */}
          <a
            href={siteConfig.upworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm desktop-only"
          >
            <UpworkIcon size={15} />
            <span>Hire on Upwork</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-open">
          <a
            href="/blog"
            className="nav-link"
            style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Engineering Blog (35+ Guides)
          </a>
          <a
            href="/about"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            About & My Story
          </a>
          <a
            href="/#apps"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Shopify App Store Apps
          </a>
          <a
            href="/#showcase"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            All 33+ Client Projects
          </a>
          <a
            href="/#services"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Specialized Services
          </a>
          <a
            href="/#estimator"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Project Cost Estimator
          </a>
          <a
            href="/#stack"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Tech Stack & Experience
          </a>
          <a
            href="/#reviews"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Client Reviews
          </a>
          <a
            href="/privacy"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Privacy Policy
          </a>
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <GithubIcon size={16} />
            <span>GitHub Profile (@Nazmul291)</span>
          </a>

          {/* Mobile Drawer Bottom Section: Status Pill & Upwork Button */}
          <div style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '1.25rem',
            marginTop: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}>
            <div className="status-pill" style={{ width: '100%', justifyContent: 'center' }}>
              <span className="pulse-dot"></span>
              <span>Open for Q1/Q2 Projects</span>
            </div>

            <a
              href={siteConfig.upworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <UpworkIcon size={18} />
              <span>Hire on Upwork</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
