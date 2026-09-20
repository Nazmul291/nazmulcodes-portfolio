import React, { useState, useMemo, useEffect } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Link, useOutletContext, useLoaderData, useSearchParams } from '@remix-run/react';
import { BookOpen, Search, Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Navbar } from '~/components/Navbar';
import { Footer } from '~/components/Footer';
import { AdSlot } from '~/components/AdSlot';
import { getPublishedPosts } from '~/models/blog.server';
import { siteConfig } from '~/data/siteConfig';

const BLOG_CATEGORIES = [
  'Shopify & E-Commerce',
  'Performance & Web Vitals',
  'React & Frontend',
  'Full-Stack & APIs',
  'Freelancing & Career',
  'Founder Journey',
];

export const loader = async () => {
  const posts = await getPublishedPosts();
  return { posts };
};

export const meta: MetaFunction = ({ location }) => {
  // ১. URL Search Params থেকে category ফিল্টার চেক করা
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const hasCategoryFilter = Boolean(category && category !== 'all');

  // মূল ব্লগ পেজের ক্যানোনিকাল URL (সবসময় ক্লিন রুট থাকবে)
  const canonicalUrl = 'https://nazmulcodes.org/blog';

  // ২. যদি ফিল্টারিং পেজ হয় (যেমন ?category=Shopify & E-Commerce)
  if (hasCategoryFilter) {
    return [
      { charSet: 'utf-8' },
      { title: `${category} Articles | NazmulCodes Engineering Blog` },
      // সার্চ ইঞ্জিনকে এই ফিল্টার পেজটি ইন্ডেক্স না করতে বলা (ডুপ্লিকেশন বন্ধ হবে)
      { name: 'robots', content: 'noindex, follow' },
      // সেলফ-ক্যানোনিকাল বন্ধ করে মূল /blog পেজে নির্দেশ করা
      { tagName: 'link', rel: 'canonical', href: canonicalUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
    ];
  }

  // ৩. মূল /blog পেজের ডিফল্ট মেটা (যখন কোনো ফিল্টার নেই)
  return [
    { charSet: 'utf-8' },
    { title: 'Engineering & Shopify Development Blog | NazmulCodes' },
    {
      name: 'description',
      content:
        'Technical tutorials, architecture deep-dives, Shopify App development guides, Core Web Vitals optimization, and founder stories by Senior Engineer Nazmul Hawlader.',
    },
    { name: 'robots', content: 'index, follow' },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    { property: 'og:title', content: 'Engineering & Shopify Development Blog | NazmulCodes' },
    {
      property: 'og:description',
      content:
        '35+ in-depth guides on Shopify App Store apps, GraphQL APIs, high-performance Liquid themes, React/Remix architecture, and real-world freelance mastery.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: canonicalUrl },
  ];
};

// export const meta: MetaFunction = () => {
//   return [
//     { charSet: 'utf-8' },
//     { title: 'Engineering & Shopify Development Blog | NazmulCodes' },
//     {
//       name: 'description',
//       content:
//         'Technical tutorials, architecture deep-dives, Shopify App development guides, Core Web Vitals optimization, and founder stories by Senior Engineer Nazmul Hawlader.',
//     },
//     { name: 'robots', content: 'index, follow' },
//     { property: 'og:title', content: 'Engineering & Shopify Development Blog | NazmulCodes' },
//     {
//       property: 'og:description',
//       content:
//         '35+ in-depth guides on Shopify App Store apps, GraphQL APIs, high-performance Liquid themes, React/Remix architecture, and real-world freelance mastery.',
//     },
//     { property: 'og:type', content: 'website' },
//     { property: 'og:url', content: 'https://nazmulcodes.org/blog' },
//   ];
// };

export default function BlogIndex() {
  const { posts } = useLoaderData<typeof loader>();
  const { theme, toggleTheme } = useOutletContext<{ theme: 'dark' | 'light'; toggleTheme: () => void }>();
  
  // ১. ইউআরএল প্যারামিটার হ্যান্ডলিং
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);

  // ইউআরএল পরিবর্তন হলে (যেমন হোমপেজের লিঙ্ক থেকে এলে) স্টেট সিঙ্ক করা
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // ক্যাটাগরি ফিল্টার হ্যান্ডলার (URL প্যারামিটার আপডেট করবে)
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchParams(
      (prev) => {
        if (category === 'all') {
          prev.delete('category');
        } else {
          prev.set('category', category);
        }
        return prev;
      },
      { preventScrollReset: true } // পেজের স্ক্রল অবস্থান ধরে রাখবে
    );
  };

  const myStoryPost = useMemo(() => {
    return posts.find((p) => p.slug === 'my-story-from-zero-to-shopify-app-founder');
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main style={{ flex: 1, paddingTop: '6.5rem', paddingBottom: '5rem' }}>
        <div className="site-container">
          {/* Header & Value Proposition */}
          <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
            <div className="section-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '1rem' }}>
              <BookOpen size={14} />
              <span>Technical Knowledge Base & Insights</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.25rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' }}>
              Engineering, Shopify Apps & <span className="text-gradient">Developer Stories</span>
            </h1>
            <p style={{ fontSize: '1.12rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Explore 35+ battle-tested guides, production architecture breakdowns, Core Web Vitals playbooks, and transparent stories from building published SaaS products on the Shopify App Store.
            </p>
          </div>

          {/* Featured "My Story" Hero Banner */}
          {myStoryPost && (
            <div
              className="glass-card blog-card-featured"
              style={{
                padding: '2.25rem',
                marginBottom: '3rem',
                border: '1px solid var(--accent-emerald)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <span className="blog-pill">
                  <Sparkles size={12} />
                  Featured Founder Story
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{myStoryPost.readTime}</span>
              </div>

              <h2 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.85rem)', fontWeight: 800, marginBottom: '0.85rem' }}>
                <Link
                  to={`/blog/${myStoryPost.slug}`}
                  style={{ textDecoration: 'none', color: 'var(--text-primary)', transition: 'color var(--transition-fast)' }}
                >
                  {myStoryPost.title}
                </Link>
              </h2>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '900px' }}>
                {myStoryPost.excerpt}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={siteConfig.avatarUrl}
                    alt={siteConfig.name}
                    width={40}
                    height={40}
                    style={{ borderRadius: '50%', border: '2px solid var(--accent-emerald)' }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{siteConfig.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Founder & Senior Engineer</div>
                  </div>
                </div>

                <Link
                  to={`/blog/${myStoryPost.slug}`}
                  className="btn btn-primary btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <span>Read My Story</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          )}

          {/* Search Bar & Category Filter Tabs */}
          <div style={{ marginBottom: '2.5rem' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', maxWidth: '500px', marginBottom: '1.5rem' }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                type="text"
                placeholder="Search articles by topic, keyword, or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.75rem',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color var(--transition-fast)',
                }}
              />
            </div>

            {/* Category Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
              <button
                onClick={() => handleCategoryChange('all')}
                className={`category-tab-pill ${selectedCategory === 'all' ? 'active' : ''}`}
              >
                All Articles ({posts.length})
              </button>
              {BLOG_CATEGORIES.map((cat) => {
                const count = posts.filter((p) => p.category === cat).length;
                if (count === 0) return null;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`category-tab-pill ${selectedCategory === cat ? 'active' : ''}`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Top AdSense Container */}
          <AdSlot />

          {/* Blog Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1rem' }}>
                No articles found matching {selectedCategory !== 'all' ? `category "${selectedCategory}"` : ''} &quot;{searchQuery}&quot;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  handleCategoryChange('all');
                }}
                className="btn btn-secondary btn-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="blog-grid">
              {filteredPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card">
                  {/* Top Meta Info */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span className="blog-pill">{post.category}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.72rem',
                          background: 'var(--bg-tertiary)',
                          padding: '0.15rem 0.45rem',
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Card Footer */}
                  <div className="blog-card-footer">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={13} />
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span style={{ color: 'var(--accent-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      Read Guide <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Bottom In-Page AdSense Slot */}
          <AdSlot style={{ marginTop: '4rem' }} />
        </div>
      </main>

      <Footer />
    </div>
  );
}