import { Cell } from './Cell'
import { WaveGraphic } from './WaveGraphic'

export function DeconstructCell() {
  return (
    <Cell className="c7 col-4" to="/comfortable">
      <WaveGraphic />
      <div className="y2k-text">DE/CONSTRUCT</div>
      <WaveGraphic />
    </Cell>
  )
}
