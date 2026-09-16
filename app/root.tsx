import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";

import "~/styles/variables.css";
import "~/styles/base.css";
import "~/styles/components.css";
import "~/styles/animations.css";

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://nazmulcodes.org/#person",
      name: "Nazmul Hawlader",
      alternateName: ["NazmulCodes", "Nazmul"],
      jobTitle: "Senior Shopify Expert & Full-Stack App Developer",
      description:
        "Senior Shopify Engineer with 6+ years experience architecting custom Shopify Apps, bespoke Online Store 2.0 themes, Shopify Flow automations, payment gateway routing, emergency bug fixes, and technical SEO migrations.",
      url: "https://nazmulcodes.org",
      image: "https://nazmulcodes.org/favicon.svg",
      sameAs: [
        "https://github.com/Nazmul291",
        "https://www.linkedin.com/in/nazmul-hawlader-a7bb14144/",
        "https://www.upwork.com/freelancers/~019c0879ae0eaeb3f3",
        "https://www.freelancer.com/u/nazmul291",
        "https://www.guru.com/freelancers/nazmul-hawlader",
        "https://arc.dev/@nazmulhawlader",
        "https://stackoverflow.com/users/17731742/nazmul-hawlader",
        "https://www.facebook.com/nazmul.hawlader.20551/",
        "https://www.instagram.com/hawlader7479/",
      ],
      knowsAbout: [
        "Shopify Theme Development",
        "Custom Shopify Theme Development",
        "Liquid Programming",
        "Shopify App Development",
        "Shopify Public Apps",
        "Shopify Custom Apps",
        "Shopify Polaris & GraphQL API",
        "Shopify Flow Automation & Workflows",
        "Shopify Payment Gateway Setup",
        "Shopify Multi-Currency & Markets",
        "Shopify Bug Fixes & Troubleshooting",
        "Shopify Checkout Extensibility",
        "Shopify 301 Redirects & Broken URL SEO Migration",
        "Core Web Vitals & Speed Optimization",
        "React",
        "TypeScript",
        "Node.js",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://nazmulcodes.org/#service",
      name: "NazmulCodes — Shopify Development & Consulting Services",
      url: "https://nazmulcodes.org",
      image: "https://nazmulcodes.org/favicon.svg",
      founder: { "@id": "https://nazmulcodes.org/#person" },
      priceRange: "$$$",
      currenciesAccepted: "USD, EUR, GBP, AUD, CAD",
      paymentAccepted: "Credit Card, Stripe, PayPal, Upwork Escrow, Wire Transfer",
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Worldwide",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Shopify Engineering & Consulting Solutions",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Shopify App Development (Public & Custom)",
              description:
                "Full-cycle Shopify App engineering using React, Polaris, Node.js, GraphQL, webhooks, and Prisma. We build certified public apps for the Shopify App Store as well as internal bespoke apps.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Bespoke Shopify Theme Development (Online Store 2.0)",
              description:
                "Handcrafted, zero page-builder Liquid themes built strictly to Shopify Online Store 2.0 standards, delivering sub-second load times and effortless merchant customization.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Shopify Automation Workflows & Payment Gateway Integration",
              description:
                "Shopify Flow custom trigger/action setups, automated inventory/fulfillment notifications, Shopify Payments, Stripe, PayPal, and international currency routing via Shopify Markets.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Emergency Shopify Bug Fixes & Checkout Troubleshooting",
              description:
                "Same-day rapid diagnosis and repair of Liquid syntax errors, JavaScript conflicts, AJAX mini-cart drawer errors, and Shopify Checkout Extensibility issues.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Shopify 301 Redirects, Broken URL Fixes & SEO Migration",
              description:
                "Prevent organic search traffic loss and eliminate 404 crawl errors with automated bulk 301 URL redirection maps and seamless platform migrations from WooCommerce/Magento to Shopify.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Shopify Core Web Vitals & Sub-Second Speed Optimization",
              description:
                "Surgical performance tuning for high-volume stores: eliminate render-blocking assets, achieve 90-100 Google Lighthouse scores, sub-1.2s LCP, and 0.000 CLS.",
            },
          },
        ],
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://apps.shopify.com/stockly-inventory-reorder",
      name: "Stockly: Inventory & Reorder",
      operatingSystem: "Shopify OS",
      applicationCategory: "BusinessApplication",
      url: "https://apps.shopify.com/stockly-inventory-reorder",
      author: { "@id": "https://nazmulcodes.org/#person" },
      description:
        "Official Shopify App for inventory reorder forecasting, automated low-stock and back-in-stock alerts, and multi-channel staff restock notifications.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How can I hire Nazmul Hawlader for Shopify theme or app development?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "You can reach out directly via the hire form on nazmulcodes.org or hire through verified freelance platforms including Upwork (Top-Rated profile), Guru, Freelancer.com, or direct contract.",
          },
        },
        {
          "@type": "Question",
          name: "Do you build custom Shopify themes without page builders?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Yes. All bespoke themes are hand-coded with native Shopify Liquid, modern Vanilla JS, and CSS custom properties without bulky page builders (PageFly, GemPages, Shogun), guaranteeing sub-second load times and 90+ Lighthouse scores.",
          },
        },
        {
          "@type": "Question",
          name: "Can you fix broken Shopify themes, Liquid errors, and checkout glitches?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Yes. We offer rapid same-day troubleshooting for Liquid syntax errors, JavaScript console conflicts, broken AJAX cart drawers, mobile layout glitches, and Checkout Extensibility configurations.",
          },
        },
        {
          "@type": "Question",
          name: "How do you protect SEO rankings and fix broken URLs during Shopify migrations?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "We execute comprehensive website crawls to detect 404 errors, map 1-to-1 and wildcard 301 URL redirects, verify canonical tags, and audit Google Search Console to protect 100% of organic search rankings.",
          },
        },
        {
          "@type": "Question",
          name: "Can you configure Shopify Flow automations and payment gateways?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Yes. We design end-to-end Shopify Flow automation workflows for restocks, cancellations, and order triage, as well as configure Shopify Payments, Stripe, PayPal, local payment gateways, and Shopify Markets multi-currency routing.",
          },
        },
      ],
    },
  ],
};

