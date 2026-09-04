import React, { useState } from 'react';
import { Moon, Sun, Menu, X, ArrowUpRight, Code, Sparkles } from 'lucide-react';
import { siteConfig } from '~/data/siteConfig';
import { UpworkIcon } from '~/components/UpworkIcon';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="site-container navbar-inner">
        {/* Brand Logo */}
        <a href="#hero" className="brand-logo">
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
            <a href="#showcase" className="nav-link">Projects</a>
          </li>
          <li>
            <a href="#services" className="nav-link">Services</a>
          </li>
          <li>
            <a href="#estimator" className="nav-link">Cost Estimator</a>
          </li>
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          {/* Live Availability Status (Desktop Only) */}
          <div className="status-pill desktop-only" title="Currently open for high-impact contracts & custom development">
            <span className="pulse-dot"></span>
            <span>Open for Q1/Q2 Projects</span>
          </div>

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
            href="#apps"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Shopify App Store Apps
          </a>
          <a
            href="#showcase"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            All 33+ Client Projects
          </a>
          <a
            href="#services"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Specialized Services
          </a>
          <a
            href="#estimator"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Project Cost Estimator
          </a>
          <a
            href="#stack"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Tech Stack & Experience
          </a>
          <a
            href="#reviews"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Client Reviews
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
