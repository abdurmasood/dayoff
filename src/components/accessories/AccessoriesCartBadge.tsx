'use client'

import { useAccessoriesCart } from './accessories-cart'

export function AccessoriesCartBadge() {
  const { cartCount } = useAccessoriesCart()

  return (
    <div className="cart-btn solid-shadow">
      CART [{cartCount}] <span className="cart-arrow">→</span>
    </div>
  )
}
