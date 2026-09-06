'use client'

import { useCallback, useState, type ReactNode } from 'react'
import { VoidGarmentsCartContext } from './void-garments-cart'

export function VoidGarmentsExperience({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0)
  const addToCart = useCallback(() => {
    setCartCount((count) => count + 1)
  }, [])

  return (
    <VoidGarmentsCartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </VoidGarmentsCartContext.Provider>
  )
}
