'use client'

import { useEffect, useRef } from 'react'

const MARQUEE_TEXT =
  '// FW24 COLLECTION // NEW ARRIVALS // GLOBAL SHIPPING // NO REFUNDS // '

export function ComfortableMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const first = track?.querySelector('.comfortable-marquee-copy')
    if (!track || !(first instanceof HTMLElement)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

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
    <div className="comfortable-marquee">
      <div className="comfortable-marquee-track" ref={trackRef}>
        <span className="comfortable-marquee-copy">{MARQUEE_TEXT}</span>
        <span className="comfortable-marquee-copy" aria-hidden>
          {MARQUEE_TEXT}
        </span>
        <span className="comfortable-marquee-copy" aria-hidden>
          {MARQUEE_TEXT}
        </span>
      </div>
    </div>
  )
}
