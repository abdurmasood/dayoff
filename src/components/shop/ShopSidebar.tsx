import Link from 'next/link'
import { DepartmentNav } from '@/components/DepartmentNav'
import type { FilterItem } from './filters'

type ShopSidebarProps = {
  materials: FilterItem[]
  onToggleFilter: (id: string) => void
}

function FilterRow({
  item,
  onToggle,
}: {
  item: FilterItem
  onToggle: () => void
}) {
  const mark = item.checked ? '[X]' : '[ ]'
  return (
    <button type="button" className="filter-item" onClick={onToggle}>
      <span>
        {mark} {item.label}
      </span>
      {item.count ? <span>{item.count}</span> : null}
    </button>
  )
}

export function ShopSidebar({ materials, onToggleFilter }: ShopSidebarProps) {
  return (
    <div className="sidebar">
      <div>
        <Link href="/" className="sidebar-header">
          <span>Day Off</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </Link>

        <DepartmentNav activeId="tops" className="nav-list" />

        <div className="filters">
          <div className="filter-group">
            <div className="filter-title">MATERIAL</div>
            {materials.map((item) => (
              <FilterRow
                key={item.id}
                item={item}
                onToggle={() => onToggleFilter(item.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        SYS.OP.01 // London, United Kingdom
        <br />
        51°30&apos;27&quot;N 0°07&apos;40&quot;W
        <br />
        ALL SALES FINAL.
        <br />
        NO COMPROMISE.
      </div>
    </div>
  )
}
