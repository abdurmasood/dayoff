import Link from 'next/link'
import { DepartmentNav } from '@/components/DepartmentNav'
import { INITIAL_MATERIALS } from './filters'
import { ShopCartBadge } from './ShopCartBadge'
import { ShopFilterRow } from './ShopFilterRow'

export function ShopSidebar() {
  return (
    <div className="sidebar">
      <div>
        <div className="sidebar-chrome">
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
          <ShopCartBadge />
        </div>

        <DepartmentNav activeId="tops" className="nav-list" />

        <div className="filters">
          <div className="filter-group">
            <div className="filter-title">MATERIAL</div>
            {INITIAL_MATERIALS.map((item) => (
              <ShopFilterRow key={item.id} item={item} />
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
