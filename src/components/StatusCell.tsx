import { Cell } from './Cell'

export function StatusCell() {
  return (
    <Cell className="c10 col-4 row-3">
      <svg
        width="100%"
        height="100"
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20,50 L40,20 L50,45 L70,10 L80,60 L100,30 L110,70 L140,15 L150,50 L180,25 L160,80 L130,55 L120,90 L90,45 L80,85 L60,50 L40,80 Z"
          fill="white"
        />
        <path d="M50,45 L60,30 L65,40 Z" fill="var(--bg)" className="cutout" />
        <path d="M100,45 L110,30 L115,40 Z" fill="var(--bg)" className="cutout" />
        <path d="M140,45 L150,30 L155,40 Z" fill="var(--bg)" className="cutout" />
      </svg>
      <div className="sys-status">ONLINE // 2024 ©</div>
    </Cell>
  )
}
