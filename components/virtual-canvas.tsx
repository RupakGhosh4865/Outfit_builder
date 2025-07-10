"use client";

import React, { useState, useRef, useEffect } from "react";

// Fun drag icon
const DragIcon = () => (
  <span style={{ fontSize: 32, color: '#38bdf8', marginRight: 8, verticalAlign: 'middle' }}>✋</span>
);
const DropTargetIcon = () => (
  <span style={{ fontSize: 32, color: '#0ea5e9', marginRight: 8, verticalAlign: 'middle' }}>🎯</span>
);

// Dummy fallback items
const dummyProducts = [
  {
    id: "hat-1",
    name: "Hat",
    image: "/Assets/accessories/hat.png",
    price: 10,
    type: "hat",
  },
  {
    id: "top-1",
    name: "Top",
    image: "/Assets/tops/top1.webp",
    price: 15,
    type: "shirt",
  },
  {
    id: "bottom-1",
    name: "Bottom",
    image: "/Assets/bottoms/bottom1.webp",
    price: 25,
    type: "pants",
  },
  {
    id: "shoes-1",
    name: "Shoes",
    image: "/Assets/shoes/shoes1.webp",
    price: 20,
    type: "shoes",
  },
];

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  type: string;
}

interface CanvasItem extends Product {
  x: number;
  y: number;
}

