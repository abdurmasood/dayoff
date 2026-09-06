import { AccessoriesExperience } from './AccessoriesExperience'
import { AccessoriesGrid } from './AccessoriesGrid'
import { AccessoriesHeader } from './AccessoriesHeader'
import { AccessoriesMarquee } from './AccessoriesMarquee'

export function AccessoriesPage() {
  return (
    <AccessoriesExperience>
      <div className="accessories">
        <AccessoriesMarquee />
        <AccessoriesHeader />
        <AccessoriesGrid />
        <div className="sticker st-3">
          <svg width="120" height="120" viewBox="0 0 150 150">
            <path
              id="accessories-curve"
              d="M 25 75 A 50 50 0 1 1 25 75.01"
              fill="transparent"
            />
            <text className="circle-text" fill="var(--fg)">
              <textPath href="#accessories-curve" startOffset="0%">
                * QUALITY GARMENTS * BUILT TO LAST *
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </AccessoriesExperience>
  )
}
