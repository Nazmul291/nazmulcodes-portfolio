import { ServiceItem } from '~/types/project';

export const servicesData: ServiceItem[] = [
  {
    id: 'shopify-apps',
    title: 'Shopify Embedded & Public App Engineering',
    tagline: 'Production-ready apps approved for the Shopify App Store',
    description: 'Full-stack Shopify applications built with React, Shopify Polaris, App Bridge, GraphQL, Node.js/Python FastAPI, and cloud-native databases. From AI forecasting engines to real-time inventory automation.',
    icon: 'Layers',
    badge: 'Shopify App Store Live',
    features: [
      'Shopify Polaris UI & App Bridge v3 integration',
      'High-throughput GraphQL Admin & Storefront API querying',
      'Idempotent webhook queue processing (Redis / PostgreSQL)',
      'Shopify Recurring Application Charges (Billing API)',
      'GDPR compliance, OAuth 2.0 & App Store Submission readiness'
    ],
    deliverables: [
      'Turnkey Shopify Embedded Admin Apps',
      'Theme App Extensions (App Blocks & Embeds with zero CSS bleed)',
      'Cloud backend infrastructure (Fly.io, AWS, Docker)',
      'Full API documentation & merchant onboarding flows'
    ]
  },
  {
    id: 'bespoke-liquid-themes',
    title: 'Bespoke Liquid Themes (0 Page Builder Bloat)',
    tagline: 'Hand-coded, ultra-fast Online Store 2.0 storefronts',
    description: 'Clean, modular Liquid section architectures built from Figma prototypes. No slow page builders (GemPages/PageFly/Shogun) that ruin load speeds. 100% merchant-editable through deep theme editor schema.',
    icon: 'Code2',
    badge: '100% Merchant Editable',
    features: [
      'Modular custom Liquid sections & reusable block schemas',
      'Zero-dependency native HTML/CSS/JS components',
      'Figma & Adobe XD pixel-perfect conversions',
      'Full WCAG AA accessibility compliance (contrast, keyboard nav, screen readers)',
      'Rich JSON-LD Structured Data for Google search snippets'
    ],
    deliverables: [
      'Complete custom Shopify themes or isolated sections',
      'Custom theme settings & customizer documentation',
      'Mobile-first responsive layouts across 320px–2560px',
      'Non-destructive updates protecting parent themes'
    ]
  },
  {
    id: 'speed-optimization',
    title: 'Core Web Vitals & Speed Optimization',
    tagline: 'Lighthouse 90–100 scores with sub-second LCP and 0 CLS',
    description: 'Surgical performance tuning for high-volume stores. Eliminate render-blocking scripts, refactor jQuery bloat, lazy-load media, and streamline the critical rendering path for maximum conversion.',
    icon: 'Zap',
    badge: 'Lighthouse 90+ Guaranteed',
    features: [
      'Cumulative Layout Shift (CLS) eradication (0.000 target)',
      'Largest Contentful Paint (LCP) reduction below 1.2 seconds',
      'Legacy jQuery removal and pure Vanilla JS refactoring',
      'Shopify CDN image optimization (WebP/AVIF srcsets)',
      'Third-party app script auditing, deferral, and unblocking'
    ],
    deliverables: [
      'Full Before/After Core Web Vitals audit and metrics report',
      'Optimized `theme.liquid` and lightweight asset bundles',
      'Instant AJAX cart drawer and drawer optimization',
      'Ongoing speed maintenance guidelines'
    ]
  },
  {
    id: 'direct-response-funnels',
    title: 'Direct-Response Funnels & Advertorials',
    tagline: 'High-converting DTC landing pages, quizzes & custom funnels',
    description: 'Specialized landing pages engineered for media buyers and high-volume paid campaigns (Meta, TikTok, Google Ads). Modular advertorial layouts, interactive quizzes, postcode water report diagnostics, and sticky mobile conversion bars.',
    icon: 'Target',
    badge: 'High ROAS & Conversion',
    features: [
      'Modular advertorial block architecture (custom editorial sections)',
      'Interactive lead-gen quizzes & postcode diagnostics (e.g. Klense)',
      'Sticky mobile buy bars with dynamic stock counters & variant swatches',
      'Clinical proof comparison matrices and trust proof tickers',
      'Sub-second page load times on mobile 4G networks for cold ad traffic'
    ],
    deliverables: [
      'Direct-response campaign landing page templates',
      'Interactive quiz / diagnostic tools with CRM lead capture',
      'Dynamic multi-pack bundle selector and one-click add-to-cart',
      'Meta Pixel, TikTok & GTM event tracking integration'
    ]
  },
  {
    id: 'custom-engineering-b2b',
    title: 'Complex Configurators, B2B & Custom Logic',
    tagline: 'Overcoming standard Shopify limits with custom code',
    description: 'Solve intricate business logic without expensive monthly app subscriptions. Custom product builders, nested variant option trees, B2B wholesale portals with tiered pricing, and international market routing.',
    icon: 'Cpu',
    badge: 'No 3rd-Party App Fees',
    features: [
      'Multi-level nested product configurators (bypassing 100-variant cap)',
      'B2B wholesale gates, volume pricing, and bulk quick-order grids',
      'Shopify Markets internationalization & multi-currency routing',
      'Postcode diagnostics and interactive lead-generation calculators',
      'Custom subscription flows and dynamic bundle builders'
    ],
    deliverables: [
      'Custom interactive front-end builders & calculators',
      'Metafield-driven data architectures',
      'Custom cart line item attribute pipelines',
      'Wholesale customer onboarding workflows'
    ]
  },
  {
    id: 'figma-conversions-migrations',
    title: 'Figma-to-Shopify & Platform Migrations',
    tagline: 'Pixel-perfect Online Store 2.0 conversion from Figma / XD',
    description: 'Convert complete multi-page design prototypes (10–20+ pages) into scalable, native Shopify themes with custom design tokens. Seamless platform migrations, Shopify Markets international routing, and 100% SEO link equity preservation.',
    icon: 'Palette',
    badge: 'Pixel-Perfect Delivery',
    features: [
      'Complete 10–20+ page design system conversion (PDP, Collection, Cart, Account, FAQ)',
      'Clean CSS custom properties & fluid responsive layouts (320px–4K)',
      'Shopify Markets multi-currency & international URL consolidation',
      '301 redirection maps preserving 100% SEO organic rankings',
      'Automated Metafields & Metaobjects schema configuration'
    ],
    deliverables: [
      'Fully functional Online Store 2.0 Shopify theme',
      'Custom design tokens and component documentation',
      'Zero-downtime store launch & post-migration verification'
    ]
  }
];
