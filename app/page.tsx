"use client";
import React, { useState } from "react";
import ClothingPanel, { ClothingItem } from "@/components/clothing-panel";
import VirtualCanvas from "@/components/virtual-canvas";
import Navbar from "@/components/navbar";
import { signOut } from "next-auth/react";
import { dummyClothingItems } from "@/components/dummy-clothing-items";

// SVG icon components (reuse from your code)
const IconAll = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#7b2ff2" strokeWidth="2" fill="#e0e7ef" /><circle cx="12" cy="12" r="5" fill="#7b2ff2" /></svg>
);
const IconTops = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="5" y="6" width="14" height="12" rx="3" fill="#7b2ff2" /><rect x="7" y="8" width="10" height="8" rx="2" fill="#fff" /></svg>
);
const IconBottoms = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="7" y="4" width="10" height="8" rx="2" fill="#7b2ff2" /><rect x="9" y="12" width="6" height="8" rx="2" fill="#e0e7ef" /></svg>
);
const IconShoes = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="4" y="16" width="16" height="4" rx="2" fill="#7b2ff2" /><rect x="8" y="12" width="8" height="4" rx="2" fill="#e0e7ef" /></svg>
);
const IconAccessories = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="#7b2ff2" /><rect x="8" y="14" width="8" height="4" rx="2" fill="#e0e7ef" /></svg>
);

const CATEGORIES = [
  { key: "all", label: "All Items", icon: <IconAll /> },
  { key: "tops", label: "Tops", icon: <IconTops /> },
  { key: "bottoms", label: "Bottoms", icon: <IconBottoms /> },
  { key: "shoes", label: "Shoes", icon: <IconShoes /> },
  { key: "accessories", label: "Accessories", icon: <IconAccessories /> },
];

export default function Home() {
  const [clothingItems] = useState(dummyClothingItems);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;
  return (
    <div style={{ width: "100%" }}>
      <Navbar userName="Demo User" userEmail="demo@stylecraft.com" />
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        position: "relative",
        width: "100%",
        gap: isMobile ? 18 : 0,
        alignItems: isMobile ? "stretch" : undefined,
      }}>
        <ClothingPanel items={clothingItems} categories={CATEGORIES} />
        <VirtualCanvas />
      </div>
    </div>
  );
}
