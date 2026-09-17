import type { LoaderFunction } from "@remix-run/node";
import { blogPosts } from "~/data/blogPosts";
import { siteConfig } from "~/data/siteConfig";

export const loader: LoaderFunction = ({ request }) => {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "www.nazmulcodes.org";
  // Always use canonical www.nazmulcodes.org or the active host with https
  const domain = host.includes("localhost") ? `http://${host}` : `https://${host}`;
  const baseUrl = domain.includes("nazmulcodes.org") && !domain.includes("www.") 
    ? "https://www.nazmulcodes.org" 
    : domain;

  const coreRoutes = [
    { path: "", priority: "1.0", changefreq: "weekly" },
    { path: "/blog", priority: "0.9", changefreq: "daily" },
    { path: "/contact", priority: "0.85", changefreq: "weekly" },
    { path: "/about", priority: "0.9", changefreq: "weekly" },
    { path: "/privacy", priority: "0.7", changefreq: "monthly" },
    { path: "/privacy-policy", priority: "0.5", changefreq: "monthly" },
  ];

  const currentDate = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Top-Level Routes -->
${coreRoutes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}

  <!-- Educational Articles & Technical Guides -->
${blogPosts
  .map(
    (post) => `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.publishedAt || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
};
