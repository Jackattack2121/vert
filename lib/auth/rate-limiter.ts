/**
 * Rate Limiter for Admin Authentication
 * 
 * Prevents brute force attacks by limiting login attempts per IP address.
 * - Max 5 attempts per 15 minutes
 * - Exponential backoff after 3 failed attempts
 * - In-memory storage (resets on server restart)
 * 
 * SECURITY NOTE: For production multi-instance deployments,
 * consider using Redis-backed storage instead of in-memory.
 */

interface RateLimitEntry {
  attempts: number;
  firstAttempt: number;
  lockedUntil?: number;
}

interface RateLimitResult {
  allowed: boolean;
  retryAfter?: number;
  attemptsRemaining?: number;
}

// In-memory store: IP -> RateLimitEntry
const rateLimitStore = new Map<string, RateLimitEntry>();

// Configuration
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const EXPONENTIAL_BACKOFF_THRESHOLD = 3;

/**
 * Calculate exponential backoff delay in milliseconds
 */
function calculateBackoff(attempts: number): number {
  if (attempts <= EXPONENTIAL_BACKOFF_THRESHOLD) {
    return 0;
  }
  // 2^(attempts - 3) seconds, capped at 5 minutes
  const seconds = Math.min(Math.pow(2, attempts - EXPONENTIAL_BACKOFF_THRESHOLD), 300);
  return seconds * 1000;
}

/**
 * Clean up expired entries (called periodically)
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();
  const entries = Array.from(rateLimitStore.entries());
  for (const [ip, entry] of entries) {
    // Remove entries older than the window
    if (now - entry.firstAttempt > WINDOW_MS) {
      rateLimitStore.delete(ip);
    }
  }
}

// Run cleanup every minute
setInterval(cleanupExpiredEntries, 60 * 1000);

/**
 * Check if an IP address is rate limited
 */
export function checkRateLimit(ipAddress: string): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(ipAddress);

  // No previous attempts
  if (!entry) {
    return {
      allowed: true,
      attemptsRemaining: MAX_ATTEMPTS - 1,
    };
  }

  // Check if currently locked due to exponential backoff
  if (entry.lockedUntil && now < entry.lockedUntil) {
    const retryAfter = Math.ceil((entry.lockedUntil - now) / 1000);
    return {
      allowed: false,
      retryAfter,
    };
  }

  // Check if window has expired - reset counter
  if (now - entry.firstAttempt > WINDOW_MS) {
    rateLimitStore.delete(ipAddress);
    return {
      allowed: true,
      attemptsRemaining: MAX_ATTEMPTS - 1,
    };
  }

  // Check if max attempts exceeded
  if (entry.attempts >= MAX_ATTEMPTS) {
    // Calculate exponential backoff
    const backoffMs = calculateBackoff(entry.attempts);
    const retryAfter = Math.ceil(backoffMs / 1000);
    
    return {
      allowed: false,
      retryAfter,
    };
  }

  // Still within allowed attempts
  return {
    allowed: true,
    attemptsRemaining: MAX_ATTEMPTS - entry.attempts - 1,
  };
}

/**
 * Record a failed login attempt
 */
export function recordFailedAttempt(ipAddress: string): void {
  const now = Date.now();
  const entry = rateLimitStore.get(ipAddress);

  if (!entry) {
    // First failed attempt
    rateLimitStore.set(ipAddress, {
      attempts: 1,
      firstAttempt: now,
    });
    return;
  }

  // Check if window has expired - reset
  if (now - entry.firstAttempt > WINDOW_MS) {
    rateLimitStore.set(ipAddress, {
      attempts: 1,
      firstAttempt: now,
    });
    return;
  }

  // Increment attempts
  const newAttempts = entry.attempts + 1;
  const backoffMs = calculateBackoff(newAttempts);
  
  rateLimitStore.set(ipAddress, {
    attempts: newAttempts,
    firstAttempt: entry.firstAttempt,
    lockedUntil: backoffMs > 0 ? now + backoffMs : undefined,
  });
}

/**
 * Clear rate limit for an IP (called on successful login)
 */
export function clearRateLimit(ipAddress: string): void {
  rateLimitStore.delete(ipAddress);
}

/**
 * Get rate limit status for monitoring/debugging (admin only)
 */
export function getRateLimitStatus(ipAddress: string): RateLimitEntry | null {
  return rateLimitStore.get(ipAddress) || null;
}

/**
 * Extract IP address from NextAuth request
 * Handles X-Forwarded-For header for proxy scenarios
 */
export function extractIpAddress(req: any): string {
  // Try to get real IP from headers (for proxied requests)
  const forwarded = req.headers?.['x-forwarded-for'];
  if (forwarded) {
    // X-Forwarded-For can contain multiple IPs, take the first one
    const ips = forwarded.split(',');
    return ips[0].trim();
  }

  // Fallback to direct connection IP
  const realIp = req.headers?.['x-real-ip'];
  if (realIp) {
    return realIp;
  }

  // Last resort: use a placeholder (not ideal for production)
  return req.ip || 'unknown';
}
