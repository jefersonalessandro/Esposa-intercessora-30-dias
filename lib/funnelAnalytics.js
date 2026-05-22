import { track } from '@vercel/analytics'

export function trackFunnelEvent(eventName, properties = {}) {
  const payload = sanitizeProperties(properties)

  try {
    track(eventName, payload)
  } catch {
    // Analytics should never block the quiz flow.
  }

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload)
  }
}

function sanitizeProperties(properties) {
  return Object.fromEntries(
    Object.entries(properties)
      .filter(([, value]) => ['string', 'number', 'boolean'].includes(typeof value) || value === null)
      .map(([key, value]) => [key, typeof value === 'string' ? value.slice(0, 255) : value])
  )
}
