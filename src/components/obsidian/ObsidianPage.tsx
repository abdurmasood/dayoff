import { ConsoleRight } from './ConsoleRight'
import { PillarLeft } from './PillarLeft'
import { TextureOverlay } from './TextureOverlay'

export function ObsidianPage() {
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
