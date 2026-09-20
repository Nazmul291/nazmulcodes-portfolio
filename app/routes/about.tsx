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
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  Star,
  Compass,
  Zap,
} from 'lucide-react';
import { Navbar } from '~/components/Navbar';
import { Footer } from '~/components/Footer';
import { AdSlot } from '~/components/AdSlot';
import { AboutHero } from '~/components/Hero';

export const meta: MetaFunction = () => {
  return [
    { charSet: 'utf-8' },
    { title: 'About NazmulCodes | Technical Journey & Philosophy' },
    {
      name: 'description',
      content:
        'The comprehensive memoir of Nazmul Hawlader: from a self-taught programmer in Bangladesh to Senior Full-Stack Shopify Engineer, official Shopify App founder (Stockly, Kilo), and Top-Rated Upwork consultant.',
    },
    { name: 'robots', content: 'index, follow' },
    // ✅ এই ক্যানোনিকাল ট্যাগটি যুক্ত করুন
    {
      tagName: 'link',
      rel: 'canonical',
      href: 'https://www.nazmulcodes.org/about',
    },
    { property: 'og:title', content: 'About Nazmul Hawlader | My Story, Journey & Engineering Philosophy' },
    {
      property: 'og:description',
      content:
        'Read the comprehensive journey, architecture philosophies, and life lessons of Nazmul Hawlader — building published SaaS applications, client success stories, and high-performance e-commerce storefronts.',
    },
    { property: 'og:type', content: 'profile' },
    { property: 'og:url', content: 'https://www.nazmulcodes.org/about' },
    { property: 'og:image', content: 'https://www.nazmulcodes.org/assets/images/profile/nazmul-lg.webp' },
  ];
};

