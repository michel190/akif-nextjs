"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product, Supplement, fmt } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";

export default function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [accomp, setAccomp] = useState<string | null>(null);
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (product) {
      setQty(1);
      setAccomp(product.accomp ? product.accomp[0] : null);
      setSupplements([]);
      setInstructions("");
    }
  }, [product]);

  if (!product) return null;

  const suppTotal = supplements.reduce((s, x) => s + x.price, 0);
  const unitPrice = (product.price || 0) + suppTotal;

  function toggleSupplement(s: Supplement) {
    setSupplements((prev) =>
      prev.find((x) => x.name === s.name) ? prev.filter((x) => x.name !== s.name) : [...prev, s]
    );
  }

  function handleAdd() {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      img: product.img,
      unitPrice,
      qty,
      accomp,
      supplements,
      instructions: instructions.trim(),
    });
    onClose();
  }

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <div className="absolute inset-0 flex items-end sm:items-center justify-center p-0 sm:p-6">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-panel w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl max-h-[92vh] overflow-y-auto"
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center text-lg hover:bg-black/80 transition-colors"
              >
                ✕
              </button>

              <div className="aspect-[4/3] overflow-hidden">
                <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-6">
                {product.badge && (
                  <div className="mb-2 inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-full bg-red text-white">
                    {product.badge}
                  </div>
                )}
                <h3 className="font-serif italic font-bold text-2xl text-bone">{product.name}</h3>
                <p className="text-mut text-sm mt-2 leading-relaxed">{product.desc}</p>

                {product.accomp && (
                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-wide text-flame mb-3">Choisissez votre accompagnement</p>
                    <div className="space-y-2">
                      {product.accomp.map((opt) => (
                        <label key={opt} className="flex items-center gap-3 bg-panel2 border border-line rounded-xl px-3.5 py-2.5 cursor-pointer">
                          <input
                            type="radio"
                            name="accomp"
                            checked={accomp === opt}
                            onChange={() => setAccomp(opt)}
                            className="accent-red"
                          />
                          <span className="text-sm">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {product.supplements && (
                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-wide text-flame mb-3">Suppléments</p>
                    <div className="space-y-2">
                      {product.supplements.map((s) => (
                        <label key={s.name} className="flex items-center justify-between gap-3 bg-panel2 border border-line rounded-xl px-3.5 py-2.5 cursor-pointer">
                          <span className="flex items-center gap-3 text-sm">
                            <input
                              type="checkbox"
                              checked={!!supplements.find((x) => x.name === s.name)}
                              onChange={() => toggleSupplement(s)}
                              className="accent-red"
                            />
                            {s.name}
                          </span>
                          <span className="text-xs text-mut">{s.price > 0 ? "+" + fmt(s.price) : ""}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-flame mb-2">Instructions (facultatif)</p>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows={2}
                    placeholder="Sans oignons, sauce à part..."
                    className="w-full bg-panel2 border border-line rounded-xl px-3.5 py-2.5 text-sm text-bone placeholder:text-mut/60 focus:outline-none focus:border-red"
                  />
                </div>

                <div className="mt-7 flex items-center justify-between">
                  <div className="flex items-center gap-3 bg-panel2 border border-line rounded-full px-1.5 py-1.5">
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-8 h-8 rounded-full flex items-center justify-center text-lg hover:bg-panel">−</button>
                    <span className="w-6 text-center font-bold">{qty}</span>
                    <button onClick={() => setQty((q) => q + 1)} className="w-8 h-8 rounded-full flex items-center justify-center text-lg hover:bg-panel">+</button>
                  </div>
                  <p className="font-serif italic font-bold text-2xl text-bone">{fmt(unitPrice * qty)}</p>
                </div>

                <button
                  onClick={handleAdd}
                  className="mt-6 w-full bg-red hover:bg-red-deep text-white font-bold py-4 rounded-full transition-colors"
                >
                  Ajouter au panier
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
