import { NextRequest, NextResponse } from 'next/server'
import { getPresentations, getFeaturedPresentations } from '@/lib/directus-presentations'

/**
 * GET /api/presentations
 * Fetch presentations from Directus CMS
 * 
 * Query params:
 * - limit: number of presentations to return (default: 50)
 * - featured: return only featured presentations (default: false)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '50', 10)
    const featuredOnly = searchParams.get('featured') === 'true'
    
    // Fetch presentations from Directus
    const presentations = featuredOnly
      ? await getFeaturedPresentations()
      : await getPresentations(limit)
    
    return NextResponse.json({
      presentations,
      lastUpdated: new Date().toISOString(),
      source: 'Directus CMS',
      count: presentations.length,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
      },
    })
  } catch (error) {
    console.error('Error in presentations API:', error)
    
    // Return empty array instead of error to gracefully handle failures
    return NextResponse.json({
      presentations: [],
      lastUpdated: new Date().toISOString(),
      error: 'Failed to fetch presentations',
      count: 0,
    }, {
      status: 200, // Still return 200 to prevent client errors
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    })
  }
}
