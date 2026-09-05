'use client'

import { useEffect, useRef, useState } from 'react'

type SequencePhase = 'idle' | 'loading' | 'granted'

export function VoidEnterControl() {
  const [phase, setPhase] = useState<SequencePhase>('idle')
  const phaseRef = useRef<SequencePhase>('idle')

  useEffect(() => {
    function startSequence() {
      if (phaseRef.current !== 'idle') return
      phaseRef.current = 'loading'
      setPhase('loading')
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Enter' || event.repeat) return
      if (event.target instanceof HTMLAnchorElement) return
      startSequence()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    if (phase !== 'loading') return

    const timeout = window.setTimeout(() => {
      phaseRef.current = 'granted'
      setPhase('granted')
    }, 800)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [phase])

  function onEnterArchive() {
    if (phaseRef.current !== 'idle') return
    phaseRef.current = 'loading'
    setPhase('loading')
  }

  return (
    <button
      type="button"
      className="action-block interactive"
      onClick={onEnterArchive}
    >
      {phase === 'idle' ? (
        <>
          <div className="action-title">
            Hear
            <br />
            From Us
          </div>
          <div className="action-sub">Never miss a drop [ENTER]</div>
        </>
      ) : null}
      {phase === 'loading' ? (
        <div className="action-title action-title-compact">LOADING...</div>
      ) : null}
      {phase === 'granted' ? (
        <>
          <div className="action-title action-title-compact">
            ACCESS GRANTED
          </div>
          <div className="action-sub">REDIRECTING</div>
        </>
      ) : null}
    </button>
  )
}
