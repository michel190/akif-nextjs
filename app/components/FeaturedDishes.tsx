"use client";

import { useState, useRef } from "react";
import { MENU, Product, fmt } from "@/lib/menu-data";
import { useFavorites } from "@/lib/favorites";
import ScrollReveal from "./ScrollReveal";

const FEATURED: Product[] = Object.values(MENU)
  .flat()
  .filter((p) => p.badge === "Populaire" || p.badge === "Best Seller")
  .slice(0, 4);

function FeaturedCard({ product, onOpen }: { product: Product; onOpen: (p: Product) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { isFavorite, toggleFavorite } = useFavorites();

  function handleMouseMove(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: -y * 8 });
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={() => onOpen(product)}
      style={{ transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}
      className="bg-panel border border-line rounded-2xl overflow-hidden cursor-pointer transition-transform duration-150 shadow-sm hover:shadow-xl"
    >
      <div className="aspect-square overflow-hidden relative bg-panel2">
        <span className="absolute left-3 top-3 z-10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-full bg-red text-white">
          {product.badge}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
          className="absolute right-3 top-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          aria-label="Ajouter aux favoris"
        >
          <span className={isFavorite(product.id) ? "text-red" : "text-mut"}>{isFavorite(product.id) ? "♥" : "♡"}</span>
        </button>
        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-serif italic font-bold text-base text-bone leading-tight">{product.name}</h3>
        <div className="flex items-center justify-between mt-3">
          <p className="font-bold text-bone">{fmt(product.price)}</p>
          <span className="w-8 h-8 rounded-full bg-flame text-ink flex items-center justify-center font-bold text-lg">+</span>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedDishes({ onOpenProduct }: { onOpenProduct: (p: Product) => void }) {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-flame">À ne pas manquer</span>
          <h2 className="font-serif italic font-bold text-3xl sm:text-4xl mt-2 text-bone">Nos plats vedettes.</h2>
        </div>
        <a href="#menu" className="hidden sm:inline-block text-sm font-semibold text-red hover:underline">
          Voir tout le menu →
        </a>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURED.map((p, i) => (
          <ScrollReveal key={p.id} delay={i * 0.08}>
            <FeaturedCard product={p} onOpen={onOpenProduct} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
