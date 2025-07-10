"use client"

import { useState } from "react"
import type { CartItem } from "@/types"
import { X, Minus, Plus, ShoppingBag, CreditCard, Trash2 } from "lucide-react"
import Image from "next/image"

interface ShoppingCartProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onUpdateCart: () => void
}

export default function ShoppingCart({ isOpen, onClose, cartItems, onUpdateCart }: ShoppingCartProps) {
  const [isLoading, setIsLoading] = useState(false)

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeItem(itemId)
      return
    }

    setIsLoading(true)
    try {
      await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId,
          quantity: newQuantity,
        }),
      })
      onUpdateCart()
    } catch (error) {
      console.error("Error updating quantity:", error)
    }
    setIsLoading(false)
  }

  const removeItem = async (itemId: string) => {
    setIsLoading(true)
    try {
      await fetch(`/api/cart?itemId=${itemId}`, {
        method: "DELETE",
      })
      onUpdateCart()
    } catch (error) {
      console.error("Error removing item:", error)
    }
    setIsLoading(false)
  }

  const total = cartItems.reduce((sum, item) => sum + item.clothingItem.price * item.quantity, 0)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white/95 backdrop-blur-md shadow-2xl animate-slideInRight">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
                <p className="text-sm text-gray-600">{cartItems.length} items selected</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/60 rounded-xl transition-all duration-200">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Start building your perfect outfit!</p>
                <button onClick={onClose} className="btn-primary px-6 py-3 rounded-xl font-semibold">
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="card-hover bg-white rounded-2xl p-4 border border-gray-100 shadow-sm animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
                        <Image
                          src={item.clothingItem.imageUrl || "/placeholder.svg?height=60&width=60"}
                          alt={item.clothingItem.name}
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{item.clothingItem.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{item.clothingItem.category}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-lg font-bold text-indigo-600">${item.clothingItem.price}</span>
                          <span className="text-sm text-gray-400">each</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={isLoading}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={isLoading}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all duration-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={isLoading}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all duration-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 p-6 bg-gradient-to-r from-gray-50 to-white">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-gray-800">Total Amount:</span>
                  <span className="text-2xl font-bold gradient-text">${total.toFixed(2)}</span>
                </div>

                <div className="text-sm text-gray-500 text-center">Free shipping on orders over $100</div>

                <button className="w-full btn-primary py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all duration-200">
                  <CreditCard className="w-5 h-5" />
                  Proceed to Checkout
                </button>

                <button
                  onClick={onClose}
                  className="w-full text-gray-600 hover:text-gray-800 font-medium py-2 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
