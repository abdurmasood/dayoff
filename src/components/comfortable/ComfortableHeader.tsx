import Link from 'next/link'
import { DepartmentNav } from '@/components/DepartmentNav'

type ComfortableHeaderProps = {
  cartCount: number
}

export function ComfortableHeader({ cartCount }: ComfortableHeaderProps) {
  return (
    <header className="page-header">
      <Link href="/" className="index-link">
        Day Off
      </Link>
      <DepartmentNav activeId="comfortable" className="department-nav" />
      <div className="cart-status">CART ( {String(cartCount).padStart(2, '0')} )</div>
    </header>
  )
}
