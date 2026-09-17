import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Link, useOutletContext } from '@remix-run/react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  BookOpen,
  Code2,
  ExternalLink,
  Laptop,
  Terminal,
  Heart,
  Lightbulb,
} from 'lucide-react';
import { Navbar } from '~/components/Navbar';
import { Footer } from '~/components/Footer';
import { AdSlot } from '~/components/AdSlot';
import { siteConfig } from '~/data/siteConfig';
import { UpworkIcon } from '~/components/UpworkIcon';
import { GithubIcon } from '~/components/BrandIcons';

export const meta: MetaFunction = () => {
  return [
    { charSet: 'utf-8' },
    { title: 'About & My Story | NazmulCodes' },
    {
      name: 'description',
      content:
        'The story of Nazmul Hawlader: from a self-taught developer in Bangladesh to Senior Full-Stack Engineer, official Shopify App founder, and Top-Rated Upwork consultant.',
    },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'About & My Story | NazmulCodes' },
    {
      property: 'og:description',
      content:
        'Read the journey, engineering philosophy, and life lessons of Nazmul Hawlader — building published SaaS applications and high-performance e-commerce systems.',
    },
    { property: 'og:type', content: 'profile' },
    { property: 'og:url', content: 'https://nazmulcodes.org/about' },
  ];
};

