import Link from 'next/link'
import { DepartmentNav } from '@/components/DepartmentNav'

type ComfortableHeaderProps = {
  cartCount: number
}

export function ComfortableHeader({ cartCount }: ComfortableHeaderProps) {
  return (
    <header className="page-header">
      <Link href="/" className="index-link">
        <span className="index-link-arrow" aria-hidden>
          ←
        </span>
        <span className="index-link-label">Day Off</span>
      </Link>
      <DepartmentNav activeId="comfortable" className="department-nav" />
      <button type="button" className="cart-btn">
        CART [{cartCount}] <span className="cart-arrow">→</span>
      </button>
    </header>
  )
}
