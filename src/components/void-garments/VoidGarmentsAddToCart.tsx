'use client'

import { useVoidGarmentsCart } from './void-garments-cart'

export function VoidGarmentsAddToCart() {
  const { addToCart } = useVoidGarmentsCart()

  return (
    <button type="button" className="massive add-to-cart" onClick={addToCart}>
      ADD TO CART
    </button>
  )
}
