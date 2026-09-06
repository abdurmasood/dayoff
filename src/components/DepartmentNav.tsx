import Link from 'next/link'
import { DEPARTMENTS, type DepartmentId } from '@/lib/departments'

type DepartmentNavProps = {
  activeId: DepartmentId
  className: string
}

export function DepartmentNav({ activeId, className }: DepartmentNavProps) {
  return (
    <ul className={className}>
      {DEPARTMENTS.map((item) => (
        <li key={item.label} className={item.id === activeId ? 'active' : undefined}>
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>
  )
}
