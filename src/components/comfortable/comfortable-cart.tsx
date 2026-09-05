'use client'

import { createContext, useContext } from 'react'

type ComfortableCartValue = {
  cartCount: number
  addToCart: () => void
}

export const ComfortableCartContext = createContext<ComfortableCartValue>({
  cartCount: 0,
  addToCart: () => {},
})

export function useComfortableCart() {
  return useContext(ComfortableCartContext)
}
