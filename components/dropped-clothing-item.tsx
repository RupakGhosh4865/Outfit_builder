"use client"

import { useState } from "react"
import { useDrag } from "react-dnd"
import type { OutfitItem } from "@/types"
import Image from "next/image"
import { X, Move } from "lucide-react"

interface DroppedClothingItemProps {
  item: OutfitItem
  onRemove: (id: string) => void
  onUpdatePosition: (id: string, position: { x: number; y: number }) => void
}

export default function DroppedClothingItem({ item, onRemove, onUpdatePosition }: DroppedClothingItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "outfit-item",
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (draggedItem, monitor) => {
      const offset = monitor.getClientOffset()
      const canvasRect = document.querySelector("[data-canvas]")?.getBoundingClientRect()

      if (offset && canvasRect) {
        const position = {
          x: offset.x - canvasRect.left,
          y: offset.y - canvasRect.top,
        }
        onUpdatePosition(item.id, position)
      }
    },
  }))

  return (
    <div
      ref={drag}
      className={`absolute cursor-move transition-all duration-300 ${
        isDragging ? "opacity-60 scale-110 rotate-3" : "hover:scale-105"
      }`}
      style={{
        left: item.position.x - 50,
        top: item.position.y - 50,
        zIndex: item.zIndex + 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative group">
        <div
          className={`w-24 h-24 bg-white rounded-2xl shadow-lg border-2 flex items-center justify-center transition-all duration-300 ${
            isHovered ? "border-indigo-400 shadow-xl" : "border-gray-200"
          }`}
        >
          <Image
            src={item.clothingItem.imageUrl || "/placeholder.svg?height=80&width=80"}
            alt={item.clothingItem.name}
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        {/* Hover Controls */}
        {isHovered && (
          <>
            <button
              onClick={() => onRemove(item.id)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-lg"
            >
              <X size={14} />
            </button>

            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Move size={10} />
              <span>Drag</span>
            </div>
          </>
        )}

        {/* Item info tooltip */}
        {isHovered && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black/80 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-50">
            <div className="font-medium">{item.clothingItem.name}</div>
            <div className="text-gray-300">${item.clothingItem.price}</div>
          </div>
        )}

        {/* Glow effect */}
        <div
          className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)",
            filter: "blur(8px)",
            zIndex: -1,
          }}
        />
      </div>
    </div>
  )
}
