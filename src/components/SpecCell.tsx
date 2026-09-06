import { Cell } from './Cell'

const PATTERN = `D D D D D
 E E E E
  S S S
   I I
    G
   N N
  2 0 2 4`

export function SpecCell() {
  return (
    <Cell className="c8 row-3" to="/jackets">
      <div className="data-row">
        <span>REF:</span>
        <span>8892-A</span>
      </div>
      <div className="data-row">
        <span>MAT:</span>
        <span>BALLISTIC</span>
      </div>
      <div className="pattern-text">{PATTERN}</div>
    </Cell>
  )
}
