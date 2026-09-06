import Link from 'next/link'
import { DepartmentNav } from '@/components/DepartmentNav'
import { JacketsCartBadge } from './JacketsCartBadge'

export function JacketsChrome() {
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
        <JacketsCartBadge />
      </div>
    </div>
  )
}
