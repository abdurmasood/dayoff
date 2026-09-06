import Link from 'next/link'
import { DepartmentNav } from '@/components/DepartmentNav'
import { VoidGarmentsCartBadge } from './VoidGarmentsCartBadge'

export function VoidGarmentsChrome() {
  return (
    <div className="header-bar">
      <Link href="/" className="index-link">
        <span className="index-link-arrow" aria-hidden>
          ←
        </span>
        Day Off
      </Link>
      <div className="header-tools">
        <DepartmentNav activeId="jackets" className="department-nav" />
        <VoidGarmentsCartBadge />
      </div>
    </div>
  )
}
