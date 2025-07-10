"use client";
import React, { useEffect, useState } from "react";
import { ClothingItem } from "@/components/clothing-panel";

export default function CartPage() {
  const [cart, setCart] = useState<ClothingItem[][]>([]);

  useEffect(() => {
    // Load cart from localStorage
    const stored = localStorage.getItem("outfit_cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const lastOutfit = cart[cart.length - 1] || [];
  const totalPrice = lastOutfit.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e0f2fe 60%, #bae6fd 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 40,
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 32,
        boxShadow: "0 4px 32px #38bdf822",
        padding: 40,
        minWidth: 380,
        maxWidth: 480,
        width: "100%",
        textAlign: "center",
      }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0ea5e9", marginBottom: 24 }}>🛒 Your Cart</h1>
        {lastOutfit.length === 0 ? (
          <div style={{ color: "#38bdf8", fontWeight: 600, fontSize: 20, margin: "40px 0" }}>Your cart is empty.</div>
        ) : (
          <>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: 24 }}>
              {lastOutfit.map((item) => (
                <li key={item.id} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  marginBottom: 18,
                  background: "#f0f9ff",
                  borderRadius: 16,
                  padding: "12px 18px",
                  boxShadow: "0 1px 6px #bae6fd33",
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}>
                  <img src={item.image} alt={item.name} style={{ width: 48, height: 48, borderRadius: 10, objectFit: "contain", border: "1.5px solid #bae6fd" }} />
                  <span style={{ fontWeight: 700, color: "#0ea5e9", fontSize: 18 }}>{item.name}</span>
                  <span style={{ marginLeft: "auto", color: "#38bdf8", fontWeight: 700, fontSize: 18 }}>{`$${item.price}`}</span>
                </li>
              ))}
            </ul>
            <div style={{ borderTop: "1.5px solid #bae6fd", marginTop: 12, paddingTop: 18, textAlign: "right", fontWeight: 800, fontSize: 22, color: "#0ea5e9" }}>
              Total: <span style={{ color: "#38bdf8" }}>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              style={{
                marginTop: 32,
                padding: "16px 40px",
                fontSize: 20,
                borderRadius: 16,
                background: "linear-gradient(90deg,#38bdf8,#0ea5e9)",
                color: "#fff",
                border: "none",
                fontWeight: 800,
                boxShadow: "0 2px 12px #38bdf833",
                letterSpacing: 1,
                cursor: "pointer",
                transition: "transform 0.15s, box-shadow 0.15s, background 0.2s",
              }}
              onMouseDown={e => (e.currentTarget.style.transform = "scale(0.96)")}
              onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <span style={{ fontSize: 26, marginRight: 12 }}>💳</span> Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
} 