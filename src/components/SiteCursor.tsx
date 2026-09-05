'use client'

import { useEffect, useRef } from 'react'

export function SiteCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return

    const isHeader = (node: EventTarget | null) =>
      node instanceof Element && Boolean(node.closest('.sidebar-header'))

    const onMove = (event: MouseEvent) => {
      el.style.left = `${event.clientX}px`
      el.style.top = `${event.clientY}px`
      el.classList.toggle('hover-link', isHeader(event.target))
    }
    const onDown = () => {
      el.classList.add('active')
    }
    const onUp = () => {
      el.classList.remove('active')
    }
    const onOver = (event: MouseEvent) => {
      if (!isHeader(event.target)) return
      el.classList.add('hover-link')
    }
    const onOut = (event: MouseEvent) => {
      if (isHeader(event.relatedTarget)) return
      if (!isHeader(event.target)) return
      el.classList.remove('hover-link')
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

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{ left: -100, top: -100 }}
    />
  )
}
