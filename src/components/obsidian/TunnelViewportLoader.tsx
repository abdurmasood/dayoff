'use client'

import dynamic from 'next/dynamic'

const TunnelViewport = dynamic(
  () => import('./TunnelViewport').then((mod) => mod.TunnelViewport),
  { ssr: false },
)

export function TunnelViewportLoader() {
  return <TunnelViewport />
}
