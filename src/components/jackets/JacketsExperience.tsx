'use client'

import { useCallback, useState, type ReactNode } from 'react'
import { JacketsCartContext } from './jackets-cart'

export function JacketsExperience({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0)
  const addToCart = useCallback(() => {
    setCartCount((count) => count + 1)
  }, [])

  return (
    <JacketsCartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </JacketsCartContext.Provider>
  )
}
