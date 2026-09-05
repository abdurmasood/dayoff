'use client'

import dynamic from 'next/dynamic'
import { CornerBrackets } from './CornerBrackets'
import { RecIndicator } from './RecIndicator'
import { Waveform } from './Waveform'

const TunnelViewport = dynamic(
  () => import('./TunnelViewport').then((mod) => mod.TunnelViewport),
  { ssr: false },
)

export function ConsoleRight() {
  return (
    <div className="console-right">
      <CornerBrackets />
      <div className="tunnel-viewport">
        <TunnelViewport />
      </div>
      <div className="section-title">MANIFESTO</div>
      <div className="data-footer">
        <Waveform variant="left" />
        <div className="manifesto-text">
          Once physical constraints are broken, structural integrity dictates
          form. Garment engineered for high-tension environments. The fear of
          degradation is eliminated through poly-aramid reinforcement.
        </div>
        <Waveform variant="right" />
      </div>
      <RecIndicator />
    </div>
  )
}
