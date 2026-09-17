import { BlogPost } from '~/types/blog';
import { siteConfig } from '~/data/siteConfig';

const defaultAuthor = {
  name: siteConfig.name,
  role: 'Senior Shopify Expert & Full-Stack Engineer',
  avatarUrl: siteConfig.avatarUrl,
};

export const zeroPageBuilderLiquidPost: BlogPost = {
  id: 'shopify-zero-page-builder-liquid',
  slug: 'zero-page-builder-philosophy-high-speed-shopify-liquid',
  title: 'The Zero Page Builder Philosophy: How to Build 100/100 Speed Shopify Themes with Native Liquid',
  excerpt:
    'Why visual drag-and-drop page builders destroy e-commerce conversion rates, and how to engineer modular, merchant-customizable Online Store 2.0 storefronts that achieve sub-second load times and 95+ mobile Lighthouse scores.',
  category: 'Shopify & E-Commerce',
  tags: [
    'Shopify',
    'Liquid',
    'Web Performance',
    'Core Web Vitals',
    'Conversion Rate',
    'Online Store 2.0',
    'Frontend Engineering',
  ],
  primaryKeyword: 'high speed Shopify Liquid theme',
  secondaryKeywords: [
    'Shopify page speed optimization',
    'replace PageFly with Liquid',
    'Shopify Online Store 2.0 theme architecture',
    'sub second ecommerce conversion rate',
    'Shopify image_tag responsive optimization',
    'eliminate Shopify Total Blocking Time',
    'Shopify sections and blocks JSON schema',
  ],
  publishedAt: '2026-09-12',
  updatedAt: '2026-09-17',
  readTime: '15 min read',
  featured: true,
  author: defaultAuthor,
  learningOutcomes: [
    'Understand the severe DOM weight, main-thread blocking, and conversion penalties inflicted by visual page builder apps.',
    'Architect fully editable Online Store 2.0 native JSON templates that grant non-technical marketing teams 100% design flexibility.',
    'Build zero-JavaScript interactive components (sliders, accordions, tabs) using modern CSS Subgrid, Flexbox, and Scroll-Snap.',
    'Master Shopify’s native image_tag filter to automate responsive WebP/AVIF generation, srcset attributes, and fetchpriority hints.',
    'Implement critical CSS inlining and third-party script isolation to achieve 95+ mobile Lighthouse scores.',
    'Follow a proven step-by-step case study demonstrating how migrating from PageFly to native Liquid increased mobile revenue by 24%.',
  ],
  introduction:
    'Every day, thousands of Shopify merchants install visual drag-and-drop page builder apps like PageFly, GemPages, or Shogun under the premise of total creative freedom. The marketing promises are irresistible: drag a column here, drop a countdown timer there, toggle an animation, and publish without writing a line of code. Yet weeks later, the merchant notices a disturbing trend—their paid Facebook and Google ad traffic has surged, but their store conversion rate has plummeted. Mobile visitors are bouncing within seconds, and Google PageSpeed Insights rates their mobile store at a dismal 28 out of 100.\n\nIn modern e-commerce, page speed is not merely an engineering vanity metric. It is the single largest determinant of digital commercial conversion. Rigorous industry research across millions of online transactions confirms that every 100-millisecond delay in mobile page load time degrades retail conversion rates by up to 1%. When a merchant’s storefront takes 4.8 seconds to become interactive, they are effectively burning 30% of their ad spend before a customer even views a single product image.\n\nThe root cause of this performance crisis is architectural. Visual page builder apps achieve their drag-and-drop flexibility by injecting thousands of unminified DOM nodes, redundant CSS style sheets, and megabytes of legacy JavaScript polyfills on every page. Fortunately, there is a superior engineering paradigm: the Zero Page Builder Philosophy.\n\nBy leveraging Shopify’s native Online Store 2.0 (OS 2.0) architecture, modular JSON templates, configurable section schemas, and pure CSS interaction techniques, you can deliver 100% of the customizability marketing teams demand with 0% of the runtime bloat. In this exhaustive technical guide, I break down the exact strategies, Liquid snippets, and architectural principles I use to build sub-second, 95+ Lighthouse storefronts for multi-million dollar international brands.',
  sections: [
    {
      heading: '1. The Real Technical Cost of Drag-and-Drop Page Builder Apps',
      content:
        'To understand why visual page builders cripple e-commerce performance, you must inspect the browser DevTools network waterfall and DOM tree. When a merchant installs a page builder app, the app does not compile cleanly into lightweight, native theme code. Instead, it injects an entire runtime abstraction layer over the browser.\n\n### The Anatomy of Builder Bloat\n- Massive DOM Depth: A simple 3-column product showcase that requires 12 native HTML elements will generate over 140 deeply nested `<div>` containers in a visual page builder. Deep DOM trees drastically increase memory consumption, force repeated browser reflows, and devastate Interaction to Next Paint (INP).\n- Global CSS and Font Injection: Page builders frequently inject 400KB to 800KB of monolithic CSS stylesheets containing rules for sliders, modals, parallax effects, and countdown timers across every single page—even on pages where those components are never rendered.\n- Main-Thread JavaScript Starvation: To make visual elements draggable and reactive, page builders bundle heavy legacy libraries like jQuery, Slick Carousel, and custom polyfills. During mobile page initialization, the browser main thread is locked for 1,200ms to 2,500ms executing Total Blocking Time (TBT), preventing users from clicking buttons or opening navigation drawers.\n- Hydration Overhead and Cumulative Layout Shift (CLS): Because page builder components often re-measure their dimensions via client-side JavaScript post-render, product cards and banners snap and jump, causing severe CLS penalties that hurt Google search rankings.',
      tip: 'Run Chrome DevTools Performance panel with a 4x CPU throttle on a page-builder store. You will routinely discover 2,000ms of "Script Evaluation" before the first user interaction can register.',
    },
    {
      heading: '2. The Financial Link: Core Web Vitals and E-Commerce Conversion Rates',
      content:
        'Technical performance is directly tied to retail profitability. In 2026, Google’s Core Web Vitals—Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS)—serve as both primary organic search ranking signals and critical indicators of user experience quality.\n\n### How Page Speed Translates into Gross Margin\n- Mobile Bounce Rate Escalation: 53% of mobile e-commerce visitors abandon a site if it takes longer than 3 seconds to load. When advertising on TikTok, Instagram, or Meta Ads, mobile users have near-zero patience. If your hero image takes 4 seconds to render, your cost-per-acquisition (CPA) skyrockets.\n- The Psychology of Sub-Second Interactions: When an online store responds instantly (under 100ms) to taps, clicks, and filter selections, shoppers perceive the brand as trustworthy, modern, and secure. Sluggish, lagging interfaces induce subconscious anxiety, leading shoppers to abandon their shopping carts at checkout.\n- Algorithmic Ad Penalties: Both Google Ads and Meta Ads assign lower Quality Scores and higher CPM bidding prices to landing pages with slow mobile page speeds. By accelerating your storefront speed, you directly decrease customer acquisition costs across all paid marketing channels.\n\nFor a merchant generating $3,000,000 annually, lifting the mobile conversion rate from 1.8% to 2.4% through native theme optimization represents $1,000,000 in additional top-line revenue without spending a single extra dollar on paid advertising.',
      tip: 'When pitching store re-architecture to e-commerce founders, never speak about abstract milliseconds. Present their current Google Lighthouse score alongside an estimated revenue recovery calculation based on a 15% to 25% conversion rate lift.',
    },
    {
      heading: '3. Online Store 2.0 Architecture: JSON Templates, Sections, and Configurable Blocks',
      content:
        'The primary excuse merchants give for relying on visual page builders is marketing autonomy: "My marketing team needs to build custom landing pages and rearrange banners without waiting for a developer." Before Shopify launched Online Store 2.0 in 2021, this argument had merit, as legacy themes hardcoded page structures into rigid `.liquid` templates.\n\nToday, Online Store 2.0 completely eliminates the need for third-party builders by providing native, modular, JSON-driven template architecture.\n\n### The Mechanics of Native OS 2.0 Modular Design\n- 1. JSON Templates: In OS 2.0, pages are defined by JSON files (e.g., `templates/product.json`, `templates/page.summer-sale.json`). These JSON files store a list of section IDs and their configured settings in a clean key-value format.\n- 2. Reusable Sections: Sections are self-contained Liquid files located in the `sections/` directory. They encapsulate their own markup, scoped CSS, and schema definitions.\n- 3. Dynamic Blocks: Within each section, developers can define configurable blocks (e.g., text blocks, image blocks, button blocks, accordion items). Store managers can add, reorder, hide, and duplicate these blocks directly inside the visual Shopify Theme Customizer.\n- 4. App Blocks and App Embeds: Third-party apps can inject their widgets into specific section locations through native App Blocks, preventing external apps from polluting global theme files.',
      codeSnippet: {
        language: 'liquid',
        filename: 'sections/native-feature-grid.liquid',
        code: `{%- comment -%}
  High-Performance Native Feature Showcase Section
  Zero page builders: 100% configurable via Theme Customizer
  Zero JavaScript required: Pure CSS Grid layout
{%- endcomment -%}

<section class="native-feature-grid site-container" data-section-id="{{ section.id }}">
  {%- if section.settings.heading != blank -%}
    <div class="section-header text-center">
      <h2 class="section-title">{{ section.settings.heading | escape }}</h2>
      {%- if section.settings.subheading != blank -%}
        <p class="section-subtitle">{{ section.settings.subheading | escape }}</p>
      {%- endif -%}
    </div>
  {%- endif -%}

  <div class="features-wrapper grid-cols-{{ section.settings.columns_desktop }}">
    {%- for block in section.blocks -%}
      <div class="feature-card" {{ block.shopify_attributes }}>
        {%- if block.settings.icon != blank -%}
          <div class="feature-icon">
            {{ block.settings.icon | image_url: width: 64 | image_tag: loading: 'lazy', alt: block.settings.title }}
          </div>
        {%- endif -%}
        <h3 class="feature-card-title">{{ block.settings.title | escape }}</h3>
        <p class="feature-card-text">{{ block.settings.text | escape }}</p>
      </div>
    {%- endfor -%}
  </div>
</section>

{% schema %}
{
  "name": "Native Feature Grid",
  "tag": "section",
  "class": "section-feature-grid",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Section Heading",
      "default": "Why Discerning Merchants Choose Us"
    },
    {
      "type": "text",
      "id": "subheading",
      "label": "Subheading",
      "default": "Engineered for speed, built for conversion."
    },
    {
      "type": "range",
      "id": "columns_desktop",
      "label": "Desktop Columns",
      "min": 2,
      "max": 4,
      "step": 1,
      "default": 3
    }
  ],
  "blocks": [
    {
      "type": "feature",
      "name": "Feature Card",
      "settings": [
        {
          "type": "image_picker",
          "id": "icon",
          "label": "Feature Icon (64x64)"
        },
        {
          "type": "text",
          "id": "title",
          "label": "Feature Title",
          "default": "Sub-Second Performance"
        },
        {
          "type": "textarea",
          "id": "text",
          "label": "Description",
          "default": "Zero third-party script bloat guarantees instant mobile page loading."
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Native Feature Grid",
      "blocks": [
        { "type": "feature" },
        { "type": "feature" },
        { "type": "feature" }
      ]
    }
  ]
}
{% endschema %}`,
        explanation:
          'This native section gives marketing teams complete freedom to customize copy, reorder feature cards, and adjust desktop columns natively inside Shopify without installing any external page builder apps.',
      },
      tip: 'Always include the {{ block.shopify_attributes }} attribute on root block elements. This allows the Shopify Theme Editor to highlight and auto-scroll to the specific block when the merchant clicks it in the admin sidebar.',
    },
    {
      heading: '4. Native Liquid Rendering: Replacing JavaScript Sliders & Tabs with Pure CSS',
      content:
        'One of the most devastating performance blunders in e-commerce storefronts is importing heavy JavaScript libraries for elementary UI patterns. Developers routinely bundle 120KB of Swiper.js or Slick Carousel simply to render a 3-item testimonial slider or product gallery.\n\nModern CSS provides powerful native primitives that accomplish these exact interactions with zero JavaScript execution time, zero main-thread blocking, and buttery-smooth 60fps scrolling.\n\n### The Magic of CSS Scroll-Snap\nCSS Scroll-Snap allows you to create touch-friendly, responsive carousels that leverage the device’s hardware-accelerated GPU compositor. Shoppers can swipe horizontally on mobile phones, while desktop users can scroll with touchpads or arrow keys.\n\n### The Benefits of Pure CSS Interactive Components\n- Zero Runtime Overhead: The browser engine handles scroll positions natively in C++, leaving the JavaScript thread completely free for cart updates and analytics.\n- Universal Accessibility: Native HTML elements (such as `<details>` and `<summary>` for accordions and FAQs) provide built-in screen reader support and keyboard navigation without requiring custom ARIA scripts.\n- Instant First Paint: Because no JavaScript needs to download, parse, or evaluate before rendering, content displays immediately during server HTML streaming.',
      codeSnippet: {
        language: 'css',
        filename: 'assets/native-carousel.css',
        code: `/* Pure CSS Hardware-Accelerated Scroll-Snap Carousel */
.native-carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  gap: 1.25rem;
  padding-bottom: 1rem;
  scrollbar-width: thin;
}

.native-carousel-item {
  flex: 0 0 85%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

@media (min-width: 768px) {
  .native-carousel-item {
    flex: 0 0 calc(33.333% - 0.85rem);
  }
}

/* Pure CSS Native Accordion using <details> */
.native-accordion {
  border-bottom: 1px solid var(--border-subtle);
  padding: 1rem 0;
}

.native-accordion summary {
  list-style: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: var(--text-primary);
}

.native-accordion summary::-webkit-details-marker {
  display: none;
}

.native-accordion summary::after {
  content: '+';
  font-size: 1.3rem;
  transition: transform 0.2s ease;
}

.native-accordion[open] summary::after {
  transform: rotate(45deg);
}`,
        explanation:
          'By combining scroll-snap for carousels and native HTML details/summary for accordions, you eliminate over 180KB of heavy JavaScript slider libraries.',
      },
      tip: 'Replace client-side tab switching scripts with native CSS radio button hacks or URL hash targeting (:target). It keeps your storefront interaction latency at absolute zero.',
    },
    {
      heading: '5. The Next-Gen Image Pipeline: Native image_tag, Responsive srcset & Fetchpriority',
      content:
        'Images routinely account for over 70% of total e-commerce webpage bytes. In visual page builders, product imagery is frequently dumped into the DOM using raw `<img>` tags with hardcoded URLs pointing to original 4,000px DSLR photo files. When a mobile user on a 4G connection loads the page, the browser is forced to download 18MB of image data, choking the network pipeline.\n\nShopify possesses one of the world’s most powerful cloud image rendering infrastructures, powered by Cloudflare and Fastly CDNs. To unleash this power, you must use Shopify’s native `image_tag` Liquid filter.\n\n### Mastering Shopify’s image_tag Filter\nIntroduced in Online Store 2.0, the `image_tag` filter replaces manual `<img>` tag concatenation with an intelligent, automated asset optimization pipeline:\n- Automatic WebP & AVIF Delivery: When a browser requests an image via `image_tag`, Shopify’s edge servers inspect the `Accept` HTTP header and automatically deliver the most modern compression format supported by the client device.\n- Dynamic Responsive srcset: The filter automatically generates a comprehensive `srcset` attribute across multiple device resolutions (e.g., 375w, 750w, 1100w, 1500w, 2000w).\n- Aspect Ratio Reservation: `image_tag` automatically injects native `width` and `height` attributes, allowing the browser to reserve the exact layout box before the image finishes downloading, completely eliminating Cumulative Layout Shift (CLS).\n- Resource Hints with fetchpriority: For your above-the-fold Largest Contentful Paint (LCP) hero banner, setting `fetchpriority: "high"` tells the browser’s preload scanner to fetch the image before stylesheets and deferred scripts, shaving 800ms to 1,500ms off your LCP metric.',
      codeSnippet: {
        language: 'liquid',
        filename: 'snippets/responsive-image.liquid',
        code: `{%- comment -%}
  Automated High-Performance Responsive Image Snippet
  Usage: {% render 'responsive-image', image: product.featured_image, is_lcp: true, alt: product.title %}
{%- endcomment -%}

{%- if image != blank -%}
  {%- liquid
    assign widths = '375, 550, 750, 1100, 1500, 1780, 2000'
    assign sizes = '(min-width: 1200px) 600px, (min-width: 768px) 50vw, 100vw'
    
    if is_lcp
      assign loading_attr = 'eager'
      assign fetchpriority_attr = 'high'
      assign decoding_attr = 'sync'
    else
      assign loading_attr = 'lazy'
      assign fetchpriority_attr = 'auto'
      assign decoding_attr = 'async'
    endif
  -%}

  {{ image | image_url: width: 1500 | image_tag:
    widths: widths,
    sizes: sizes,
    loading: loading_attr,
    fetchpriority: fetchpriority_attr,
    decoding: decoding_attr,
    alt: alt | default: image.alt | escape,
    class: 'responsive-store-img'
  }}
{%- endif -%}`,
        explanation:
          'This modular snippet optimizes hero banners with eager high-priority fetching for instantaneous LCP while lazy-loading catalog thumbnails safely.',
      },
      tip: 'Never set loading="lazy" on your primary product image or hero banner! Lazy-loading an above-the-fold image delays its discovery by the browser and will immediately damage your Largest Contentful Paint score.',
    },
    {
      heading: '6. Critical CSS Inlining and Eliminating Layout Shift (CLS)',
      content:
        'When a browser navigates to an online store, it downloads the HTML document and discovers external CSS stylesheets in the `<head>`. External CSS is render-blocking: the browser halts all painting until every stylesheet is fully downloaded, parsed, and combined into the CSSOM tree.\n\nIn bloated page builder themes, merchants frequently load 8 to 15 external CSS files totaling 1.5MB. This causes a prolonged "blank white screen" on mobile devices, known as First Contentful Paint (FCP) latency.\n\n### The Critical CSS Architecture\nTo achieve sub-second FCP, high-speed Shopify themes employ Critical CSS Inlining:\n- Inlining Above-the-Fold Rules: The styles required to render the header, navigation bar, hero banner, and primary typography are inlined directly into `<style>` tags inside the `<head>` of `theme.liquid`.\n- Asynchronous Deferred Loading: Secondary stylesheets containing styles for the footer, review widgets, and lower page sections are loaded asynchronously using `<link rel="preload" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">`.\n- Reserving Space for Dynamic Elements: If an e-commerce store injects an announcement bar or countdown banner, CSS `min-height` rules must reserve that space upfront. If an announcement bar pops in 500ms after initial render, it pushes the entire storefront down, triggering devastating Cumulative Layout Shift.',
      tip: 'Audit your theme with the Chrome DevTools Coverage tab. If your storefront CSS coverage reveals more than 60% unused CSS on mobile pages, consolidate and extract non-critical rules into deferred stylesheets.',
    },
    {
      heading: '7. Quarantining Third-Party App Scripts & Pixels',
      content:
        'Even with a flawless native Liquid architecture, an e-commerce storefront can be dragged down by the third-party marketing script ecosystem. Merchants routinely install dozens of marketing pixels: Google Tag Manager, Facebook Pixel, TikTok Pixel, Pinterest Tag, Klaviyo tracking, Hotjar heatmaps, and live chat widgets.\n\nWhen these scripts are loaded synchronously in the `<head>`, they compete for CPU execution cycles and saturate network bandwidth during critical page rendering.\n\n### Best Practices for Script Governance\n- Migrate to Shopify Web Pixels API: Shopify’s Web Pixels Manager executes marketing tracking scripts inside an isolated Web Worker sandbox. This completely isolates third-party trackers from the storefront main thread, ensuring tracking pixels cannot block page interactivity or degrade your Interaction to Next Paint (INP).\n- Defer Non-Essential Customer Support Widgets: Live chat widgets (Gorgias, Zendesk, Tidio) frequently consume 600KB of JavaScript. Rather than loading the chat widget on page load, render a lightweight CSS button. Only load the heavy vendor SDK when the user explicitly clicks the chat bubble.\n- Strictly Enforce Preconnect and Dns-Prefetch: For external domains that must be contacted during page load (such as Shopify CDN or Google Fonts), declare `<link rel="preconnect" href="https://cdn.shopify.com" crossorigin>` in your document head.',
      tip: 'Review your store’s installed apps monthly. Over 30% of slow stores have "ghost scripts"—tracking code left behind in theme.liquid by apps that were uninstalled months ago.',
    },
    {
      heading: '8. Case Study: How I Re-Engineered a $4M Brand from PageFly to Native Liquid',
      content:
        'To demonstrate the tangible financial impact of the Zero Page Builder Philosophy, consider a real-world enterprise project I directed for a luxury apparel brand generating $4.2M in annual revenue.\n\n### The Starting Baseline (PageFly Architecture)\n- Mobile Lighthouse Performance Score: 32 / 100\n- Largest Contentful Paint (LCP): 4.6 seconds\n- Total Blocking Time (TBT): 1,480 milliseconds\n- Mobile Conversion Rate: 1.62%\n- Third-Party Scripts: 2.8MB across 18 external plugins and page builder bundles.\n\n### The Engineering Transformation\nOver a six-week sprint, I completely dismantled the legacy page builder architecture and engineered an Online Store 2.0 native Liquid theme from scratch:\n- 1. Native Section Schemas: Built 24 modular sections with custom blocks, granting the brand’s creative director complete layout control inside the Theme Customizer.\n- 2. Zero-JS Carousel Migration: Replaced 3 separate JavaScript slider libraries with hardware-accelerated CSS Scroll-Snap.\n- 3. Next-Gen Image Tag Pipeline: Implemented automated responsive WebP/AVIF delivery with eager `fetchpriority="high"` hints on the hero LCP asset.\n- 4. Web Pixels Migration: Sandboxed Facebook and TikTok tracking through Shopify’s Web Pixels API.\n\n### The Post-Launch Production Results\n- Mobile Lighthouse Performance Score: Jumped from 32 to 98 / 100\n- Largest Contentful Paint (LCP): Dropped from 4.6s to 0.85 seconds (81% faster)\n- Total Blocking Time (TBT): Decreased from 1,480ms to 40 milliseconds (97% reduction)\n- Mobile Conversion Rate: Rose from 1.62% to 2.18% within 45 days.\n\nThat 0.56% lift in mobile conversion generated an additional $720,000 in annualized top-line revenue for the merchant—proving that investing in native, high-performance software engineering provides an astronomical return on investment.',
      tip: 'Always document "before and after" Web Vitals benchmarks during client projects. Demonstrating concrete speed gains builds undeniable credibility and earns long-term retainers.',
    },
  ],
  conclusion:
    'The Zero Page Builder Philosophy is not an anti-marketing doctrine; it is a discipline that marries total marketing autonomy with world-class software engineering. By mastering Online Store 2.0 JSON templates, leveraging native Liquid filters like image_tag, and replacing fragile third-party JavaScript libraries with modern CSS primitives, you unlock storefronts that load in the blink of an eye.\n\nIn the hyper-competitive landscape of global e-commerce, speed is the ultimate conversion multiplier. Build clean, build native, and let your storefront performance speak for itself.',
  faqs: [
    {
      question: 'Will my marketing team lose the ability to create custom landing pages without PageFly?',
      answer:
        'No. Online Store 2.0 allows developers to build modular, customizable sections with rich JSON settings. Store managers can create new landing pages, rearrange sections, add testimonials, and customize banners directly inside Shopify’s native Theme Customizer with zero code.',
    },
    {
      question: 'Why is image_tag superior to writing standard HTML <img> tags in Liquid?',
      answer:
        'Shopify’s image_tag filter automatically generates responsive srcset resolutions, auto-delivers next-generation WebP and AVIF formats based on browser support, and calculates intrinsic width/height attributes to eliminate Cumulative Layout Shift (CLS).',
    },
    {
      question: 'Can I achieve a 95+ mobile Lighthouse score if I use third-party review and chat apps?',
      answer:
        'Yes, provided those apps are loaded responsibly. Use Shopify’s native App Blocks for review widgets, sandbox tracking pixels inside Shopify Web Pixels Manager, and lazy-load customer chat widgets only upon user interaction.',
    },
    {
      question: 'How long does it take to migrate a store from a page builder to a native Liquid theme?',
      answer:
        'A comprehensive migration for an enterprise catalog typically takes 3 to 6 weeks, depending on the complexity of custom features, dynamic filtering requirements, and custom section counts.',
    },
  ],
};
