import React, { useState } from 'react';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData, Link, useOutletContext } from '@remix-run/react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Check,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Navbar } from '~/components/Navbar';
import { Footer } from '~/components/Footer';
import { AdSlot } from '~/components/AdSlot';
import { BlockRenderer } from '~/components/BlockRenderer';
import {
  getPublishedPostBySlug,
  getAdjacentPublishedPosts,
  getRelatedPublishedPosts,
} from '~/models/blog.server';
import { findRedirect } from '~/models/redirect.server';
import { siteConfig } from '~/data/siteConfig';
import { UpworkIcon } from '~/components/UpworkIcon';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;
  if (!slug) {
    throw new Response('Article not found', { status: 404 });
  }

  const post = await getPublishedPostBySlug(slug);
  if (!post) {
    // Check if an SEO 301/302 redirect rule exists for this deleted or renamed slug
    const redirectRule = await findRedirect(slug);
    if (redirectRule) {
      throw redirect(redirectRule.targetUrl, {
        status: redirectRule.statusCode || 301,
      });
    }

    throw new Response('Article not found', { status: 404 });
  }

  const relatedPosts = await getRelatedPublishedPosts(slug, post.category, 3);
  const adjacentPosts = await getAdjacentPublishedPosts(slug);

  return json({ post, relatedPosts, adjacentPosts });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.post) {
    return [
      { title: 'Article Not Found — NazmulCodes' },
      { name: 'robots', content: 'noindex, nofollow' },
    ];
  }

  const { post } = data;
  const canonicalUrl = `https://nazmulcodes.org/blog/${post.slug}`;
  const keywords = Array.from(new Set(post.tags)).join(', ');

  return [
    { charSet: 'utf-8' },
    { title: `${post.title} | NazmulCodes` },
    { name: 'description', content: post.excerpt },
    { name: 'keywords', content: keywords },
    { name: 'author', content: siteConfig.name },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: `${post.title} | NazmulCodes` },
    { property: 'og:description', content: post.excerpt },
    { property: 'og:type', content: 'article' },
    {
      tagName: 'link',
      rel: 'canonical',
      href: canonicalUrl,
    },
    { property: 'article:published_time', content: post.createdAt },
    { property: 'article:section', content: post.category },
    { property: 'article:tag', content: post.tags.join(',') },
  ];
};

