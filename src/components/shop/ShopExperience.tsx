'use client'

import { useCallback, useState, type ReactNode } from 'react'
import { ShopCartContext } from './shop-cart'

export function ShopExperience({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0)
  const addToCart = useCallback(() => {
    setCartCount((count) => count + 1)
  }, [])

  return (
    <ShopCartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </ShopCartContext.Provider>
  )
}
