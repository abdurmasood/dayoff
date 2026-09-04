import { CornerBrackets } from './CornerBrackets'
import { RecIndicator } from './RecIndicator'
import { TunnelViewport } from './TunnelViewport'
import { Waveform } from './Waveform'

export function ConsoleRight() {
  return (
    <div className="console-right">
      <CornerBrackets />
      <TunnelViewport />
      <div className="section-title">PROTOTYPE</div>
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
