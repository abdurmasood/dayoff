'use client'

import { useJacketsCart } from './jackets-cart'

export function JacketsAddToCart() {
  const { addToCart } = useJacketsCart()

  return (
    <button type="button" className="massive add-to-cart" onClick={addToCart}>
      ADD TO CART
    </button>
  )
}
