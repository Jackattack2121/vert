import { NextRequest, NextResponse } from 'next/server';
import { verifyMagicLinkToken } from '@/lib/auth/magic-link';

/**
 * GET /api/auth/verify-token
 * 
 * Verify a magic link token
 * 
 * Query params:
 * - token: string (magic link token)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Verify the token
    const tokenData = verifyMagicLinkToken(token);

    if (!tokenData) {
      return NextResponse.json(
        { 
          error: 'Invalid or expired token',
          valid: false 
        },
        { status: 401 }
      );
    }

    // Return token data (without sensitive info)
    return NextResponse.json({
      valid: true,
      email: tokenData.email,
      role: tokenData.role,
      userId: tokenData.userId,
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify token' },
      { status: 500 }
    );
  }
}
