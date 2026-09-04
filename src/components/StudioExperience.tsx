'use client'

import { useEffect, useState } from 'react'
import { GlitchOverlay } from './glitch/GlitchOverlay'
import { StudioGrid } from './StudioGrid'

export function StudioExperience() {
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    if (!glitching) return
    const id = window.setTimeout(() => setGlitching(false), 4000)
    return () => window.clearTimeout(id)
  }, [glitching])

  return (
    <>
      <div inert={glitching || undefined}>
        <StudioGrid onLogoClick={() => setGlitching(true)} />
      </div>
      {glitching ? <GlitchOverlay /> : null}
    </>
  )
}
