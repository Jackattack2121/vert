import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import bcrypt from 'bcryptjs';
import { checkRateLimit, recordFailedAttempt, clearRateLimit, extractIpAddress } from './rate-limiter';
import { verifyMagicLinkToken } from './magic-link';

// ============================================
// SECURITY: Environment Variable Validation
// ============================================
// Validate all security-critical environment variables at runtime
// Skip validation during build process to avoid false failures

// Helper function to validate environment variables (runs at runtime only)
function validateEnvironmentVariables() {
  // Skip validation during build process
  if (process.env.NODE_ENV === 'production' && !process.env.NEXTAUTH_SECRET) {
    // Only validate in actual production runtime, not during build
    return;
  }

  // Validate NEXTAUTH_SECRET
  if (process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_SECRET.length < 32) {
    console.warn('SECURITY WARNING: NEXTAUTH_SECRET should be at least 32 characters for cryptographic security');
  }

  // Validate ADMIN_EMAIL
  if (process.env.ADMIN_EMAIL) {
    if (!process.env.ADMIN_EMAIL.includes('@') || !process.env.ADMIN_EMAIL.includes('.')) {
      console.warn('SECURITY WARNING: ADMIN_EMAIL should be a valid email address');
    }
  }

  // Validate ADMIN_PASSWORD_HASH
  if (process.env.ADMIN_PASSWORD_HASH) {
    if (!process.env.ADMIN_PASSWORD_HASH.startsWith('$2a$') && !process.env.ADMIN_PASSWORD_HASH.startsWith('$2b$')) {
      console.warn('SECURITY WARNING: ADMIN_PASSWORD_HASH should be a valid bcrypt hash (should start with $2a$ or $2b$)');
    }
    if (process.env.ADMIN_PASSWORD_HASH.length < 50) {
      console.warn('SECURITY WARNING: ADMIN_PASSWORD_HASH appears to be invalid (too short for a bcrypt hash)');
    }
  }
}

// Dummy hash for constant-time comparison to prevent timing attacks
const DUMMY_HASH = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

export const authOptions: AuthOptions = {
  providers: [
    // Magic Link authentication for portal users
    CredentialsProvider({
      id: 'magic-link',
      name: 'Magic Link',
      credentials: {
        token: { label: 'Token', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.token) {
          return null;
        }

        // Verify the magic link token
        const tokenData = verifyMagicLinkToken(credentials.token);
        
        if (!tokenData) {
          return null;
        }

        // Return user data from token
        return {
          id: tokenData.userId,
          email: tokenData.email,
          role: tokenData.role,
          userId: tokenData.userId,
        };
      },
    }),
    // Admin credentials authentication
    CredentialsProvider({
      id: 'credentials',
      name: 'CoreConnect Admin',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Validate environment variables at runtime
        validateEnvironmentVariables();

        // Check if required env vars are present
        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD_HASH || !process.env.NEXTAUTH_SECRET) {
          console.error('SECURITY ERROR: Required environment variables not configured');
          return null;
        }

        // Extract IP address for rate limiting
        const ipAddress = extractIpAddress(req);
        
        // Check rate limit before processing
        const rateLimitCheck = checkRateLimit(ipAddress);
        if (!rateLimitCheck.allowed) {
          // Rate limited - return null without revealing this
          // The user will see the same generic error message
          return null;
        }

        // Use constant-time comparison to prevent user enumeration
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminHash = process.env.ADMIN_PASSWORD_HASH;
        
        // Always perform password comparison, even if email doesn't match
        // This prevents timing attacks that could reveal valid vs invalid emails
        const hashToCompare = credentials.email === adminEmail ? adminHash : DUMMY_HASH;
        const isValidPassword = await bcrypt.compare(credentials.password, hashToCompare);
        
        // Only return user if BOTH email AND password match
        if (credentials.email === adminEmail && isValidPassword) {
          // Successful login - clear rate limit
          clearRateLimit(ipAddress);
          
          return {
            id: '1',
            email: adminEmail,
            name: 'Admin User',
            role: 'admin',
          };
        }

        // Failed login - record attempt for rate limiting
        recordFailedAttempt(ipAddress);
        
        // Generic failure - no indication of which field was wrong
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 hours for admin sessions (enhanced security)
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.userId = user.userId || user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as 'admin' | 'shareholder' | 'institutional';
        session.user.id = token.id as string;
        session.user.userId = token.userId as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

