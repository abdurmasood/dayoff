import { Cell } from './Cell'

export function EditorialCell() {
  return (
    <Cell className="c5" to="/shop">
      <div className="c5-frame">
        <div className="c5-scanlines" />
        <div className="c5-reticle">
          <div className="c5-reticle-h" />
          <div className="c5-reticle-v" />
        </div>
      </div>
      <div className="c5-labels">
        <span>FIG 01. KEVLAR VEST</span>
        <span>AW'24 SUBTERRANEAN</span>
      </div>
    </Cell>
  )
}
