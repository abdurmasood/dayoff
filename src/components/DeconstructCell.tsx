import { Cell } from './Cell'
import { WaveGraphic } from './WaveGraphic'

export function DeconstructCell() {
  return (
    <Cell className="c7 col-4">
      <WaveGraphic />
      <div className="y2k-text">DE/CONSTRUCT</div>
      <WaveGraphic />
    </Cell>
  )
}
