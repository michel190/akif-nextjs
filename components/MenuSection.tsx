"use client";

import { useState, useMemo, useRef } from "react";
import {
  Category,
  CATEGORY_LABELS,
  MENU,
  Product,
  fmt,
} from "@/lib/menu-data";
import { useFavorites } from "@/lib/favorites";

const CATS: Category[] = ["populaires", "poulet", "burgers", "chawarma", "tacos", "pizza", "viande", "fruitsdemer", "glaces", "boulangerie", "boissons"];
const ALL_PRODUCTS: Product[] = Object.values(MENU).flat();
const MAX_PRICE = Math.max(...ALL_PRODUCTS.map((p) => p.price));

type SortKey = "popular" | "price-asc" | "price-desc" | "name";

function badgeClass(badge?: string) {
  if (badge === "Nouveau") return "bg-flame text-ink";
  if (badge === "Article unique") return "bg-ink text-white";
  return "bg-red text-white";
}

function ProductCard({ product, onOpen }: { product: Product; onOpen: (p: Product) => void }) {
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
      style={{ transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateY(${tilt.x || tilt.y ? -3 : 0}px)` }}
      className="bg-panel border border-line rounded-2xl overflow-hidden cursor-pointer transition-transform duration-150 shadow-sm hover:shadow-xl"
    >
      <div className="aspect-[4/3] overflow-hidden relative bg-panel2">
        {product.badge && (
          <span className={`absolute left-3 top-3 z-10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-full ${badgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
          className="absolute right-3 top-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          aria-label="Ajouter aux favoris"
        >
          <span className={isFavorite(product.id) ? "text-red" : "text-mut"}>
            {isFavorite(product.id) ? "♥" : "♡"}
          </span>
        </button>
        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-serif italic font-bold text-base text-bone leading-tight">{product.name}</h3>
        {product.desc && <p className="text-xs text-mut mt-1 leading-snug line-clamp-2">{product.desc}</p>}
        <div className="flex items-center justify-between mt-3">
          <p className={`font-bold ${product.price > 0 ? "text-bone" : "text-mut italic text-xs"}`}>{fmt(product.price)}</p>
          <span className="w-8 h-8 rounded-full bg-flame text-ink flex items-center justify-center font-bold text-lg hover:bg-red hover:text-white transition-colors">+</span>
        </div>
      </div>
    </div>
  );
}

export default function MenuSection({ onOpenProduct }: { onOpenProduct: (p: Product) => void }) {
  const [activeCat, setActiveCat] = useState<Category>("populaires");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [vegOnly, setVegOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("popular");

  const filtered = useMemo(() => {
    let list =
      activeCat === "populaires"
        ? ALL_PRODUCTS.filter((p) => p.badge === "Populaire" || p.badge === "Best Seller")
        : MENU[activeCat];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
    }
    if (vegOnly) {
      list = list.filter((p) => p.name.toLowerCase().includes("végétarien"));
    }
    list = list.filter((p) => p.price === 0 || p.price <= maxPrice);

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => (a.price || 999999) - (b.price || 999999));
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else sorted.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));

    return sorted;
  }, [activeCat, search, maxPrice, vegOnly, sort]);

  return (
    <section id="menu" className="bg-bg border-t border-line">
      {/* ---- Bandeau titre + recherche ---- */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 pb-8">
        <p className="text-xs text-mut mb-2">Accueil / <span className="text-bone font-semibold">Menu Complet</span></p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h2 className="font-serif italic font-bold text-4xl text-bone">Menu Complet</h2>
            <p className="text-mut mt-1">{ALL_PRODUCTS.length} plats, préparés à la commande.</p>
          </div>
          <div className="flex items-center gap-2 bg-panel border border-line rounded-full px-2 py-1.5 max-w-md w-full shadow-sm">
            <span className="pl-2 text-mut">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Rechercher un burger, une pizza..."
              className="flex-1 bg-transparent px-2 py-1.5 text-sm text-bone placeholder:text-mut/60 focus:outline-none"
            />
            <button className="bg-flame text-ink text-sm font-bold px-5 py-2 rounded-full hover:bg-red hover:text-white transition-colors">
              Chercher
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-24 grid lg:grid-cols-[260px_1fr] gap-8">
        {/* ---- Sidebar filtres ---- */}
        <aside className="bg-panel border border-line rounded-2xl p-6 h-fit lg:sticky lg:top-24">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-bone">Filtres</h3>
            <button
              onClick={() => { setActiveCat("populaires"); setSearch(""); setMaxPrice(MAX_PRICE); setVegOnly(false); }}
              className="text-xs font-semibold text-red hover:underline"
            >
              Tout effacer
            </button>
          </div>

          <p className="text-xs font-bold uppercase tracking-wide text-mut mb-3">Catégorie</p>
          <div className="space-y-1 mb-6">
            {CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`w-full flex items-center gap-2.5 text-left px-2.5 py-2 rounded-lg text-sm transition-colors ${
                  activeCat === cat ? "bg-red/10 text-red font-semibold" : "text-bone/80 hover:bg-panel2"
                }`}
              >
                <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${activeCat === cat ? "bg-red border-red" : "border-line"}`}>
                  {activeCat === cat && <span className="text-white text-[10px]">✓</span>}
                </span>
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          <p className="text-xs font-bold uppercase tracking-wide text-mut mb-3">Prix maximum</p>
          <div className="mb-6">
            <input
              type="range"
              min={0}
              max={MAX_PRICE}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full accent-red"
            />
            <div className="flex justify-between text-xs text-mut mt-1">
              <span>0F</span>
              <span className="font-semibold text-bone">{maxPrice >= MAX_PRICE ? "Tous les prix" : fmt(maxPrice)}</span>
            </div>
          </div>

          <p className="text-xs font-bold uppercase tracking-wide text-mut mb-3">Régime</p>
          <label className="flex items-center gap-2.5 text-sm text-bone/80 cursor-pointer">
            <input type="checkbox" checked={vegOnly} onChange={(e) => setVegOnly(e.target.checked)} className="accent-red w-4 h-4" />
            Végétarien uniquement
          </label>
        </aside>

        {/* ---- Grille produits ---- */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-mut">{filtered.length} article{filtered.length > 1 ? "s" : ""}</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-panel border border-line rounded-full px-4 py-2 text-sm text-bone focus:outline-none"
            >
              <option value="popular">Trier : Populaires</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="name">Nom A-Z</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-mut py-20">Aucun plat ne correspond à ces filtres.</p>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={onOpenProduct} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
