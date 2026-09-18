import { Redis } from '@upstash/redis';

/**
 * Upstash Redis Cache Layer for Database Operations
 *
 * Implements a strict Cache-Aside pattern with resilient fallback:
 * - Read: Redis -> Database on cache miss or Redis error.
 * - Write: Database mutation -> Invalidate related Redis keys.
 * - Resilience: If Redis is unconfigured or encounters a network/API failure,
 *   operations automatically and seamlessly fall back to PostgreSQL.
 */

let redisInstance: Redis | null = null;
let isRedisDisabled = false;

export function getRedis(): Redis | null {
  if (isRedisDisabled) return null;
  if (redisInstance) return redisInstance;

  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.REDIS_KV_REST_API_URL ||
    process.env.KV_REST_API_URL;

  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.REDIS_KV_REST_API_TOKEN ||
    process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    // Graceful: Redis credentials not configured yet, fallback to DB directly
    return null;
  }

  try {
    redisInstance = new Redis({
      url,
      token,
    });
    return redisInstance;
  } catch (err) {
    console.warn('[Redis] Failed to initialize Upstash Redis client. Falling back to DB.', err);
    isRedisDisabled = true;
    return null;
  }
}

/**
 * Executes a database query with Upstash Redis caching and automatic DB fallback.
 *
 * @param key Cache key (e.g., 'posts:published:list')
 * @param ttlSeconds Time-to-live in seconds (e.g., 3600 for 1 hour)
 * @param fetcher Database query function to execute on cache miss or error
 */
export async function cachedDbQuery<T>(
  key: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>
): Promise<T> {
  const redis = getRedis();

  if (redis) {
    try {
      const cached = await redis.get<T>(key);
      if (cached !== null && cached !== undefined) {
        return cached;
      }
    } catch (err) {
      console.warn(`[Redis Cache Error] Key "${key}" failed, falling back to DB:`, err);
    }
  }

  // Fallback to database query
  const freshData = await fetcher();

  // Cache in Redis if available and data is not null/undefined
  if (redis && freshData !== null && freshData !== undefined) {
    try {
      await redis.set(key, freshData, { ex: ttlSeconds });
    } catch (err) {
      console.warn(`[Redis Cache Set Error] Failed to cache key "${key}":`, err);
    }
  }

  return freshData;
}

export const DEFAULT_CACHE_TTL = 86400; // 24 hours (1440 minutes)

/**
 * Invalidates one or more Redis cache keys upon database mutation (create/update/delete).
 */
export async function invalidateCacheKeys(...keys: string[]): Promise<void> {
  const redis = getRedis();
  if (!redis || keys.length === 0) return;

  try {
    await Promise.all(keys.map((k) => redis.del(k)));
  } catch (err) {
    console.warn('[Redis Invalidate Error] Failed to delete cache keys:', keys, err);
  }
}

/**
 * Purges all blog-related cache keys (posts list, post detail, adjacent, related)
 * to ensure complete site-wide consistency whenever an article is created, updated, or deleted.
 */
export async function invalidateAllBlogCache(): Promise<void> {
  const redis = getRedis();
  if (!redis) return;

  try {
    const keys = await redis.keys('post*');
    if (keys && keys.length > 0) {
      await Promise.all(keys.map((k) => redis.del(k)));
    }
  } catch (err) {
    console.warn('[Redis Invalidate All Error] Failed to purge blog cache keys:', err);
  }
}
