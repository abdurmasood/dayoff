'use client'

import { useCallback, useState, type ReactNode } from 'react'
import { RawSupplyCartContext } from './raw-supply-cart'

export function RawSupplyExperience({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0)
  const addToCart = useCallback(() => {
    setCartCount((count) => count + 1)
  }, [])

  return (
    <RawSupplyCartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </RawSupplyCartContext.Provider>
  )
}
