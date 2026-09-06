'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { ShopModal } from './ShopModal'

type ShopModalApi = {
  open: () => void
  close: () => void
}

const ShopModalContext = createContext<ShopModalApi>({
  open: () => {},
  close: () => {},
})

export function useShopModal() {
  return useContext(ShopModalContext)
}

export function ShopModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const value = useMemo(
    () => ({
      open,
      close,
    }),
    [close, open],
  )

  return (
    <ShopModalContext.Provider value={value}>
      {children}
      {isOpen ? <ShopModal onClose={close} /> : null}
    </ShopModalContext.Provider>
  )
}
