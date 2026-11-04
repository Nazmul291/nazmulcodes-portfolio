import React from 'react';
import { Link } from '@remix-run/react';
import { Compass, Home, BookOpen, Layers, Mail, ArrowRight } from 'lucide-react';
import { Navbar } from '~/components/Navbar';
import { Footer } from '~/components/Footer';

interface ErrorPageProps {
  status: number;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const popularGuides = [
  {
    href: '/blog/how-i-achieve-95-mobile-lighthouse-scores-on-heavy-ecommerce-stores',
    title: 'How I Achieve 95+ Mobile Lighthouse Scores on Heavy E-Commerce Stores',
  },
  {
    href: '/blog/building-official-shopify-apps-with-remix-polaris-and-graphql',
    title: 'Building Official Shopify Apps with Remix, Polaris & GraphQL',
  },
  {
    href: '/blog/zero-page-builder-philosophy-high-speed-shopify-liquid',
    title: 'The Zero Page Builder Philosophy for High-Speed Shopify Liquid',
  },
];

export const ErrorPage: React.FC<ErrorPageProps> = ({ status, theme, toggleTheme }) => {
  const notFound = status === 404;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main style={{ flex: 1, paddingTop: '7rem', paddingBottom: '5rem' }}>
        <div className="site-container" style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '1.25rem' }}>
            <Compass size={14} />
            <span>Error {status}</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' }}>
            {notFound ? (
              <>This page <span className="text-gradient">doesn&apos;t exist</span></>
            ) : (
              <>Something <span className="text-gradient">went wrong</span></>
            )}
          </h1>

          <p style={{ fontSize: '1.08rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
            {notFound
              ? 'The link may be outdated or mistyped. Use one of the links below to find what you were looking for.'
              : 'An unexpected error occurred while loading this page. Please try again in a moment.'}
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <Link to="/" className="btn btn-primary">
              <Home size={16} />
              <span>Back to Home</span>
            </Link>
            <Link to="/blog" className="btn btn-secondary">
              <BookOpen size={16} />
              <span>Browse the Blog</span>
            </Link>
            <a href="/projects" className="btn btn-secondary">
              <Layers size={16} />
              <span>View Projects</span>
            </a>
            <Link to="/contact" className="btn btn-secondary">
              <Mail size={16} />
              <span>Contact</span>
            </Link>
          </div>

          <section className="glass-card" style={{ textAlign: 'left' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Popular technical guides
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {popularGuides.map((guide) => (
                <li key={guide.href}>
                  <Link
                    to={guide.href}
                    className="text-emerald"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontWeight: 600, lineHeight: 1.5 }}
                  >
                    <ArrowRight size={14} style={{ flexShrink: 0 }} />
                    <span>{guide.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
