import { BlogPost } from '~/types/blog';
import { siteConfig } from '~/data/siteConfig';

const defaultAuthor = {
  name: siteConfig.name,
  role: 'Senior Shopify Expert & Full-Stack Engineer',
  avatarUrl: siteConfig.avatarUrl,
};

export const myStoryPost: BlogPost = {
  id: 'my-story-journey',
  slug: 'my-story-from-zero-to-shopify-app-founder',
  title: 'My Story: From Self-Taught Developer in Bangladesh to Official Shopify App Founder & Top-Rated Freelancer',
  excerpt:
    'An exhaustive, behind-the-scenes breakdown of how I started with curiosity in Bangladesh, mastered full-stack Shopify engineering, delivered 33+ international enterprise projects on Upwork, and launched published products like Stockly and Kilo.',
  category: 'Founder Journey',
  tags: [
    'My Story',
    'Shopify App Store',
    'Freelancing',
    'Self-Taught',
    'Career Growth',
    'Upwork Mastery',
    'Software Architecture',
  ],
  primaryKeyword: 'Shopify developer journey',
  secondaryKeywords: [
    'self-taught software engineer Bangladesh',
    'how to become a Shopify app developer',
    'Shopify App Store founder',
    'Top-Rated Upwork freelancer Bangladesh',
    'Shopify Polaris Remix tutorial',
    'client-side image compression Kilo',
  ],
  publishedAt: '2026-09-15',
  updatedAt: '2026-09-17',
  readTime: '13 min read',
  featured: true,
  author: defaultAuthor,
  learningOutcomes: [
    'The exact learning roadmap from zero coding knowledge to high-level system architecture without a computer science degree.',
    'How to transition from low-paying generic web development to high-ticket specialized Shopify engineering.',
    'The architectural process behind publishing official apps on the Shopify App Store and handling review guidelines.',
    'Actionable Upwork proposal strategies that win $5,000+ contracts with zero prior platform reviews.',
    'Lessons from launching Stockly (inventory management SaaS) and developing Kilo (in-browser media compressor).',
  ],
  introduction:
    'Every software engineer remembers their first encounter with code. For me, that moment did not happen in a state-of-the-art university laboratory or at a Silicon Valley incubator. It started in Bangladesh, in front of a modest desktop machine with intermittent electricity and an unpredictable internet connection. What I possessed in abundance was an insatiable curiosity about how software works beneath the surface, paired with an uncompromising conviction that software craftsmanship can cross any geographical boundary.\n\nToday, I work as a Senior Full-Stack Engineer and Shopify Solutions Architect. I have delivered over 33 production web applications for international businesses across North America, Europe, and Australia, earned the Top-Rated badge on Upwork with a 100% Job Success Score, engineered and published official applications on the Shopify App Store (Stockly), and built companion developer utilities like Kilo (kilo.nazmulcodes.org). But the trajectory from writing my first line of markup to architecting distributed e-commerce systems was neither straightforward nor accidental.\n\nIn this comprehensive guide, I document the exact timeline, tactical milestones, architectural failures, and core mindset shifts that propelled my career. Whether you are an aspiring self-taught engineer in a developing country, a freelancer stuck in the race-to-the-bottom hourly pricing trap, or a developer curious about building SaaS products in the Shopify ecosystem, this article provides an unfiltered roadmap designed to save you years of trial and error.',
  sections: [
    {
      heading: '1. The Early Years: Curiosity, Late Nights, and the Discipline of Self-Teaching',
      content:
        'When I decided to learn software development, there were no structured bootcamps in my neighborhood, and high-end hardware was out of reach. My learning environment consisted of official documentation, free open-source repositories on GitHub, and community discussion boards. Early on, I fell into a common trap that snares thousands of beginners: "tutorial hell." I would follow video tutorials, code alongside the instructor, and feel an artificial sense of mastery. However, the moment I opened an empty text editor with a blank screen, my confidence vanished.\n\nBreaking free from that plateau required a fundamental shift in my approach to learning. I stopped watching passive videos and began building small, broken tools that forced me to confront runtime exceptions head-on. If I wanted to understand JavaScript, I stopped relying on heavy utility libraries and manually implemented DOM event listeners, debounce wrappers, and asynchronous fetch handlers.\n\n### The Three Rules of Deep Learning That Accelerated My Progress\n- Build before you feel ready: Write code before reading the entire documentation. Allow errors to expose what you do not understand.\n- Read source code, not just summaries: Dig into the node_modules directory of popular libraries to see how senior engineers handle edge cases and defensive checks.\n- Dissect the network waterfall: Open DevTools on every website you visit. Examine the headers, asset compression payloads, caching policies, and JavaScript execution times.\n\nDuring those early months, I spent endless hours staring at the console, debugging memory leaks, and understanding the asynchronous event loop in Node.js. That grueling foundational period gave me an instinctive intuition for how computers execute code, which later became my greatest competitive advantage when diagnosing high-scale e-commerce bottlenecks.',
      tip: 'Never judge your daily progress by how many tutorial videos you finished. Measure it strictly by how many production bugs you diagnosed and fixed without copy-pasting answers from forum threads.',
    },
    {
      heading: '2. Escaping the Commodity Trap: Choosing Deep Shopify & E-Commerce Specialization',
      content:
        'When I entered the freelance market, I quickly observed an overwhelming surplus of developers offering generic website services. Thousands of freelancers were pitching basic WordPress templates or elementary landing pages for $10 to $20 an hour. Clients viewed them as interchangeable commodities, haggling aggressively on price and demanding endless revisions without respect.\n\nI realized that to build a sustainable, high-income engineering career, I had to solve problems that directly impacted commercial balance sheets. In e-commerce, software performance is tied directly to cash flow. If an online store takes 4 seconds to load instead of 1.2 seconds, the merchant loses 20% to 30% of their gross revenue. If an inventory sync fails during a flash sale, the merchant suffers chargebacks, angry customers, and negative reviews.\n\nI made the strategic decision to specialize exclusively in the Shopify ecosystem, with a dual focus: custom high-performance storefront development and official Shopify app development. While others were assembling fragile stores with drag-and-drop page builders like PageFly or GemPages, I focused on native Liquid engineering, zero-bloat modular architecture, and sub-second Core Web Vitals.',
      codeSnippet: {
        language: 'liquid',
        filename: 'native-product-form.liquid',
        code: `{%- comment -%}
  High-Performance Native Shopify Cart Mutation
  Zero external libraries: replaces heavy 400KB visual page builder app scripts
  with an optimized, accessible, progressive-enhancement DOM submission.
{%- endcomment -%}

<form method="post" action="/cart/add" id="AddToCartForm-{{ product.id }}" class="native-product-form" novalidate>
  <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
  
  <div class="quantity-selector" data-inventory-policy="{{ product.selected_or_first_available_variant.inventory_policy }}">
    <label for="Quantity-{{ product.id }}" class="visually-hidden">Quantity</label>
    <input type="number" id="Quantity-{{ product.id }}" name="quantity" value="1" min="1" max="99" class="quantity-input">
  </div>

  <button 
    type="submit" 
    name="add" 
    class="btn-checkout-primary"
    {% unless product.selected_or_first_available_variant.available %}disabled{% endunless %}
    data-loading-text="Securing Item..."
  >
    <span>
      {% if product.selected_or_first_available_variant.available %}
        Add to Cart &mdash; {{ product.selected_or_first_available_variant.price | money }}
      {% else %}
        Sold Out
      {% endif %}
    </span>
  </button>
</form>`,
        explanation:
          'By leveraging native Liquid form semantics instead of heavy third-party JavaScript injection, this snippet delivers 0ms interaction delays and eliminates Cumulative Layout Shift (CLS).',
      },
      tip: 'Clients do not buy code syntax; they buy business outcomes. When pitching e-commerce merchants, frame every technical improvement in terms of conversion rate percentage, average order value, and customer retention.',
    },
    {
      heading: '3. Building SaaS: The Journey of Stockly and Kilo',
      content:
        'Consulting for high-growth brands taught me how merchants operate, but I wanted to build scalable software assets that solved problems at global scale. This ambition led to the conceptualization and development of Stockly, an inventory restock alert and demand intelligence application engineered specifically for the Shopify App Store.\n\nMerchants lose millions in sales when high-intent shoppers encounter out-of-stock product variants. Traditional notification apps were either slow, sending delayed batch emails hours after inventory arrived, or they injected bloated tracking scripts that ruined mobile storefront speed. With Stockly, I set out to build an enterprise-grade solution that paired a lightweight storefront subscriber widget with a real-time event-driven backend.\n\n### Overcoming the Shopify App Store Review Gauntlet\nPublishing an official app on the Shopify App Store is a rigorous engineering challenge. Shopify enforces strict requirements across multiple audit vectors:\n- Security & Token Exchange: Modern apps must use App Bridge v4 and session token authentication, eliminating third-party cookies across modern browsers.\n- Mandatory Compliance Webhooks: The app must respond to customers/data_request, customers/redact, and shop/redact endpoints with HTTP 200 within 5 seconds.\n- Embedded Performance: The embedded Admin UI must leverage Shopify Polaris design tokens and load its initial payload in under 2 seconds.\n- Automated Scanner Verification: Shopify runs comprehensive automated security bots that test CSP headers, SQL injection resilience, and OAuth integrity.\n\nNavigating these audits and receiving official approval validated everything I had spent years studying. Building Stockly gave me firsthand appreciation for infrastructure costs, multi-tenant database isolation, rate-limit throttling, and customer onboarding UX.\n\n### Developing Kilo: The Privacy-First Media Optimizer\nAs an e-commerce engineer, I constantly observed merchants uploading uncompressed 15MB DSLR product photography directly to their stores, destroying mobile page speeds. To solve this without requiring expensive cloud processing bills, I engineered Kilo (https://kilo.nazmulcodes.org/).\n\nKilo is a 100% client-side image compression tool built with HTML5 Canvas, OffscreenCanvas, and WebAssembly. It converts large PNG, JPEG, and WebP files into optimized formats entirely in the user’s browser memory without sending a single byte to a remote backend. Furthermore, I built an automated companion bridge for Stockly users at kilo.nazmulcodes.org/shopify, allowing merchants to authenticate their stores, fetch catalog images via the GraphQL Admin API, and batch-compress their entire catalog in one click.',
      codeSnippet: {
        language: 'typescript',
        filename: 'kilo-canvas-worker.ts',
        code: `// High-Performance Browser Compression Pipeline (Used in Kilo)
export async function compressImageInBrowser(
  file: File, 
  targetWidth: number, 
  targetQuality = 0.82
): Promise<{ blob: Blob; savedBytes: number; compressionRatio: string }> {
  const originalSize = file.size;
  const bitmap = await createImageBitmap(file);
  
  // Calculate proportional dimensions
  const scale = targetWidth < bitmap.width ? targetWidth / bitmap.width : 1;
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  
  // OffscreenCanvas offloads pixel computation from UI thread
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
  
  if (!ctx) throw new Error('Canvas 2D context unavailable');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bitmap, 0, 0, width, height);
  
  const optimizedBlob = await canvas.convertToBlob({
    type: 'image/webp',
    quality: targetQuality,
  });
  
  const savedBytes = originalSize - optimizedBlob.size;
  const ratio = ((savedBytes / originalSize) * 100).toFixed(1) + '%';
  
  return { blob: optimizedBlob, savedBytes, compressionRatio: ratio };
}`,
        explanation:
          'By using createImageBitmap and OffscreenCanvas, image decoding and pixel quantization occur completely off the main thread, keeping 60fps responsiveness even with 25MB raw camera files.',
      },
      tip: 'When building SaaS companion tools, prioritize zero-infrastructure architectures. Client-side processing minimizes your AWS/Vercel compute costs while providing users with instant speeds and complete data privacy.',
    },
    {
      heading: '4. The Upwork Blueprint: How I Earned Top-Rated Status and 100% Job Success',
      content:
        'Many international developers believe that landing high-paying freelance contracts requires years of reputation or personal connections in Silicon Valley. When I created my Upwork profile, I had 0 reviews, 0 completed contracts, and $0 in platform earnings. Yet within a short span, I achieved Top-Rated status, maintained a 100% Job Success Score across 33+ enterprise jobs, and commanded hourly rates and project fees comparable to Western senior consultants.\n\nThis outcome was not based on luck. It was the direct result of a calculated, diagnostic proposal framework.\n\n### The "Diagnostic Physician" Proposal Method\nMost freelancers send generic copy-pasted cover letters: "Hello, I have 5 years of React and Shopify experience. Please hire me." Clients delete these immediately.\n\nInstead of acting like a desperate seller, I treated every proposal like a senior doctor examining a patient:\n- Phase 1: Direct Store Audit: Before writing a single word, I inspected the merchant’s live website, ran Lighthouse audits, identified slow third-party network requests, and discovered broken Liquid tags in their checkout or product pages.\n- Phase 2: Actionable Diagnostic Video or Screenshot: In the proposal, I pointed out the exact root cause of their issue: "I inspected your product page network waterfall and noticed that your previous slider app is blocking the main thread for 1,420ms due to unminified dependencies."\n- Phase 3: Risk-Free Execution Plan: I outlined the exact steps I would take, the milestones, and how we would verify the fix against measurable metrics.\n\nWhen a client sees that you diagnosed and understood their problem before they even hired you, price resistance disappears. You cease to be an outsourced cost and become an indispensable revenue partner.',
      tip: 'Never bid on job posts that have vague requirements or clients looking for the cheapest option. Focus on merchants who run serious businesses, respect expertise, and are willing to pay for flawless execution.',
    },
    {
      heading: '5. Technical Mastery: The Modern Shopify App Stack (Remix, Polaris & GraphQL)',
      content:
        'The Shopify ecosystem has evolved rapidly over the past several years. In the early days, Shopify apps were often built using standalone Express or Ruby on Rails servers communicating through REST APIs and iframe embeds that frequently broke with browser privacy updates. Today, Shopify provides a world-class unified tech stack based on Remix, Polaris React components, App Bridge v4, and the GraphQL Admin API.\n\nMastering this modern stack requires understanding full-stack server-side rendering, token exchange mechanics, and strict GraphQL rate-limit budgeting.\n\n### Why Remix is the Ideal Engine for Shopify Apps\n- Unified Server & Client Runtimes: Loaders and actions execute purely on the server, keeping your database credentials, API secrets, and private business logic secure.\n- Optimistic UI & Revalidation: When a merchant toggles a settings switch in your app dashboard, Remix updates the UI immediately and revalidates queries in the background without tedious global state boilerplate.\n- Built-in Streaming & Defer: Heavy database queries or external API calls can be streamed via React Suspense, allowing the outer layout to render instantly.\n\nAlongside my own products, I have applied these exact architectural patterns in high-stakes enterprise contracts. For instance, on the DemandMind contract, I engineered responsive, embedded Shopify Admin frontends using React, Polaris, and App Bridge—translating complex product analytics into clean, intuitive merchant dashboards.',
      codeSnippet: {
        language: 'typescript',
        filename: 'app.inventory-sync.tsx',
        code: `// Resilient GraphQL Query with Cost-Point Budgeting
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { authenticate } from '~/shopify.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  
  const response = await admin.graphql(\`
    query getCatalogInventory($first: Int!) {
      products(first: $first) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          title
          totalInventory
          variants(first: 10) {
            nodes {
              id
              sku
              inventoryQuantity
              price
            }
          }
        }
      }
    }
  \`, {
    variables: { first: 25 },
  });

  const responseJson = await response.json();
  
  // Guard against GraphQL throttling
  if (responseJson.extensions?.cost) {
    const { currentlyAvailable, restoreRate } = responseJson.extensions.cost.throttleStatus;
    if (currentlyAvailable < 100) {
      console.warn(\`Shopify API Rate Warning: \${currentlyAvailable} points remaining\`);
    }
  }

  return json({ products: responseJson.data.products.nodes });
};`,
        explanation:
          'Always monitor throttleStatus in GraphQL responses. Shopify assigns 1,000 cost points per store with a restore rate of 50 points per second. Efficient querying prevents fatal 429 exceptions during inventory synchronization.',
      },
      tip: 'Never use REST APIs for new Shopify applications. Shopify’s latest features—including Subscriptions, B2B Catalogs, and Metaobjects—are exclusively supported through the GraphQL Admin API.',
    },
    {
      heading: '6. The Highs and Lows: Lessons from Bugs, Review Rejections, and Scaling',
      content:
        'It is tempting for developers to present an idealized highlight reel where every launch succeeds and every deployment goes smoothly. In reality, software engineering is defined by how you respond when things break spectacularly under production pressure.\n\nOne of the most intense experiences of my career occurred when an automated inventory sync webhook failed during a client’s nationwide Black Friday flash sale. Within 12 minutes, the store received over 4,500 simultaneous checkout requests. The webhook receiver, built without sufficient queue buffering, became overwhelmed by connection pooling limits. Duplicate orders began processing, and stock levels fell out of synchronization.\n\n### The Post-Mortem and Architectural Overhaul\nInstead of panicking or deflecting responsibility, I implemented an immediate emergency circuit breaker, manually stabilized the order queue, and worked through the night to safeguard the merchant’s operations. Over the subsequent week, I completely re-engineered our webhook processing pipeline using Redis and BullMQ:\n- Asynchronous Ingestion: Webhooks immediately respond with HTTP 200 OK within 50ms upon payload receipt.\n- Idempotency Keys: Every event ID is stored in Redis with a 24-hour TTL, ensuring that duplicate webhooks from Shopify are silently ignored.\n- Exponential Backoff: Failed jobs automatically retry with jitter, preventing downstream database connection starvation.\n\nThat crisis taught me more about distributed reliability than twenty completed tutorials could have. High-stakes failures transform good programmers into resilient systems architects.',
      tip: 'When production issues occur, communicate with absolute transparency. Merchants will forgive a technical glitch if you take ownership, communicate clearly, and present a rock-solid prevention plan.',
    },
    {
      heading: '7. Mindset, Ethics, and Giving Back: The Philosophy of NazmulCodes',
      content:
        'Throughout this journey, technical skills were only half the equation. The other half was personal discipline, ethical integrity, and a mindset centered on long-term compound growth.\n\nIn an era saturated with generic AI-generated code snippets and low-effort copy-paste development, true craftsmanship stands out more than ever. Whether I am writing a simple Liquid snippet or architecting a multi-tenant SaaS backend, I treat the codebase with extreme respect. I write comprehensive comments, optimize database query plans, and test edge cases thoroughly.\n\nFurthermore, I believe that those who manage to break through economic barriers have a moral duty to leave the door open for those coming behind them. Through NazmulCodes, my open-source projects, and technical writing, I am committed to sharing every insight I have gained freely. If a young developer in Dhaka, Khulna, Lagos, or Buenos Aires can read this guide, avoid my early mistakes, and land their first international client, then this work has accomplished its true mission.',
      tip: 'Reputation is your most valuable asset as an engineer. Never compromise on code quality, security, or client honesty for short-term financial gains.',
    },
  ],
  conclusion:
    'Becoming a successful software engineer is not a sprint determined by innate genius. It is a long-distance marathon won by curiosity, relentless consistency, and the courage to tackle difficult problems day after day.\n\nFrom a small room in Bangladesh with an unreliable internet connection to founding published Shopify apps and advising high-growth global merchants, my story proves that dedication and genuine craftsmanship will always find a global audience. Keep building, stay curious, and hold your code to the highest possible standard.',
  faqs: [
    {
      question: 'How long did it take you to become proficient in Shopify app development?',
      answer:
        'It took roughly 14 to 18 months of intensive, daily practical coding to transition from basic web fundamentals to building production-ready embedded Shopify applications with Remix, GraphQL, and Redis queues.',
    },
    {
      question: 'Do you need a Computer Science degree to land high-paying clients on Upwork?',
      answer:
        'No. International clients care about proven business outcomes, store speed improvements, bug-free implementations, and professional communication. A portfolio demonstrating production apps and client testimonials carries far more weight than formal credentials.',
    },
    {
      question: 'What is the difference between Stockly and Kilo?',
      answer:
        'Stockly is an official Shopify App Store application that manages out-of-stock inventory alerts and demand forecasting. Kilo (kilo.nazmulcodes.org) is a 100% client-side, browser-based media compression tool that serves as a standalone privacy-first utility as well as an automated catalog optimization companion for Stockly merchants.',
    },
    {
      question: 'Which framework should I learn for modern Shopify App development in 2026?',
      answer:
        'Remix is the official framework recommended by Shopify. Paired with Polaris for the Admin UI and the GraphQL Admin API via @shopify/shopify-app-remix, it offers the fastest development cycle and most robust production runtime.',
    },
  ],
};
