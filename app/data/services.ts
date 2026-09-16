import { ServiceItem } from '~/types/project';

export const servicesData: ServiceItem[] = [
  {
    id: 'shopify-apps',
    title: 'Shopify App Development (Public & Custom Embedded)',
    tagline: 'Official Shopify App Store SaaS & bespoke internal store apps',
    description: 'Full-stack Shopify applications built with React, Shopify Polaris, App Bridge, GraphQL Admin APIs, Node.js/Python, and cloud-native databases. From public multi-tenant App Store SaaS to proprietary private apps tailored to unique merchant workflows.',
    icon: 'Layers',
    badge: 'Official App Store Live',
    features: [
      'Shopify Polaris UI & App Bridge v3 seamless admin integration',
      'High-throughput GraphQL Admin & Storefront API querying',
      'Idempotent webhook queue processing (Redis BullMQ / PostgreSQL)',
      'Shopify Recurring Application Charges (Billing API) & OAuth 2.0',
      'GDPR/CCPA mandatory compliance webhooks & App Store submission'
    ],
    deliverables: [
      'Production-ready Shopify Embedded Apps (Public or Custom)',
      'Theme App Extensions (App Blocks & Embeds with 0 CSS conflict)',
      'Cloud backend infrastructure setup (Docker, VPS, managed database)',
      'Full API documentation, merchant onboarding & ongoing maintenance'
    ]
  },
  {
    id: 'custom-theme-development',
    title: 'Custom Shopify Theme Development (Online Store 2.0)',
    tagline: 'Bespoke, hand-coded Liquid themes with 0 page builder bloat',
    description: 'Clean, modular Liquid section architectures built from Figma prototypes or custom requirements. Zero slow page builders (GemPages, PageFly, Shogun) that ruin store load times. 100% merchant-editable through deep theme editor schema.',
    icon: 'Code2',
    badge: '100% Merchant Editable',
    features: [
      'Custom Liquid section architecture with reusable block schemas',
      'Zero-dependency native HTML5, modern CSS & Vanilla JS components',
      'Pixel-perfect conversion from Figma, Adobe XD & Sketch designs',
      'Mobile-first responsive layouts meticulously tested (320px–4K)',
      'WCAG AA accessibility & built-in JSON-LD Structured Data'
    ],
    deliverables: [
      'Complete custom Shopify theme or standalone bespoke sections',
      'Theme editor settings schema documentation for store staff',
      'Non-destructive updates protecting core store functionality',
      'Cross-browser and multi-device QA verification report'
    ]
  },
  {
    id: 'shopify-automation-workflows',
    title: 'Shopify Automation, Flow Workflows & Payment Gateways',
    tagline: 'Hands-off operational efficiency & seamless payment gateway setup',
    description: 'Automate repetitive store operations, inventory syncing, and customer notifications using Shopify Flow, custom webhooks, and third-party integrations. Full configuration of Shopify Payments, Stripe, PayPal, and regional gateways with multi-currency support.',
    icon: 'Workflow',
    badge: 'Hands-Off Automation',
    features: [
      'Shopify Flow custom trigger, condition & action automation workflows',
      'Shopify Payments, Stripe, PayPal & local gateway setup & testing',
      'Multi-currency & international market routing via Shopify Markets',
      'Automated inventory restock, low-stock & order fulfillment triggers',
      'Webhook dispatchers to Slack, Klaviyo, Asana, Google Sheets & ERPs'
    ],
    deliverables: [
      'Fully automated store operation rules & Shopify Flow setups',
      'Verified payment gateway configuration with 0 checkout friction',
      'End-to-end sandbox & live transaction testing verification',
      'Custom webhook listener endpoints and operational documentation'
    ]
  },
  {
    id: 'shopify-bug-fixes-checkout',
    title: 'Shopify Bug Fixes & Checkout Troubleshooting',
    tagline: 'Rapid emergency resolution for theme, Liquid, JS & checkout errors',
    description: 'Swift, surgical diagnosis and repair of broken Shopify functionality. Fix Liquid syntax errors, JavaScript conflicts, broken cart drawers, mobile layout glitches, and Shopify Checkout Extensibility issues before they cost you sales.',
    icon: 'Wrench',
    badge: 'Same-Day Rapid Fix',
    features: [
      'Liquid syntax error repair and missing template recovery',
      'JavaScript console error debugging & jQuery conflict resolution',
      'Shopify Checkout Extensibility & One-Page Checkout customization fixes',
      'AJAX mini-cart drawer errors, sticky buy button & variant selector glitches',
      'Third-party app conflict auditing and script cleanup'
    ],
    deliverables: [
      'Comprehensive error diagnosis & root cause analysis',
      'Clean, non-destructive code patches committed to your theme',
      'Pre-and-post deployment test verification across devices',
      'Detailed handover notes preventing future recurring issues'
    ]
  },
  {
    id: 'broken-url-seo-redirects',
    title: 'Shopify 301 Redirects, Broken URL Fixes & SEO Migration',
    tagline: 'Eliminate 404 crawl errors & preserve 100% SEO organic rankings',
    description: 'Prevent traffic drops and ranking losses during store redesigns or platform migrations (WooCommerce/Magento to Shopify). Comprehensive audit of broken URLs, automated bulk 301 redirection maps, and canonical hierarchy enforcement.',
    icon: 'Link',
    badge: 'Rankings Protection',
    features: [
      'Full website crawl & 404 broken URL discovery audit',
      'Bulk 301 redirect URL mapping with wildcard regex pattern matching',
      'Legacy platform URL migration (WooCommerce, Magento, BigCommerce)',
      'Google Search Console coverage error remediation & sitemap validation',
      'Canonical tag auditing to eliminate duplicate content penalties'
    ],
    deliverables: [
      'Clean 301 URL redirect mapping file uploaded to Shopify Admin',
      'Zero-404 store crawl report verified through Google Search Console',
      'Preserved Google backlink equity and organic search ranking authority',
      'SEO audit report covering metadata, headings, and internal links'
    ]
  },
  {
    id: 'speed-core-web-vitals',
    title: 'Core Web Vitals & Sub-Second Speed Optimization',
    tagline: 'Lighthouse 90–100 scores with sub-second LCP and 0 CLS',
    description: 'Surgical performance tuning for high-volume stores. Eliminate render-blocking scripts, refactor bloated libraries, optimize Shopify CDN media, and streamline the critical rendering path for maximum conversion rate and organic SEO lift.',
    icon: 'Zap',
    badge: 'Lighthouse 90+ Guaranteed',
    features: [
      'Cumulative Layout Shift (CLS) eradication (0.000 target)',
      'Largest Contentful Paint (LCP) reduction below 1.2 seconds',
      'Legacy jQuery removal and pure modern Vanilla JS refactoring',
      'Shopify CDN responsive image optimization (WebP/AVIF srcsets)',
      'Third-party app script auditing, deferral, and unblocking'
    ],
    deliverables: [
      'Full Before/After Core Web Vitals audit and metrics report',
      'Optimized `theme.liquid` and lightweight asset bundles',
      'Instant AJAX cart drawer and drawer optimization',
      'Ongoing speed maintenance guidelines'
    ]
  }
];