export const meta: MetaFunction = () => {
  return [
    { charSet: "utf-8" },
    { title: "NazmulCodes — Senior Shopify Expert, App Developer & Custom Theme Architect" },
    { name: "google-adsense-account", content: "ca-pub-3337739847756959" },
    { name: "naver-site-verification", content: "6d6b8020e11e505e8b2f69771bc6d31b6136636d" },
    {
      name: "description",
      content:
        "Hire Nazmul Hawlader (NazmulCodes) — Senior Shopify Expert & App Developer. Bespoke Online Store 2.0 themes, custom & public Shopify Apps, Flow automations, payment gateway setup, 24/7 bug fixes, 301 SEO redirects & Core Web Vitals speed optimization.",
    },
    {
      name: "keywords",
      content:
        "Shopify developer, hire Shopify expert, Shopify theme development, custom Shopify theme developer, Shopify app development, Shopify public app developer, Shopify custom app, Shopify Flow automation, Shopify workflow setup, Shopify payment gateway integration, Shopify bug fixes, Shopify theme troubleshooting, Shopify checkout fixes, Shopify 301 redirects, broken URL fixes, Shopify SEO migration, Shopify Core Web Vitals, Shopify speed optimization, Nazmul Hawlader, NazmulCodes, Stockly Shopify app",
    },
    { name: "author", content: "Nazmul Hawlader (NazmulCodes)" },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
    { name: "googlebot", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: "#080c14" },
    // Open Graph / Facebook
    { property: "og:site_name", content: "NazmulCodes — Senior Shopify Expert" },
    { property: "og:title", content: "NazmulCodes — Senior Shopify Expert, App Developer & Custom Theme Architect" },
    {
      property: "og:description",
      content:
        "Specialized in bespoke Shopify Liquid themes, official Shopify App Store apps, Flow automations, payment gateway routing, emergency bug fixes, and SEO 301 redirects.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://nazmulcodes.org" },
    { property: "og:image", content: "https://nazmulcodes.org/favicon.svg" },
    { property: "og:image:alt", content: "NazmulCodes — Senior Shopify Expert & Full-Stack App Developer" },
    { property: "og:locale", content: "en_US" },
    // Twitter
    { name: "twitter:card", content: "summary" },
    { name: "twitter:site", content: "@Nazmul291" },
    { name: "twitter:creator", content: "@Nazmul291" },
    { name: "twitter:title", content: "NazmulCodes — Senior Shopify Expert & Full-Stack App Developer" },
    {
      name: "twitter:description",
      content:
        "Hire Senior Shopify Developer Nazmul Hawlader. Official Shopify Apps, custom Liquid themes, Flow automations, checkout troubleshooting & 301 SEO redirects.",
    },
    { name: "twitter:image", content: "https://nazmulcodes.org/favicon.svg" },
    // Structured Data — Remix first-class handler (renders inside <Meta />, zero hydration risk)
    {
      "script:ld+json": schemaGraph,
    },
  ];
};

export const links: LinksFunction = () => [
  { rel: "canonical", href: "https://nazmulcodes.org" },
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
  { rel: "alternate icon", href: "/favicon.ico" },
  {
    rel: "preload",
    href: "/fonts/inter-latin-400.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "/fonts/inter-latin-700.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "/fonts/plus-jakarta-sans-latin.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    as: "image",
    href: "/assets/images/lifestyle/lifestyle-1-sm.webp",
    type: "image/webp",
    media: "(max-width: 640px)",
  },
  {
    rel: "preload",
    as: "image",
    href: "/assets/images/lifestyle/lifestyle-1.webp",
    type: "image/webp",
    media: "(min-width: 641px)",
  },
];

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Restore saved theme preference
    const savedTheme = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Load Google AdSense strictly after React hydration on production domain.
    // Loading in raw <head> causes React error #418 & #423 (hydration mismatch)
    // because AdSense mutates DOM elements before React can hydrate.
    const isProductionSite =
      typeof window !== "undefined" &&
      (window.location.hostname === "nazmulcodes.org" ||
       window.location.hostname === "www.nazmulcodes.org");

    if (isProductionSite && !document.querySelector('script[src*="adsbygoogle"]')) {
      const loadAdSense = () => {
        const adsScript = document.createElement("script");
        adsScript.async = true;
        adsScript.src =
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3337739847756959";
        adsScript.crossOrigin = "anonymous";
        document.head.appendChild(adsScript);
      };

      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(loadAdSense, { timeout: 3500 });
      } else {
        setTimeout(loadAdSense, 3000);
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  return (
    <html lang="en" data-theme={theme} suppressHydrationWarning>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet context={{ theme, toggleTheme }} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
