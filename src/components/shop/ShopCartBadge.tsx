'use client'

import { useShopCart } from './shop-cart'

export function ShopCartBadge() {
  const { cartCount, checkout, checkingOut, checkoutError } = useShopCart()
  const label = checkingOut
    ? 'CHECKOUT...'
    : checkoutError
      ? 'CHECKOUT FAILED'
      : `CART [${cartCount}]`

  return (
    <button
      type="button"
      className="cart-btn"
      disabled={cartCount === 0 || checkingOut}
      title={checkoutError ?? undefined}
      onClick={() => {
        void checkout()
      }}
    >
      {label} <span className="cart-arrow">→</span>
    </button>
  )
}
