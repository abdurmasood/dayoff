import { StudioExperience } from '@/components/StudioExperience'
import { StudioGrid } from '@/components/StudioGrid'
import { ShopModalProvider } from '@/components/shop-modal/shop-modal-context'
import '@/styles/glitch.css'
import '@/styles/shop-modal.css'

export default function HomePage() {
  return (
    <StudioExperience>
      <ShopModalProvider>
        <StudioGrid />
      </ShopModalProvider>
    </StudioExperience>
  )
}
