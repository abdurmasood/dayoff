'use client'

import { useJacketsCart } from './jackets-cart'

export function JacketsCartBadge() {
  const { cartCount } = useJacketsCart()

  return (
    <button type="button" className="cart-btn">
      CART [{cartCount}] <span className="cart-arrow">→</span>
    </button>
  )
}
