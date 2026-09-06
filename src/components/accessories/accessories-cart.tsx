'use client'

import { createContext, useContext } from 'react'

type AccessoriesCartValue = {
  cartCount: number
  addToCart: () => void
}

export const AccessoriesCartContext = createContext<AccessoriesCartValue>({
  cartCount: 0,
  addToCart: () => {},
})

export function useAccessoriesCart() {
  return useContext(AccessoriesCartContext)
}
