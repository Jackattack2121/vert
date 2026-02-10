import { NextRequest, NextResponse } from 'next/server';
import { getNewsPosts } from '@/lib/directus-news';

/**
 * GET /api/news
 * 
 * Fetch news posts with optional filtering
 * 
 * Query params:
 * - limit: number (default: 10)
 * - offset: number (default: 0)
 * - category: string (optional)
 * - featured: boolean (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const category = searchParams.get('category') || undefined;
    const featuredParam = searchParams.get('featured');
    const featured = featuredParam ? featuredParam === 'true' : undefined;

    const { posts, total } = await getNewsPosts({
      limit,
      offset,
      category,
      featured,
    });

    return NextResponse.json({
      posts,
      total,
      limit,
      offset,
    });

  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news posts' },
      { status: 500 }
    );
  }
}
