export interface CoryMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface CoryConfig {
  siteId: string
  primaryColor: string
  position: 'bottom-right' | 'bottom-left'
  welcomeMessage: string
  starters: string[]
}
