"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Load cart count from localStorage
    const stored = localStorage.getItem("outfit_cart");
    if (stored) {
      const cart = JSON.parse(stored);
      setCartCount(cart.length);
    }
    // Listen for cart updates (optional: use a custom event or context for real-time updates)
    const handleStorage = () => {
      const stored = localStorage.getItem("outfit_cart");
      if (stored) {
        const cart = JSON.parse(stored);
        setCartCount(cart.length);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <header style={{
      width: "100%",
      background: "#fff",
      boxShadow: "0 2px 12px #bae6fd33",
      padding: "18px 36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ fontWeight: 900, fontSize: 28, color: "#0ea5e9", letterSpacing: 1 }}>StyleCraft</div>
      <Link href="/cart" style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "linear-gradient(90deg,#38bdf8,#0ea5e9)",
        color: "#fff",
        fontWeight: 800,
        fontSize: 18,
        borderRadius: 14,
        padding: "10px 28px",
        boxShadow: "0 2px 8px #38bdf833",
        textDecoration: "none",
        transition: "background 0.2s, box-shadow 0.2s, transform 0.1s",
        position: "relative",
      }}
        onMouseDown={e => (e.currentTarget.style.transform = "scale(0.96)")}
        onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        <span style={{ fontSize: 24 }}>🛒</span>
        Go to Cart
        <span style={{
          background: "#fff",
          color: "#0ea5e9",
          borderRadius: 10,
          fontWeight: 900,
          fontSize: 15,
          minWidth: 28,
          textAlign: "center",
          padding: "2px 8px",
          marginLeft: 8,
          boxShadow: "0 1px 4px #bae6fd33",
        }}>{cartCount}</span>
      </Link>
    </header>
  );
}
