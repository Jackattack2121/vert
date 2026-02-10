import { NextRequest, NextResponse } from 'next/server';
import { generateMagicLinkToken, generateMagicLinkUrl, sendMagicLinkEmail } from '@/lib/auth/magic-link';
import { checkRateLimit, recordFailedAttempt } from '@/lib/auth/rate-limiter';

/**
 * POST /api/auth/magic-link
 * 
 * Request a magic link for passwordless authentication
 * 
 * Body:
 * - email: string (user's email address)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Rate limiting check
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    const rateLimitCheck = checkRateLimit(ipAddress);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimitCheck.retryAfter 
        },
        { status: 429 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      recordFailedAttempt(ipAddress);
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // TODO: Look up user in Directus by email to get userId and role
    // For now, we'll return a success response regardless
    // This prevents email enumeration attacks
    
    // In production, this would:
    // 1. Query Directus for user by email
    // 2. If user exists, generate token and send email
    // 3. If user doesn't exist, still return success (security best practice)
    
    // Simulated user lookup (will be replaced with Directus query)
    const mockUserLookup = async (email: string) => {
      // This will be replaced with:
      // const user = await directusClient.request(readItems('portal_users', { filter: { email } }));
      return null;
    };

    const user = await mockUserLookup(email);
    
    if (user) {
      // Generate magic link token
      const token = generateMagicLinkToken(
        email,
        user.role as 'shareholder' | 'institutional',
        user.id
      );

      // Generate magic link URL
      const baseUrl = process.env.NEXTAUTH_URL || 
                     `${request.headers.get('x-forwarded-proto') || 'http'}://${request.headers.get('host')}`;
      const magicLinkUrl = generateMagicLinkUrl(token, baseUrl);

      // Send magic link email
      await sendMagicLinkEmail(email, magicLinkUrl, user.name);
    }

    // Always return success to prevent email enumeration
    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email, a magic link has been sent.',
    });

  } catch (error) {
    console.error('Magic link error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