export default function VirtualCanvas() {
  const [products, setProducts] = useState<Product[]>([]);
  const [canvasItems, setCanvasItems] = useState<CanvasItem[]>([]);
  const [cart, setCart] = useState<CanvasItem[][]>([]);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/clothing")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setProducts)
      .catch(() => setProducts(dummyProducts));
  }, []);

  // Update typeOrder to match your types
  const typeOrder = ["hat", "shirt", "pants", "shoes"];
  const baseX = 250;
  const baseY = 100;
  const yStep = 120;
  const handleDrop = (item: Product, _x: number, _y: number) => {
    // Remove any existing item of the same type
    let newItems = canvasItems.filter((ci) => ci.type !== item.type);
    // Find the index for this type
    const idx = typeOrder.indexOf(item.type);
    if (idx === -1) return; // Only allow dropping items that are part of the outfit
    // Place at the correct vertical position
    const x = baseX;
    const y = baseY + idx * yStep;
    newItems.push({ ...item, x, y });
    // Sort by type order for consistent rendering
    newItems = newItems.sort((a, b) => typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type));
    setCanvasItems(newItems);
  };

  const handleMouseDown = (idx: number, e: React.MouseEvent) => {
    setDraggedIdx(idx);
    const item = canvasItems[idx];
    setOffset({ x: e.clientX - item.x, y: e.clientY - item.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedIdx !== null) {
      const newItems = [...canvasItems];
      newItems[draggedIdx] = {
        ...newItems[draggedIdx],
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      };
      setCanvasItems(newItems);
    }
  };

  const handleMouseUp = () => setDraggedIdx(null);
  const handleRemove = (idx: number) => setCanvasItems(canvasItems.filter((_, i) => i !== idx));
  const handleAddToCart = () => {
    if (!canvasItems.length) return;
    setCart([...cart, canvasItems]);
    setCanvasItems([]);
  };

  const lastCartOutfit = cart[cart.length - 1] || [];
  const totalPrice = lastCartOutfit.reduce((sum, item) => sum + item.price, 0);

  // Responsive styles
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        minHeight: 700,
        background: "linear-gradient(135deg, #e0f2fe 60%, #bae6fd 100%)",
        borderRadius: 24,
        boxShadow: "0 4px 32px #38bdf822",
        padding: isMobile ? 12 : 24,
        gap: isMobile ? 18 : 32,
        alignItems: isMobile ? "stretch" : "flex-start",
        justifyContent: "center",
        flexWrap: "wrap",
        position: "relative",
      }}
    >
      {/* Canvas */}
      <main
        style={{
          flex: 1,
          minWidth: isMobile ? 0 : 340,
          maxWidth: isMobile ? "100%" : 800,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f0f9ff",
          borderRadius: 24,
          boxShadow: "0 2px 16px #38bdf822",
          padding: isMobile ? 16 : 32,
          margin: isMobile ? "0 auto" : "auto",
          width: isMobile ? "100%" : undefined,
        }}
      >
        {/* Drag-and-drop prompt */}
        {canvasItems.length === 0 && (
          <div style={{ textAlign: "center", marginBottom: 40, maxWidth: 520 }}>
            <div style={{ fontSize: 90, marginBottom: 12, filter: "drop-shadow(0 2px 8px #38bdf844)" }}>👗</div>
            <div style={{ fontWeight: 800, fontSize: 36, color: "#0ea5e9", marginBottom: 8 }}>Start Creating Magic</div>
            <div style={{ fontSize: 22, color: "#38bdf8", fontWeight: 600, marginBottom: 8 }}>Virtual Model</div>
            <div style={{ color: "#444", fontSize: 18, marginBottom: 18 }}>
              Drag clothing items from the collection panel<br />
              and drop them onto the virtual model to create<br />
              stunning outfit combinations
            </div>
            <div style={{ color: "#0ea5e9", fontWeight: 700, fontSize: 18, marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <DragIcon /> Drag & Drop to Begin
            </div>
          </div>
        )}
        {/* Canvas */}
        <div
          ref={canvasRef}
          style={{
            width: 600,
            height: 700,
            border: isDragging ? "3px dashed #0ea5e9" : "3px solid #bae6fd",
            borderRadius: 32,
            position: "relative",
            background: isDragging ? "linear-gradient(135deg, #e0f2fe 60%, #bae6fd 100%)" : "#f0f9ff",
            userSelect: "none",
            boxShadow: isDragging ? "0 0 32px #0ea5e9aa" : "0 4px 24px #38bdf822",
            overflow: "hidden",
            marginBottom: 32,
            transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={e => {
            setIsDragging(false);
            const item = JSON.parse(e.dataTransfer.getData("item"));
            const rect = canvasRef.current?.getBoundingClientRect();
            const x = rect ? e.clientX - rect.left : 100;
            const y = rect ? e.clientY - rect.top : 100;
            handleDrop(item, x, y);
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Drop target icon when dragging */}
          {isDragging && (
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", zIndex: 10, pointerEvents: "none" }}>
              <DropTargetIcon />
              <span style={{ color: "#0ea5e9", fontWeight: 700, fontSize: 22 }}>Drop Here!</span>
            </div>
          )}
          {/* Canvas background silhouette */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 220,
            height: 420,
            background: "linear-gradient(180deg, #bae6fd 60%, #fff 100%)",
            borderRadius: 110,
            opacity: 0.18,
            zIndex: 0,
          }} />
          {canvasItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: item.x,
                top: item.y,
                width: 100,
                height: 100,
                background: "#fff",
                border: `2px solid #38bdf8`,
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: draggedIdx === idx ? "0 0 24px #0ea5e9AA" : "0 2px 8px #38bdf822",
                cursor: draggedIdx === idx ? "grabbing" : "move",
                zIndex: draggedIdx === idx ? 2 : 1,
                transition: draggedIdx === idx ? "none" : "box-shadow 0.2s, border 0.2s",
                overflow: "hidden",
                transform: draggedIdx === idx ? "scale(1.08)" : "scale(1)",
              }}
              onMouseDown={e => handleMouseDown(idx, e)}
            >
              <img src={item.image} alt={item.name} style={{ width: 70, height: 70, objectFit: "contain" }} />
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleRemove(idx);
                }}
                style={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#f43f5e",
                  color: "#fff",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 1px 4px #0002",
                }}
                title="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </main>
      {/* Add Outfit to Cart & Cart Summary Panel on the right or below (mobile) */}
      <aside
        style={{
          width: isMobile ? "100%" : 280,
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 12 : 18,
          alignItems: "stretch",
          background: "#f0f9ffcc",
          borderRadius: 18,
          boxShadow: "0 4px 24px #38bdf822",
          padding: isMobile ? 14 : 22,
          minHeight: 220,
          marginLeft: isMobile ? 0 : 12,
          marginTop: isMobile ? 18 : 0,
          position: isMobile ? "static" : "sticky",
          top: isMobile ? undefined : 110,
          zIndex: 10,
        }}
      >
        <button
          onClick={handleAddToCart}
          disabled={!canvasItems.length}
          style={{
            width: "100%",
            padding: "16px 0",
            color: "#fff",
            fontWeight: 800,
            borderRadius: 12,
            fontSize: 18,
            background: canvasItems.length ? "linear-gradient(90deg,#38bdf8,#0ea5e9)" : "#cbd5e1",
            border: "none",
            boxShadow: canvasItems.length ? "0 2px 8px #38bdf833" : undefined,
            cursor: canvasItems.length ? "pointer" : "not-allowed",
            letterSpacing: 1,
            transition: "background 0.2s, box-shadow 0.2s, transform 0.1s",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 22, marginRight: 10 }}>🛒</span> Add Outfit to Cart
        </button>
        {lastCartOutfit.length > 0 && (
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 12px #38bdf822", padding: 16 }}>
            <h3 style={{ fontWeight: 900, fontSize: 20, color: "#7b2ff2", marginBottom: 8 }}>Cart Summary</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {lastCartOutfit.map((item) => (
                <li key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img src={item.image} alt={item.name} style={{ width: 32, height: 32, borderRadius: 7, objectFit: "cover" }} />
                    <span style={{ fontWeight: 600, fontSize: 15 }}>{item.name}</span>
                  </div>
                  <span style={{ color: "#7b2ff2", fontWeight: 700, fontSize: 15 }}>${item.price}</span>
                </li>
              ))}
            </ul>
            <div style={{ borderTop: "1px solid #e0e7ef", paddingTop: 10, marginTop: 10, textAlign: "right", fontWeight: 900, fontSize: 17 }}>
              Total: <span style={{ color: "#7b2ff2" }}>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
