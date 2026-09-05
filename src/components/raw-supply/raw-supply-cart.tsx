'use client'

import { createContext, useContext } from 'react'

type RawSupplyCartValue = {
  cartCount: number
  addToCart: () => void
}

export const RawSupplyCartContext = createContext<RawSupplyCartValue>({
  cartCount: 0,
  addToCart: () => {},
})

export function useRawSupplyCart() {
  return useContext(RawSupplyCartContext)
}
