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

export function StudioGrid() {
  return (
    <main className="studio">
      <LogoCell />
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
