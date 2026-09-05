import { ComfortableExperience } from './ComfortableExperience'
import { ComfortableGrain } from './ComfortableGrain'
import { ComfortableGrid } from './ComfortableGrid'
import { ComfortableHeader } from './ComfortableHeader'
import { ComfortableMarquee } from './ComfortableMarquee'

export function ComfortablePage() {
  return (
    <ComfortableExperience>
      <div className="comfortable">
        <ComfortableGrain />
        <ComfortableMarquee />
        <div className="comfortable-app">
          <ComfortableHeader />
          <ComfortableGrid />
        </div>
      </div>
    </ComfortableExperience>
  )
}
