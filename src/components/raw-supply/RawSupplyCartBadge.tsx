'use client'

import { useRawSupplyCart } from './raw-supply-cart'

export function RawSupplyCartBadge() {
  const { cartCount } = useRawSupplyCart()

  return (
    <div className="cart-btn solid-shadow">
      CART [{cartCount}] <span className="cart-arrow">→</span>
    </div>
  )
}
