import { NextRequest, NextResponse } from 'next/server';
import { getNewsPostBySlug } from '@/lib/directus-news';

/**
 * GET /api/news/[slug]
 * 
 * Fetch a single news post by slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getNewsPostBySlug(params.slug);

    if (!post) {
      return NextResponse.json(
        { error: 'News post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post });

  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news post' },
      { status: 500 }
    );
  }
}
