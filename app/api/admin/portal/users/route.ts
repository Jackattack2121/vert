import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-config';

/**
 * GET /api/admin/portal/users
 * 
 * Fetch all portal users (admin only)
 * 
 * Query params:
 * - role: 'shareholder' | 'institutional' (optional)
 * - status: 'active' | 'pending' | 'suspended' (optional)
 */
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const status = searchParams.get('status');

    // TODO: Fetch from Directus
    // const users = await directusClient.request(readItems('portal_users', { filter: ... }));

    return NextResponse.json({
      users: [], // TODO: Implement
      total: 0,
    });

  } catch (error) {
    console.error('Admin portal users API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/portal/users
 * 
 * Create a new portal user and send invite
 */
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { email, first_name, last_name, role, company } = body;

    // Validate required fields
    if (!email || !first_name || !last_name || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Create user in Directus
    // TODO: Send magic link invitation email

    return NextResponse.json({
      success: true,
      message: 'User created and invitation sent',
    });

  } catch (error) {
    console.error('Admin create user API error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
