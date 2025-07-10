"use client"

import React from "react"
import type { ClothingItem } from "./clothing-panel"

interface Props {
  item: ClothingItem
}

export default function DraggableClothingItem({ item }: Props) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("item", JSON.stringify(item))
    e.dataTransfer.effectAllowed = "move"
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="cursor-grab active:cursor-grabbing bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition-all flex flex-col items-center justify-center"
    >
      <img
        src={item.image}
        alt={item.name}
        style={{ width: 80, height: 80, objectFit: 'contain', marginBottom: 8 }}
      />
      <p className="text-sm font-medium text-gray-700 text-center">{item.name}</p>
    </div>
  )
}
