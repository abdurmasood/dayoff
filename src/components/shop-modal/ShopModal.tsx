'use client'

import Link from 'next/link'
import { useEffect, type MouseEvent } from 'react'
import { DEPARTMENTS } from '@/lib/departments'

type ShopModalProps = {
  onClose: () => void
}

function departmentName(label: string) {
  return label.replace(/^\d+_/, '')
}

export function ShopModal({ onClose }: ShopModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const keepOpen = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return (
    <div className="shop-modal-overlay" onClick={onClose}>
      <div
        className="shop-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shop-modal-title"
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
