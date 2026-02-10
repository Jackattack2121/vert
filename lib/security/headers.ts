/**
 * Security Headers Configuration
 * 
 * Implements security best practices for HTTP headers
 */

export const securityHeaders = {
  // Prevent clickjacking attacks
  'X-Frame-Options': 'DENY',
  
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Control referrer information
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Restrict browser features
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  
  // XSS Protection (legacy browsers)
  'X-XSS-Protection': '1; mode=block',
};

/**
 * Content Security Policy
 * 
 * Restricts sources of content that can be loaded
 */
export const contentSecurityPolicy = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://s3.tradingview.com https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.directus.io",
    "frame-src 'self' https://www.tradingview.com",
    "media-src 'self' blob:",
  ].join('; '),
};

/**
 * Strict Transport Security
 * 
 * Forces HTTPS for 1 year
 */
export const strictTransportSecurity = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

/**
 * Get all security headers
 */
export function getAllSecurityHeaders(includeHSTS: boolean = false) {
  return {
    ...securityHeaders,
    ...contentSecurityPolicy,
    ...(includeHSTS ? strictTransportSecurity : {}),
  };
}
