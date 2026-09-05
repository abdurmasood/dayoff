import type { Metadata } from 'next'
import { ObsidianPage } from '@/components/obsidian/ObsidianPage'
import '@/styles/obsidian.css'

export const metadata: Metadata = {
  title: 'Manifesto',
}

export default function ManifestoRoute() {
  return <ObsidianPage />
}
