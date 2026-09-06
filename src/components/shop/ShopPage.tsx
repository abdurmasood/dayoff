import { ShopExperience } from './ShopExperience'
import { ShopMain } from './ShopMain'
import { ShopMarquee } from './ShopMarquee'
import { ShopSidebar } from './ShopSidebar'

export function ShopPage() {
  return (
    <ShopExperience>
      <div className="shop">
        <ShopMarquee />
        <ShopSidebar />
        <ShopMain />
      </div>
    </ShopExperience>
  )
}
