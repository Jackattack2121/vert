const WINDOW_MS = 60 * 1000
const MAX_REQUESTS = 10
const store = new Map<string, { count: number; resetAt: number }>()

export function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = store.get(ip)
  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  entry.count++
  return entry.count > MAX_REQUESTS
}
