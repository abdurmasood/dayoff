import { Cell } from './Cell'

const NAV_ITEMS = ['01_SHOP', '02_COLLECTIONS', '03_CAMPAIGN', '04_INFO']

export function NavCell() {
  return (
    <Cell className="c4">
      <ul className="nav-list">
        {NAV_ITEMS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="manifesto">
        CLOTHING AS STRUCTURE. WE REJECT THE ORGANIC IN FAVOR OF THE SYNTHETIC.
        FORM FOLLOWS DESTRUCTION. THE ANTHROPOCENE REQUIRES A NEW UNIFORM.
        FABRICS ENGINEERED FOR HOSTILE ENVIRONMENTS. 100% NYLON. 100% KEVLAR.
        ZERO COMPROMISE. MANUFACTURED IN COMPLETE ISOLATION.
      </div>
    </Cell>
  )
}
