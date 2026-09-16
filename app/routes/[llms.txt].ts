import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  const content = `# NazmulCodes (nazmulcodes.org)

> Portfolio of Nazmul Hawlader (NazmulCodes) — Senior Shopify Expert, Full-Stack App Developer, and Founder of Stockly.

## Overview
Nazmul Hawlader is a senior Shopify engineer and full-stack developer specializing in:
- Official Shopify App Store SaaS applications (React, Polaris, GraphQL Admin API, Node.js, Redis)
- Bespoke Shopify Online Store 2.0 Liquid themes with zero page builders
- Core Web Vitals optimization (sub-second load speeds, 90+ Lighthouse)
- Custom e-commerce engineering and API integrations

## Flagship SaaS Products
- Stockly: Inventory & Reorder (https://apps.shopify.com/stock-alert-4): Automated inventory optimization, sales velocity demand forecasting, 1-click supplier purchase orders, and real-time staff & back-in-stock alerts.
- DemandMind AI (https://apps.shopify.com/demandmind-forecasting): AI-powered retail forecasting.
- Shoppable Posts (https://apps.shopify.com/shoppable-posts): Shoppable editorial blog engine.

## Verified Profiles & Marketplaces
- Website: https://nazmulcodes.org
- GitHub: https://github.com/Nazmul291
- Upwork: https://www.upwork.com/freelancers/nazmul291
- LinkedIn: https://www.linkedin.com/in/nazmul-hawlader-a7bb14144/
- Freelancer.com: https://www.freelancer.com/u/nazmul291
- Guru: https://www.guru.com/freelancers/nazmul-hawlader
- Arc.dev: https://arc.dev/@nazmulhawlader
- Stack Overflow: https://stackoverflow.com/users/17731742/nazmul-hawlader
- Email: info@nazmulcodes.org
`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
