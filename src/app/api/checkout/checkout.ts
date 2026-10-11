/**
 * Behavior for POST /api/checkout.
 *
 * Checks the cart and creates the Stripe session.
 */

import 'server-only'
import { MAX_SHOP_QUANTITY } from '@/lib/shop'
import { getStripe } from '@/server/stripe'

type ShopPrice = {
  id: string
  name: string
  unitAmount: number
  sellable: boolean
}

const SHOP_PRICES: ShopPrice[] = [
  { id: '8892-A', name: 'KEVLAR VEST V.1', unitAmount: 85000, sellable: true },
  { id: '7710-B', name: 'TACTICAL SHELL', unitAmount: 120000, sellable: true },
  { id: '4421-C', name: 'ISOLATION PANTS', unitAmount: 65000, sellable: false },
  { id: '1102-D', name: 'HARNESS TEE', unitAmount: 32000, sellable: true },
  { id: '9980-E', name: 'UTILITY RIG', unitAmount: 98000, sellable: true },
  { id: '2234-F', name: 'EXO-GLOVES', unitAmount: 15000, sellable: true },
]

const pricesById = new Map(SHOP_PRICES.map((product) => [product.id, product]))

export type QuotedLine = {
  id: string
  name: string
  unitAmount: number
  quantity: number
}

export function quoteShopCart(
  input: unknown,
): { ok: true; lines: QuotedLine[] } | { ok: false; error: string } {
  if (!input || typeof input !== 'object' || !('items' in input)) {
    return { ok: false, error: 'Cart required' }
  }

  const items = input.items
  if (!Array.isArray(items) || items.length === 0) {
    return { ok: false, error: 'Cart is empty' }
  }

  if (items.length > SHOP_PRICES.length) {
    return { ok: false, error: 'Cart is invalid' }
  }

  const lines: QuotedLine[] = []
  const seen = new Set<string>()

  for (const item of items) {
    if (!item || typeof item !== 'object') {
      return { ok: false, error: 'Cart is invalid' }
    }

    const { id, quantity } = item as { id?: unknown; quantity?: unknown }
    if (typeof id !== 'string' || seen.has(id)) {
      return { ok: false, error: 'Cart is invalid' }
    }

    if (
      typeof quantity !== 'number' ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_SHOP_QUANTITY
    ) {
      return { ok: false, error: 'Cart is invalid' }
    }

    const product = pricesById.get(id)
    if (!product) {
      return { ok: false, error: 'Unknown product' }
    }

    if (!product.sellable) {
      return { ok: false, error: 'Product is unavailable' }
    }

    seen.add(id)
    lines.push({
      id: product.id,
      name: product.name,
      unitAmount: product.unitAmount,
      quantity,
    })
  }

  return { ok: true, lines }
}

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'

function shopIntegrationIdentifier() {
  let suffix = ''
  for (let index = 0; index < 8; index += 1) {
    suffix += LETTERS[Math.floor(Math.random() * LETTERS.length)]
  }

  return `dayoff_shop_${suffix}`
}

export async function checkout(
  body: unknown,
  origin: string,
): Promise<{ status: number; body: { url?: string; error?: string } }> {
  const quote = quoteShopCart(body)
  if (!quote.ok) {
    return { status: 400, body: { error: quote.error } }
  }

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
    return { status: 500, body: { error: 'Checkout unavailable' } }
  }

  return { status: 200, body: { url: session.url } }
}
