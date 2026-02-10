import { getDirectus, Presentation } from './directus-client'
import { readItems } from '@directus/sdk'

/**
 * Interface matching NewsCard component props
 */
export interface PresentationCard {
  title: string
  date: string
  category: string
  excerpt?: string
  image?: string
  href?: string
  downloadUrl?: string
}

/**
 * Transform Directus presentation to NewsCard format
 */
function transformPresentation(presentation: Presentation): PresentationCard {
  const directusUrl = process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'
  
  return {
    title: presentation.title,
    date: new Date(presentation.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    category: presentation.category,
    excerpt: presentation.summary,
    image: presentation.image ? `${directusUrl}/assets/${presentation.image}` : undefined,
    downloadUrl: presentation.file ? `${directusUrl}/assets/${presentation.file}` : undefined,
  }
}

/**
 * Fetch published presentations from Directus
 */
export async function getPresentations(limit?: number): Promise<PresentationCard[]> {
  try {
    const directus = getDirectus()
    
    const presentations = await directus.request<Presentation[]>(
      readItems('presentations', {
        filter: {
          status: {
            _eq: 'published',
          },
        },
        sort: ['-date', 'sort'],
        limit: limit || 50,
      })
    )
    
    return presentations.map(transformPresentation)
  } catch (error) {
    console.error('Error fetching presentations from Directus:', error)
    return []
  }
}

/**
 * Fetch featured presentations only
 */
export async function getFeaturedPresentations(): Promise<PresentationCard[]> {
  try {
    const directus = getDirectus()
    
    const presentations = await directus.request<Presentation[]>(
      readItems('presentations', {
        filter: {
          status: {
            _eq: 'published',
          },
          featured: {
            _eq: true,
          },
        },
        sort: ['-date', 'sort'],
        limit: 3,
      })
    )
    
    return presentations.map(transformPresentation)
  } catch (error) {
    console.error('Error fetching featured presentations from Directus:', error)
    return []
  }
}

/**
 * Fetch a single presentation by ID
 */
export async function getPresentationById(id: string): Promise<PresentationCard | null> {
  try {
    const directus = getDirectus()
    
    const presentation = await directus.request<Presentation>(
      readItems('presentations', {
        filter: {
          id: {
            _eq: id,
          },
          status: {
            _eq: 'published',
          },
        },
        limit: 1,
      })
    )
    
    if (!presentation) {
      return null
    }
    
    return transformPresentation(presentation)
  } catch (error) {
    console.error('Error fetching presentation by ID from Directus:', error)
    return null
  }
}
