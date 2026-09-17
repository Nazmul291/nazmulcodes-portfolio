import React, { useState } from 'react';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, Link, useOutletContext } from '@remix-run/react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  Share2,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Lightbulb,
} from 'lucide-react';
import { Navbar } from '~/components/Navbar';
import { Footer } from '~/components/Footer';
import { AdSlot } from '~/components/AdSlot';
import { getBlogPostBySlug, getRelatedBlogPosts } from '~/data/blogPosts';
import { siteConfig } from '~/data/siteConfig';
import { UpworkIcon } from '~/components/UpworkIcon';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;
  if (!slug) {
    throw new Response('Article not found', { status: 404 });
  }

  const post = getBlogPostBySlug(slug);
  if (!post) {
    throw new Response('Article not found', { status: 404 });
  }

  const relatedPosts = getRelatedBlogPosts(slug, post.category, 3);

  return json({ post, relatedPosts });
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

  const keywords = Array.from(
    new Set([
      ...(post.primaryKeyword ? [post.primaryKeyword] : []),
      ...(post.secondaryKeywords || []),
      ...post.tags,
    ])
  ).join(', ');

  return [
    { charSet: 'utf-8' },
    { title: `${post.title} | NazmulCodes` },
    { name: 'description', content: post.excerpt },
    { name: 'keywords', content: keywords },
    { name: 'author', content: post.author.name },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: `${post.title} | NazmulCodes` },
    { property: 'og:description', content: post.excerpt },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', canonicalUrl },
    { property: 'article:published_time', content: post.publishedAt },
    { property: 'article:section', content: post.category },
    { property: 'article:tag', content: post.tags.join(',') },
  ];
};

export default function BlogPostDetail() {
  const { post, relatedPosts } = useLoaderData<typeof loader>();
  const { theme, toggleTheme } = useOutletContext<{ theme: 'dark' | 'light'; toggleTheme: () => void }>();
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: 'https://nazmulcodes.org',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NazmulCodes',
      url: 'https://nazmulcodes.org',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://nazmulcodes.org/blog/${post.slug}`,
    },
  };

  const faqSchemaData =
    post.faqs && post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
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
          {/* JSON-LD Article Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            suppressHydrationWarning
          />

          {/* JSON-LD FAQ Structured Data (Rich Snippets) */}
          {faqSchemaData && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
              suppressHydrationWarning
            />
          )}

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
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
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
                  src={post.author.avatarUrl}
                  alt={post.author.name}
                  width={44}
                  height={44}
                  style={{ borderRadius: '50%', border: '2px solid var(--accent-emerald)' }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{post.author.name}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{post.author.role}</div>
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

          {/* Key Learning Takeaways Box */}
          {post.learningOutcomes && post.learningOutcomes.length > 0 && (
            <div className="learning-box">
              <div className="learning-box-title">
                <CheckCircle2 size={18} />
                <span>What You Will Learn in This Guide</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {post.learningOutcomes.map((outcome, idx) => (
                  <li key={idx} style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.5 }}>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Top In-Article AdSense Slot */}
          <AdSlot />

          {/* Article Body */}
          <div className="article-prose">
            {/* Introduction */}
            {post.introduction.split('\n\n').map((para, pIdx) => (
              <p key={pIdx} style={{ fontSize: '1.12rem', color: 'var(--text-primary)', fontWeight: 400, lineHeight: 1.85, marginBottom: '1.5rem' }}>
                {para}
              </p>
            ))}

            {/* Sections */}
            {post.sections.map((section, idx) => (
              <section key={idx} style={{ marginBottom: '2.75rem' }}>
                <h2>{section.heading}</h2>

                {section.content.split('\n\n').map((block, bIdx) => {
                  const trimmed = block.trim();
                  if (trimmed.startsWith('### ')) {
                    return (
                      <h3 key={bIdx} style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-primary)', margin: '1.75rem 0 0.75rem 0' }}>
                        {trimmed.replace(/^###\s+/, '')}
                      </h3>
                    );
                  }
                  if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                    const items = trimmed.split('\n').filter(Boolean);
                    return (
                      <ul key={bIdx} style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {items.map((item, iIdx) => (
                          <li key={iIdx} style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                            {item.replace(/^[-*]\s+/, '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={bIdx} style={{ marginBottom: '1.4rem', lineHeight: 1.8 }}>
                      {trimmed}
                    </p>
                  );
                })}

                {/* Optional Code Snippet */}
                {section.codeSnippet && (
                  <div className="code-container" style={{ margin: '1.75rem 0' }}>
                    <div className="code-header">
                      <span>{section.codeSnippet.filename || `${section.codeSnippet.language.toUpperCase()} SNIPPET`}</span>
                      <button
                        onClick={() => handleCopyCode(section.codeSnippet!.code, idx)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          fontSize: '0.78rem',
                        }}
                      >
                        {copiedCodeIndex === idx ? (
                          <>
                            <Check size={13} className="text-emerald" />
                            <span className="text-emerald">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="code-content">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                    {section.codeSnippet.explanation && (
                      <div style={{ padding: '0.75rem 1rem', background: 'rgba(255, 255, 255, 0.02)', fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)' }}>
                        <strong>Explanation:</strong> {section.codeSnippet.explanation}
                      </div>
                    )}
                  </div>
                )}

                {/* Optional Pro Tip */}
                {section.tip && (
                  <div className="pro-tip-box" style={{ margin: '1.5rem 0' }}>
                    <Lightbulb size={20} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>Pro Tip:</strong> {section.tip}
                    </div>
                  </div>
                )}
              </section>
            ))}

            {/* Conclusion */}
            <section style={{ marginTop: '3rem', marginBottom: '2.5rem' }}>
              <h2>Summary & Key Conclusion</h2>
              {post.conclusion.split('\n\n').map((cPara, cIdx) => (
                <p key={cIdx} style={{ marginBottom: '1.35rem', lineHeight: 1.8 }}>
                  {cPara}
                </p>
              ))}
            </section>

            {/* FAQs Section */}
            {post.faqs && post.faqs.length > 0 && (
              <section style={{ marginTop: '3.5rem', marginBottom: '3rem' }}>
                <h2>Frequently Asked Questions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
                  {post.faqs.map((faq, fIdx) => (
                    <div
                      key={fIdx}
                      className="glass-card"
                      style={{
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: 0, marginBottom: '0.6rem' }}>
                        {faq.question}
                      </h3>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.98rem' }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

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
