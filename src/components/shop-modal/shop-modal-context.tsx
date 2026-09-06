'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
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
  const triggerRef = useRef<HTMLElement | null>(null)
  const wasOpenRef = useRef(false)

  const open = useCallback(() => {
    if (document.activeElement instanceof HTMLElement) {
      triggerRef.current = document.activeElement
    }
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true
      return
    }
    if (!wasOpenRef.current) return
    wasOpenRef.current = false
    triggerRef.current?.focus()
  }, [isOpen])

  const value = useMemo(
    () => ({
      open,
      close,
    }),
    [close, open],
  )

  return (
    <ShopModalContext.Provider value={value}>
      <div inert={isOpen || undefined}>{children}</div>
      {isOpen ? <ShopModal onClose={close} /> : null}
    </ShopModalContext.Provider>
  )
}
