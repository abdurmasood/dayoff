'use client'

import { createContext, useContext } from 'react'

type JacketsCartValue = {
  cartCount: number
  addToCart: () => void
}

export const JacketsCartContext = createContext<JacketsCartValue>({
  cartCount: 0,
  addToCart: () => {},
})

export function useJacketsCart() {
  return useContext(JacketsCartContext)
}
