'use client'

import { createContext, useContext } from 'react'

type ShopCartValue = {
  cartCount: number
  addToCart: () => void
}

export const ShopCartContext = createContext<ShopCartValue>({
  cartCount: 0,
  addToCart: () => {},
})

export function useShopCart() {
  return useContext(ShopCartContext)
}
