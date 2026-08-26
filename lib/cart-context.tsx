"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product, Supplement } from "./menu-data";

export type CartItem = {
  key: string;
  id: string;
  name: string;
  img: string;
  unitPrice: number;
  qty: number;
  accomp: string | null;
  supplements: Supplement[];
  instructions: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "key">) => void;
  changeQty: (key: string, delta: number) => void;
  total: number;
  count: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  fulfillMode: "emporter" | "livraison" | null;
  setFulfillMode: (m: "emporter" | "livraison") => void;
  quartier: string;
  setQuartier: (q: string) => void;
  selectedAgency: string | null;
  setSelectedAgency: (a: string) => void;
  locationLink: string | null;
  locationStatus: "idle" | "loading" | "granted" | "denied" | "error";
  requestLocation: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [fulfillMode, setFulfillMode] = useState<"emporter" | "livraison" | null>(null);
  const [quartier, setQuartier] = useState("");
  const [selectedAgency, setSelectedAgency] = useState<string | null>(null);
  const [locationLink, setLocationLink] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "granted" | "denied" | "error">("idle");

  function requestLocation() {
    if (!("geolocation" in navigator)) {
      setLocationStatus("error");
      return;
    }
    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocationLink(`https://maps.google.com/?q=${latitude},${longitude}`);
        setLocationStatus("granted");
      },
      (err) => {
        setLocationStatus(err.code === err.PERMISSION_DENIED ? "denied" : "error");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function addToCart(item: Omit<CartItem, "key">) {
    const key = [item.id, item.accomp, item.supplements.map((s) => s.name).sort().join(","), item.instructions].join("|");
    setCart((prev) => {
      const existing = prev.find((c) => c.key === key);
      if (existing) {
        return prev.map((c) => (c.key === key ? { ...c, qty: c.qty + item.qty } : c));
      }
      return [...prev, { ...item, key }];
    });
  }

  function changeQty(key: string, delta: number) {
    setCart((prev) =>
      prev
        .map((c) => (c.key === key ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  }

  const total = cart.reduce((s, c) => s + c.unitPrice * c.qty, 0);
  const count = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        changeQty,
        total,
        count,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        fulfillMode,
        setFulfillMode,
        quartier,
        setQuartier,
        selectedAgency,
        setSelectedAgency,
        locationLink,
        locationStatus,
        requestLocation,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
