import type { Metadata } from 'next'
import { ObsidianPage } from '@/components/obsidian/ObsidianPage'
import '@/styles/obsidian.css'

export const metadata: Metadata = {
  title: 'OBSIDIAN // GARMENT ENGINEERING',
}

export default function ObsidianRoute() {
  return <ObsidianPage />
}
