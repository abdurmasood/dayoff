import Link from 'next/link'
import { DEPARTMENTS } from '@/lib/departments'
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

        <ul className="nav-list">
          {DEPARTMENTS.map((item) => {
            const active = item.id === 'tops'
            return (
              <li key={item.label} className={active ? 'active' : undefined}>
                <span>{item.label}</span>
                {active ? <span>←</span> : null}
              </li>
            )
          })}
        </ul>

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
        SYS.OP.01 // 48°52&apos;5&quot;N 2°19&apos;59&quot;E
        <br />
        ALL SALES FINAL.
        <br />
        NO COMPROMISE.
      </div>
    </div>
  )
}
