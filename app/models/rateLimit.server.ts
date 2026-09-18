import { prisma } from '~/db.server';

/**
 * IP-based rate limiting for admin login brute-force defense.
 *
 * Policy:
 * - Max 3 failed attempts per IP address.
 * - After 3 failures, the IP is blocked for 1 hour (60 minutes).
 * - Successful login resets the counter.
 */

const MAX_ATTEMPTS = 3;
const BLOCK_DURATION_MS = 60 * 60 * 1000; // 1 hour in milliseconds

export interface RateLimitStatus {
  blocked: boolean;
  attemptsLeft: number;
  blockedUntil: string | null;
}

/** Check the current rate limit status for an IP address. */
export async function checkRateLimit(ip: string): Promise<RateLimitStatus> {
  try {
    const record = await prisma.ipRateLimit.findUnique({
      where: { ip },
    });

    if (!record) {
      return { blocked: false, attemptsLeft: MAX_ATTEMPTS, blockedUntil: null };
    }

    if (record.blockedUntil) {
      if (record.blockedUntil > new Date()) {
        return {
          blocked: true,
          attemptsLeft: 0,
          blockedUntil: record.blockedUntil.toISOString(),
        };
      }

      // Block period expired — reset the record
      await prisma.ipRateLimit.update({
        where: { ip },
        data: { attempts: 0, blockedUntil: null },
      });

      return { blocked: false, attemptsLeft: MAX_ATTEMPTS, blockedUntil: null };
    }

    return {
      blocked: false,
      attemptsLeft: Math.max(0, MAX_ATTEMPTS - record.attempts),
      blockedUntil: null,
    };
  } catch (err) {
    console.warn('[RateLimit Error]:', err);
    // If database rate limit table is not yet migrated, do not block login
    return { blocked: false, attemptsLeft: MAX_ATTEMPTS, blockedUntil: null };
  }
}

/** Record a failed login attempt. Blocks the IP after MAX_ATTEMPTS failures. */
export async function recordFailedAttempt(ip: string): Promise<RateLimitStatus> {
  try {
    const existing = await prisma.ipRateLimit.findUnique({
      where: { ip },
    });

    if (!existing) {
      await prisma.ipRateLimit.create({
        data: { ip, attempts: 1, blockedUntil: null },
      });
      return { blocked: false, attemptsLeft: MAX_ATTEMPTS - 1, blockedUntil: null };
    }

    const newAttempts = existing.attempts + 1;

    if (newAttempts >= MAX_ATTEMPTS) {
      const blockedUntil = new Date(Date.now() + BLOCK_DURATION_MS);
      await prisma.ipRateLimit.update({
        where: { ip },
        data: { attempts: newAttempts, blockedUntil },
      });
      return { blocked: true, attemptsLeft: 0, blockedUntil: blockedUntil.toISOString() };
    }

    await prisma.ipRateLimit.update({
      where: { ip },
      data: { attempts: newAttempts },
    });

    return {
      blocked: false,
      attemptsLeft: MAX_ATTEMPTS - newAttempts,
      blockedUntil: null,
    };
  } catch (err) {
    console.warn('[RateLimit Error]:', err);
    return { blocked: false, attemptsLeft: MAX_ATTEMPTS, blockedUntil: null };
  }
}

/** Reset failed attempts for an IP on successful login. */
export async function resetAttempts(ip: string): Promise<void> {
  try {
    await prisma.ipRateLimit.delete({
      where: { ip },
    });
  } catch {
    // Record might not exist, ignore
  }
}
