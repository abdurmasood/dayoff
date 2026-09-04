'use client'

import { useEffect, useState } from 'react'

function formatTime() {
  return new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export function LiveClock() {
  const [time, setTime] = useState(formatTime)

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatTime()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return <span>{time}</span>
}
