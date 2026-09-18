import { prisma } from '~/db.server';
import { cachedDbQuery, invalidateCacheKeys, DEFAULT_CACHE_TTL } from '~/redis.server';

/**
 * 301 / 302 Redirect Data Access Layer
 *
 * Provides fast, Redis-cached redirect lookups with PostgreSQL fallback
 * to preserve Google SEO ranking for deleted or renamed blog articles.
 */

export interface DbRedirect {
  id: string;
  sourceSlug: string;
  targetUrl: string;
  statusCode: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Normalize a slug or path for reliable matching.
 * Examples:
 *   "/blog/old-slug/" -> "old-slug"
 *   "old-slug"        -> "old-slug"
 */
export function normalizeSlug(raw: string): string {
  let cleaned = raw.trim().toLowerCase();
  // Remove leading/trailing slashes
  cleaned = cleaned.replace(/^\/+|\/+$/g, '');
  // Remove leading "blog/" if present
  if (cleaned.startsWith('blog/')) {
    cleaned = cleaned.substring('blog/'.length);
  }
  return cleaned;
}

/**
 * Normalize target URL (ensure relative URLs start with /).
 */
export function normalizeTargetUrl(url: string): string {
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

/**
 * Look up an active redirect for a given slug or path.
 * Cached in Redis for 24 hours with automatic database fallback.
 */
export async function findRedirect(slugOrPath: string): Promise<DbRedirect | null> {
  const clean = normalizeSlug(slugOrPath);
  if (!clean) return null;

  return cachedDbQuery(`redirect:${clean}`, DEFAULT_CACHE_TTL, async () => {
    const redirect = await prisma.redirect.findFirst({
      where: {
        OR: [
          { sourceSlug: clean },
          { sourceSlug: `/blog/${clean}` },
          { sourceSlug: `/${clean}` },
        ],
      },
    });

    if (!redirect) return null;

    return {
      id: redirect.id,
      sourceSlug: redirect.sourceSlug,
      targetUrl: redirect.targetUrl,
      statusCode: redirect.statusCode,
      createdAt: redirect.createdAt.toISOString(),
      updatedAt: redirect.updatedAt.toISOString(),
    };
  });
}

/**
 * Get all redirects for admin management table.
 */
export async function getAllRedirects(): Promise<DbRedirect[]> {
  const redirects = await prisma.redirect.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return redirects.map((r) => ({
    id: r.id,
    sourceSlug: r.sourceSlug,
    targetUrl: r.targetUrl,
    statusCode: r.statusCode,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));
}

export interface CreateRedirectInput {
  sourceSlug: string;
  targetUrl: string;
  statusCode?: number;
}

/**
 * Create or update a 301/302 redirect rule and invalidate its Redis cache.
 */
export async function createRedirect(input: CreateRedirectInput): Promise<DbRedirect> {
  const cleanSource = normalizeSlug(input.sourceSlug);
  const cleanTarget = normalizeTargetUrl(input.targetUrl);
  const statusCode = input.statusCode === 302 ? 302 : 301;

  const redirect = await prisma.redirect.upsert({
    where: { sourceSlug: cleanSource },
    update: {
      targetUrl: cleanTarget,
      statusCode,
    },
    create: {
      sourceSlug: cleanSource,
      targetUrl: cleanTarget,
      statusCode,
    },
  });

  await invalidateCacheKeys(
    `redirect:${cleanSource}`,
    `redirect:/blog/${cleanSource}`
  );

  return {
    id: redirect.id,
    sourceSlug: redirect.sourceSlug,
    targetUrl: redirect.targetUrl,
    statusCode: redirect.statusCode,
    createdAt: redirect.createdAt.toISOString(),
    updatedAt: redirect.updatedAt.toISOString(),
  };
}

/**
 * Delete a redirect rule by ID and invalidate its Redis cache.
 */
export async function deleteRedirect(id: string): Promise<boolean> {
  const redirect = await prisma.redirect.findUnique({
    where: { id },
    select: { sourceSlug: true },
  });

  if (!redirect) return false;

  await prisma.redirect.delete({
    where: { id },
  });

  const clean = normalizeSlug(redirect.sourceSlug);
  await invalidateCacheKeys(`redirect:${clean}`, `redirect:/blog/${clean}`);

  return true;
}
