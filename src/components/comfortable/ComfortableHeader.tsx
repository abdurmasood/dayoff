import Link from 'next/link'
import { DepartmentNav } from '@/components/DepartmentNav'
import { ComfortableCartBadge } from './ComfortableCartBadge'

export function ComfortableHeader() {
  return (
    <header className="page-header">
      <Link href="/" className="index-link">
        <span className="index-link-arrow" aria-hidden>
          ←
        </span>
        <span className="index-link-label">Day Off</span>
      </Link>
      <DepartmentNav activeId="comfortable" className="department-nav" />
      <ComfortableCartBadge />
    </header>
  )
}
