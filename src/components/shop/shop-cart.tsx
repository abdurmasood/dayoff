'use client'

import { createContext, useContext } from 'react'

export type ShopLine = {
  id: string
  quantity: number
}

type ShopCartValue = {
  cartCount: number
  lines: ShopLine[]
  addToCart: (id: string) => void
  checkout: () => Promise<void>
  checkingOut: boolean
  checkoutError: string | null
}

export const ShopCartContext = createContext<ShopCartValue>({
  cartCount: 0,
  lines: [],
  addToCart: () => {},
  checkout: async () => {},
  checkingOut: false,
  checkoutError: null,
})

export function useShopCart() {
  return useContext(ShopCartContext)
}
