'use client'

import { useEffect, useState } from 'react'

export function SiteCursor() {
  const [cursor, setCursor] = useState({
    x: -100,
    y: -100,
    active: false,
    hoverLink: false,
  })

  useEffect(() => {
    const isHeader = (node: EventTarget | null) =>
      node instanceof Element && Boolean(node.closest('.sidebar-header'))

    const onMove = (event: MouseEvent) => {
      setCursor((current) => ({
        ...current,
        x: event.clientX,
        y: event.clientY,
        hoverLink: isHeader(event.target),
      }))
    }
    const onDown = () => {
      setCursor((current) => ({ ...current, active: true }))
    }
    const onUp = () => {
      setCursor((current) => ({ ...current, active: false }))
    }
    const onOver = (event: MouseEvent) => {
      if (!isHeader(event.target)) return
      setCursor((current) => ({ ...current, hoverLink: true }))
    }
    const onOut = (event: MouseEvent) => {
      if (isHeader(event.relatedTarget)) return
      if (!isHeader(event.target)) return
      setCursor((current) => ({ ...current, hoverLink: false }))
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
    }
  }, [])

  const className = [
    'custom-cursor',
    cursor.hoverLink ? 'hover-link' : '',
    cursor.active ? 'active' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={className} style={{ left: cursor.x, top: cursor.y }} />
}
