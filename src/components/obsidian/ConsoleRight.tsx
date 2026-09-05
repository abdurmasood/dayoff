import { CornerBrackets } from './CornerBrackets'
import { RecIndicator } from './RecIndicator'
import { TunnelViewportLoader } from './TunnelViewportLoader'
import { Waveform } from './Waveform'

export function ConsoleRight() {
  return (
    <div className="console-right">
      <CornerBrackets />
      <div className="tunnel-viewport">
        <TunnelViewportLoader />
        <svg className="tunnel-reticle" viewBox="0 0 100 100">
          <path
            d="M50 10 L90 50 L50 90 L10 50 Z"
            fill="none"
            stroke="var(--fg)"
            strokeWidth="4"
          />
          <circle cx="50" cy="50" r="15" fill="var(--fg)" />
        </svg>
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
