'use client'

import { useState } from 'react'
import { ComfortableGrid } from './ComfortableGrid'
import { ComfortableHeader } from './ComfortableHeader'
import { ComfortableMarquee } from './ComfortableMarquee'
import { GrainCanvas } from './GrainCanvas'

export function ComfortableExperience() {
  const [cartCount, setCartCount] = useState(0)

  return (
    <div className="comfortable">
      <GrainCanvas />
      <ComfortableMarquee />
      <div className="comfortable-app">
        <ComfortableHeader cartCount={cartCount} />
        <ComfortableGrid onAddToCart={() => setCartCount((count) => count + 1)} />
      </div>
    </div>
  )
}
