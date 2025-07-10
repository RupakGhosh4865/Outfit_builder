export interface ClothingItem {
  id: string
  name: string
  category: string
  price: number
  imageUrl: string
  description?: string
}

export interface OutfitItem {
  id: string
  clothingItem: ClothingItem
  position: { x: number; y: number }
  zIndex: number
}

export interface CartItem {
  id: string
  clothingItem: ClothingItem
  quantity: number
  userId: string
}

export interface User {
  id: string
  email: string
  name?: string
}
