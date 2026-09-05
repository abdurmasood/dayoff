'use client'

import { useShopCart } from './shop-cart'

export function ShopCartBadge() {
  const { cartCount } = useShopCart()

  return (
    <div className="cart-btn">
      CART [{cartCount}] <span className="cart-arrow">→</span>
    </div>
  )
}
