"use client"

import React, { useState } from "react"
import DraggableClothingItem from "./draggable-clothing-item"

export interface ClothingItem {
  id: string
  name: string
  image: string
  price: number
  type: string
}

interface ClothingPanelProps {
  items: ClothingItem[]
  categories: { key: string; label: string; icon: React.ReactNode }[]
}

export default function ClothingPanel({ items, categories }: ClothingPanelProps) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    let matchesCategory = activeCategory === "all";
    if (!matchesCategory) {
      if (activeCategory === "tops") matchesCategory = item.type === "shirt";
      else if (activeCategory === "bottoms") matchesCategory = item.type === "pants";
      else if (activeCategory === "shoes") matchesCategory = item.type === "shoes";
      else if (activeCategory === "accessories") matchesCategory = ["hat", "belt1", "belt2", "sunglasses"].includes(item.type);
    }
    return matchesSearch && matchesCategory;
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;
  return (
    <aside style={{
      width: isMobile ? "100%" : 320,
      background: "linear-gradient(135deg, #e0f2fe 60%, #fff 100%)",
      borderTopLeftRadius: 24,
      borderBottomLeftRadius: 24,
      boxShadow: "0 4px 24px #38bdf822",
      padding: isMobile ? 18 : 36,
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? 18 : 32,
      minHeight: isMobile ? 0 : 700,
      alignItems: "stretch",
      justifyContent: "flex-start",
      marginBottom: isMobile ? 18 : 0,
    }}>
      <div style={{ fontWeight: 800, fontSize: isMobile ? 20 : 26, color: "#0ea5e9", marginBottom: 8, letterSpacing: 1, textAlign: "center" }}>Clothing Collection</div>
      <input
        type="text"
        placeholder="Search clothing items..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: isMobile ? "10px 12px" : "14px 18px",
          borderRadius: 14,
          border: "2px solid #bae6fd",
          fontSize: isMobile ? 14 : 17,
          marginBottom: isMobile ? 14 : 22,
          outline: "none",
          boxSizing: "border-box",
          background: "#f0f9ff",
          color: "#0ea5e9",
          fontWeight: 600,
          boxShadow: "0 1px 4px #bae6fd33",
          transition: "border 0.2s, box-shadow 0.2s",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: activeCategory === cat.key ? "linear-gradient(90deg,#38bdf8,#0ea5e9)" : "#e0f2fe",
              color: activeCategory === cat.key ? "#fff" : "#0ea5e9",
              fontWeight: 700,
              fontSize: 17,
              border: "none",
              borderRadius: 14,
              padding: "12px 20px",
              cursor: "pointer",
              boxShadow: activeCategory === cat.key ? "0 2px 8px #38bdf833" : undefined,
              transition: "all 0.2s",
              justifyContent: "flex-start",
              outline: activeCategory === cat.key ? "2px solid #0ea5e9" : undefined,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>{cat.icon}{cat.label}</span>
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto", marginTop: 28 }}>
        {filteredItems.length === 0 ? (
          <div style={{ color: "#38bdf8", textAlign: "center", marginTop: 40, fontWeight: 600 }}>No items found.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {filteredItems.map((item) => (
              <DraggableClothingItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}
