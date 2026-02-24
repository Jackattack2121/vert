import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getKnowledgeBase } from '@/lib/cory/knowledge-base'
import { isRateLimited } from '@/lib/cory/rate-limiter'
import { CORY_CONFIG } from '@/lib/cory/config'

const config = CORY_CONFIG['vert-capital']

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || '127.0.0.1'
}

function buildSystemPrompt(): string {
  const knowledgeBase = getKnowledgeBase(config.siteId)
  return `You are Cory, the AI assistant for ${config.companyName}.

Your personality:
- Friendly, professional, and knowledgeable
- Speak clearly and concisely — no jargon unless the user uses it first
- Helpful but honest — if you don't know something, say so
- Never give financial advice or forward-looking statements
- Always clarify that users should check official sources for material information

IMPORTANT RULES:
1. NEVER provide specific financial advice, investment recommendations, or opinions on specific stocks or securities
2. NEVER make predictions or forward-looking statements about company performance, share prices, or market movements
3. If asked about something you don't know, say: "I don't have that specific information. I'd recommend contacting the team directly at info@vertcapital.com.au or +61 8 9481 0389."
4. Keep responses concise — under 150 words unless the question genuinely requires more detail
5. FORMAT: You are displayed in a small chat widget. Use short paragraphs. Use **bold** sparingly for key terms only. Use bullet points with "- " for lists. Do NOT use headings (#), tables, or long blocks of text.
6. When discussing portfolio companies, always note that information is general in nature and users should consult official ASX announcements for material information
7. If asked for financial advice, remind users that Vert Capital provides general information only and they should seek professional advice for their specific situation

Company Knowledge:
${knowledgeBase}`
}

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'AI assistant is not configured.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const ip = getClientIp(request)
  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please wait a moment.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    )
  }

  let body: { message?: string; history?: Array<{ role: string; content: string }> }
  try {
    body = await request.json()
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid request body.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const { message, history } = body

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return new Response(
      JSON.stringify({ error: 'Message is required.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  if (message.length > config.maxMessageLength) {
    return new Response(
      JSON.stringify({ error: `Message must be under ${config.maxMessageLength} characters.` }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  if (history && !Array.isArray(history)) {
    return new Response(
      JSON.stringify({ error: 'History must be an array.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const formattedHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
  if (history && Array.isArray(history)) {
    const trimmedHistory = history.slice(-config.maxHistoryMessages)
    for (const msg of trimmedHistory) {
      if (msg.role === 'user' || msg.role === 'assistant') {
        formattedHistory.push({
          role: msg.role as 'user' | 'assistant',
          content: typeof msg.content === 'string' ? msg.content : '',
        })
      }
    }
  }
  formattedHistory.push({ role: 'user', content: message.trim() })

  const systemPrompt = buildSystemPrompt()

  try {
    const client = new Anthropic()
    const stream = client.messages.stream({
      model: 'claude-3-haiku-20240307',
      max_tokens: 512,
      system: systemPrompt,
      messages: formattedHistory,
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        function safeEnqueue(data: string) {
          try {
            controller.enqueue(encoder.encode(data))
          } catch {
            // Stream may have been cancelled
          }
        }
        function safeClose() {
          try {
            controller.close()
          } catch {
            // Already closed
          }
        }
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              safeEnqueue(`data: ${event.delta.text}\n\n`)
            }
          }
          safeEnqueue('data: [DONE]\n\n')
        } catch {
          safeEnqueue('data: [ERROR]\n\n')
        } finally {
          safeClose()
        }
      },
      cancel() {
        stream.abort()
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch {
    return new Response(
      JSON.stringify({ error: 'Failed to connect to AI service.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
