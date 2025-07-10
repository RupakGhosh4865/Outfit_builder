"use client"

import { useState, useEffect } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import ClothingPanel from "./clothing-panel"
import VirtualCanvas from "./virtual-canvas"
import ShoppingCart from "./shopping-cart"
import Header from "./header"
import LoadingSpinner from "./loading-spinner"
import type { ClothingItem, OutfitItem, CartItem } from "@/types"

export default function OutfitBuilder() {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([])
  const [outfitItems, setOutfitItems] = useState<OutfitItem[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchClothingItems(), fetchCartItems()]).finally(() => {
      setIsLoading(false)
    })
  }, [])

  const fetchClothingItems = async () => {
    try {
      const response = await fetch("/api/clothing")
      const data = await response.json()
      setClothingItems(data)
    } catch (error) {
      console.error("Error fetching clothing items:", error)
    }
  }

  const fetchCartItems = async () => {
    try {
      const response = await fetch("/api/cart")
      const data = await response.json()
      setCartItems(data)
    } catch (error) {
      console.error("Error fetching cart items:", error)
    }
  }

  const handleDrop = (item: ClothingItem, position: { x: number; y: number }) => {
    const newOutfitItem: OutfitItem = {
      id: `${item.id}-${Date.now()}`,
      clothingItem: item,
      position,
      zIndex: outfitItems.length,
    }
    setOutfitItems([...outfitItems, newOutfitItem])
  }

  const handleRemoveItem = (id: string) => {
    setOutfitItems(outfitItems.filter((item) => item.id !== id))
  }

  const handleUpdatePosition = (id: string, position: { x: number; y: number }) => {
    setOutfitItems(outfitItems.map((item) => (item.id === id ? { ...item, position } : item)))
  }

  const handleAddToCart = async () => {
    if (outfitItems.length === 0) {
      alert("Please add some items to your outfit first!")
      return
    }

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: outfitItems.map((item) => ({
            clothingItemId: item.clothingItem.id,
            quantity: 1,
          })),
        }),
      })

      if (response.ok) {
        // Success notification with better styling
        const notification = document.createElement("div")
        notification.className =
          "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideInRight"
        notification.textContent = "✅ Outfit added to cart!"
        document.body.appendChild(notification)
        setTimeout(() => notification.remove(), 3000)

        fetchCartItems()
        setOutfitItems([])
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Header cartItemsCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />

        <div className="flex h-[calc(100vh-80px)]">
          <ClothingPanel clothingItems={clothingItems} />

          <div className="flex-1 flex flex-col">
            <VirtualCanvas
              outfitItems={outfitItems}
              onDrop={handleDrop}
              onRemoveItem={handleRemoveItem}
              onUpdatePosition={handleUpdatePosition}
            />

            <div className="p-6 bg-white/80 backdrop-blur-sm border-t border-white/20 shadow-lg">
              <div className="flex justify-between items-center max-w-6xl mx-auto">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600 bg-white/60 px-4 py-2 rounded-full">
                    <span className="font-semibold text-indigo-600">{outfitItems.length}</span> items in current outfit
                  </div>
                  {outfitItems.length > 0 && (
                    <div className="text-sm text-gray-500">
                      Total: ${outfitItems.reduce((sum, item) => sum + item.clothingItem.price, 0).toFixed(2)}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`btn-primary px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    outfitItems.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95"
                  }`}
                  disabled={outfitItems.length === 0}
                >
                  🛒 Add Outfit to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <ShoppingCart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateCart={fetchCartItems}
        />
      </div>
    </DndProvider>
  )
}
