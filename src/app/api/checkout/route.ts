/**
 * POST /api/checkout
 *
 * Reads the cart and returns the Stripe Checkout URL.
 */

import { checkout } from './checkout'

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Cart required' }, { status: 400 })
  }

  const origin = new URL(request.url).origin
  const result = await checkout(body, origin)
  return Response.json(result.body, { status: result.status })
}
