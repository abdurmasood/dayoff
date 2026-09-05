'use client'

import { useComfortableCart } from './comfortable-cart'

export function ComfortableCartBadge() {
  const { cartCount } = useComfortableCart()

  return (
    <button type="button" className="cart-btn">
      CART [{cartCount}] <span className="cart-arrow">→</span>
    </button>
  )
}
