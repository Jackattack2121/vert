import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-config';

const LISTMONK_URL = process.env.LISTMONK_URL;
const LISTMONK_USERNAME = process.env.LISTMONK_USERNAME;
const LISTMONK_PASSWORD = process.env.LISTMONK_PASSWORD;

/**
 * Check if Listmonk is properly configured
 * Prevents localhost connections in production
 */
function isListmonkAvailable(): boolean {
  if (!LISTMONK_URL || !LISTMONK_USERNAME || !LISTMONK_PASSWORD) {
    return false;
  }
  
  // Prevent localhost connections (likely misconfiguration in production)
  if (LISTMONK_URL.includes('localhost') || LISTMONK_URL.includes('127.0.0.1')) {
    return false;
  }
  
  return true;
}

/**
 * Get Basic Auth header for Listmonk
 */
function getAuthHeader(): string {
  return 'Basic ' + Buffer.from(`${LISTMONK_USERNAME!}:${LISTMONK_PASSWORD!}`).toString('base64');
}

/**
 * Proxy all requests to Listmonk with admin authentication
 * This ensures the user's CoreConnect session grants them access to Listmonk
 */

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const session = await getServerSession(authOptions);
  
  // Validate admin session and role
  if (!session?.user?.role || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Check if Listmonk is available
  if (!isListmonkAvailable()) {
    return NextResponse.json(
      { available: false, error: 'Listmonk not configured' },
      { status: 503 }
    );
  }

  try {
    const path = params.path.join('/');
    const searchParams = request.nextUrl.searchParams.toString();
    const url = `${LISTMONK_URL!}/api/${path}${searchParams ? `?${searchParams}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    // Generic error logging - do not log sensitive details
    console.error('[API] Listmonk proxy request failed');
    return NextResponse.json(
      { error: 'Failed to communicate with Listmonk' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const session = await getServerSession(authOptions);
  
  // Validate admin session and role
  if (!session?.user?.role || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Check if Listmonk is available
  if (!isListmonkAvailable()) {
    return NextResponse.json(
      { available: false, error: 'Listmonk not configured' },
      { status: 503 }
    );
  }

  try {
    const path = params.path.join('/');
    const body = await request.json();
    const url = `${LISTMONK_URL!}/api/${path}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    // Generic error logging - do not log sensitive details
    console.error('[API] Listmonk proxy request failed');
    return NextResponse.json(
      { error: 'Failed to communicate with Listmonk' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const session = await getServerSession(authOptions);
  
  // Validate admin session and role
  if (!session?.user?.role || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Check if Listmonk is available
  if (!isListmonkAvailable()) {
    return NextResponse.json(
      { available: false, error: 'Listmonk not configured' },
      { status: 503 }
    );
  }

  try {
    const path = params.path.join('/');
    const body = await request.json();
    const url = `${LISTMONK_URL!}/api/${path}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    // Generic error logging - do not log sensitive details
    console.error('[API] Listmonk proxy request failed');
    return NextResponse.json(
      { error: 'Failed to communicate with Listmonk' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const session = await getServerSession(authOptions);
  
  // Validate admin session and role
  if (!session?.user?.role || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Check if Listmonk is available
  if (!isListmonkAvailable()) {
    return NextResponse.json(
      { available: false, error: 'Listmonk not configured' },
      { status: 503 }
    );
  }

  try {
    const path = params.path.join('/');
    const url = `${LISTMONK_URL!}/api/${path}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: getAuthHeader(),
      },
    });

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    // Generic error logging - do not log sensitive details
    console.error('[API] Listmonk proxy request failed');
    return NextResponse.json(
      { error: 'Failed to communicate with Listmonk' },
      { status: 500 }
    );
  }
}
