'use client'

import { useCallback, useState, type ReactNode } from 'react'
import { AccessoriesCartContext } from './accessories-cart'

export function AccessoriesExperience({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0)
  const addToCart = useCallback(() => {
    setCartCount((count) => count + 1)
  }, [])

  return (
    <AccessoriesCartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </AccessoriesCartContext.Provider>
  )
}