export default function BlogPostDetail() {
  const { post, relatedPosts, adjacentPosts } = useLoaderData<typeof loader>();
  const { theme, toggleTheme } = useOutletContext<{ theme: 'dark' | 'light'; toggleTheme: () => void }>();
  const [copiedLink, setCopiedLink] = useState(false);

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.brandName,
      url: siteConfig.siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://nazmulcodes.org/blog/${post.slug}`,
    },
  };

  const handleCopyShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main style={{ flex: 1, paddingTop: '6rem', paddingBottom: '5rem' }}>
        <article className="site-container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          {/* JSON-LD Article Structured Data for SEO / Crawler */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            suppressHydrationWarning
          />

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <Link to="/blog" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <ArrowLeft size={14} />
                <span>All Articles</span>
              </Link>
              <span>/</span>
              <span className="text-emerald" style={{ fontWeight: 500 }}>{post.category}</span>
            </div>
          </nav>

          {/* Article Header */}
          <header style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span className="blog-pill">{post.category}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={13} />
                {post.readTime}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={13} />
                {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.85rem)', fontWeight: 800, lineHeight: 1.25, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              {post.title}
            </h1>

            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
              {post.excerpt}
            </p>

            {/* Author bar & Share button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                padding: '1rem 1.25rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img
                  src={siteConfig.avatarUrl}
                  alt={siteConfig.name}
                  width={44}
                  height={44}
                  style={{ borderRadius: '50%', border: '2px solid var(--accent-emerald)' }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{siteConfig.name}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Senior Shopify & Full-Stack Engineer</div>
                </div>
              </div>

              <button
                onClick={handleCopyShareLink}
                className="btn btn-secondary btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
                title="Copy article link"
              >
                {copiedLink ? <Check size={14} className="text-emerald" /> : <Share2 size={14} />}
                <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
              </button>
            </div>
          </header>

          {/* Top In-Article AdSense Slot */}
          <AdSlot />

          {/* Article Body - Rendered via BlockRenderer */}
          <BlockRenderer blocks={post.contentBlocks} />

          {/* Bottom In-Article AdSense Slot */}
          <AdSlot />

          {/* Author Bio Footer Card */}
          <div
            className="glass-card"
            style={{
              padding: '2rem',
              marginTop: '3.5rem',
              marginBottom: '3.5rem',
              border: '1px solid var(--border-medium)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', flexWrap: 'wrap' }}>
              <img
                src={siteConfig.avatarUrl}
                alt={siteConfig.name}
                width={64}
                height={64}
                style={{ borderRadius: '50%', border: '2px solid var(--accent-emerald)', flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: '260px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                    Written by {siteConfig.name}
                  </h3>
                  <span className="tag-badge" style={{ fontSize: '0.72rem' }}>Top Rated</span>
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: '0 0 1rem 0', lineHeight: 1.6 }}>
                  Senior Full-Stack Engineer & Official Shopify App Store developer. Founder of Stockly and Kilo (kilo.nazmulcodes.org), specializing in high-performance Shopify apps, client-side media compression, and sub-second web performance.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Link to="/about" className="btn btn-secondary btn-sm">
                    <Sparkles size={14} className="text-emerald" />
                    <span>Read My Full Story</span>
                  </Link>
                  <a
                    href={siteConfig.upworkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <UpworkIcon size={14} />
                    <span>Consult on Upwork</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Previous / Next Article Navigation */}
          {(adjacentPosts.prev || adjacentPosts.next) && (
            <nav
              aria-label="Previous and next articles"
              style={{
                display: 'grid',
                gridTemplateColumns: adjacentPosts.prev && adjacentPosts.next ? '1fr 1fr' : '1fr',
                gap: '1rem',
                marginTop: '2.5rem',
                marginBottom: '3rem',
              }}
            >
              {adjacentPosts.prev && (
                <Link
                  to={`/blog/${adjacentPosts.prev.slug}`}
                  className="glass-card"
                  style={{
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    textDecoration: 'none',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    transition: 'border-color 0.2s ease, transform 0.2s ease',
                  }}
                >
                  <ArrowLeft size={20} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'block' }}>
                      Previous Article
                    </span>
                    <span
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {adjacentPosts.prev.title}
                    </span>
                  </div>
                </Link>
              )}

              {adjacentPosts.next && (
                <Link
                  to={`/blog/${adjacentPosts.next.slug}`}
                  className="glass-card"
                  style={{
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    textDecoration: 'none',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    transition: 'border-color 0.2s ease, transform 0.2s ease',
                    textAlign: 'right',
                    justifyContent: 'flex-end',
                    gridColumn: !adjacentPosts.prev ? '1 / -1' : undefined,
                    marginLeft: !adjacentPosts.prev ? 'auto' : undefined,
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'block' }}>
                      Next Article
                    </span>
                    <span
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {adjacentPosts.next.title}
                    </span>
                  </div>
                  <ArrowRight size={20} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                </Link>
              )}
            </nav>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <BookOpen size={18} className="text-emerald" />
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>Recommended Related Articles</h3>
              </div>
              <div className="blog-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
                {relatedPosts.map((rel) => (
                  <Link key={rel.id} to={`/blog/${rel.slug}`} className="blog-card" style={{ padding: '1.25rem' }}>
                    <span className="blog-pill" style={{ width: 'fit-content', marginBottom: '0.5rem' }}>{rel.category}</span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0.4rem 0', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                      {rel.title}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineClamp: 2, WebkitLineClamp: 2, overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                      {rel.excerpt}
                    </p>
                    <div style={{ marginTop: 'auto', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <span>{rel.readTime}</span>
                      <span className="text-emerald" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
