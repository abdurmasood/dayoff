import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'

const PAID_EVENTS = new Set<Stripe.Event.Type>([
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
])

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  const signature = request.headers.get('stripe-signature')
  if (!secret || !signature) {
    return Response.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const payload = await request.text()

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(payload, signature, secret)
  } catch {
    return Response.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (!PAID_EVENTS.has(event.type)) {
    return Response.json({ received: true })
  }

  const session = event.data.object
  if (session.object !== 'checkout.session' || session.payment_status !== 'paid') {
    return Response.json({ received: true })
  }

  return Response.json({ received: true, paid: true })
}
