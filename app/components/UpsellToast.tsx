"use client";

import { MENU, Product, fmt } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";
import { track } from "@/lib/analytics";

// ⚠️ Suggestions basées uniquement sur de vrais produits déjà présents dans
// le menu (aucun article inventé) — une boisson et un dessert au hasard.
const SUGGESTIONS: Product[] = [
  MENU.boissons.find((p) => p.id === "bo-canettes")!,
  MENU.glaces.find((p) => p.id === "gl-milkshake")!,
].filter(Boolean);

export default function UpsellToast({ lastAddedId, onClose }: { lastAddedId: string | null; onClose: () => void }) {
  const { addToCart } = useCart();

  if (!lastAddedId) return null;

  const suggestions = SUGGESTIONS.filter((p) => p.id !== lastAddedId);
  if (suggestions.length === 0) return null;

  return (
    <div className="fixed bottom-24 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-24 sm:w-80 z-30 bg-panel border border-line rounded-2xl shadow-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold uppercase tracking-wide text-flame">Complétez votre commande</p>
        <button onClick={onClose} className="text-mut hover:text-bone text-sm">✕</button>
      </div>
      <div className="space-y-2">
        {suggestions.slice(0, 2).map((p) => (
          <div key={p.id} className="flex items-center gap-3">
            <img src={p.img} alt={p.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-bone truncate">{p.name}</p>
              <p className="text-xs text-mut">{fmt(p.price)}</p>
            </div>
            <button
              onClick={() => {
                addToCart({ id: p.id, name: p.name, img: p.img, unitPrice: p.price, qty: 1, accomp: null, supplements: [], instructions: "" });
                track("add_to_cart", { id: p.id, name: p.name, source: "upsell" });
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-red text-white font-bold hover:bg-red-deep transition-colors flex-shrink-0"
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
