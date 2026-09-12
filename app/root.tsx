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

export const meta: MetaFunction = () => {
  return [
    { title: "NazmulCodes — Senior Shopify Expert & Full-Stack App Developer" },
    { name: "naver-site-verification", content: "6d6b8020e11e505e8b2f69771bc6d31b6136636d" },
    {
      name: "description",
      content:
        "Portfolio of Nazmul Hawlader (NazmulCodes). Senior Shopify Engineer & Full-Stack Developer specializing in official Shopify Apps (React/Polaris/GraphQL), bespoke Liquid themes (0 page builders), and Core Web Vitals optimization.",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: "#080c14" },
    { property: "og:title", content: "NazmulCodes — Senior Shopify Expert & Full-Stack App Developer" },
    {
      property: "og:description",
      content: "Explore 33+ shipped Shopify stores, official Shopify App Store apps, and bespoke theme engineering case studies.",
    },
    { property: "og:type", content: "website" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
  { rel: "alternate icon", href: "/favicon.svg" },
];

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  return (
    <html lang="en" data-theme={theme}>
      <head>
        <meta charSet="utf-8" />
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
