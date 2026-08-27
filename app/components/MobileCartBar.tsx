"use client";

import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { fmt } from "@/lib/menu-data";

export default function MobileCartBar() {
  const { count, total, openCart } = useCart();

  return (
    <motion.div
      animate={{ y: count > 0 ? 0 : 120 }}
      transition={{ type: "tween", duration: 0.3 }}
      className="sm:hidden fixed left-4 right-4 bottom-4 z-40"
    >
      <button onClick={openCart} className="w-full bg-red text-white rounded-2xl px-5 py-4 flex items-center justify-between shadow-2xl">
        <span className="font-bold text-sm">🛒 {count} article(s) — {fmt(total)}</span>
        <span className="text-sm font-bold">Voir le panier →</span>
      </button>
    </motion.div>
  );
}
