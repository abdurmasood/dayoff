import { DepartmentNav } from '@/components/DepartmentNav'
import { VoidGarmentsCartBadge } from './VoidGarmentsCartBadge'

export function VoidGarmentsChrome() {
  return (
    <div className="header-tools">
      <DepartmentNav activeId="jackets" className="department-nav" />
      <VoidGarmentsCartBadge />
    </div>
  )
}
