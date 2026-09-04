import { useEffect } from 'react'
import { ConsoleRight } from '../components/obsidian/ConsoleRight'
import { PillarLeft } from '../components/obsidian/PillarLeft'
import { TextureOverlay } from '../components/obsidian/TextureOverlay'
import '../styles/obsidian.css'

export function ObsidianPage() {
  useEffect(() => {
    const previous = document.title
    document.title = 'OBSIDIAN // GARMENT ENGINEERING'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <div className="obsidian">
      <TextureOverlay />
      <div className="system-container">
        <PillarLeft />
        <ConsoleRight />
      </div>
      <div className="branding-bottom">
        ADVANCED STRUCTURAL DESIGNS
        <br />
        BY OBSIDIAN STUDIO® 2024
      </div>
    </div>
  )
}
