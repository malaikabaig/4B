export interface Addon {
  id: string
  name: string
  price: number
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  addons: string[] // addon ids
  featured?: boolean
  popular?: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  image?: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedAddons: Addon[]
  specialInstructions: string
  itemTotal: number
}

export type OrderType = "delivery" | "pickup"
