import { shopIntegrationIdentifier } from '@/lib/checkout-session'
import { quoteShopCart } from '@/lib/shop-catalog'
import { getStripe } from '@/lib/stripe'

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Cart required' }, { status: 400 })
  }

  const quote = quoteShopCart(body)
  if (!quote.ok) {
    return Response.json({ error: quote.error }, { status: 400 })
  }

  const origin = new URL(request.url).origin
  const session = await getStripe().checkout.sessions.create({
    mode: 'payment',
    line_items: quote.lines.map((line) => ({
      quantity: line.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: line.unitAmount,
        product_data: {
          name: line.name,
        },
      },
    })),
    success_url: `${origin}/tops/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/tops/checkout/cancel`,
    integration_identifier: shopIntegrationIdentifier(),
  })

  if (!session.url) {
    return Response.json({ error: 'Checkout unavailable' }, { status: 500 })
  }

  return Response.json({ url: session.url })
}
