'use client'

import { Cell } from './Cell'
import { useGlitchStart } from './glitch/glitch-start'

export function LogoCell() {
  const startGlitch = useGlitchStart()

  return (
    <Cell className="c1" onClick={startGlitch}>
      <div className="c1-meta">
        SYS.OP.01
        <br />
        London, United Kingdom
        <br />
        51°30'27"N
        <br />
        0°07'40"W
      </div>
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="4" />
        <line x1="30" y1="30" x2="70" y2="70" stroke="white" strokeWidth="4" />
        <line x1="70" y1="30" x2="30" y2="70" stroke="white" strokeWidth="4" />
        <line x1="20" y1="50" x2="80" y2="50" stroke="white" strokeWidth="4" />
      </svg>
    </Cell>
  )
}
