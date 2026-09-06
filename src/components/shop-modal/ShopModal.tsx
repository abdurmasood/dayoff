'use client'

import Link from 'next/link'
import { useEffect, useRef, type MouseEvent } from 'react'
import { DEPARTMENTS } from '@/lib/departments'

type ShopModalProps = {
  onClose: () => void
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

function departmentName(label: string) {
  return label.replace(/^\d+_/, '')
}

export function ShopModal({ onClose }: ShopModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const getFocusable = () =>
      [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (element) => !element.hasAttribute('disabled') && element.tabIndex !== -1,
      )

    const focusables = getFocusable()
    if (focusables[0]) {
      focusables[0].focus()
    } else {
      dialog.focus()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const items = getFocusable()
      if (items.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      const inside = dialog.contains(active)

      if (event.shiftKey && (active === first || !inside)) {
        event.preventDefault()
        last.focus()
        return
      }

      if (!event.shiftKey && (active === last || !inside)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  const keepOpen = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return (
    <div className="shop-modal-overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        className="shop-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shop-modal-title"
        tabIndex={-1}
        onClick={keepOpen}
      >
        <div className="shop-modal-header">
          <div className="shop-modal-title" id="shop-modal-title">
            SHOP / INDEX
          </div>
          <button
            type="button"
            className="shop-modal-close"
            aria-label="Close"
            onClick={onClose}
          />
        </div>
        <div className="shop-modal-grid">
          {DEPARTMENTS.map((item, index) => (
            <Link key={item.id} href={item.href} className="shop-cat">
              <div className="cat-meta">
                CAT. {String(index + 1).padStart(2, '0')}
              </div>
              <span>{departmentName(item.label)}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
