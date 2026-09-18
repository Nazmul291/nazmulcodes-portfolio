import { prisma } from '~/db.server';
import { cachedDbQuery, invalidateCacheKeys, invalidateAllBlogCache, DEFAULT_CACHE_TTL } from '~/redis.server';
import type { ContentBlock, DbBlogPost, DbBlogPostListItem } from '~/types/blog';

/**
 * Blog Post Data Access Layer
 *
 * Backed by PostgreSQL via Prisma ORM and cached via Upstash Redis.
 * All public queries use `cachedDbQuery()` with automatic fallback to PostgreSQL
 * in the event of Redis downtime, unconfigured credentials, or network errors.
 */

// ─── Public Queries (Redis Cached with Postgres Fallback) ──────────────────

/**
 * Get all published posts for the public blog index (omits heavy content blocks).
 * Cached in Redis for DEFAULT_CACHE_TTL (24 hours) with automatic DB fallback.
 */
export async function getPublishedPosts(): Promise<DbBlogPostListItem[]> {
  return cachedDbQuery('posts:published:list', DEFAULT_CACHE_TTL, async () => {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        category: true,
        tags: true,
        readTime: true,
        isPublished: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return posts.map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  });
}

/** Minimal shape returned by getPublishedPostsForSitemap(). */
export interface SitemapPost {
  slug: string;
  updatedAt: string;
  createdAt: string;
}

/**
 * Ultra-lightweight query for the XML sitemap.
 *
 * Selects ONLY slug + date fields — no title, excerpt, tags, content blocks.
 * Cached in Redis with a 1-hour TTL (shorter than the 24 h blog-listing TTL)
 * so freshly published articles appear in the sitemap quickly.
 * Falls back to Postgres transparently on Redis errors.
 */
