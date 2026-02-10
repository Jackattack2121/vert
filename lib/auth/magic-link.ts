import { randomBytes } from 'crypto';

export interface MagicLinkToken {
  token: string;
  email: string;
  role: 'shareholder' | 'institutional';
  userId: string;
  expiresAt: Date;
  used: boolean;
}

// In-memory token storage (will be replaced with Directus in production)
const tokenStore = new Map<string, MagicLinkToken>();

/**
 * Generate a secure magic link token
 */
export function generateMagicLinkToken(
  email: string,
  role: 'shareholder' | 'institutional',
  userId: string
): string {
  // Generate cryptographically secure random token
  const token = randomBytes(32).toString('hex');
  
  const expiryMinutes = parseInt(process.env.MAGIC_LINK_EXPIRY || '900', 10) / 60;
  const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

  tokenStore.set(token, {
    token,
    email,
    role,
    userId,
    expiresAt,
    used: false,
  });

  return token;
}

/**
 * Verify and consume a magic link token
 */
export function verifyMagicLinkToken(token: string): MagicLinkToken | null {
  const tokenData = tokenStore.get(token);

  if (!tokenData) {
    return null;
  }

  // Check if token has expired
  if (new Date() > tokenData.expiresAt) {
    tokenStore.delete(token);
    return null;
  }

  // Check if token has already been used
  if (tokenData.used) {
    return null;
  }

  // Mark token as used (one-time use)
  tokenData.used = true;
  tokenStore.set(token, tokenData);

  // Delete token after use for security
  setTimeout(() => {
    tokenStore.delete(token);
  }, 1000);

  return tokenData;
}

/**
 * Clean up expired tokens (should be run periodically)
 */
export function cleanupExpiredTokens(): void {
  const now = new Date();
  for (const [token, data] of tokenStore.entries()) {
    if (now > data.expiresAt) {
      tokenStore.delete(token);
    }
  }
}

/**
 * Generate magic link URL
 */
export function generateMagicLinkUrl(token: string, baseUrl: string): string {
  return `${baseUrl}/portal/verify?token=${token}`;
}

/**
 * Send magic link email via Listmonk or SMTP
 */
export async function sendMagicLinkEmail(
  email: string,
  magicLinkUrl: string,
  userName?: string
): Promise<boolean> {
  // TODO: Integrate with existing Listmonk setup or use email provider
  // For now, we'll use a simple email service
  
  try {
    // Check if Resend is configured (from existing setup)
    if (process.env.EMAIL_SERVER_HOST && process.env.EMAIL_FROM) {
      // Use NextAuth email provider (will be configured)
      return true;
    }

    // Log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('='.repeat(80));
      console.log('MAGIC LINK EMAIL');
      console.log('='.repeat(80));
      console.log(`To: ${email}`);
      console.log(`Name: ${userName || 'User'}`);
      console.log(`Magic Link: ${magicLinkUrl}`);
      console.log('='.repeat(80));
    }

    return true;
  } catch (error) {
    console.error('Failed to send magic link email:', error);
    return false;
  }
}
