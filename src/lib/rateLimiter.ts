import { RATE_LIMIT } from "./constants";

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

/**
 * Lazily purge expired entries to avoid memory leaks.
 * Runs on every check instead of a global setInterval (serverless-safe).
 */
function purgeExpired(): void {
  const now = Date.now();
  rateLimitMap.forEach((entry, ip) => {
    if (now > entry.resetTime) {
      rateLimitMap.delete(ip);
    }
  });
}

export function checkRateLimit(ip: string): {
  allowed: boolean;
  retryAfter?: number;
} {
  purgeExpired();

  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    });
    return { allowed: true };
  }

  if (entry.count >= RATE_LIMIT.maxRequests) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  entry.count++;
  return { allowed: true };
}

export function resetRateLimit(ip: string): void {
  rateLimitMap.delete(ip);
}