export async function getPublishedPostsForSitemap(): Promise<SitemapPost[]> {
  const ONE_HOUR = 3600;
  return cachedDbQuery('posts:published:sitemap', ONE_HOUR, async () => {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: {
        slug: true,
        updatedAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return posts.map((p) => ({
      slug: p.slug,
      updatedAt: p.updatedAt.toISOString(),
      createdAt: p.createdAt.toISOString(),
    }));
  });
}


/**
 * Get a single published post by slug (includes full content blocks).
 * Cached in Redis for 1 hour.
 */
export async function getPublishedPostBySlug(slug: string): Promise<DbBlogPost | null> {
  return cachedDbQuery(`post:slug:${slug}`, DEFAULT_CACHE_TTL, async () => {
    const post = await prisma.blogPost.findFirst({
      where: { slug, isPublished: true },
    });

    if (!post) return null;

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      category: post.category,
      tags: post.tags,
      readTime: post.readTime,
      isPublished: post.isPublished,
      contentBlocks: post.contentBlocks as unknown as ContentBlock[],
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
  });
}

/**
 * Get adjacent published posts for previous / next article navigation.
 * Cached in Redis for DEFAULT_CACHE_TTL (24 hours).
 */
export async function getAdjacentPublishedPosts(slug: string): Promise<{
  prev: DbBlogPostListItem | null;
  next: DbBlogPostListItem | null;
}> {
  return cachedDbQuery(`post:adjacent:${slug}`, DEFAULT_CACHE_TTL, async () => {
    const current = await prisma.blogPost.findFirst({
      where: { slug, isPublished: true },
      select: { createdAt: true },
    });

    if (!current) return { prev: null, next: null };

    const [prevPost, nextPost] = await Promise.all([
      prisma.blogPost.findFirst({
        where: { isPublished: true, createdAt: { gt: current.createdAt } },
        orderBy: { createdAt: 'asc' },
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          coverImage: true,
          category: true,
          tags: true,
          readTime: true,
          isPublished: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.blogPost.findFirst({
        where: { isPublished: true, createdAt: { lt: current.createdAt } },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          coverImage: true,
          category: true,
          tags: true,
          readTime: true,
          isPublished: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    ]);

    return {
      prev: prevPost
        ? {
            ...prevPost,
            createdAt: prevPost.createdAt.toISOString(),
            updatedAt: prevPost.updatedAt.toISOString(),
          }
        : null,
      next: nextPost
        ? {
            ...nextPost,
            createdAt: nextPost.createdAt.toISOString(),
            updatedAt: nextPost.updatedAt.toISOString(),
          }
        : null,
    };
  });
}

/**
 * Get related published posts in the same category, falling back to latest posts.
 * Cached in Redis for DEFAULT_CACHE_TTL (24 hours).
 */
export async function getRelatedPublishedPosts(
  slug: string,
  category: string,
  limit = 3
): Promise<DbBlogPostListItem[]> {
  return cachedDbQuery(`post:related:${slug}`, DEFAULT_CACHE_TTL, async () => {
    const sameCategory = await prisma.blogPost.findMany({
      where: {
        isPublished: true,
        slug: { not: slug },
        category,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        category: true,
        tags: true,
        readTime: true,
        isPublished: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (sameCategory.length >= limit) {
      return sameCategory.map((p) => ({
        ...p,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      }));
    }

    const needed = limit - sameCategory.length;
    const excludeSlugs = [slug, ...sameCategory.map((p) => p.slug)];

    const fallback = await prisma.blogPost.findMany({
      where: {
        isPublished: true,
        slug: { notIn: excludeSlugs },
      },
      orderBy: { createdAt: 'desc' },
      take: needed,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        category: true,
        tags: true,
        readTime: true,
        isPublished: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return [...sameCategory, ...fallback].map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  });
}

// ─── Admin Queries (Direct PostgreSQL Queries) ─────────────────────────────

/**
 * Get all posts for admin list view (drafts + published).
 */
export async function getAllPosts(): Promise<DbBlogPostListItem[]> {
  const posts = await prisma.blogPost.findMany({
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      coverImage: true,
      category: true,
      tags: true,
      readTime: true,
      isPublished: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return posts.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));
}

/**
 * Get a single post by ID for admin editing.
 */
export async function getPostById(id: string): Promise<DbBlogPost | null> {
  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) return null;

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    category: post.category,
    tags: post.tags,
    readTime: post.readTime,
    isPublished: post.isPublished,
    contentBlocks: post.contentBlocks as unknown as ContentBlock[],
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
}

/**
 * Get aggregate post stats for the admin dashboard.
 */
export async function getPostStats(): Promise<{
  total: number;
  published: number;
  drafts: number;
}> {
  const [total, published] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { isPublished: true } }),
  ]);

  return {
    total,
    published,
    drafts: total - published,
  };
}

// ─── Mutations (PostgreSQL + Redis Invalidation) ───────────────────────────

export interface CreatePostInput {
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  category: string;
  tags: string[];
  readTime: string;
  isPublished: boolean;
  contentBlocks: ContentBlock[];
}

export interface UpdatePostInput extends CreatePostInput {
  id: string;
}

/**
 * Create a new blog post and invalidate Redis cache keys.
 */
export async function createPost(input: CreatePostInput): Promise<DbBlogPost> {
  const post = await prisma.blogPost.create({
    data: {
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt,
      coverImage: input.coverImage || null,
      category: input.category,
      tags: input.tags,
      readTime: input.readTime,
      isPublished: input.isPublished,
      contentBlocks: input.contentBlocks as any,
    },
  });

  await invalidateAllBlogCache();

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    category: post.category,
    tags: post.tags,
    readTime: post.readTime,
    isPublished: post.isPublished,
    contentBlocks: post.contentBlocks as unknown as ContentBlock[],
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
}

/**
 * Update an existing blog post and invalidate Redis cache keys.
 */
export async function updatePost(input: UpdatePostInput): Promise<DbBlogPost | null> {
  const post = await prisma.blogPost.update({
    where: { id: input.id },
    data: {
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt,
      coverImage: input.coverImage || null,
      category: input.category,
      tags: input.tags,
      readTime: input.readTime,
      isPublished: input.isPublished,
      contentBlocks: input.contentBlocks as any,
    },
  });

  await invalidateAllBlogCache();

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    category: post.category,
    tags: post.tags,
    readTime: post.readTime,
    isPublished: post.isPublished,
    contentBlocks: post.contentBlocks as unknown as ContentBlock[],
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
}

/**
 * Delete a blog post and invalidate Redis cache keys.
 */
export async function deletePost(id: string): Promise<boolean> {
  const post = await prisma.blogPost.findUnique({
    where: { id },
    select: { slug: true },
  });

  if (!post) return false;

  await prisma.blogPost.delete({
    where: { id },
  });

  await invalidateAllBlogCache();

  return true;
}

/**
 * Check if a slug is already taken (optionally excluding a post ID).
 */
export async function isSlugTaken(slug: string, excludeId?: string): Promise<boolean> {
  const post = await prisma.blogPost.findFirst({
    where: {
      slug,
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
    select: { id: true },
  });

  return !!post;
}
