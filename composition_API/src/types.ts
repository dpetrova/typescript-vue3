import type { restaurantStatusList } from '@/constants'

export type Restaurant = {
    id: string
    name: string
    address: string
    website: string
    status: Status
  }

export type Dish = {
    id: string
    name: string
    status: Status,
    diet?: Diet
  }

  type Diet = 'Vegetarian' | 'Pescetarian' | 'Keto' | ''
// type Status = "Want to Try" | "Recommended" | "Do Not Recommend" 

//convert JS array into a custom type
type Status = typeof restaurantStatusList[number]
