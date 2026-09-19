import type { LoaderFunction } from '@remix-run/node';
import { getPublishedPostsForSitemap, type SitemapPost } from '~/models/blog.server';

/**
 * Dynamic XML sitemap — fully database-backed.
 *
 * Core static routes are generated inline; blog post URLs are fetched live
 * from PostgreSQL (via Redis cache with 1 h TTL + automatic DB fallback).
 *
 * Defensive try/catch ensures the sitemap always returns valid XML even if
 * the database is temporarily unavailable — it simply omits blog post URLs
 * and logs the error server-side rather than returning a 500 response.
 */

interface CoreRoute {
  path: string;
  priority: string;
  changefreq: string;
}

const CORE_ROUTES: CoreRoute[] = [
  { path: '',               priority: '1.0',  changefreq: 'weekly'  },
  { path: '/blog',          priority: '0.9',  changefreq: 'daily'   },
  { path: '/about',         priority: '0.9',  changefreq: 'weekly'  },
  { path: '/contact',       priority: '0.85', changefreq: 'weekly'  },
  { path: '/privacy',       priority: '0.7',  changefreq: 'monthly' },
  { path: '/projects',       priority: '0.7',  changefreq: 'monthly' },
  { path: '/services',       priority: '0.7',  changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.5', changefreq: 'monthly' },
];

/** Escape any XML special characters in a URL just in case. */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Derive a YYYY-MM-DD lastmod string from an ISO timestamp string. */
function toLastmod(isoString: string): string {
  return isoString.split('T')[0];
}

/** Build a single <url> block. */
function urlEntry(
  loc: string,
  lastmod: string,
  changefreq: string,
  priority: string
): string {
  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

export const loader: LoaderFunction = async ({ request }) => {
  // ── 1. Resolve canonical base URL ────────────────────────────────────────
  const host =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    'www.nazmulcodes.org';

  const domain = host.includes('localhost')
    ? `http://${host}`
    : `https://${host}`;

  // Enforce www. prefix on the canonical domain so search engines get a
  // consistent origin, avoiding duplicate-URL penalties.
  const baseUrl =
    domain.includes('nazmulcodes.org') && !domain.includes('www.')
      ? 'https://www.nazmulcodes.org'
      : domain;

  const todayDate = new Date().toISOString().split('T')[0];

  // ── 2. Fetch published posts from DB (Redis cached, 1 h TTL) ─────────────
  let posts: SitemapPost[] = [];
  try {
    posts = await getPublishedPostsForSitemap();
  } catch (err) {
    // Log the error server-side but keep the sitemap alive with static routes.
    console.error('[sitemap.xml] Failed to fetch blog posts from database:', err);
  }

  // ── 3. Build XML ──────────────────────────────────────────────────────────
  const coreSection = CORE_ROUTES.map((route) =>
    urlEntry(
      `${baseUrl}${route.path}`,
      todayDate,
      route.changefreq,
      route.priority
    )
  ).join('\n');

  const blogSection = posts
    .map((post) => {
      const lastmod = toLastmod(post.updatedAt || post.createdAt);
      return urlEntry(
        `${baseUrl}/blog/${post.slug}`,
        lastmod,
        'weekly',
        '0.85'
      );
    })
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '',
    '  <!-- Core Top-Level Routes -->',
    coreSection,
    '',
    '  <!-- Published Blog Articles -->',
    blogSection,
    '</urlset>',
  ].join('\n');

  // ── 4. Return XML response ────────────────────────────────────────────────
  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // CDN caches for 24 h; browsers/crawlers revalidate after 1 h.
      // stale-while-revalidate keeps serving the old sitemap instantly
      // while a background refresh is in flight.
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=3600',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
