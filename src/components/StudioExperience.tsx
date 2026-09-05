'use client'

import { useState } from 'react'
import { GlitchOverlay } from './glitch/GlitchOverlay'
import { StudioGrid } from './StudioGrid'

export function StudioExperience() {
  const [glitching, setGlitching] = useState(false)

  return (
    <>
      <div inert={glitching || undefined}>
        <StudioGrid
          onLogoClick={() => {
            if (glitching) return
            setGlitching(true)
          }}
        />
      </div>
      {glitching ? (
        <GlitchOverlay onComplete={() => setGlitching(false)} />
      ) : null}
    </>
  )
}
