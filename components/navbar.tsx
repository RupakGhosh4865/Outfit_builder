"use client";
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

// SVG icons
const LogoIcon = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none"><rect width="38" height="38" rx="12" fill="url(#a)"/><path d="M19 11l2.5 7.5H29l-6 4.5 2.5 7.5L19 26l-6 4.5 2.5-7.5-6-4.5h7.5L19 11z" fill="#fff"/><defs><linearGradient id="a" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse"><stop stopColor="#7b2ff2"/><stop offset="1" stopColor="#f357a8"/></linearGradient></defs></svg>
);
const CartIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="20" r="2" fill="#7b2ff2"/><circle cx="17" cy="20" r="2" fill="#7b2ff2"/><path d="M5 6h2l1 7h8l1-7h2" stroke="#7b2ff2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="7" y="10" width="10" height="4" rx="2" fill="#e0e7ef"/></svg>
);
const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="#7b2ff2"/><rect x="6" y="16" width="12" height="6" rx="3" fill="#e0e7ef"/></svg>
);

interface NavbarProps {
  userName?: string;
  userEmail?: string;
}

export default function Navbar({ userName = "Demo User", userEmail = "demo@stylecraft.com" }: NavbarProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;
  return (
    <nav style={{
      width: "100%",
      background: "#fff",
      boxShadow: "0 2px 12px #e0e7ef55",
      padding: isMobile ? "0 10px" : "0 36px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "stretch" : "center",
      justifyContent: "space-between",
      height: isMobile ? 110 : 72,
      position: "sticky",
      top: 0,
      zIndex: 100,
      flexWrap: "wrap",
      gap: isMobile ? 8 : 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 14, flex: isMobile ? 1 : undefined }}>
        <LogoIcon />
        <div>
          <div style={{ fontWeight: 900, fontSize: isMobile ? 18 : 24, color: "#7b2ff2", letterSpacing: 1 }}>StyleCraft</div>
          <div style={{ fontSize: isMobile ? 11 : 13, color: "#888", fontWeight: 500, marginTop: -2 }}>WYSIWYG Outfit Builder</div>
        </div>
      </div>
      <Link href="/cart" style={{ display: "flex", alignItems: "center", gap: 8, padding: isMobile ? 6 : 10, borderRadius: 12, transition: "background 0.2s" }}>
        <CartIcon />
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 16, position: "relative" }}>
        <div style={{ background: "#7b2ff2", borderRadius: "50%", width: isMobile ? 28 : 38, height: isMobile ? 28 : 38, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <UserIcon />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <span style={{ fontWeight: 700, color: "#222", fontSize: isMobile ? 13 : 16 }}>{userName}</span>
          <span style={{ color: "#888", fontSize: isMobile ? 10 : 13 }}>{userEmail}</span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/auth/signin' })}
          style={{
            background: "linear-gradient(90deg,#38bdf8,#0ea5e9)",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: isMobile ? "8px 14px" : "12px 24px",
            fontWeight: 700,
            cursor: "pointer",
            marginLeft: isMobile ? 6 : 12,
            boxShadow: "0 1px 4px #bae6fd33",
            transition: "background 0.2s, box-shadow 0.2s, transform 0.1s",
            fontSize: isMobile ? 13 : 16,
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
          }}
          onMouseDown={e => (e.currentTarget.style.transform = "scale(0.96)")}
          onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          <span style={{ fontSize: isMobile ? 15 : 18, marginRight: 8 }}>🚪</span> Logout
        </button>
      </div>
    </nav>
  );
} 