'use client'

import { useVoidGarmentsCart } from './void-garments-cart'

export function VoidGarmentsCartBadge() {
  const { cartCount } = useVoidGarmentsCart()

  return (
    <button type="button" className="cart-btn">
      CART [{cartCount}] <span className="cart-arrow">→</span>
    </button>
  )
}
