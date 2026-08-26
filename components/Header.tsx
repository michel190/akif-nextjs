"use client";

import { useCart } from "@/lib/cart-context";
import { fmt } from "@/lib/menu-data";

export default function Header() {
  const { count, total, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-panel/95 backdrop-blur-md border-b border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 flex-shrink-0">
          <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-red/10 border border-red/20">
            <span className="absolute -top-1 -right-1 text-xs">🔥</span>
            <span className="font-serif italic font-bold text-red text-base leading-none">
              Ak<span className="lowercase">if</span>
            </span>
          </span>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="text-[9px] font-bold text-mut tracking-[0.25em]">ETS.</span>
            <span className="font-serif italic font-bold text-bone text-base -mt-0.5">Fast Food</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-bone/70">
          <a href="#top" className="hover:text-red transition-colors">Accueil</a>
          <a href="#menu" className="font-semibold text-bone hover:text-red transition-colors">Menu</a>
          <a href="#a-propos" className="hover:text-red transition-colors">À propos</a>
          <a href="#contact" className="hover:text-red transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <a href="tel:+22897041414" className="hidden sm:inline-flex text-xs font-semibold text-mut hover:text-red transition-colors">
            📞 Appeler
          </a>
          <button
            onClick={openCart}
            className="flex items-center gap-2 bg-red hover:bg-red-deep rounded-full pl-4 pr-2.5 py-2.5 transition-colors"
          >
            <span className="text-xs font-bold text-white hidden sm:inline">
              {count > 0 ? fmt(total) : "Panier"}
            </span>
            <span className="bg-white text-red text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {count}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
