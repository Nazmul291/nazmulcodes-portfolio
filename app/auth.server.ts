import crypto from 'crypto';

/**
 * Single-admin credential verification with timing-safe comparison.
 *
 * Both provided and expected values are SHA-256 hashed before comparison,
 * ensuring that `timingSafeEqual` always receives fixed-length buffers
 * regardless of input length. This prevents timing side-channel attacks.
 */

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

/** Hash a string using SHA-256 to produce a fixed-length buffer. */
function sha256(input: string): Buffer {
  return crypto.createHash('sha256').update(input).digest();
}

/**
 * Verify admin credentials using timing-safe comparison.
 * Returns true only if both username and password match.
 */
export function verifyCredentials(username: string, password: string): boolean {
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    console.error('ADMIN_USERNAME or ADMIN_PASSWORD environment variables are not set.');
    return false;
  }

  const usernameMatch = crypto.timingSafeEqual(
    sha256(username),
    sha256(ADMIN_USERNAME)
  );

  const passwordMatch = crypto.timingSafeEqual(
    sha256(password),
    sha256(ADMIN_PASSWORD)
  );

  return usernameMatch && passwordMatch;
}

/**
 * Extract the real client IP address from the request.
 *
 * Checks proxy headers in priority order:
 * 1. cf-connecting-ip (Cloudflare)
 * 2. x-forwarded-for (generic reverse proxy — takes the first IP)
 * 3. x-real-ip (Nginx)
 * 4. Falls back to "unknown"
 */
export function getClientIp(request: Request): string {
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();

  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0];
    return firstIp.trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  return 'unknown';
}
