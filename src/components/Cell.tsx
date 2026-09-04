import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type CellProps = {
  className: string
  noHover?: boolean
  to?: string
  children: ReactNode
}

export function Cell({ className, noHover = false, to, children }: CellProps) {
  const classes = `cell ${className}${noHover ? ' no-hover' : ''}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  return <div className={classes}>{children}</div>
}
