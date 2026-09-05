'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { GlitchStartContext } from './glitch/glitch-start'

function GlitchOverlayUnavailable({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    onComplete()
  }, [onComplete])
  return null
}

const GlitchOverlay = dynamic(() =>
  import('./glitch/GlitchOverlay')
    .then((mod) => mod.GlitchOverlay)
    .catch(() => GlitchOverlayUnavailable),
)

export function StudioExperience({ children }: { children: ReactNode }) {
  const [glitching, setGlitching] = useState(false)

  const startGlitch = useCallback(() => {
    setGlitching((current) => current || true)
  }, [])

  return (
    <GlitchStartContext.Provider value={startGlitch}>
      <div inert={glitching || undefined}>{children}</div>
      {glitching ? (
        <GlitchOverlay onComplete={() => setGlitching(false)} />
      ) : null}
    </GlitchStartContext.Provider>
  )
}
