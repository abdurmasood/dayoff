'use client'

import { useState } from 'react'
import { INITIAL_CATEGORIES, INITIAL_MATERIALS } from './filters'
import { ShopMain } from './ShopMain'
import { ShopSidebar } from './ShopSidebar'

export function ShopExperience() {
  const [cartCount, setCartCount] = useState(0)
  const [categories, setCategories] = useState(INITIAL_CATEGORIES)
  const [materials, setMaterials] = useState(INITIAL_MATERIALS)

  function toggleFilter(group: 'category' | 'material', id: string) {
    const setter = group === 'category' ? setCategories : setMaterials
    setter((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    )
  }

  return (
    <div className="shop">
      <ShopSidebar
        categories={categories}
        materials={materials}
        onToggleFilter={toggleFilter}
      />
      <ShopMain
        cartCount={cartCount}
        onAddToCart={() => setCartCount((count) => count + 1)}
      />
    </div>
  )
}
