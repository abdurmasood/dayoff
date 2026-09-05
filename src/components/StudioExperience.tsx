'use client'

import dynamic from 'next/dynamic'
import { useCallback, useState, type ReactNode } from 'react'
import { GlitchStartContext } from './glitch/glitch-start'

const GlitchOverlay = dynamic(() =>
  import('./glitch/GlitchOverlay').then((mod) => mod.GlitchOverlay),
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
