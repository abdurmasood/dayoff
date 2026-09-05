'use client'

import { useEffect, useRef } from 'react'

const MARQUEE_TEXT =
  '*** SYSTEM INITIALIZED *** // NO RESTOCKS // ALL SALES FINAL // GLOBAL SHIPPING AVAILABLE // ACCESSORIES CO. FW/24 // '

export function RawSupplyMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const first = track?.querySelector('.raw-marquee-copy')
    if (!track || !(first instanceof HTMLElement)) return

    let animation: Animation | undefined

    function play(rail: HTMLDivElement, copy: HTMLElement) {
      const width = copy.offsetWidth
      if (width === 0) return
      animation?.cancel()
      animation = rail.animate(
        [
          { transform: 'translateX(0)' },
          { transform: `translateX(-${width}px)` },
        ],
        { duration: width * 14, iterations: Infinity, easing: 'linear' },
      )
    }

    const start = () => play(track, first)
    start()
    void document.fonts.ready.then(start)

    return () => {
      animation?.cancel()
    }
  }, [])

  return (
    <div className="raw-marquee">
      <div className="raw-marquee-track" ref={trackRef}>
        <span className="raw-marquee-copy">{MARQUEE_TEXT}</span>
        <span className="raw-marquee-copy" aria-hidden>
          {MARQUEE_TEXT}
        </span>
        <span className="raw-marquee-copy" aria-hidden>
          {MARQUEE_TEXT}
        </span>
      </div>
    </div>
  )
}
