'use client'

import { useCallback, useState, type ReactNode } from 'react'
import { ComfortableCartContext } from './comfortable-cart'

export function ComfortableExperience({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0)
  const addToCart = useCallback(() => {
    setCartCount((count) => count + 1)
  }, [])

  return (
    <ComfortableCartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </ComfortableCartContext.Provider>
  )
}
