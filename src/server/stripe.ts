import 'server-only'
import Stripe from 'stripe'

let stripe: Stripe | undefined

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }

  stripe ??= new Stripe(key, {
    apiVersion: '2026-09-30.endive',
  })

  return stripe
}
