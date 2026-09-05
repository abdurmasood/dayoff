'use client'

import { useEffect, useRef } from 'react'
import { StatusBlob } from '../StatusBlob'

const NAV_ITEMS = ['01_ERR', '02_NULL', '03_VOID', '04_FAIL'] as const

const PATTERN_TEXT = `E E E E E
 R R R R
  R R R
   O O
    R
   X X
  N U L L`

class TextScramble {
  el: HTMLElement
  chars = '!<>-_[]{}—=+*^?#________010101'
  queue: Array<{
    from: string
    to: string
    start: number
    end: number
    char?: string
  }> = []
  frame = 0
  frameRequest = 0
  resolve: (() => void) | undefined

  constructor(el: HTMLElement) {
    this.el = el
    this.update = this.update.bind(this)
  }

  setText(newText: string) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise<void>((resolve) => {
      this.resolve = resolve
    })
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 20)
      const end = start + Math.floor(Math.random() * 20)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }

  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span style="opacity:0.5; color: red;">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve?.()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }

  destroy() {
    cancelAnimationFrame(this.frameRequest)
  }
}

export function GlitchOverlay() {
  const rootRef = useRef<HTMLDivElement>(null)
  const patternRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const fxList: TextScramble[] = []
    const intervals: number[] = []

    root.querySelectorAll<HTMLElement>('.glitch-nav-list li').forEach((item) => {
      const original = item.innerText
      const fx = new TextScramble(item)
      fxList.push(fx)
      intervals.push(
        window.setInterval(() => {
          if (Math.random() > 0.8) fx.setText(original)
        }, 2000),
      )
      item.addEventListener('mouseenter', () => {
        fx.setText(original)
      })
    })

    return () => {
      intervals.forEach((id) => window.clearInterval(id))
      fxList.forEach((fx) => fx.destroy())
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const paths = root.querySelectorAll<SVGPathElement>('.glitch-c7 svg path')
    let time = 0
    let frame = 0
    let cancelled = false

    const animateWaves = () => {
      if (cancelled) return
      time += 0.2
      paths.forEach((path, i) => {
        const offset = i * Math.PI
        const amp = 10 + Math.random() * 15
        path.setAttribute(
          'transform',
          `translate(0, ${Math.sin(time * 3 + offset) * amp})`,
        )
      })
      frame = requestAnimationFrame(animateWaves)
    }

    frame = requestAnimationFrame(animateWaves)

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const patternText = patternRef.current
    if (!patternText) return

    let timeoutId = 0
    const originalPattern = PATTERN_TEXT

    const onEnter = () => {
      window.clearTimeout(timeoutId)
      patternText.classList.add('glitch-typing')
      let i = 0
      patternText.innerText = ''
      const type = () => {
        if (i < originalPattern.length) {
          patternText.innerText = originalPattern.substring(0, i + 1)
          i++
          timeoutId = window.setTimeout(type, 10 + Math.random() * 30)
        } else {
          patternText.classList.remove('glitch-typing')
        }
      }
      type()
    }

    patternText.addEventListener('mouseenter', onEnter)
    return () => {
      patternText.removeEventListener('mouseenter', onEnter)
      window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div ref={rootRef} className="glitch">
      <div className="glitch-cell glitch-c1">
        <div className="glitch-c1-meta">
          ERR.FATAL.01
          <br />
          XX°XX'X"N
          <br />
          XX°XX'X"E
        </div>
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="white"
            strokeWidth="4"
            strokeDasharray="10 5"
          />
          <line x1="20" y1="20" x2="80" y2="80" stroke="red" strokeWidth="6" />
          <line x1="80" y1="20" x2="20" y2="80" stroke="red" strokeWidth="6" />
        </svg>
      </div>

      <div className="glitch-cell glitch-c2 glitch-no-hover">
        <div className="glitch-c2-text">CONNECTION LOST</div>
      </div>

      <div className="glitch-cell glitch-c3 glitch-col-4">
        <div className="glitch-c3-text">DATA CORRUPTED</div>
        <svg
          width="120"
          height="80"
          viewBox="0 0 200 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="40,30 160,10 140,90 60,70"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <polygon
            points="30,50 170,30 190,110 10,90"
            stroke="red"
            strokeWidth="2"
          />
          <line x1="40" y1="30" x2="30" y2="50" stroke="white" strokeWidth="2" />
          <line x1="160" y1="10" x2="170" y2="30" stroke="white" strokeWidth="2" />
          <line x1="140" y1="90" x2="190" y2="110" stroke="white" strokeWidth="2" />
          <line x1="60" y1="70" x2="10" y2="90" stroke="white" strokeWidth="2" />
        </svg>
      </div>

      <div className="glitch-cell glitch-c4">
        <ul className="glitch-nav-list">
          {NAV_ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="glitch-manifesto">
          SYSTEM FAILURE. STRUCTURAL INTEGRITY COMPROMISED. THE SYNTHETIC HAS
          DECAYED. FORM HAS COLLAPSED. THE ANTHROPOCENE IS TERMINATED. FABRICS
          SHREDDED BY HOSTILE ENVIRONMENTS. 0% RECOVERY. 0% SIGNAL. TOTAL
          COMPROMISE. ISOLATION COMPLETE.
        </div>
      </div>

      <div className="glitch-cell glitch-c5">
        <div className="glitch-c5-overlay" />
        <div className="glitch-c5-labels">
          <span>FIG NULL. SIGNAL LOST</span>
          <span>FATAL EXCEPTION</span>
        </div>
      </div>

      <div className="glitch-cell glitch-c6">
        <div className="glitch-c6-inner">SYNTHETIC</div>
      </div>

      <div className="glitch-cell glitch-c7 glitch-col-4">
        <svg
          className="glitch-scrambled-wave"
          width="100%"
          height="40"
          viewBox="0 0 200 50"
          preserveAspectRatio="none"
        >
          <path
            d="M0,25 Q10,0 20,50 T40,0 T60,50 T80,0 T100,50 T120,0 T140,50 T160,0 T180,50 T200,25"
            stroke="red"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,25 Q15,50 30,0 T60,50 T90,0 T120,50 T150,0 T180,50 T200,25"
            stroke="white"
            strokeWidth="1"
            fill="none"
          />
        </svg>
        <div className="glitch-y2k-text">SYS / HALT</div>
        <svg
          className="glitch-scrambled-wave"
          width="100%"
          height="40"
          viewBox="0 0 200 50"
          preserveAspectRatio="none"
        >
          <path
            d="M0,25 Q10,0 20,50 T40,0 T60,50 T80,0 T100,50 T120,0 T140,50 T160,0 T180,50 T200,25"
            stroke="red"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,25 Q15,50 30,0 T60,50 T90,0 T120,50 T150,0 T180,50 T200,25"
            stroke="white"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      <div className="glitch-cell glitch-c8 glitch-row-3">
        <div className="glitch-data-row">
          <span>ERR:</span>
          <span>0x00000F</span>
        </div>
        <div className="glitch-data-row">
          <span>STAT:</span>
          <span>CRITICAL</span>
        </div>
        <div ref={patternRef} className="glitch-pattern-text">
          {PATTERN_TEXT}
        </div>
      </div>

      <div className="glitch-cell glitch-c9 glitch-row-3">
        <div className="glitch-c9-text">TERMINATED</div>
        <div className="glitch-marquee-container">
          <div className="glitch-marquee-content">
            CRITICAL SYSTEM ERROR /// REBOOT RECOMMENDED /// ALL DATA LOST ///
            NO BACKUP FOUND /// CONNECTION SEVERED ///
          </div>
        </div>
      </div>

      <div className="glitch-cell glitch-c10 glitch-col-4 glitch-row-3">
        <StatusBlob fill="red" />
        <div className="glitch-sys-status">OFFLINE // ERR</div>
      </div>

      <div className="glitch-scanlines" />
    </div>
  )
}
