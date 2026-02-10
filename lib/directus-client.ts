import { createDirectus, rest, staticToken } from '@directus/sdk'

/**
 * Directus Collection Schemas
 */
export interface Presentation {
  id: string
  title: string
  date: string
  category: 'Investor Presentation' | 'Company Presentation' | 'Conference' | 'Webinar'
  summary?: string
  file?: string
  image?: string
  featured: boolean
  status: 'published' | 'draft'
  sort?: number
}

/**
 * Directus Schema Type
 */
export interface DirectusSchema {
  presentations: Presentation[]
}

/**
 * Create and configure Directus client
 */
export function getDirectusClient() {
  const directusUrl = process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'
  const directusToken = process.env.DIRECTUS_TOKEN || ''
  
  if (!directusToken) {
    console.warn('DIRECTUS_TOKEN not set - Directus features may not work')
  }
  
  const client = createDirectus<DirectusSchema>(directusUrl)
    .with(rest())
    .with(staticToken(directusToken))
  
  return client
}

/**
 * Singleton instance of Directus client
 */
let directusClient: ReturnType<typeof getDirectusClient> | null = null

export function getDirectus() {
  if (!directusClient) {
    directusClient = getDirectusClient()
  }
  return directusClient
}
