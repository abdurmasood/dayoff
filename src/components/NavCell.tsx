import { DEPARTMENTS } from '@/lib/departments'
import { Cell } from './Cell'

export function NavCell() {
  return (
    <Cell className="c4" to="/void-garments">
      <ul className="nav-list">
        {DEPARTMENTS.map((item) => (
          <li key={item.label}>{item.label}</li>
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
