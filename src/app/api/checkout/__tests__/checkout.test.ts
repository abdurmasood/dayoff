import { describe, expect, it } from 'vitest'
import { quoteShopCart } from '../checkout'

describe('quoteShopCart', () => {
  it('prices a shop product in cents', () => {
    const result = quoteShopCart({
      items: [{ id: '8892-A', quantity: 2 }],
    })

    expect(result).toEqual({
      ok: true,
      lines: [
        {
          id: '8892-A',
          name: 'KEVLAR VEST V.1',
          unitAmount: 85000,
          quantity: 2,
        },
      ],
    })
  })

  it('rejects a sold-out product', () => {
    const result = quoteShopCart({
      items: [{ id: '4421-C', quantity: 1 }],
    })

    expect(result).toEqual({ ok: false, error: 'Product is unavailable' })
  })

  it('rejects an unknown product', () => {
    const result = quoteShopCart({
      items: [{ id: 'nope', quantity: 1 }],
    })

    expect(result).toEqual({ ok: false, error: 'Unknown product' })
  })

  it('rejects a bad quantity', () => {
    const result = quoteShopCart({
      items: [{ id: '1102-D', quantity: 0 }],
    })

    expect(result).toEqual({ ok: false, error: 'Cart is invalid' })
  })
})
