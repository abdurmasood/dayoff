import { ArchitecturalCell } from './ArchitecturalCell'
import { DeconstructCell } from './DeconstructCell'
import { EditorialCell } from './EditorialCell'
import { HeroCell } from './HeroCell'
import { LogoCell } from './LogoCell'
import { NavCell } from './NavCell'
import { SpecCell } from './SpecCell'
import { StatusCell } from './StatusCell'
import { SubterraneanCell } from './SubterraneanCell'
import { SyntheticCell } from './SyntheticCell'

type StudioGridProps = {
  onLogoClick?: () => void
}

export function StudioGrid({ onLogoClick }: StudioGridProps) {
  return (
    <main className="studio">
      <LogoCell onClick={onLogoClick} />
      <HeroCell />
      <ArchitecturalCell />
      <NavCell />
      <EditorialCell />
      <SyntheticCell />
      <DeconstructCell />
      <SpecCell />
      <SubterraneanCell />
      <StatusCell />
    </main>
  )
}
