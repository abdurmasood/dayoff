import { ShopExperience } from './ShopExperience'
import { ShopMain } from './ShopMain'
import { ShopSidebar } from './ShopSidebar'

export function ShopPage() {
  return (
    <ShopExperience>
      <div className="shop">
        <ShopSidebar />
        <ShopMain />
      </div>
    </ShopExperience>
  )
}
