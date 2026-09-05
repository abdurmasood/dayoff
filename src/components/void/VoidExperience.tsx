'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'

type SequencePhase = 'idle' | 'loading' | 'granted'

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}

function formatArchiveDate(date: Date) {
  return date
    .toLocaleDateString('en-GB', DATE_OPTIONS)
    .toUpperCase()
    .replace(/ /g, '-')
}

function subscribe() {
  return () => {}
}

function getArchiveDate() {
  return formatArchiveDate(new Date())
}

function getServerArchiveDate() {
  return '--'
}

export function VoidExperience() {
  const archiveDate = useSyncExternalStore(
    subscribe,
    getArchiveDate,
    getServerArchiveDate,
  )
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
    <main className="interface">
      <div className="margin-top">
        <div className="brand-cluster text-bold">
          <Link href="/" className="brand-name interactive">
            <span className="brand-back" aria-hidden>
              ←
            </span>
            Day Off
          </Link>
        </div>
        <div className="text-small text-right">
          COORDINATES
          <br />
          51.5074° N, 0.1278° W
          <br />
          <span className="inverted-badge location-badge">
            London, United Kingdom
          </span>
        </div>
      </div>

      <div className="margin-left text-small text-bold">
        <span>
          VALID ON <span>{archiveDate}</span>
        </span>
      </div>

      <div className="center-stage">
        <div className="crosshair-tl" />
        <div className="crosshair-br" />

        <button
          type="button"
          className="action-block interactive"
          onClick={onEnterArchive}
        >
          {phase === 'idle' ? (
            <>
              <div className="action-title">
                ENTER
                <br />
                ARCHIVE
              </div>
              <div className="action-sub">INITIATE SEQUENCE [ENTER]</div>
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
      </div>

      <div className="specs-overlay interactive">
        <div className="text-bold specs-heading">COLLECTION OVERVIEW</div>
        <div className="spec-row text-small">
          <span>SEASON</span>
          <span>AUTUMN/WINTER &apos;24</span>
        </div>
        <div className="spec-row text-small">
          <span>MATERIALS</span>
          <span>DECONSTRUCTED KEVLAR</span>
        </div>
        <div className="spec-row text-small">
          <span>METHOD</span>
          <span>SUBTRACTIVE PATTERNING</span>
        </div>
        <div className="spec-row text-small">
          <span>ITEMS</span>
          <span>14 UNIQUE FORMS</span>
        </div>
      </div>

      <div className="margin-right text-small text-bold">
        <span>PROCESS OVER OUTCOME</span>
        <span>STUDIO_V_OID // DECONSTRUCTED FORM</span>
      </div>

      <div className="margin-bottom">
        <div className="text-small">
          SYSTEM VER. 9.4.2
          <br />
          RENDER QUALITY: DEGRADED
        </div>
        <div className="text-small text-right">
          V_OID vs. THE INDUSTRY
          <br />
          COPYRIGHT MMXXIV
        </div>
      </div>
    </main>
  )
}