export default function AboutPage() {
  const { theme, toggleTheme } = useOutletContext<{ theme: 'dark' | 'light'; toggleTheme: () => void }>();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main style={{ flex: 1, paddingTop: '6.5rem', paddingBottom: '5rem' }}>
        <div className="site-container" style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <AboutHero />
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
              <span>Founder, Architect & Senior Engineer</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 800, marginBottom: '1.25rem', lineHeight: 1.2 }}>
              My Story: Curiosity, Code & <span className="text-gradient">The Relentless Pursuit of Craft</span>
            </h1>

            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', lineHeight: 1.7 }}>
              From writing my first lines of HTML in a small room in Bangladesh to engineering published Shopify App Store applications and consulting for international multi-million dollar brands.
            </p>
          </div>

          {/* Profile Card & Key Statistics */}
          <img
                src="/assets/about/beggining-of-my-carier-kilo.webp"
                alt="Nazmul Hawlader working at the engineering workstation"
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                }}
              />

          {/* AdSense Placement (AdSense Compliant) */}
          <AdSlot />

          {/* Comprehensive Narrative Memoir */}
          <article className="article-prose" style={{ marginTop: '3rem' }}>
            <h2>Chapter 1: The Humble Beginning — Curiosity Before Silicon</h2>
            <p>
              Growing up in Bangladesh, a career as a globally recognized software engineer and software founder was not something anyone in my immediate environment could map out for me. There were no elite coding academies down the street, no venture capital meetups, and no family members in tech who could hand down a blueprint. What I possessed was something far more durable: an unyielding obsession with understanding how digital systems worked beneath the polished surface.
            </p>
            <p>
              My first encounters with programming took place on a modest computer that struggled whenever more than two browser tabs were open. In those early days, internet access was often slow, unreliable, and rationed. Whenever the connection dropped, I did not stop. Instead, I saved complete HTML documentation, language specifications, and tutorials onto local storage to study them line by line offline.
            </p>
            <p>
              I will never forget the moment I wrote my first lines of HTML, styled them with raw CSS, and refreshed the browser. Seeing static text transform into a structured layout felt like nothing short of real-world magic. But while many people were satisfied with merely visual aesthetics, my curiosity immediately moved deeper: <em>How does the browser parse this DOM tree? How does the CSS cascade calculate layout geometry? How does JavaScript manage memory and thread execution in the background?</em> That fundamental question—<em>how does this truly work under the hood?</em>—became the engine of my entire engineering career.
            </p>

            <h2>Chapter 2: The Self-Taught Crucible — Learning How to Think in Systems</h2>
            <p>
              Like many aspiring engineers, I initially fell into what the developer community calls &quot;tutorial hell&quot;—watching hundreds of hours of video courses where instructors built polished applications in 20 minutes without showing the messy reality of architecture or debugging. It didn&apos;t take long to realize that passive video watching produces a dangerous illusion of competence. When you sit before a blank file without a video guiding your fingers, true capability is tested.
            </p>
            <p>
              I abandoned passive tutorials and adopted a method of <strong>deliberate, aggressive engineering practice</strong>. I forced myself to build real, broken prototypes from scratch. Whenever a runtime error appeared in the DevTools console, I made a solemn rule: I would not copy-paste the error into a search engine or ask for a quick fix until I had read the entire call stack, inspected the memory state, and formulated a hypothesis about why the failure occurred.
            </p>
            <p>
              I spent countless nights studying the ECMAScript specifications, dissecting the JavaScript Event Loop, understanding the differences between microtasks and macrotasks in the V8 engine, and mastering the nuances of asynchronous concurrency. I studied the open-source code of popular libraries, reading how senior engineers structured design patterns, abstracted interfaces, and prevented memory leaks. This self-taught crucible taught me the most valuable skill a programmer can possess: <strong>the ability to learn any technology from first principles without fear.</strong>
            </p>

            {/* Core Values Box */}
            <div className="learning-box">
              <div className="learning-box-title">
                <CheckCircle2 size={18} />
                <span>My Core Engineering Principles</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <li style={{ color: 'var(--text-secondary)' }}>
                  <strong>Zero Unnecessary Bloat:</strong> Every single byte of JavaScript, CSS, and font data shipped across the wire must justify its presence by delivering measurable business ROI. Respect the user&apos;s cellular bandwidth.
                </li>
                <li style={{ color: 'var(--text-secondary)' }}>
                  <strong>Deep Diagnostic Rigor:</strong> Never apply cosmetic patches or polyfills to symptoms. Diagnose the underlying architectural root cause and resolve it permanently.
                </li>
                <li style={{ color: 'var(--text-secondary)' }}>
                  <strong>Empathy for the Non-Technical Operator:</strong> Code does not exist in an ivory tower. If an e-commerce theme or SaaS application cannot be effortlessly operated by a non-technical store owner, the engineering has failed.
                </li>
                <li style={{ color: 'var(--text-secondary)' }}>
                  <strong>Radical Transparency &amp; Integrity:</strong> Communicate proactively, state technical trade-offs plainly, respect client IP boundaries unconditionally, and never over-promise or under-deliver.
                </li>
              </ul>
            </div>

            <h2>Chapter 3: The E-Commerce Awakening &amp; The Shopify Frontier</h2>
            <img
                src="/assets/about/e-commerce-awakening-the-shopify-frontier.webp"
                alt="Nazmul Hawlader working at the engineering workstation"
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                }}
              />

            
            <p>
              When I entered the freelance arena, I made a crucial observation that changed the trajectory of my professional life. Most freelance marketplaces were flooded with generalist web developers competing in a desperate race to the bottom, offering $50 cookie-cutter websites built on bloated visual builders.
            </p>
            <p>
              At the exact same time, e-commerce was exploding worldwide. Direct-to-consumer (DTC) brands were spending tens of thousands of dollars each month on paid acquisition (Meta, Google, TikTok ads), driving high-intent shoppers to storefronts that took 7 to 10 seconds to load on mobile devices. Store owners were bleeding money: 40% of prospective buyers bounced before the first product image even rendered.
            </p>
            <p>
              Why were these stores so slow? Because merchants had installed visual drag-and-drop page builders (PageFly, Shogun, GemPages) on top of bulky pre-made themes, piling on 30+ conflicting third-party app scripts that mutated the DOM, blocked the main thread, and caused massive Cumulative Layout Shifts.
            </p>
            <p>
              I saw an undeniable opportunity to provide massive, tangible business value: <strong>I would specialize deeply and uncompromisingly in high-performance Shopify engineering.</strong> I rejected visual page builders entirely and mastered native Shopify Liquid, the Online Store 2.0 component architecture, and headless integrations. I learned how to build bespoke, modular storefronts that gave merchants 100% visual customizability inside the native Shopify Theme Editor while delivering sub-second page loads and 95+ mobile Google Lighthouse scores.
            </p>


            <h2>Chapter 4: The Obsession with Sub-Second Speed &amp; Core Web Vitals</h2>
            <p>
              In e-commerce, web performance is not an engineering vanity metric; it is direct financial arithmetic. Comprehensive research by Google, Amazon, and Walmart has demonstrated repeatedly that <strong>every 100 milliseconds of latency reduction translates to a 1% increase in conversion rate</strong>. When an enterprise store generates $300,000 in monthly revenue, cutting page load time by 1.5 seconds can directly generate over $45,000 in incremental gross profits every year.
            </p>
            <p>
              Armed with this understanding, I turned performance tuning into an art form. I developed repeatable, surgical frameworks for Shopify stores:
            </p>
            <ul>
              <li>
                <strong>Critical CSS Inlining:</strong> Extracting and inlining only the above-the-fold layout styles directly into the HTML head, deferring the remaining global stylesheet to prevent render-blocking delays.
              </li>
              <li>
                <strong>Zero Cumulative Layout Shift (CLS = 0.000):</strong> Enforcing explicit intrinsic aspect-ratio boxes and skeleton placeholders for all images, hero banners, and promotional announcements so pages never visually jump while loading.
              </li>
              <li>
                <strong>Self-Hosted Subsetting of Modern Fonts:</strong> Eliminating Google Fonts external render-blocking network handshakes by self-hosting latin-subsetted WOFF2 fonts, shaving 200–400ms off mobile First Contentful Paint.
              </li>
              <li>
                <strong>Interaction to Next Paint (INP) Optimization:</strong> Breaking long tasks on the main thread using requestIdleCallback and scheduler yielding to guarantee instant touch response on mobile product carousels and AJAX cart drawers.
              </li>
            </ul>
            <p>
              Watching a client&apos;s mobile Lighthouse score leap from a sluggish 24 to a blistering 98—and seeing their mobile conversion rate double within three weeks of launch—confirmed that my focus on technical fundamentals was the right path.
            </p>

            <h3>Case Study in Latency: Rescuing a Multi-Million Dollar Brand from an 8.2s Mobile LCP</h3>
            <p>
              To illustrate this in practice, consider an international apparel merchant that approached me in early 2024. They were spending $65,000 monthly on paid advertising, but their mobile bounce rate exceeded 68%. An in-depth synthetic and real-user monitoring (RUM) audit revealed a disastrous reality: their mobile Largest Contentful Paint was clocking in at <strong>8.2 seconds</strong>.
            </p>
            <p>
              The root cause was a cascading failure of modern web anti-patterns:
            </p>
            <ul>
              <li>A popular visual page builder had generated 4,800 DOM nodes for a single product template, triggering severe browser layout thrashing during rendering.</li>
              <li>The hero product image was uncompressed (a 4.2MB PNG) being loaded without explicit dimensions, causing a massive layout shift (CLS of 0.42).</li>
              <li>Four separate review and countdown apps were injecting uncompressed jQuery libraries and remote CSS files before the DOM could paint.</li>
            </ul>
            <p>
              Over a 14-day engineering sprint, I rebuilt the product detail experience entirely in native Liquid 2.0. We eradicated every page builder dependency, converted the hero media to responsive modern WebP/AVIF formats with preloading, inlined the critical above-the-fold CSS tokens, and deferred all non-critical third-party telemetry until after user interaction.
            </p>
            <p>
              The results were staggering: <strong>Mobile LCP dropped from 8.2s to 1.1s</strong>, mobile bounce rates plummeted by 34%, and within 30 days the brand recorded a <strong>42% increase in mobile checkout completions</strong> without increasing their ad spend by a single dollar. That is the transformative economic power of engineering craftsmanship.
            </p>

            <h2>Chapter 5: Transitioning to SaaS — The Genesis of Stockly &amp; Kilo</h2>
            <img
                src="/assets/about/dashboard_interface_2K_-kilo 1-kilo.webp"
                alt="Nazmul Hawlader working at the engineering workstation"
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                }}
              />
            <p>
              While freelancing gave me intimate insight into client pain points, I knew that true technical mastery required building, launching, and maintaining my own commercial software products. In 2024, I set out to architect my first official SaaS product for the Shopify App Store.
            </p>
            <p>
              Through dozens of theme audits, I noticed that merchants constantly struggled with stockouts. Popular products would sell out unexpectedly, resulting in lost revenue, frustrated customers, and warehouse chaos. At the same time, merchants had zero automated way to forecast demand based on seasonal velocity or notify interested shoppers when inventory returned.
            </p>
            <p>
              I conceived, architected, and built <strong>Stockly: Inventory &amp; Reorder</strong> (<a href="https://apps.shopify.com/stock-alert-4" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>Shopify App Store</a>). Built with Remix, React, Shopify Polaris, App Bridge v4, and the GraphQL Admin API, Stockly provides:
            </p>
            <ul>
              <li><strong>Sales-Velocity Demand Forecasting:</strong> Calculating exact inventory runways and reorder points based on 7-day, 14-day, and 30-day velocity.</li>
              <li><strong>1-Click Automated Purchase Orders:</strong> Generating supplier POs factoring in vendor lead times and minimum order quantities.</li>
              <li><strong>Multi-Channel Staff &amp; Customer Restock Alerts:</strong> Instant notifications to warehouse teams via Slack, email, and automated customer recovery alerts.</li>
            </ul>

            <p>
              As Stockly grew, I noticed another pervasive issue: merchants were constantly uploading raw 10MB JPEG and PNG product photos directly from photographers into their Shopify catalogs, destroying their store speed. To solve this problem without charging merchants expensive cloud fees or risking their privacy, I engineered <strong>Kilo</strong> (<a href="https://kilo.nazmulcodes.org/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>kilo.nazmulcodes.org</a>).
            </p>

            {/* Kilo Brand Card with Logo */}
            <div
              className="glass-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                padding: '1.25rem 1.75rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                background: 'rgba(6, 182, 212, 0.05)',
                margin: '1.5rem 0 2rem 0',
              }}
            >
              <img
                src="/assets/images/apps/kilo.webp"
                alt="Kilo Logo"
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
                style={{ borderRadius: 'var(--radius-md)', flexShrink: 0, width: '56px', height: '56px', objectFit: 'contain' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Kilo — Fast Media Compression &amp; Format Converter
                  </h4>
                  <span className="tag-badge" style={{ fontSize: '0.72rem' }}>
                    100% Client-Side Web App
                  </span>
                </div>
                <p style={{ margin: '0.35rem 0 0.5rem 0', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  In-browser image optimization &amp; WebP converter with zero server uploads and 1-click Shopify catalog sync.
                </p>
                <a
                  href="https://kilo.nazmulcodes.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.84rem', color: 'var(--accent-cyan)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <span>Launch Kilo (kilo.nazmulcodes.org)</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            <h3>The Architectural Philosophy Behind Kilo: 100% Client-Side Privacy</h3>
            <p>
              Traditional image optimization tools follow an outdated server-heavy paradigm: the user uploads gigabytes of proprietary product photography to a remote cloud server, where expensive backend CPU clusters compress the files before sending them back. This model introduces severe privacy vulnerabilities, bandwidth costs, and sluggish upload queues.
            </p>
            <p>
              With Kilo, I engineered a radical alternative: <strong>100% client-side, browser-native media compression</strong>. Utilizing modern WebAssembly (WASM), HTML5 Canvas, and OffscreenCanvas web workers, all image processing occurs entirely within the merchant&apos;s own browser sandbox. 
            </p>
            <p>
              Zero bytes of image data ever leave the merchant&apos;s device. Merchants can drag and drop dozens of heavy product photos and batch-convert them into modern WebP, AVIF, or ICO formats at near-zero latency, completely offline and free of subscription costs. For Stockly users, Kilo serves as an integrated companion tool, allowing store managers to optimize catalog assets before publishing them to their live storefront.
            </p>
            <p>
              Alongside my own products, I also accepted high-impact technical contracts, such as working as the lead frontend engineer for <strong>DemandMind Technologies</strong>, building enterprise Shopify Admin Polaris interfaces to render complex seasonal forecasting data.
            </p>

            <h2>Chapter 6: The Upwork Journey — Competing Globally with Radical Integrity</h2>
            <p>
              Breaking into the international freelance market from Bangladesh is notoriously challenging. Many prospective clients harbor unconscious biases, assuming developers from South Asia only offer cheap, low-quality labor.
            </p>
            <p>
              From day one, I refused to play that game. I made an unshakeable commitment: <strong>I would never compete on low price; I would compete on diagnostic superiority, engineering excellence, and transparent communication.</strong>
            </p>
            <p>
              Whenever I submitted a proposal for a project on Upwork, I never used generic copy-pasted templates. Instead, I spent 30 to 45 minutes performing a live audit of the merchant&apos;s website. I recorded brief video walkthroughs demonstrating the exact JavaScript conflicts causing their checkout errors, provided the line numbers where their theme was leaking memory, and outlined a step-by-step remediation plan before asking for a single dollar.
            </p>
            <p>
              Clients were astounded. They realized they were not talking to an order-taker, but to a senior engineering partner genuinely invested in the economic health of their business. This dedication resulted in a flawless <strong>100% Job Success Score (JSS)</strong>, the prestigious <strong>Top-Rated</strong> badge on Upwork, and long-term retainer partnerships with visionary founders across the globe.
            </p>

            <h2>Chapter 7: Technical Craftsmanship &amp; Mental Models</h2>
            <p>
              Over the course of completing more than 33 major commercial projects and authoring 41 technical guides, I have codified the mental models that guide my engineering choices every day:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', margin: '2rem 0' }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-lg)', padding: '1.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                  <Terminal size={18} />
                  <span>The Fallacy of Premature Abstraction</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  Do not write complex generic frameworks until you have written three concrete implementations that clearly demand it. Duplication is far cheaper than the wrong abstraction.
                </p>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-lg)', padding: '1.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                  <Zap size={18} />
                  <span>The Web is Built on Fundamentals</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  JavaScript frameworks come and go every 3 years. HTTP semantics, DOM manipulation, browser rendering pipelines, and TCP/IP networking fundamentals remain constant for decades.
                </p>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-lg)', padding: '1.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', color: 'var(--accent-amber)', fontWeight: 700 }}>
                  <ShieldCheck size={18} />
                  <span>Resilience Over Cleverness</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  Clever one-line code is a liability in production. Resilient, readable, and well-typed code that any junior engineer can debug at 2 AM is the mark of true senior craftsmanship.
                </p>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-lg)', padding: '1.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                  <TrendingUp size={18} />
                  <span>Business Impact Is The North Star</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  Software engineers are hired to create enterprise value, eliminate operational friction, and generate revenue. Code is merely the tool we use to deliver that outcome.
                </p>
              </div>
            </div>

            <h2>Chapter 8: The Vision Forward &amp; A Message to Rising Developers</h2>
            <p>
              Looking to the future, e-commerce and web development are entering an exciting era of transformation. With the rollout of Shopify Checkout Extensibility, WebAssembly-powered Shopify Functions, Remix single-fetch pipelines, and edge computing, the boundary between web apps and native applications is blurring.
            </p>
            <p>
              My goal is to continue pushing the frontier of what is possible on the web—building resilient apps like Stockly and Kilo, helping ambitious brands scale their infrastructure, and freely sharing everything I learn on the <Link to="/blog" style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>NazmulCodes Blog</Link>.
            </p>
            <p>
              I want to leave a direct, heartfelt message for any aspiring developer reading this—especially those from Bangladesh or developing countries who feel that the odds are stacked against them:
            </p>

            <div className="pro-tip-box" style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
              <Lightbulb size={26} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>A Message to Aspiring Engineers:</strong> Do not let anyone convince you that where you were born determines the height of your engineering impact. Silicon Valley does not hold a monopoly on intellect or discipline. The internet has democratized access to the world&apos;s greatest repository of computer science knowledge.
                <br /><br />
                If you cultivate relentless curiosity, read the documentation, build real software, hold yourself to the highest standards of integrity, and refuse to quit when your code breaks, <strong>you can build software that impacts millions of people worldwide.</strong> Keep building, keep learning, and never stop growing.
              </div>
            </div>
          </article>

          {/* Bottom AdSense Slot */}
          <AdSlot style={{ marginTop: '3.5rem' }} />

          {/* Bottom Call to Action */}
        </div>
      </main>

      <Footer />
    </div>
  );
}
