import { NextRequest, NextResponse } from 'next/server'
import { getASXAnnouncements } from '@/lib/asx-rss'

/**
 * GET /api/announcements
 * Fetch ASX announcements with optional filtering
 * 
 * Query params:
 * - limit: number of announcements to return (default: 10)
 * - category: filter by category (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const categoryFilter = searchParams.get('category')
    
    // Get ASX code from environment (configurable per client company)
    const asxCode = process.env.ASX_CODE || ''
    
    // Fetch announcements from ASX RSS feed
    let announcements = await getASXAnnouncements(asxCode, limit * 2) // Fetch more for filtering
    
    // Apply category filter if provided
    if (categoryFilter) {
      announcements = announcements.filter(
        (announcement) => announcement.category.toLowerCase() === categoryFilter.toLowerCase()
      )
    }
    
    // Apply limit after filtering
    announcements = announcements.slice(0, limit)
    
    return NextResponse.json({
      announcements,
      lastUpdated: new Date().toISOString(),
      source: 'ASX RSS Feed',
      ticker: asxCode,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
      },
    })
  } catch (error) {
    console.error('Error in announcements API:', error)
    
    // Return empty array instead of error to gracefully handle failures
    return NextResponse.json({
      announcements: [],
      lastUpdated: new Date().toISOString(),
      error: 'Failed to fetch announcements',
    }, {
      status: 200, // Still return 200 to prevent client errors
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    })
  }
}
