'use client'

import { useState } from 'react'
import { RawSupplyGrid } from './RawSupplyGrid'
import { RawSupplyHeader } from './RawSupplyHeader'
import { RawSupplyMarquee } from './RawSupplyMarquee'

export function RawSupplyExperience() {
  const [cartCount, setCartCount] = useState(0)

  return (
    <div className="raw-supply">
      <RawSupplyMarquee />
      <RawSupplyHeader cartCount={cartCount} />
      <RawSupplyGrid onAddToCart={() => setCartCount((count) => count + 1)} />
      <div className="sticker st-3">
        <svg width="120" height="120" viewBox="0 0 150 150">
          <path
            id="raw-supply-curve"
            d="M 25 75 A 50 50 0 1 1 25 75.01"
            fill="transparent"
          />
          <text className="circle-text" fill="var(--fg)">
            <textPath href="#raw-supply-curve" startOffset="0%">
              * QUALITY GARMENTS * BUILT TO LAST *
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  )
}
