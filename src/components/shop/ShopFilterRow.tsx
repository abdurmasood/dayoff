'use client'

import { useState } from 'react'
import type { FilterItem } from './filters'

export function ShopFilterRow({ item }: { item: FilterItem }) {
  const [checked, setChecked] = useState(item.checked)
  const mark = checked ? '[X]' : '[ ]'

  return (
    <button
      type="button"
      className="filter-item"
      onClick={() => setChecked((current) => !current)}
    >
      <span>
        {mark} {item.label}
      </span>
      {item.count ? <span>{item.count}</span> : null}
    </button>
  )
}
