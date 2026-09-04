import { Cell } from './Cell'

const EDITORIAL_SRC =
  'https://images.pexels.com/photos/20349457/pexels-photo-20349457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

export function EditorialCell() {
  return (
    <Cell className="c5">
      <img src={EDITORIAL_SRC} alt="Fashion Editorial" />
      <div className="c5-labels">
        <span>FIG 01. KEVLAR VEST</span>
        <span>AW'24 SUBTERRANEAN</span>
      </div>
    </Cell>
  )
}
