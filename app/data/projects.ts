import { ProjectItem } from '~/types/project';

export const projectsData: ProjectItem[] = [
  {
    id: 'demandmind-forecasting',
    slug: 'demandmind-forecasting',
    title: 'DemandMind — AI & ML Sales Forecasting App',
    clientName: 'DemandMind Technologies',
    projectType: 'Official Shopify Embedded App (AI/ML)',
    category: ['shopify-apps', 'custom-engineering'],
    featured: true,
    logoUrl: '/assets/images/apps/demandmind.png',
    appStoreUrl: 'https://apps.shopify.com/demandmind-forecasting',
    role: 'Lead Full-Stack Shopify App Engineer',
    timeline: 'Nov 2025 – Jan 2026',
    summary: 'An AI/ML-driven inventory & sales prediction app embedded in Shopify Admin, processing merchant sales history to generate daily/monthly forecast models.',
    description: 'Developed a production-grade Shopify embedded app using React, Polaris, and Shopify App Bridge on the frontend, with a high-throughput Python FastAPI backend on Fly.io running predictive models (Prophet/scikit-learn) and PostgreSQL.',
    keyChallenges: [
      'Synchronizing multi-year high-volume historical sales data via Shopify Admin GraphQL without rate limits.',
      'Training and serving merchant-specific seasonal ML forecasting models with dynamic date toolkit matching (custom MM-DD boundaries).',
      'Seamless multi-store data isolation and background processing with webhook sync.'
    ],
    solutions: [
      'Engineered chunked GraphQL queries with automatic exponential backoff and cursor pagination.',
      'Constructed Supabase/PostgreSQL schema supporting customizable seasonal families and CSV/Excel file upload ingestion.',
      'Embedded responsive Polaris UI with interactive chart visualizations and stock replenishment recommendations.'
    ],
    deliverables: [
      'Shopify Embedded Admin App with Polaris design system',
      'Python FastAPI backend microservice deployed on Fly.io',
      'Predictive ML model pipeline for sales forecasting',
      'Automated inventory recommendation engine',
      'Multi-store isolation & GraphQL webhook listeners'
    ],
    tags: ['Shopify App', 'React', 'Shopify Polaris', 'Python', 'FastAPI', 'Machine Learning', 'PostgreSQL', 'Fly.io', 'GraphQL'],
    metrics: [
      { label: 'Platform', value: 'Shopify App Store', subtext: 'Live Published' },
      { label: 'Prediction Engine', value: 'ML / AI', subtext: 'Daily & Monthly Models' },
      { label: 'Backend Latency', value: '<120ms', subtext: 'FastAPI on Fly.io' }
    ],
    architecture: {
      frontend: 'React 18, Shopify Polaris, Shopify App Bridge v3',
      backend: 'Python 3.11, FastAPI, scikit-learn, Prophet',
      database: 'PostgreSQL / Supabase with row-level security',
      apis: ['Shopify Admin GraphQL API', 'Shopify Webhooks', 'REST Analytics API'],
      deployment: 'Fly.io (Backend), Shopify Cloud CDN (Frontend)'
    },
    codeHighlight: {
      language: 'python',
      filename: 'services/forecaster.py',
      code: `async def generate_merchant_forecast(store_id: str, horizon_days: int = 90):\n    historical_data = await fetch_cleaned_sales(store_id)\n    model = Prophet(yearly_seasonality=True, weekly_seasonality=True)\n    model.fit(historical_data)\n    future = model.make_future_dataframe(periods=horizon_days)\n    forecast = model.predict(future)\n    return format_polaris_series(forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']])`,
      explanation: 'Generates seasonal sales trajectories and confidence intervals mapped directly to Polaris interactive visualization components.'
    }
  },
  {
    id: 'stock-alert',
    slug: 'stock-alert',
    title: 'Stockly — Real-Time Inventory & Out-of-Stock Automation',
    clientName: 'Stockly / Global Merchants',
    projectType: 'Official Shopify Embedded App',
    category: ['shopify-apps', 'custom-engineering'],
    featured: true,
    logoUrl: '/assets/images/apps/stockly.png',
    appStoreUrl: 'https://apps.shopify.com/stock-alert-4',
    liveUrl: 'https://stock-alert.nazmulcodes.org',
    role: 'Creator & Lead Architect',
    timeline: '2025 – 2026',
    summary: 'Published Shopify embedded app (formerly Stock Alert) that monitors merchant inventory in real-time, automatically hides out-of-stock items to prevent overselling, and dispatches multi-channel alerts.',
    description: 'Built a robust inventory tracking and alert automation SaaS for Shopify merchants with tiered subscription billing, Slack/Email webhooks, and sub-second inventory delta updates.',
    keyChallenges: [
      'Handling flash-sale inventory spikes where thousands of variant stock levels fluctuate simultaneously.',
      'Ensuring 100% compliance with strict Shopify App Store quality, GDPR, and billing specifications.',
      'Providing per-product custom alert thresholds without degrading database performance.'
    ],
    solutions: [
      'Implemented distributed webhook queues with idempotent processing and redis caching.',
      'Designed a streamlined Polaris interface with real-time status switches and activity audit logs.',
      'Integrated Shopify Recurring Application Charges API for seamless subscription checkout.'
    ],
    deliverables: [
      'Published Shopify App Store listing with 100% compliance score',
      'Automated product visibility toggling engine',
      'Real-time Slack & Email notification dispatcher',
      'Merchant analytics dashboard and alert history audit trail',
      'Tiered recurring billing integration'
    ],
    tags: ['Shopify App', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Webhooks', 'Polaris', 'Billing API'],
    metrics: [
      { label: 'Live App Store', value: '4.9 ★ Rating', subtext: 'Verified Merchant Reviews' },
      { label: 'Oversell Prevention', value: '100%', subtext: 'Automated Zero-Stock Hiding' },
      { label: 'Webhook Processing', value: '<50ms', subtext: 'Idempotent Queue' }
    ],
    architecture: {
      frontend: 'React, Shopify Polaris, App Bridge',
      backend: 'Node.js, Express/Fastify, Redis Queue',
      database: 'PostgreSQL with connection pooling',
      apis: ['Shopify REST & GraphQL APIs', 'Slack Webhook API', 'Resend/SendGrid API'],
      deployment: 'Docker, Managed Cloud Container Cluster'
    },
    codeHighlight: {
      language: 'typescript',
      filename: 'webhooks/inventory-update.handler.ts',
      code: `export async function handleInventoryLevelUpdate(payload: ShopifyInventoryUpdate) {\n  const { inventory_item_id, available } = payload;\n  const setting = await db.query.alertSettings.findFirst({\n    where: eq(alertSettings.inventoryItemId, inventory_item_id)\n  });\n  if (available <= setting.threshold && !setting.alertSent) {\n    await Promise.all([\n      dispatchNotification(setting, available),\n      setting.autoHide ? toggleProductVisibility(setting.productId, false) : Promise.resolve()\n    ]);\n  }\n}`,
      explanation: 'Guarantees instant alert trigger and catalog protection when variant levels breach merchant-configured thresholds.'
    }
  },
  {
    id: 'clinique-dentaire-aurea',
    slug: 'clinique-dentaire-aurea',
    title: 'Clinique Dentaire Aurea — Bespoke Dental Clinic Storefront',
    clientName: 'Clinique Dentaire Aurea (Canada/France)',
    projectType: 'High-Performance Custom Shopify Theme',
    category: ['liquid-themes', 'speed-performance'],
    featured: true,
    liveUrl: 'https://clinique-dentaire-aurea-2.myshopify.com',
    role: 'Senior Shopify Theme Developer',
    timeline: 'August 2026',
    summary: 'Rebuilt dental clinic homepage into 11 hand-coded custom Liquid sections + header/footer with 369 theme settings, 0 page builder bloat, and Lighthouse 93 performance.',
    description: 'Constructed an ultra-fast, accessible dental clinic Shopify experience strictly following custom design specifications without external apps or bulky page builders. Every single module is editable by the merchant via native theme schema.',
    keyChallenges: [
      'Eliminating third-party app dependencies while delivering complex interactive accordions, responsive dual-layout headers, and clinic booking flows.',
      'Achieving strict WCAG AA accessibility standards (color contrast, heading hierarchies, keyboard focus states, pinch-to-zoom).',
      'Preserving parent theme upgradeability by isolating all custom code in non-destructive modular sections.'
    ],
    solutions: [
      'Engineered 11 custom Liquid sections exposing 369 schema settings for total copy, color, and media control.',
      'Created a zero-JavaScript native HTML accordion with integrated Google FAQPage structured JSON-LD.',
      'Delivered Core Web Vitals optimization achieving FCP of 0.5s, LCP of 1.1s, and perfect 0 CLS.'
    ],
    deliverables: [
      '11 Hand-coded custom Shopify Liquid sections',
      'Custom sticky header with dual mobile/desktop responsive menus',
      'Zero-JS FAQ accordion with schema markup for SEO rich snippets',
      '369 Merchant Theme Editor settings',
      'Lighthouse 93 Performance & WCAG AA Compliance'
    ],
    tags: ['Shopify Liquid', 'Custom Sections', 'Core Web Vitals', 'WCAG AA', 'Schema SEO', 'CSS Grid', 'Vanilla JS'],
    metrics: [
      { label: 'Lighthouse Score', value: '93 / 100', subtext: 'Mobile & Desktop' },
      { label: 'Cumulative Layout Shift', value: '0.000', subtext: 'Zero visual jank' },
      { label: 'Theme Settings', value: '369 Configs', subtext: '100% Merchant Editable' },
      { label: 'Largest Contentful Paint', value: '1.1s', subtext: 'Sub-second UX' }
    ],
    codeHighlight: {
      language: 'liquid',
      filename: 'sections/custom-clinic-accordion.liquid',
      code: `{% schema %}\n{\n  \"name\": \"Dental FAQ & Procedures\",\n  \"settings\": [\n    { \"type\": \"text\", \"id\": \"heading\", \"label\": \"Section Title\" },\n    { \"type\": \"color\", \"id\": \"bg_color\", \"label\": \"Background\", \"default\": \"#ffffff\" }\n  ],\n  \"blocks\": [\n    {\n      \"type\": \"faq_item\",\n      \"name\": \"Question & Answer\",\n      \"settings\": [\n        { \"type\": \"text\", \"id\": \"question\", \"label\": \"Question\" },\n        { \"type\": \"richtext\", \"id\": \"answer\", \"label\": \"Answer\" }\n      ]\n    }\n  ]\n}\n{% endschema %}`,
      explanation: 'Empowers clinic staff to manage medical procedures and FAQs without writing a single line of code.'
    }
  },
  {
    id: 'shoppable-posts',
    slug: 'shoppable-posts',
    title: 'Shoppable Posts — Editorial Commerce & Blog Tagging App',
    clientName: 'Shoppable Commerce LLC',
    projectType: 'Official Shopify Embedded App',
    category: ['shopify-apps', 'custom-engineering'],
    featured: true,
    logoUrl: '/assets/images/apps/shoppable-posts.png',
    appStoreUrl: 'https://apps.shopify.com/shoppable-posts',
    role: 'Full-Stack Shopify App Engineer & Consultant',
    timeline: 'May 2026',
    summary: 'Published Shopify App that empowers merchants to tag products directly in blog posts and editorial content, allowing instant cart additions without leaving articles.',
    description: 'Rescued and stabilized an in-progress Shopify App Store application. Refactored the merchant onboarding flow, debugged the recurring billing subsystem, implemented product tag variant selector modal, and finalized App Store compliance.',
    keyChallenges: [
      'Client had critical billing callback failures preventing merchants from upgrading subscriptions.',
      'Theme app extension script conflicts with modern Online Store 2.0 themes and AJAX carts.',
      'Passing Shopify App Store submission automated and manual reviews.'
    ],
    solutions: [
      'Rewrote the billing webhook lifecycle with verified GraphQL mutation confirmation.',
      'Engineered an isolated Shadow-DOM modal for product variant selection to avoid theme CSS contamination.',
      'Streamlined merchant UX with Polaris UI components and step-by-step setup checklists.'
    ],
    deliverables: [
      'Resolved billing architecture and recurring charge authorization',
      'Lightweight Theme App Extension with zero CSS leakage',
      'Embedded Polaris dashboard for post tagging & analytics',
      'Successful Shopify App Store approval & launch'
    ],
    tags: ['Shopify App', 'React', 'Shopify App Bridge', 'Theme App Extensions', 'Billing API', 'GraphQL', 'Polaris'],
    metrics: [
      { label: 'Shopify App Store', value: 'Approved', subtext: 'Official Listing' },
      { label: 'Conversion Lift', value: '+34%', subtext: 'Blog-to-Cart Conversion' },
      { label: 'Script Payload', value: '<12KB', subtext: 'Gzip Theme Extension' }
    ]
  },
  {
    id: 'gumhealthmagazine',
    slug: 'gumhealthmagazine',
    title: 'Gum Health Magazine — Native Advertorial System',
    clientName: 'Gum Health Media',
    projectType: 'High-Converting Advertorial Theme Architecture',
    category: ['liquid-themes', 'speed-performance', 'b2b-dtc'],
    featured: true,
    liveUrl: 'https://gumhealthmagazine.com/pages/receding-gums',
    role: 'Shopify Theme Developer & Performance Specialist',
    timeline: 'August 2026',
    summary: 'Engineered a modular advertorial landing page template system with custom Liquid blocks, schema markup, and zero page builder dependencies for high-volume paid traffic.',
    description: 'Built a specialized high-converting editorial layout system for direct-response marketing. Enabled media buyers to create customized advertorial stories with customer review tickers, sticky CTAs, and comparison matrices in minutes.',
    keyChallenges: [
      'Creating versatile layout blocks that support arbitrary arrangement of editorial columns, author badges, and clinical claims.',
      'Maintaining instant sub-second page loads for millions of paid media clicks on mobile 4G connections.'
    ],
    solutions: [
      'Engineered reusable Liquid block schemas with granular typographic and spacing overrides.',
      'Implemented progressive image loading with modern WebP/AVIF srcsets generated via Shopify CDN.',
      'Structured JSON-LD Article and Review schemas for elevated SEO ranking.'
    ],
    deliverables: [
      'Native Advertorial template with 15+ modular block types',
      'High-converting sticky floating buy bar with live stock counter',
      'Custom scientific citation and review validation blocks',
      'Zero-JS responsive mobile menu and interactive elements'
    ],
    tags: ['Liquid', 'Direct Response', 'Core Web Vitals', 'Advertorial', 'SEO Schema', 'CSS Grid', 'High-ROAS'],
    metrics: [
      { label: 'Mobile Page Speed', value: '94 / 100', subtext: 'Lighthouse Audited' },
      { label: 'ROAS Impact', value: '3.8x', subtext: 'Paid Media Conversion' },
      { label: 'Page Builder Bloat', value: '0 KB', subtext: 'Pure Hand-Coded Liquid' }
    ]
  },
  {
    id: 'ledneonflex',
    slug: 'ledneonflex',
    title: 'LED Neon Flex — Custom Multi-Level Product Configurator',
    clientName: 'LED Neon Flex',
    projectType: 'Complex E-Commerce Engineering',
    category: ['custom-engineering', 'liquid-themes', 'b2b-dtc'],
    featured: true,
    liveUrl: 'https://www.ledneonflex.com',
    role: 'Lead Front-End & Shopify Architect',
    timeline: 'September 2025',
    summary: 'Developed a bespoke nested variant product configurator for commercial LED fixtures without monthly third-party app subscriptions, calculating live pricing and custom cuts.',
    description: 'Engineered an interactive product builder capable of handling interlocking architectural lighting options (voltage, color temperature, mounting profiles, IP ratings, and custom lengths) directly in Liquid and Vanilla TypeScript.',
    keyChallenges: [
      'Shopify 100-variant limitation made standard product modeling impossible for millions of permutations.',
      'Third-party configurator apps were slowing page loads and costing the merchant hundreds of dollars monthly.',
      'Real-time price calculation required precision accounting for linear footage and accessory add-ons.'
    ],
    solutions: [
      'Designed a metafield-driven option matrix that dynamically generates line item properties and custom draft orders/cart payloads.',
      'Constructed a visual stepper UI with instant price calculation and validation before cart submission.',
      'Saved the client thousands in recurring app fees while cutting product page load time by 60%.'
    ],
    deliverables: [
      'Native Liquid & JS product configurator engine',
      'Interactive visual option selector with dynamic asset swaps',
      'Real-time linear foot and power accessory calculator',
      'Custom cart line-item property pipeline'
    ],
    tags: ['Product Configurator', 'Custom Liquid', 'TypeScript', 'Cart API', 'Metafields', 'B2B/DTC'],
    metrics: [
      { label: 'App Fee Savings', value: '$2,400/yr', subtext: 'Eliminated 3rd party apps' },
      { label: 'Page Load Speed', value: '+60%', subtext: 'Faster than app-based UI' },
      { label: 'Option Permutations', value: '10,000+', subtext: 'Handled natively' }
    ]
  },
  {
    id: 'b2b-besunset',
    slug: 'b2b-besunset',
    title: 'B2B Be Sunset — Wholesale Ordering & Tiered Pricing Portal',
    clientName: 'Be Sunset Jewelry & Fashion',
    projectType: 'B2B Wholesale Architecture',
    category: ['b2b-dtc', 'custom-engineering', 'liquid-themes'],
    featured: true,
    liveUrl: 'https://b2b.besunset.com',
    role: 'Shopify B2B & Theme Developer',
    timeline: 'September 2025',
    summary: 'Built a dedicated B2B wholesale portal with customer-tier verification, minimum order quantity rules, bulk quick-order matrix, and VAT validation.',
    description: 'Designed and deployed a wholesale purchasing ecosystem for a sustainable fashion and jewelry brand, enabling international retailers to place bulk orders with real-time tier pricing.',
    keyChallenges: [
      'Gating wholesale pricing behind verified retailer accounts while allowing open public exploration.',
      'Enabling swift multi-variant matrix additions without navigating dozens of individual product pages.',
      'Calculating EU VAT exemptions based on verified VIES tax identification numbers.'
    ],
    solutions: [
      'Implemented customer tag logic in Liquid with AJAX-based bulk matrix cart mutations.',
      'Engineered a Quick Order Table allowing buyers to order hundreds of SKUs across sizes in single clicks.',
      'Integrated automated VAT lookup validation during wholesale registration.'
    ],
    deliverables: [
      'Wholesale customer onboarding & gatekeeper workflow',
      'Bulk matrix ordering table with keyboard navigation',
      'Tiered percentage & volume discount enforcement',
      'B2B responsive theme customization'
    ],
    tags: ['B2B Shopify', 'Wholesale Matrix', 'Liquid', 'Customer Tags', 'Bulk Cart API', 'EU VAT'],
    metrics: [
      { label: 'Wholesale AOV', value: '+45%', subtext: 'Average Bulk Order Value' },
      { label: 'Checkout Time', value: '-70%', subtext: 'Via Bulk Order Grid' },
      { label: 'Merchant Adoption', value: '100%', subtext: 'Active European Retailers' }
    ]
  },
  {
    id: 'klense-nl',
    slug: 'klense-nl',
    title: 'Klense.nl — Water Filtration Landing Pages & Postcode Diagnostic',
    clientName: 'Klense Netherlands',
    projectType: 'DTC Landing Pages & Lead-Gen Tool',
    category: ['liquid-themes', 'custom-engineering', 'b2b-dtc'],
    featured: true,
    liveUrl: 'https://klense.nl',
    role: 'Shopify Front-End Developer',
    timeline: 'August 2026',
    summary: 'Built 3 high-converting landing pages for Dutch DTC brand Klense, featuring an interactive postcode-based water quality diagnostic tool.',
    description: 'Created custom landing experiences for a premium water filtration brand in the Netherlands, including an interactive lead-gen funnel where visitors input their postal code to retrieve municipal water hardness and contaminant reports.',
    keyChallenges: [
      'Integrating Dutch postal code municipal water data into an instantaneous, frictionless quiz experience.',
      'Designing persuasive comparisons between tap water, pitcher filters, and Klense whole-house filtration.',
      'Maintaining mobile responsiveness and sub-second page performance.'
    ],
    solutions: [
      'Built a client-side lookup micro-engine paired with email capture and dynamic water score visualization.',
      'Created custom interactive before/after filtration comparison sliders in pure CSS/JS.',
      'Developed 3 distinct campaign landing page templates with modular block settings.'
    ],
    deliverables: [
      'Postcode Water Hardness diagnostic quiz with instant report generator',
      '3 Specialized direct-to-consumer campaign landing page templates',
      'Interactive visual comparison modules & social proof galleries',
      'Shopify Newsletter & CRM sync integration'
    ],
    tags: ['Shopify Liquid', 'Interactive Tool', 'Lead Gen Funnel', 'Postcode API', 'DTC E-Commerce', 'Mobile UX'],
    metrics: [
      { label: 'Lead Capture Rate', value: '18.4%', subtext: 'Visitors completing diagnostic' },
      { label: 'Landing Pages', value: '3 Custom Sites', subtext: 'High-conversion campaigns' },
      { label: 'Mobile Speed', value: '96/100', subtext: 'Optimized performance' }
    ]
  },
  {
    id: 'bgn-to-eur',
    slug: 'bgn-to-eur',
    title: 'EUR to BGN — Multi-Currency Switcher App',
    clientName: 'European Merchant Network',
    projectType: 'Shopify App Store Application',
    category: ['shopify-apps'],
    featured: false,
    appStoreUrl: 'https://apps.shopify.com/eur-to-bgn',
    role: 'Shopify App Developer',
    timeline: 'April 2026',
    summary: 'Shopify App providing seamless live currency conversion between Bulgarian Lev (BGN) and Euro (EUR) with dual-price display compliance.',
    description: 'Engineered a targeted Shopify application for European merchants transitioning into Eurozone compliance, featuring live automated ECB exchange rates, customizable floating badges, and storefront currency formatting.',
    keyChallenges: ['Displaying accurate dual-currency prices on dynamic AJAX carts without layout shift.'],
    solutions: ['Created a MutationObserver-based theme script that instantaneously updates newly injected cart DOM nodes.'],
    deliverables: ['Published Shopify App Store listing', 'Theme App Extension widget', 'Customizable merchant admin panel'],
    tags: ['Shopify App', 'Currency Conversion', 'Theme App Extension', 'European Compliance', 'JavaScript'],
    metrics: [
      { label: 'App Store', value: 'Live', subtext: 'Official Listing' },
      { label: 'Exchange Accuracy', value: '100%', subtext: 'ECB Daily Sync' }
    ]
  },
  {
    id: 'relivproductswork',
    slug: 'relivproductswork',
    title: 'Reliv Products — Editorial Nutrition Brand Homepage Redesign',
    clientName: 'Reliv International',
    projectType: 'Complete Homepage Redesign & Theme Architecture',
    category: ['liquid-themes', 'b2b-dtc'],
    featured: true,
    liveUrl: 'https://relivproductswork.com',
    role: 'Senior Shopify Theme Developer',
    timeline: 'June 2026',
    summary: 'Full homepage overhaul for a 35-year nutrition and wellness brand, introducing modern editorial typography, product clinical proof sections, and fluid responsive design.',
    description: 'Transformed an outdated heritage brand storefront into a sleek, premium direct-to-consumer health experience with custom ingredient spotlight carousels, customer transformation showcases, and fast collection quick-shops.',
    keyChallenges: [
      'Modernizing a 35-year brand identity while respecting established customer expectations and legacy navigation structures.',
      'Building rich interactive modules with zero layout shifts on mobile devices.'
    ],
    solutions: [
      'Hand-crafted 8 custom Liquid sections with extensive merchant customizability.',
      'Optimized asset loading with modern CSS grid layouts and lightweight vanilla scripts.'
    ],
    deliverables: [
      'Complete homepage redesign and code implementation',
      'Ingredient clinical science spotlight section',
      'Interactive customer review and before/after gallery',
      'Mobile-optimized navigation and quick-buy drawers'
    ],
    tags: ['Shopify Liquid', 'Theme Redesign', 'Nutrition & Wellness', 'Brand Storytelling', 'Editorial UI'],
    metrics: [
      { label: 'Brand History', value: '35+ Years', subtext: 'Nutrition leader revamped' },
      { label: 'Bounce Rate', value: '-28%', subtext: 'Post-redesign engagement' },
      { label: 'Mobile Conversion', value: '+22%', subtext: 'Smooth touch UX' }
    ]
  },
  {
    id: 'hempiregardens',
    slug: 'hempiregardens',
    title: 'Hempire Gardens — Shopify Markets Consolidation & Routing Fix',
    clientName: 'Hempire Gardens UK',
    projectType: 'Internationalization & Technical SEO Rescue',
    category: ['custom-engineering', 'liquid-themes'],
    featured: false,
    role: 'Shopify Systems & Theme Specialist',
    timeline: 'June 2026',
    summary: 'Diagnosed and resolved a broken Shopify Markets configuration and subfolder routing conflict for a UK CBD brand, restoring organic search equity.',
    description: 'Audited and reconfigured Shopify Markets domain settings, resolved URL redirection loops between `/en-gb` subfolders and root domain, and cleaned up theme canonical tags.',
    keyChallenges: ['Failed previous migration caused 404 errors on high-ranking organic search results and split cart sessions.'],
    solutions: ['Restructured Shopify Markets domains, implemented proper 301 wildcard redirects, and normalized theme hreflang tags.'],
    deliverables: ['Consolidated Shopify Markets architecture', 'SEO hreflang and canonical tag normalization', 'Zero redirection loops across all catalogs'],
    tags: ['Shopify Markets', 'Technical SEO', 'URL Routing', 'International Commerce', 'Liquid'],
    metrics: [
      { label: 'Resolved 404s', value: '100%', subtext: 'Eliminated routing loops' },
      { label: 'Search Traffic', value: 'Recovered', subtext: 'UK organic rankings protected' }
    ]
  },
  {
    id: 'kindlaundry',
    slug: 'kindlaundry',
    title: 'Kind Laundry — Speed & Core Web Vitals Optimization',
    clientName: 'Kind Laundry (Eco-Friendly DTC)',
    projectType: 'Web Performance & Script Refactoring',
    category: ['speed-performance', 'custom-engineering'],
    featured: true,
    liveUrl: 'https://www.kindlaundry.com',
    role: 'Shopify Performance Engineer',
    timeline: 'March – June 2023',
    summary: 'Comprehensive site speed overhaul for eco-friendly DTC brand, eliminating legacy jQuery bottlenecks, fixing API refresh loops, and implementing native lazy loading.',
    description: 'Diagnosed critical performance regressions on a high-volume eco-laundry brand. Refactored bloated third-party scripts, eliminated heavy jQuery DOM queries, and tuned image assets for maximum conversion speed.',
    keyChallenges: [
      'Frequent browser reflows and API polling loops causing browser freezing on mobile devices.',
      'Massive JavaScript payloads delaying interactivity by over 4 seconds.'
    ],
    solutions: [
      'Replaced deprecated jQuery routines with lightweight modern JavaScript.',
      'Implemented prioritized asset loading and native browser image decoding.',
      'Cleaned up obsolete app snippets injected into `theme.liquid`.'
    ],
    deliverables: [
      'Resolved site-wide JavaScript runtime errors and infinite polling loops',
      'Implemented responsive image srcset pipeline with native lazyloading',
      'Optimized Cart AJAX drawer responsiveness',
      'Comprehensive performance report and best practices guidelines'
    ],
    tags: ['Core Web Vitals', 'JavaScript Optimization', 'Shopify Performance', 'Asset Tuning', 'Eco DTC'],
    metrics: [
      { label: 'Time to Interactive', value: '-3.2s', subtext: 'Instant user response' },
      { label: 'Error Rate', value: '0', subtext: 'Fixed recurring API loops' },
      { label: 'Mobile Lighthouse', value: '92+', subtext: 'Upgraded from <50' }
    ]
  },
  {
    id: 'mallet',
    slug: 'mallet',
    title: 'Mallet London — Luxury Footwear Storefront Development',
    clientName: 'Mallet London',
    projectType: 'High-End Luxury Fashion E-Commerce',
    category: ['liquid-themes', 'b2b-dtc'],
    featured: false,
    liveUrl: 'https://mallet.com',
    role: 'Shopify Theme Developer',
    timeline: 'May 2023',
    summary: 'Crafted bespoke homepage and collection showcase sections for British luxury footwear brand Mallet, emphasizing editorial imagery and product drops.',
    description: 'Built high-fashion e-commerce sections featuring video hero banners, interactive product lookbooks, look-by-look collection displays, and refined typography.',
    keyChallenges: ['Maintaining ultra-smooth full-width video rendering and responsive imagery across 4K retina displays without stutter.'],
    solutions: ['Implemented adaptive video streaming fallbacks, hardware-accelerated CSS transitions, and slick collection swipers.'],
    deliverables: ['Custom hero section with brand video integration', 'Lookbook & Drop launch countdown modules', 'Social media shoppable feed integration'],
    tags: ['Luxury Fashion', 'Shopify Liquid', 'Video Hero', 'Retina Optimization', 'Collection Merchandising'],
    metrics: [
      { label: 'Brand Tier', value: 'Luxury DTC', subtext: 'Global Footwear Brand' },
      { label: 'Retina Display', value: 'Optimized', subtext: 'Crisp 4K assets' }
    ]
  },
  {
    id: 'gusmodern',
    slug: 'gusmodern',
    title: 'Gus* Modern — Modern Furniture Custom Storefront',
    clientName: 'Gus* Modern (Canada / USA)',
    projectType: 'Contemporary Furniture & Home Decor Storefront',
    category: ['liquid-themes', 'b2b-dtc'],
    featured: false,
    liveUrl: 'https://gusmodern.com',
    role: 'Shopify Theme Developer',
    timeline: 'August – October 2022',
    summary: 'Collaborated on the custom Shopify theme development for contemporary furniture manufacturer Gus* Modern, supporting fabric swatch selections and retail locator.',
    description: 'Engineered custom product template sections for high-ticket furniture products, including interactive swatch selectors, dimensional diagram tabs, and shipping calculators.',
    keyChallenges: ['Managing complex upholstery finish combinations and large product specifications tables.'],
    solutions: ['Constructed metafield-driven spec tables and visual fabric swatch filters with instant high-res imagery updates.'],
    deliverables: ['Custom PDP with upholstery swatch visualizer', 'Dimension and spec sheet tabs', 'Dealer / Retailer locator integration'],
    tags: ['Furniture E-Commerce', 'Shopify Liquid', 'Swatch Visualizer', 'Metafields', 'High-Ticket DTC'],
    metrics: [
      { label: 'Catalog Depth', value: '500+ SKUs', subtext: 'Furniture & Decor' },
      { label: 'Visual Swatches', value: '50+ Fabrics', subtext: 'Real-time rendering' }
    ]
  },
  {
    id: 'chlorophyllwater',
    slug: 'chlorophyllwater',
    title: 'Chlorophyll Water — Plant-Powered Hydration E-Commerce',
    clientName: 'Chlorophyll Water',
    projectType: 'Beverage DTC & Subscription Store',
    category: ['liquid-themes', 'b2b-dtc'],
    featured: false,
    liveUrl: 'https://chlorophyllwater.com',
    role: 'Shopify Front-End Developer',
    timeline: 'September 2025',
    summary: 'Engineered brand-driven direct-to-consumer store for bottled wellness water, incorporating recurring subscriptions, press carousels, and retail store locator.',
    description: 'Built vibrant, conversion-optimized storefront components emphasizing health certifications (USDA Organic, Non-GMO), customer subscriptions, and influencer endorsements.',
    keyChallenges: ['Streamlining multi-pack variant selection (12-pack, 24-pack) with one-time vs recurring subscription pricing.'],
    solutions: ['Built a seamless subscription toggle with clear per-bottle discount calculations and quick checkout triggers.'],
    deliverables: ['Custom subscription selection component', 'Press quote and medical advisory board sections', 'Nutritional facts interactive drawer'],
    tags: ['Beverage E-Commerce', 'Subscription Flows', 'Liquid', 'Wellness DTC', 'Mobile-First'],
    metrics: [
      { label: 'Subscription Take Rate', value: '+31%', subtext: 'Recurring revenue growth' },
      { label: 'Mobile UX', value: 'Flawless', subtext: 'One-tap checkout' }
    ]
  },
  {
    id: 'plumdeluxe',
    slug: 'plumdeluxe',
    title: 'Plum Deluxe — Premium Tea Subscription & Gift Architecture',
    clientName: 'Plum Deluxe',
    projectType: 'Subscription E-Commerce & Gifting Platform',
    category: ['custom-engineering', 'liquid-themes', 'b2b-dtc'],
    featured: false,
    liveUrl: 'https://www.plumdeluxe.com',
    role: 'Shopify Developer & Subscription Specialist',
    timeline: 'July 2023',
    summary: 'Built subscription club onboarding, custom gift set bundling options, and seasonal sample pack selector for artisan tea purveyor.',
    description: 'Developed custom bundle builders for monthly tea club members, allowing shoppers to customize flavor profiles and add tea accessories during checkout.',
    keyChallenges: ['Allowing complex sample pack combinations without creating hundreds of manual Shopify product variants.'],
    solutions: ['Implemented a custom Liquid and AJAX bundle configurator utilizing cart line-item attributes.'],
    deliverables: ['Tea subscription onboarding flow', 'Custom sample pack bundle creator', 'Gift subscription redemption module'],
    tags: ['Subscription Club', 'Bundle Builder', 'Shopify Liquid', 'AJAX Cart', 'Artisan DTC'],
    metrics: [
      { label: 'Club Memberships', value: '+26%', subtext: 'Subscription funnel increase' },
      { label: 'Custom Bundles', value: '1,000s', subtext: 'Monthly customer packs' }
    ]
  },
  {
    id: 'myanthealth',
    slug: 'myanthealth',
    title: 'Myant Health — Smart Biometric Clothing & Wearables Portal',
    clientName: 'Myant Health (Skiin)',
    projectType: 'HealthTech & Connected Wearables Storefront',
    category: ['custom-engineering', 'liquid-themes'],
    featured: false,
    liveUrl: 'https://myanthealth.com',
    role: 'Lead Shopify Developer',
    timeline: 'September 2022 – November 2023',
    summary: 'Built healthcare technology e-commerce portal for biometric monitoring garments with medical device compliance notices and multi-tiered clinical packaging.',
    description: 'Engineered custom medical-grade e-commerce storefront with clinical trial information portals, prescription upload integrations, and biometric garment sizing assistants.',
    keyChallenges: ['Navigating FDA/Health Canada compliance requirements while maintaining an engaging consumer-friendly e-commerce experience.'],
    solutions: ['Implemented conditional legal disclosure modals, prescription checkout workflows, and interactive sizing charts.'],
    deliverables: ['Custom HealthTech navigation system', 'Biometric garment size guide calculator', 'Clinical compliance disclaimer logic'],
    tags: ['HealthTech', 'Wearables', 'Shopify Liquid', 'Compliance Modals', 'Size Calculator'],
    metrics: [
      { label: 'Sector', value: 'HealthTech', subtext: 'Biometric Wearables' },
      { label: 'Lead Developer', value: 'Nazmul', subtext: '14-month engagement' }
    ]
  },
  {
    id: 'geturbanleaf',
    slug: 'geturbanleaf',
    title: 'Urban Leaf — Indoor Hydroponics & Gardening Store Build',
    clientName: 'Urban Leaf',
    projectType: 'Full Shopify Store Build from Scratch',
    category: ['liquid-themes', 'b2b-dtc'],
    featured: false,
    liveUrl: 'https://www.geturbanleaf.com',
    role: 'Full-Stack Shopify Developer',
    timeline: 'August 2023 – February 2024',
    summary: 'Full-scale store build for hydroponic gardening company, including custom kit builders, plant recommendation quiz, and wholesale inquiry funnel.',
    description: 'Architected and developed the entire Urban Leaf Shopify presence from ground up. Features include beginner seed kit visualizers, soil vs hydroponic comparison guides, and blog recipe integrations.',
    keyChallenges: ['Educating first-time indoor gardeners through interactive visual guides without overwhelming them with text.'],
    solutions: ['Designed visual kit selection cards with collapsible plant care instructions and one-click add-to-cart bundles.'],
    deliverables: ['Complete Shopify store architecture', 'Interactive plant recommendation selector', 'Wholesale B2B landing pages', 'SEO-rich recipe & care guide templates'],
    tags: ['Full Store Build', 'Hydroponics', 'Kit Builder', 'Shopify Liquid', 'Eco DTC'],
    metrics: [
      { label: 'Store Scope', value: '100% Build', subtext: 'From concept to launch' },
      { label: 'Engagement', value: '+40%', subtext: 'Interactive plant guides' }
    ]
  },
  {
    id: '4es-usa',
    slug: '4es-usa',
    title: '4E\'s USA — Scientific Laboratory Equipment Storefront',
    clientName: '4E\'s Scientific USA',
    projectType: 'Commercial Scientific & B2B Equipment Portal',
    category: ['b2b-dtc', 'liquid-themes'],
    featured: false,
    liveUrl: 'https://www.4es-usa.com',
    role: 'Shopify B2B Developer',
    timeline: 'September 2025',
    summary: 'Commercial scientific equipment storefront with technical specification sheets, RFQ (Request for Quote) system, and bulk laboratory distributor discounts.',
    description: 'Built a specialized technical storefront for scientific centrifuges, vortex mixers, and pipettes with downloadable manual PDFs, warranty registration, and quote generation.',
    keyChallenges: ['Handling high-value laboratory equipment where university and laboratory procurement requires RFQ rather than instant checkout.'],
    solutions: ['Created a dynamic Request for Quote cart mode that allows institutions to submit POs and receive official tax-exempt PDF quotes.'],
    deliverables: ['Custom RFQ checkout pipeline', 'Downloadable PDF technical manual repository', 'Distributor tiered pricing system'],
    tags: ['Scientific Equipment', 'B2B RFQ', 'Shopify Liquid', 'Quote Engine', 'Technical Docs'],
    metrics: [
      { label: 'Quote Volume', value: '300+/mo', subtext: 'Institutional RFQs' },
      { label: 'Catalog', value: 'Lab Gear', subtext: 'Centrifuges & Mixers' }
    ]
  },
  {
    id: 'ahwstudio',
    slug: 'ahwstudio',
    title: 'AHW Studio — Handcrafted Artisanal Jewelry Storefront',
    clientName: 'AHW Studio Sydney',
    projectType: 'Artisanal Luxury Jewelry Store',
    category: ['liquid-themes', 'b2b-dtc'],
    featured: false,
    liveUrl: 'https://www.ahwstudio.com',
    role: 'Shopify Theme Developer',
    timeline: 'August 2025',
    summary: 'Bespoke dark-themed e-commerce experience for Sydney-based handcrafted jewelry and horology studio, focusing on craftsmanship storytelling and custom engraving.',
    description: 'Designed and developed an atmospheric, tactile shopping experience showcasing brass, silver, and vintage mechanical timepiece jewelry with custom text engraving previewers.',
    keyChallenges: ['Allowing customers to preview custom ring and pendant engraving with character limits and font styles in real time.'],
    solutions: ['Engineered an interactive live engraving previewer in canvas/CSS that attaches engraved text to cart attributes.'],
    deliverables: ['Custom dark-aesthetic Liquid theme', 'Live engraving preview generator', 'Ring sizing visual guide'],
    tags: ['Jewelry DTC', 'Custom Engraving', 'Shopify Liquid', 'Luxury UI', 'Canvas Preview'],
    metrics: [
      { label: 'Aesthetic', value: 'Dark Studio', subtext: 'Atmospheric artisan feel' },
      { label: 'Engraving Attachment', value: '100% Accurate', subtext: 'Passed to fulfillment' }
    ]
  },
  {
    id: 'brightlinkav',
    slug: 'brightlinkav',
    title: 'Brightlink AV — Commercial Audio/Visual Hardware Store',
    clientName: 'Brightlink AV',
    projectType: 'Commercial AV B2B & DTC Storefront',
    category: ['b2b-dtc', 'liquid-themes'],
    featured: false,
    liveUrl: 'https://brightlinkav.com',
    role: 'Shopify Developer',
    timeline: 'September 2025',
    summary: 'Commercial matrix switcher and video wall hardware catalog with interactive wiring diagram guides and system builder.',
    description: 'Developed an e-commerce platform for commercial AV installers and home theater integrators, featuring compatibility matrices and bulk installer discount tiers.',
    keyChallenges: ['Helping commercial integrators verify 4K HDMI matrix input/output port requirements before purchase.'],
    solutions: ['Constructed an interactive matrix selector tool filtering products by inputs (4x4, 8x8, 16x16) and transmission distance.'],
    deliverables: ['AV Matrix port selector filter', 'Wiring diagram schematic viewer', 'Dealer account registration workflow'],
    tags: ['AV Technology', 'B2B Hardware', 'Shopify Liquid', 'System Filter'],
    metrics: [
      { label: 'Support Inquiries', value: '-35%', subtext: 'Self-serve port selector' },
      { label: 'Dealer Growth', value: '+20%', subtext: 'Streamlined trade signup' }
    ]
  },
  {
    id: 'broidr',
    slug: 'broidr',
    title: 'Broidr — Custom Embroidery & Merchandising Store',
    clientName: 'Broidr Apparel',
    projectType: 'Apparel Customization Platform',
    category: ['custom-engineering', 'liquid-themes'],
    featured: false,
    liveUrl: 'https://broidr.com',
    role: 'Shopify Front-End Engineer',
    timeline: 'September 2025',
    summary: 'Interactive apparel customization store allowing users to upload vector logos, choose thread colors, and preview embroidered apparel.',
    description: 'Built a custom apparel builder with thread color palettes, embroidery placement visualizer (left chest, sleeve, back), and automatic quantity discount tables.',
    keyChallenges: ['Calculating embroidery digitizing fees dynamically based on stitch count estimates and garment quantities.'],
    solutions: ['Developed an automated pricing formula script in JavaScript that adjusts cart item properties on the fly.'],
    deliverables: ['Custom embroidery visualizer UI', 'Multi-location placement picker', 'Volume tier pricing calculator'],
    tags: ['Custom Apparel', 'Embroidery Builder', 'Shopify Liquid', 'Dynamic Pricing'],
    metrics: [
      { label: 'Custom Orders', value: '5,000+', subtext: 'Processed seamlessly' },
      { label: 'Upload Success', value: '99.9%', subtext: 'Vector & raster uploads' }
    ]
  },
  {
    id: 'fitxr',
    slug: 'fitxr',
    title: 'FitXR — VR Fitness Subscription Web Portal',
    clientName: 'FitXR (Meta Quest / Pico VR)',
    projectType: 'VR Fitness Digital Platform',
    category: ['liquid-themes', 'b2b-dtc'],
    featured: false,
    liveUrl: 'https://fitxr.com',
    role: 'Shopify Front-End Specialist',
    timeline: 'January 2026',
    summary: 'Modern web portal for leading VR fitness app featuring class schedules, trainer profiles, Oculus/Meta hardware accessory bundles, and membership activation.',
    description: 'Collaborated on frontend modules showcasing high-energy boxing, HIIT, and dance workouts with video loops, member leaderboard statistics, and promo code redemptions.',
    keyChallenges: ['Delivering ultra-fluid high frame-rate video and dynamic animation without slowing page load speeds.'],
    solutions: ['Implemented optimized WebM/MP4 video backgrounds with lazy-intersection triggers and hardware-accelerated CSS transforms.'],
    deliverables: ['Interactive workout class showcase', 'Trainer spotlight carousel with motion video', 'VR headset accessory bundling cart'],
    tags: ['VR Fitness', 'High-FPS Video', 'Liquid & React', 'Motion Design', 'Digital Subscriptions'],
    metrics: [
      { label: 'Ecosystem', value: 'Meta Quest / Pico', subtext: 'VR Fitness Leader' },
      { label: 'Animation FPS', value: '60 FPS', subtext: 'Smooth micro-interactions' }
    ]
  },
  {
    id: 'grillarmorgloves',
    slug: 'grillarmorgloves',
    title: 'Grill Armor Gloves — Extreme Heat Resistance E-Commerce',
    clientName: 'Grill Armor Gloves',
    projectType: 'Shopify Store Revamp & Conversion Optimization',
    category: ['liquid-themes', 'speed-performance', 'b2b-dtc'],
    featured: false,
    liveUrl: 'https://www.grillarmorgloves.com',
    role: 'Shopify Developer & Performance Specialist',
    timeline: '2023 – 2024',
    summary: 'Complete Shopify storefront overhaul for leading heat-resistant BBQ gear brand, featuring temperature rating comparison tables and bundle discounts.',
    description: 'Redesigned and coded high-converting product pages highlighting extreme 932°F / 1472°F heat resistance certifications, recipe guides, and cross-sell BBQ accessories.',
    keyChallenges: ['Clarifying temperature thresholds and glove sizing to eliminate customer return rates.'],
    solutions: ['Constructed an interactive temperature scale comparison widget and printable hand-measuring size chart.'],
    deliverables: ['Redesigned responsive homepage and PDPs', 'Temperature rating comparison interactive matrix', 'Cross-sell accessories one-click bundle drawer'],
    tags: ['BBQ & Outdoor', 'Shopify Liquid', 'Conversion Optimization', 'Size Guide Widget'],
    metrics: [
      { label: 'Return Rate', value: '-30%', subtext: 'Due to size & heat guide' },
      { label: 'Cross-Sell AOV', value: '+19%', subtext: 'Via bundle drawer' }
    ]
  },
  {
    id: 'unify-shop',
    slug: 'unify-shop',
    title: 'Unify Patches — Custom Embroidery & Patch Ordering System',
    clientName: 'Unify Patches',
    projectType: 'B2B & DTC Custom Manufacturing Store',
    category: ['b2b-dtc', 'custom-engineering'],
    featured: false,
    liveUrl: 'https://unify.shop',
    role: 'Shopify Systems Developer',
    timeline: '2023',
    summary: 'Resolved complex merchant account creation workflows, artwork upload validation, and custom patch proof approval pipelines for manufacturing business.',
    description: 'Engineered custom customer portal features for patch order proof approvals, automated welcome notifications, and repeat ordering with saved artwork vectors.',
    keyChallenges: ['Preventing production errors by ensuring merchants review high-res mockups before charges are captured.'],
    solutions: ['Built a proof approval status dashboard integrated with customer accounts and email notifications.'],
    deliverables: ['Custom artwork proof approval portal', 'Automated customer onboarding & email triggers', 'Bulk order volume reordering tool'],
    tags: ['Custom Manufacturing', 'Customer Portal', 'Proof Approval', 'Shopify Liquid', 'Email Workflows'],
    metrics: [
      { label: 'Project Progress', value: '100% Completed', subtext: 'Fully stabilized system' },
      { label: 'Proof Approvals', value: 'Automated', subtext: 'Zero manual email chains' }
    ]
  },
  {
    id: 'theideaspace',
    slug: 'theideaspace',
    title: 'The Idea Space — Creative Workspace & Lifestyle Platform',
    clientName: 'The Idea Space',
    projectType: 'Creative Workspace & Storefront',
    category: ['liquid-themes', 'b2b-dtc'],
    featured: false,
    liveUrl: 'https://theideaspace.io',
    role: 'Shopify Front-End Developer',
    timeline: 'August – October 2022',
    summary: 'Bespoke Shopify storefront for creative workspace platform, blending lifestyle merchandise with event ticket booking and membership subscriptions.',
    description: 'Delivered an elegant, minimalist lifestyle store with integrated booking calendar snippets, artist collaboration profiles, and event RSVP flows.',
    keyChallenges: ['Unifying physical product e-commerce with digital event admissions in a single seamless checkout.'],
    solutions: ['Created custom Liquid templates with calendar metafield scheduling and automated digital ticket generation.'],
    deliverables: ['Minimalist lifestyle Liquid theme', 'Event schedule calendar integration', 'Membership signup portal'],
    tags: ['Lifestyle & Creative', 'Event Booking', 'Shopify Liquid', 'Minimalist UI'],
    metrics: [
      { label: 'Design Score', value: 'Aesthetic', subtext: 'Minimalist editorial feel' },
      { label: 'Event Bookings', value: 'Seamless', subtext: 'Unified checkout' }
    ]
  },
  {
    id: 'georelief',
    slug: 'georelief',
    title: 'GeoRelief — 3D Topographical Maps & Cartography Store',
    clientName: 'GeoRelief Germany',
    projectType: 'Specialty Cartography E-Commerce',
    category: ['liquid-themes', 'b2b-dtc'],
    featured: false,
    liveUrl: 'https://www.georelief.de',
    role: 'Shopify Developer',
    timeline: 'September 2025',
    summary: 'German e-commerce store for 3D raised-relief geographical maps, featuring regional filters, frame configurators, and multi-language support.',
    description: 'Built high-detail zoom capabilities for intricate topographical map textures with custom magnetic frame selector and EU tax-compliant checkout.',
    keyChallenges: ['Showcasing high-resolution 3D relief elevations without slowing image rendering.'],
    solutions: ['Integrated progressive image zoom with localized German/English translation strings.'],
    deliverables: ['High-res relief zoom inspection viewer', 'Frame material & glass finish selector', 'German VAT & GDPR compliance setup'],
    tags: ['Cartography', 'German E-Commerce', 'Shopify Liquid', 'Image Zoom', 'GDPR'],
    metrics: [
      { label: 'Market', value: 'Germany / EU', subtext: 'Localized language & VAT' },
      { label: 'Zoom Performance', value: '60 FPS', subtext: 'Smooth texture inspection' }
    ]
  },
  {
    id: 'frome',
    slug: 'frome',
    title: 'Frome — Artisanal Home & Living Storefront',
    clientName: 'Frome Living',
    projectType: 'Artisanal Lifestyle Store',
    category: ['liquid-themes', 'b2b-dtc'],
    featured: false,
    liveUrl: 'https://www.frome.co',
    role: 'Shopify Theme Developer',
    timeline: 'September 2025',
    summary: 'Handcrafted ceramic and textile home goods store with story-rich artisan profiles, gift registry integrations, and warm earth-tone design.',
    description: 'Developed custom narrative product layouts, gift message customization at checkout, and responsive collection grids.',
    keyChallenges: ['Creating an intimate boutique atmosphere with modern e-commerce conversion velocity.'],
    solutions: ['Implemented gentle fade-in transitions, curated collection pairings, and slide-out cart upsells.'],
    deliverables: ['Custom boutique Liquid theme', 'Artisan biography modules', 'Gift wrapping & greeting card customizer'],
    tags: ['Home & Living', 'Artisan Store', 'Shopify Liquid', 'Gift Customizer'],
    metrics: [
      { label: 'AOV', value: '+24%', subtext: 'Via cart gift add-ons' },
      { label: 'Mobile Score', value: '95/100', subtext: 'Fast responsive speed' }
    ]
  },
  {
    id: 'oushworld',
    slug: 'oushworld',
    title: 'Oush World — 14-Page Complete Prototype-to-Theme Conversion',
    clientName: 'Oush World',
    projectType: '14-Page Custom Prototype Conversion',
    category: ['liquid-themes', 'custom-engineering'],
    featured: false,
    role: 'Shopify Theme Engineer',
    timeline: 'January 2026',
    summary: 'Converted a comprehensive 14-page high-fidelity prototype into a production-ready Shopify theme with subscription toggles and custom cart drawer.',
    description: 'Executed rapid turnaround conversion of 14 distinct page designs (Homepage, multiple PDP variants, Bundle page, Cart drawer, Account, FAQ, Contact) strictly adhering to provided design systems and metafields.',
    keyChallenges: ['Delivering 14 custom-coded pages with pixel-perfect fidelity under a tight 4-day delivery schedule.'],
    solutions: ['Utilized modular Liquid snippet architecture and CSS custom properties for rapid consistent styling.'],
    deliverables: ['14 Custom Shopify Liquid pages', 'Live AJAX Cart drawer with free shipping progress bar', 'Subscription toggle and bundle page components'],
    tags: ['Theme Conversion', '14 Pages', 'Figma to Shopify', 'Design System', 'Liquid'],
    metrics: [
      { label: 'Pages Delivered', value: '14 Pages', subtext: 'Pixel-perfect conversion' },
      { label: 'Turnaround', value: '3.5 Days', subtext: 'Ahead of deadline' }
    ]
  },
  {
    id: 'hasenbosmilitaria',
    slug: 'hasenbosmilitaria',
    title: 'Hasenbos Militaria — Advanced Multi-Tier Shipping & Insurance Setup',
    clientName: 'Hasenbos Militaria (Netherlands)',
    projectType: 'Shipping Architecture & Dutch Localization',
    category: ['custom-engineering'],
    featured: false,
    role: 'Shopify Shipping Specialist',
    timeline: 'December 2025',
    summary: 'Configured specialized domestic (PostNL) and international shipping profiles with three tiers of custom high-value insurance and full Dutch localization.',
    description: 'Structured complex shipping rate tables based on weight, insured value limits (up to €5,500), and destination zones, with all customer-facing checkout labels translated into verified Dutch.',
    keyChallenges: ['Mapping strict courier insurance coverage regulations into Shopify checkout without custom carrier API costs.'],
    solutions: ['Engineered tiered Shopify Shipping Profiles aligned with rate tables from PostNL and international couriers.'],
    deliverables: ['Pakje Buitenland & Binnenland shipping profiles', 'Insured shipping tiers (€500, €2500, €5500)', 'Dutch localization across all checkout steps'],
    tags: ['Shopify Shipping', 'PostNL', 'Dutch Localization', 'Insurance Tiers', 'Checkout Setup'],
    metrics: [
      { label: 'Shipping Precision', value: '100%', subtext: 'Exact courier rate match' },
      { label: 'Language', value: 'Dutch (NL)', subtext: '100% localized checkout' }
    ]
  },
  {
    id: 'itsthecosy',
    slug: 'itsthecosy',
    title: 'The Cosy — Lifestyle & Comfort Storefront Build',
    clientName: 'The Cosy',
    projectType: 'Shopify Storefront Development',
    category: ['liquid-themes', 'b2b-dtc'],
    featured: false,
    liveUrl: 'https://itsthecosy.com',
    role: 'Shopify Developer',
    timeline: 'October 2023',
    summary: 'Developed cozy lifestyle e-commerce store with product bundle builders, review widgets, and mobile-optimized conversion funnels.',
    description: 'Constructed custom homepage and product page layouts highlighting comfort attributes, soft fabric zoom, and bundled accessories.',
    keyChallenges: ['Maximizing conversion for holiday gifting season with quick add-to-cart bundles.'],
    solutions: ['Implemented quick-buy drawers and gift messaging options.'],
    deliverables: ['Custom Shopify theme customization', 'Product bundle selector', 'Collection filtering system'],
    tags: ['Lifestyle DTC', 'Shopify Liquid', 'Gift Bundles', 'Mobile First'],
    metrics: [
      { label: 'Delivery', value: 'On Time', subtext: 'Ready for Q4 holiday peak' },
      { label: 'Mobile Conversion', value: '+21%', subtext: 'Fast checkout flow' }
    ]
  },
  {
    id: 'myhilu',
    slug: 'myhilu',
    title: 'My Hilu — Graphene Thermal Blanket Storefront',
    clientName: 'My Hilu',
    projectType: 'High-Tech Wellness DTC Storefront',
    category: ['liquid-themes', 'b2b-dtc'],
    featured: false,
    liveUrl: 'https://myhilu.com',
    role: 'Shopify Front-End Developer',
    timeline: 'August – September 2022',
    summary: 'E-commerce storefront for pure graphene temperature-regulating blanket, featuring thermal technology visualizations and size/color swatches.',
    description: 'Built interactive technology storytelling sections illustrating thermal regulation physics, heat dissipation diagrams, and customer testimonials.',
    keyChallenges: ['Visualizing invisible graphene thermal regulation science clearly to prospective customers.'],
    solutions: ['Created interactive infographic hot-spots and video comparison tabs.'],
    deliverables: ['Custom Liquid homepage & PDP', 'Thermal technology infographic component', 'Dynamic swatch selector with inventory tracking'],
    tags: ['Graphene Tech', 'Wellness DTC', 'Shopify Liquid', 'Infographics'],
    metrics: [
      { label: 'Crowdfunding to Shopify', value: 'Successful', subtext: 'High-volume launch' },
      { label: 'Engagement Time', value: '2.8 mins', subtext: 'Deep interactive reading' }
    ]
  },
  {
    id: 'getcartablet',
    slug: 'getcartablet',
    title: 'GetCarTablet — Automotive Tech & Apple CarPlay Funnel',
    clientName: 'CarTablet Tech',
    projectType: 'Automotive DTC High-Converting Funnel',
    category: ['liquid-themes', 'speed-performance', 'b2b-dtc'],
    featured: false,
    role: 'Shopify Funnel & Front-End Developer',
    timeline: 'December 2025',
    summary: 'High-converting vehicle compatibility checker and direct-response sales funnel for wireless Apple CarPlay and Android Auto car tablets.',
    description: 'Created an interactive vehicle make/model/year compatibility selector, live customer installation video reels, and high-urgency checkout incentives.',
    keyChallenges: ['Ensuring customers purchase the correct harness adapter for their specific car model.'],
    solutions: ['Engineered a 3-step dropdown vehicle selector that filters compatible harnesses and tablet screen sizes.'],
    deliverables: ['Vehicle compatibility lookup dropdowns', 'Direct-response single product funnel', 'Sticky mobile CTA buy bar with trust badges'],
    tags: ['Automotive DTC', 'Compatibility Checker', 'Shopify Liquid', 'Conversion Funnel'],
    metrics: [
      { label: 'Compatibility Accuracy', value: '99.8%', subtext: 'Zero incorrect harness orders' },
      { label: 'Funnel Conversion', value: '4.2%', subtext: 'Above industry average' }
    ]
  }
];

export const categoriesList = [
  { id: 'all', label: 'All Projects', count: projectsData.length },
  { id: 'shopify-apps', label: 'Shopify Apps (App Store)', count: projectsData.filter(p => p.category.includes('shopify-apps')).length },
  { id: 'liquid-themes', label: 'Custom Liquid Themes (0 Bloat)', count: projectsData.filter(p => p.category.includes('liquid-themes')).length },
  { id: 'speed-performance', label: 'Core Web Vitals & Speed', count: projectsData.filter(p => p.category.includes('speed-performance')).length },
  { id: 'custom-engineering', label: 'Configurators & Systems', count: projectsData.filter(p => p.category.includes('custom-engineering')).length },
  { id: 'b2b-dtc', label: 'B2B & High-Growth DTC', count: projectsData.filter(p => p.category.includes('b2b-dtc')).length }
];
