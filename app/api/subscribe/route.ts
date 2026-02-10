import { NextResponse } from 'next/server'

const LISTMONK_URL = process.env.LISTMONK_URL
const LISTMONK_USERNAME = process.env.LISTMONK_USERNAME
const LISTMONK_PASSWORD = process.env.LISTMONK_PASSWORD

// List IDs (from setup-listmonk.js output)
const LIST_IDS = {
  announcements: 4, // ASX Announcements
  reports: 5, // Quarterly Reports
  news: 3, // Investor Updates (general news)
}

/**
 * Check if Listmonk is properly configured
 * Prevents localhost connections in production
 */
function isListmonkAvailable(): boolean {
  if (!LISTMONK_URL || !LISTMONK_USERNAME || !LISTMONK_PASSWORD) {
    return false
  }
  
  // Prevent localhost connections (likely misconfiguration in production)
  if (LISTMONK_URL.includes('localhost') || LISTMONK_URL.includes('127.0.0.1')) {
    return false
  }
  
  return true
}

export async function POST(request: Request) {
  // Check if Listmonk is available before processing
  if (!isListmonkAvailable()) {
    return NextResponse.json(
      {
        available: false,
        error: 'Email subscriptions launching soon'
      },
      { status: 503 }
    )
  }
  try {
    const { email, name, preferences } = await request.json()

    // Validate input
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    // Map preferences to list IDs
    const selectedLists = []
    if (preferences?.announcements) selectedLists.push(LIST_IDS.announcements)
    if (preferences?.reports) selectedLists.push(LIST_IDS.reports)
    if (preferences?.news) selectedLists.push(LIST_IDS.news)

    // Default to all lists if no preferences selected
    if (selectedLists.length === 0) {
      selectedLists.push(LIST_IDS.news)
    }

    // Create Basic Auth header (credentials are guaranteed to exist by isListmonkAvailable check)
    const authHeader = 'Basic ' + Buffer.from(`${LISTMONK_USERNAME!}:${LISTMONK_PASSWORD!}`).toString('base64')

    // Subscribe to Listmonk
    const response = await fetch(`${LISTMONK_URL!}/api/subscribers`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name: name || email.split('@')[0],
        status: 'enabled',
        lists: selectedLists,
        attribs: {
          source: 'website',
          subscribed_at: new Date().toISOString(),
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      
      // Check if subscriber already exists
      if (response.status === 409 || errorData.message?.includes('exists')) {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 409 }
        )
      }

      console.error('Listmonk API error:', errorData)
      throw new Error('Failed to subscribe')
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Please check your email to confirm.',
      subscriber_id: data.data?.id,
    })
  } catch (error) {
    console.error('Subscription error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to subscribe. Please try again later or contact us directly.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
}

