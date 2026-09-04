type StatusBlobProps = {
  fill: string
}

export function StatusBlob({ fill }: StatusBlobProps) {
  return (
    <svg
      width="100%"
      height="100"
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30,70 L50,10 L60,50 L80,20 L90,80 L110,40 L120,90 L150,20 L160,70 L190,30 L170,90 L140,40 L130,80 L100,30 L90,70 L70,40 L50,90 Z"
        fill={fill}
      />
      <path d="M60,50 L70,30 L75,45 Z" fill="var(--bg)" />
      <path d="M110,40 L120,25 L125,35 Z" fill="var(--bg)" />
    </svg>
  )
}
