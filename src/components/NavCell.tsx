'use client'

import Link from 'next/link'
import { DEPARTMENTS } from '@/lib/departments'
import { Cell } from './Cell'
import { useShopModal } from './shop-modal/shop-modal-context'

export function NavCell() {
  const { open } = useShopModal()

  return (
    <Cell className="c4">
      <ul className="nav-list">
        {DEPARTMENTS.map((item) => (
          <li key={item.label}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="manifesto"
        aria-haspopup="dialog"
        aria-label="Open shop index"
        onClick={open}
      >
        <span aria-hidden="true">
          CLOTHING AS STRUCTURE. WE REJECT THE ORGANIC IN FAVOR OF THE SYNTHETIC.
          FORM FOLLOWS DESTRUCTION. THE ANTHROPOCENE REQUIRES A NEW UNIFORM.
          FABRICS ENGINEERED FOR HOSTILE ENVIRONMENTS. 100% NYLON. 100% KEVLAR.
          ZERO COMPROMISE. MANUFACTURED IN COMPLETE ISOLATION.
        </span>
      </button>
    </Cell>
  )
}
