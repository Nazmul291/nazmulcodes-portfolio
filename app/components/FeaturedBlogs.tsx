import React from 'react';
import { Link } from '@remix-run/react';
import { BookOpen, Sparkles, Clock, Calendar, ArrowRight, ExternalLink } from 'lucide-react';

// আপনার ব্লগের পোস্ট টাইপ
export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  tags: string[];
  createdAt: string | Date;
}

interface FeaturedBlogsProps {
  posts: BlogPostItem[];
}

export const FeaturedBlogs: React.FC<FeaturedBlogsProps> = ({ posts }) => {
  // হোমপেজে দেখানোর জন্য সাম্প্রতিক ৬টি পোস্ট ফিল্টার
  const featuredPosts = posts.slice(0, 6);

  return (
    <section id="articles" className="section-padding" style={{ position: 'relative', background: 'var(--bg-secondary)' }}>
      <div className="site-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <BookOpen size={14} />
            <span>Engineering Publications & Knowledge</span>
          </div>
          <h2 className="section-title">
            Featured <span className="text-gradient">Articles & Technical Guides</span>
          </h2>
          <p className="section-subtitle">
            Deep dives into Shopify architecture, custom embedded apps, sub-second performance, and real-world system design.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem',
        }}>
          {featuredPosts.map((post) => (
            <div key={post.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              
              {/* Card Header: Category & Read Time */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="tag-badge app-badge" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                  <Sparkles size={12} />
                  <span>{post.category}</span>
                </span>

                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={12} />
                  <span>{post.readTime}</span>
                </span>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.4, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                <Link to={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {post.title}
                </Link>
              </h3>

              {/* Summary / Excerpt */}
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>
                {post.excerpt}
              </p>

              {/* Tech Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                {post.tags.slice(0, 3).map((tag, tIdx) => (
                  <span key={tIdx} className="tag-badge" style={{ fontSize: '0.72rem' }}>
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Card Footer Actions */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-subtle)',
                marginTop: 'auto'
              }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Calendar size={13} />
                  {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>

                <Link
                  to={`/blog/${post.slug}`}
                  className="btn btn-primary btn-sm"
                  style={{ gap: '0.4rem' }}
                  aria-label={`Read full guide: ${post.title}`}
                >
                  <span>Read Guide</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* View All Articles Footer CTA */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <Link to="/blog" className="btn btn-secondary" style={{ gap: '0.65rem' }}>
            <BookOpen size={16} />
            <span>Explore All Technical Guides</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};