export default function AboutPage() {
  const { theme, toggleTheme } = useOutletContext<{ theme: 'dark' | 'light'; toggleTheme: () => void }>();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main style={{ flex: 1, paddingTop: '6.5rem', paddingBottom: '5rem' }}>
        <div className="site-container" style={{ maxWidth: '880px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div
              className="section-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                marginBottom: '1rem',
              }}
            >
              <Sparkles size={14} />
              <span>Founder & Senior Engineer</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.25rem)', fontWeight: 800, marginBottom: '1.25rem', lineHeight: 1.2 }}>
              My Story: Curiosity, Code & <span className="text-gradient">Continuous Growth</span>
            </h1>

            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '720px', margin: '0 auto', lineHeight: 1.7 }}>
              Hi, I’m <strong>Nazmul Hawlader</strong>. I build official Shopify App Store applications and hand-crafted web architectures with zero compromise on speed, reliability, or user experience.
            </p>
          </div>

          {/* Profile Card & Key Statistics */}
          <div
            className="glass-card"
            style={{
              padding: '2.5rem',
              marginBottom: '3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              border: '1px solid var(--border-medium)',
            }}
          >
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img
                src={siteConfig.avatarUrl}
                alt={siteConfig.name}
                width={130}
                height={130}
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid var(--accent-emerald)',
                  boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)',
                }}
              />
            </div>

            <div style={{ flex: 1, minWidth: '280px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 0.4rem 0', color: 'var(--text-primary)' }}>
                {siteConfig.name}
              </h2>
              <div style={{ fontSize: '0.95rem', color: 'var(--accent-emerald)', fontWeight: 600, marginBottom: '0.85rem' }}>
                Senior Full-Stack & Shopify App Developer • Top-Rated Upwork Consultant
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
                Based in Bangladesh, serving global merchants across the United States, Europe, Australia, and Asia. Creator of Stockly and Kilo (kilo.nazmulcodes.org).
              </p>

              {/* Social and Profile Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href={siteConfig.upworkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <UpworkIcon size={15} />
                  <span>Upwork Profile</span>
                </a>
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <GithubIcon size={15} />
                  <span>GitHub (@Nazmul291)</span>
                </a>
                <Link to="/blog" className="btn btn-secondary btn-sm">
                  <BookOpen size={14} className="text-emerald" />
                  <span>Read 35+ Articles</span>
                </Link>
              </div>
            </div>
          </div>

          {/* AdSense Placement (AdSense Compliant) */}
          <AdSlot />

          {/* Narrative Story Sections */}
          <article className="article-prose">
            <h2>1. Where It All Began: Self-Taught From Day One</h2>
            <p>
              Growing up in Bangladesh, a career in high-level international software engineering wasn&apos;t handed to me on a silver platter. I didn&apos;t attend an expensive private tech academy or have an elite mentor sitting beside me. What I did have was an insatiable curiosity for how the web functions beneath the surface.
            </p>
            <p>
              Late into the night, after family obligations and daily life, I sat in front of my screen dissecting source code, reading official RFC specifications, and building tiny toy projects. I quickly realized that simply watching video tutorials created an illusion of understanding; true skill was forged only when things broke and I spent hours debugging call stacks in the browser console.
            </p>

            <h2>2. The Decision to Specialize: E-Commerce & Web Performance</h2>
            <p>
              In the early phase of my freelance career, I observed that the freelance marketplace was crowded with generic developers delivering slow, cookie-cutter WordPress and Shopify templates. Meanwhile, merchants spending thousands of dollars on advertising were bleeding customers because their storefronts took 6 to 9 seconds to load on mobile devices.
            </p>
            <p>
              I made a strategic commitment: <strong>I would specialize deeply in what actually drives merchant revenue.</strong> That meant zero-bloat native Liquid engineering, sub-second Core Web Vitals optimization, and building official Shopify App Store applications with Remix, GraphQL, and Node.js.
            </p>

            {/* Core Values Box */}
            <div className="learning-box">
              <div className="learning-box-title">
                <CheckCircle2 size={18} />
                <span>My Core Engineering Principles</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li style={{ color: 'var(--text-secondary)' }}>
                  <strong>Zero Unnecessary Bloat:</strong> Every single byte of JavaScript and CSS shipped to a user must earn its place by delivering measurable business value.
                </li>
                <li style={{ color: 'var(--text-secondary)' }}>
                  <strong>Empathy for the Merchant:</strong> Code exists to serve businesses and human beings. A technically elegant solution that is impossible for a merchant to manage is a failed solution.
                </li>
                <li style={{ color: 'var(--text-secondary)' }}>
                  <strong>Radical Transparency:</strong> I communicate proactively, diagnose problems honestly, and never over-promise or under-deliver.
                </li>
                <li style={{ color: 'var(--text-secondary)' }}>
                  <strong>Continuous Learning:</strong> Technology never stands still. Staying at the frontier requires daily curiosity and relentless experimentation.
                </li>
              </ul>
            </div>

            <h2>3. Launching Commercial Software: Stockly & Kilo</h2>
            <p>
              Freelancing taught me client service, but creating commercial software taught me product resilience. I engineered and launched <strong>Stockly</strong> (a low-latency back-in-stock notification engine published on the Shopify App Store) and built its companion tool <strong>Kilo</strong> (<a href="https://kilo.nazmulcodes.org/" target="_blank" rel="noopener noreferrer" className="text-emerald font-semibold">kilo.nazmulcodes.org</a>)—a 100% private, client-side media compression web app allowing Shopify merchants to 1-click batch optimize their entire product catalog.
            </p>
            <p>
              Alongside my own products, I have also contracted as a specialized frontend engineer on client applications like <strong>DemandMind</strong>, building responsive Shopify Admin Polaris interfaces that handle enterprise forecasting data.
            </p>

            <h2>4. Freelance Mastery on Upwork: 100% Job Success</h2>
            <p>
              Competing globally as a remote developer from South Asia requires standing out through undeniable quality. I never competed on low prices; I competed on deep diagnostic expertise. Before sending a single proposal, I would audit the client&apos;s live storefront, uncover hidden performance bottlenecks, and provide actionable value upfront.
            </p>
            <p>
              This client-first approach earned me a <strong>Top-Rated</strong> badge on Upwork, a 100% Job Success Score, and long-term retainer relationships with merchants across the US, UK, and Australia.
            </p>

            <h2>5. Why I Write & Share Technical Knowledge</h2>
            <p>
              When I was starting out, high-quality, actionable, and non-superficial engineering advice was hard to find. Most content was either too theoretical or full of outdated hacks. That is why I created the <Link to="/blog" className="text-emerald" style={{ fontWeight: 600 }}>NazmulCodes Blog</Link>.
            </p>
            <p>
              In these articles, I share the exact code patterns, architecture diagrams, performance recipes, and career frameworks that I use daily. My hope is that other developers—whether self-taught like me or working in teams—can find practical, immediately useful insights to advance their own careers.
            </p>

            <div className="pro-tip-box" style={{ marginTop: '2.5rem' }}>
              <Lightbulb size={24} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
              <div>
                <strong>A Message to Aspiring Engineers:</strong> Do not be intimidated by what you don&apos;t know yet. Every senior engineer you look up to was once sitting in front of an empty terminal, confused by their first syntax error. Compounding small, daily practice over months and years will take you to heights you cannot currently imagine.
              </div>
            </div>
          </article>

          {/* Bottom AdSense Slot */}
          <AdSlot style={{ marginTop: '3.5rem' }} />

          {/* Bottom Call to Action */}
          <div
            className="glass-card"
            style={{
              padding: '2.5rem',
              marginTop: '3.5rem',
              textAlign: 'center',
              border: '1px solid var(--accent-emerald)',
            }}
          >
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              Let&apos;s Build Something Extraordinary Together
            </h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 1.5rem auto', fontSize: '1.02rem', lineHeight: 1.6 }}>
              Whether you need a published Shopify App, a high-converting custom theme, or performance optimization that cuts bounce rates in half, I&apos;m here to help.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={siteConfig.upworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <UpworkIcon size={18} />
                <span>Hire on Upwork</span>
                <ExternalLink size={16} />
              </a>
              <Link to="/blog" className="btn btn-secondary btn-lg">
                <BookOpen size={18} />
                <span>Explore Technical Guides</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
