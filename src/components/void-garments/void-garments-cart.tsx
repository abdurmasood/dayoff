'use client'

import { createContext, useContext } from 'react'

type VoidGarmentsCartValue = {
  cartCount: number
  addToCart: () => void
}

export const VoidGarmentsCartContext = createContext<VoidGarmentsCartValue>({
  cartCount: 0,
  addToCart: () => {},
})

export function useVoidGarmentsCart() {
  return useContext(VoidGarmentsCartContext)
}
