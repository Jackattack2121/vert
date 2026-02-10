/**
 * ASX RSS Feed Integration
 * Fetches share price and announcements from ASX RSS feeds
 */

import { XMLParser } from 'fast-xml-parser'

export interface ASXSharePrice {
  ticker: string
  price: number
  change: number
  changePercent: number
  volume: number
  lastUpdated: string
  high: number
  low: number
  open: number
}

export interface ASXAnnouncement {
  title: string
  date: string
  category: string
  url: string
  summary?: string
}

/**
 * REMOVED: getASXSharePrice() function
 * Share price data is now provided via TradingView widget
 * See: components/investor/TradingViewWidget.tsx
 */

/**
 * Fetch company announcements from ASX RSS feed
 */
export async function getASXAnnouncements(
  ticker: string,
  limit: number = 10
): Promise<ASXAnnouncement[]> {
  try {
    // ASX RSS feed URL for company announcements
    const url = `https://www.asx.com.au/asx/statistics/announcements.do?by=asxCode&asxCode=${ticker}&timeframe=D&period=M&_=${Date.now()}`
    
    const rssData = await parseRSSFeed(url)
    
    if (!rssData || !rssData.rss || !rssData.rss.channel) {
      console.warn('No RSS data found for ticker:', ticker)
      return []
    }
    
    const channel = rssData.rss.channel
    let items = channel.item || []
    
    // Ensure items is an array
    if (!Array.isArray(items)) {
      items = [items]
    }
    
    // Parse and map announcements
    const announcements: ASXAnnouncement[] = items.slice(0, limit).map((item: any) => {
      // Extract category from title or use default
      let category = 'Company Update'
      const title = item.title || ''
      
      // Categorize based on keywords in title
      if (title.toLowerCase().includes('quarterly')) {
        category = 'Quarterly Report'
      } else if (title.toLowerCase().includes('drilling') || title.toLowerCase().includes('exploration')) {
        category = 'Exploration'
      } else if (title.toLowerCase().includes('capital') || title.toLowerCase().includes('raising')) {
        category = 'Capital Raising'
      } else if (title.toLowerCase().includes('result')) {
        category = 'Results'
      }
      
      // Parse date
      let date = new Date().toISOString()
      if (item.pubDate) {
        date = new Date(item.pubDate).toISOString()
      }
      
      // Extract URL from link or enclosure
      let url = item.link || ''
      if (item.enclosure && item.enclosure.url) {
        url = item.enclosure.url
      }
      
      return {
        title: title,
        date: date,
        category: category,
        url: url,
        summary: item.description || undefined,
      }
    })
    
    return announcements
  } catch (error) {
    console.error('Error fetching ASX announcements:', error)
    return []
  }
}

/**
 * Parse ASX RSS XML to JSON
 */
async function parseRSSFeed(url: string): Promise<any> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 900 }, // Cache for 15 minutes
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VertCapital/1.0)',
      },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const xmlText = await response.text()
    
    // Parse XML using fast-xml-parser
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
      parseAttributeValue: true,
    })
    
    const jsonData = parser.parse(xmlText)
    return jsonData
  } catch (error) {
    console.error('Error parsing RSS feed:', error)
    throw error
  }
}

/**
 * Format currency for Australian dollars
 */
export function formatAUD(value: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(value)
}

/**
 * Format large numbers with commas
 */
export function formatVolume(value: number): string {
  return new Intl.NumberFormat('en-AU').format(value)
}

/**
 * Calculate percentage change
 */
export function calculatePercentChange(current: number, previous: number): number {
  return ((current - previous) / previous) * 100
}

