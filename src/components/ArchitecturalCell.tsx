import { Cell } from './Cell'

export function ArchitecturalCell() {
  return (
    <Cell className="c3 col-4" to="/manifesto">
      <div className="c3-text">ARCHITECTURAL GARMENTS</div>
      <svg
        width="120"
        height="80"
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="50,20 150,20 150,80 50,80"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="2 2"
        />
        <polygon
          points="20,40 180,40 180,100 20,100"
          stroke="white"
          strokeWidth="2"
        />
        <line x1="50" y1="20" x2="20" y2="40" stroke="white" strokeWidth="2" />
        <line x1="150" y1="20" x2="180" y2="40" stroke="white" strokeWidth="2" />
        <line x1="150" y1="80" x2="180" y2="100" stroke="white" strokeWidth="2" />
        <line x1="50" y1="80" x2="20" y2="100" stroke="white" strokeWidth="2" />
        <line x1="60" y1="40" x2="60" y2="100" stroke="white" strokeWidth="1" />
        <line x1="100" y1="40" x2="100" y2="100" stroke="white" strokeWidth="1" />
        <line x1="140" y1="40" x2="140" y2="100" stroke="white" strokeWidth="1" />
      </svg>
    </Cell>
  )
}
