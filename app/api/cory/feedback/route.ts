import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  let body: { messageId?: string; rating?: string }
  try {
    body = await request.json()
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid request body.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const { messageId, rating } = body

  if (!messageId || typeof messageId !== 'string') {
    return new Response(
      JSON.stringify({ error: 'messageId is required.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  if (rating !== 'up' && rating !== 'down') {
    return new Response(
      JSON.stringify({ error: 'rating must be "up" or "down".' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  console.log(`[Cory Feedback] messageId=${messageId} rating=${rating}`)

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}
