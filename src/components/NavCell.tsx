import Link from 'next/link'
import { Cell } from './Cell'

const NAV_ITEMS = [
  { label: '01_SHOP', href: '/shop' },
  { label: '02_COLLECTIONS' },
  { label: '03_CAMPAIGN' },
  { label: '04_INFO' },
] as const

export function NavCell() {
  return (
    <Cell className="c4">
      <ul className="nav-list">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            {'href' in item ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              item.label
            )}
          </li>
        ))}
      </ul>
      <div className="manifesto">
        CLOTHING AS STRUCTURE. WE REJECT THE ORGANIC IN FAVOR OF THE SYNTHETIC.
        FORM FOLLOWS DESTRUCTION. THE ANTHROPOCENE REQUIRES A NEW UNIFORM.
        FABRICS ENGINEERED FOR HOSTILE ENVIRONMENTS. 100% NYLON. 100% KEVLAR.
        ZERO COMPROMISE. MANUFACTURED IN COMPLETE ISOLATION.
      </div>
    </Cell>
  )
}
