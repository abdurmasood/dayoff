import { Cell } from './Cell'
import { Marquee } from './Marquee'

const MARQUEE_TEXT =
  'WARNING: GARMENTS MAY CAUSE ABRASION. DESIGNED FOR EXTREME CONDITIONS ONLY. NO REFUNDS. NO EXCHANGES. ACCEPT THE VOID. /// WARNING: GARMENTS MAY CAUSE ABRASION.'

export function SubterraneanCell() {
  return (
    <Cell className="c9 row-3">
      <div className="c9-text">SUBTERRANEAN</div>
      <Marquee text={MARQUEE_TEXT} />
    </Cell>
  )
}
