'use client'

import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { MAX_SHOP_QUANTITY } from '@/lib/shop-catalog'
import { ShopCartContext, type ShopLine } from './shop-cart'

export function ShopExperience({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<ShopLine[]>([])
  const [checkingOut, setCheckingOut] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  const addToCart = useCallback((id: string) => {
    setLines((current) => {
      const existing = current.find((line) => line.id === id)
      if (!existing) return [...current, { id, quantity: 1 }]
      if (existing.quantity >= MAX_SHOP_QUANTITY) return current
      return current.map((line) =>
        line.id === id ? { ...line, quantity: line.quantity + 1 } : line,
      )
    })
  }, [])

  const checkout = useCallback(async () => {
    if (checkingOut || lines.length === 0) return

    setCheckingOut(true)
    setCheckoutError(null)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: lines }),
      })
      const body = (await response.json()) as { url?: string; error?: string }
      if (!response.ok || !body.url) {
        setCheckoutError(body.error ?? 'Checkout failed')
        setCheckingOut(false)
        return
      }

      window.location.assign(body.url)
    } catch {
      setCheckoutError('Checkout failed')
      setCheckingOut(false)
    }
  }, [checkingOut, lines])

  const cartCount = useMemo(
    () => lines.reduce((total, line) => total + line.quantity, 0),
    [lines],
  )

  return (
    <ShopCartContext.Provider
      value={{
        cartCount,
        lines,
        addToCart,
        checkout,
        checkingOut,
        checkoutError,
      }}
    >
      {children}
    </ShopCartContext.Provider>
  )
}
