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

  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    if (payload.step) {
      window.clarity('set', 'funnel_step', String(payload.step))
    }

    if (payload.result_tag) {
      window.clarity('set', 'result_tag', String(payload.result_tag))
    }

    window.clarity('event', eventName)
    trackClarityStepAlias(eventName, payload)
  }
}

function sanitizeProperties(properties) {
  return Object.fromEntries(
    Object.entries(properties)
      .filter(([, value]) => ['string', 'number', 'boolean'].includes(typeof value) || value === null)
      .map(([key, value]) => [key, typeof value === 'string' ? value.slice(0, 255) : value])
  )
}

function trackClarityStepAlias(eventName, payload) {
  if (eventName === 'funnel_question_answered' && payload.question_number) {
    window.clarity('event', `quiz_q${payload.question_number}_respondida`)
  }

  if (eventName === 'funnel_question_answered' && payload.question_number === 6) {
    window.clarity('event', 'quiz_completo')
  }

  const aliases = {
    funnel_name_submitted: 'nome_inserido',
    funnel_offer_requested: 'resultado_viu_cta',
    funnel_checkout_clicked: 'clicou_comprar',
  }

  if (aliases[eventName]) {
    window.clarity('event', aliases[eventName])
  }
}
