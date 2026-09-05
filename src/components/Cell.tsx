import type { ReactNode } from 'react'
import Link from 'next/link'

type CellProps = {
  className: string
  noHover?: boolean
  to?: string
  onClick?: () => void
  children: ReactNode
}

export function Cell({
  className,
  noHover = false,
  to,
  onClick,
  children,
}: CellProps) {
  const classes = `cell ${className}${noHover ? ' no-hover' : ''}`

  if (to) {
    return (
      <Link href={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <div
      className={classes}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : undefined}
    >
      {children}
    </div>
  )
}
