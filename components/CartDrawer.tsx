"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { fmt } from "@/lib/menu-data";
import { buildWhatsappUrl } from "@/lib/whatsapp";

const AGENCIES = ["Dékon", "Avénou", "Agoè"];

export default function CartDrawer() {
  const {
    cart, changeQty, total, isCartOpen, closeCart,
    fulfillMode, setFulfillMode, quartier, setQuartier,
    selectedAgency, setSelectedAgency,
    locationLink, locationStatus, requestLocation,
  } = useCart();

  const whatsappUrl = buildWhatsappUrl({ cart, fulfillMode, quartier, selectedAgency, locationLink });

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 z-50"
          />
          <motion.aside
            initial={{ x: "100%", y: "100%" }}
            animate={{ x: 0, y: 0 }}
            exit={{ x: "100%", y: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[60] bg-panel border-line bottom-0 left-0 right-0 rounded-t-3xl max-h-[85vh]
              sm:bottom-0 sm:top-0 sm:left-auto sm:right-0 sm:w-[420px] sm:rounded-t-none sm:border-l sm:max-h-none
              flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-line">
              <h3 className="font-serif italic font-bold text-xl text-bone">Mon panier</h3>
              <button onClick={closeCart} className="w-9 h-9 rounded-full hover:bg-panel2 flex items-center justify-center">✕</button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
                <span className="text-4xl opacity-40">🛒</span>
                <p className="text-mut">Votre panier est vide pour l&apos;instant.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                {cart.map((c) => (
                  <div key={c.key} className="flex gap-3">
                    <img src={c.img} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-bone truncate">{c.name}</p>
                      {c.accomp && <p className="text-xs text-mut">Accompagnement : {c.accomp}</p>}
                      {c.supplements.length > 0 && (
                        <p className="text-xs text-mut">+ {c.supplements.map((s) => s.name).join(", ")}</p>
                      )}
                      {c.instructions && <p className="text-xs text-flame italic">&quot;{c.instructions}&quot;</p>}
                      <div className="flex items-center justify-between mt-1.5">
                        <div className="flex items-center gap-2">
                          <button onClick={() => changeQty(c.key, -1)} className="w-6 h-6 rounded-full border border-line flex items-center justify-center text-xs">−</button>
                          <span className="w-5 text-center text-xs font-semibold">{c.qty}</span>
                          <button onClick={() => changeQty(c.key, 1)} className="w-6 h-6 rounded-full border border-line flex items-center justify-center text-xs">+</button>
                        </div>
                        <p className="text-sm font-bold text-bone">{fmt(c.unitPrice * c.qty)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="border-t border-line px-6 py-5">
                <p className="text-xs font-bold uppercase tracking-wide text-mut mb-2.5">Agence la plus proche</p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {AGENCIES.map((a) => (
                    <button
                      key={a}
                      onClick={() => setSelectedAgency(a)}
                      className={`border rounded-xl py-2 text-xs font-semibold transition-colors ${
                        selectedAgency === a ? "bg-red text-white border-red" : "border-line"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>

                <p className="text-xs font-bold uppercase tracking-wide text-mut mb-2.5">Mode de récupération</p>
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setFulfillMode("emporter")}
                    className={`flex-1 border rounded-xl py-2.5 text-sm font-semibold transition-colors ${
                      fulfillMode === "emporter" ? "bg-red text-white border-red" : "border-line"
                    }`}
                  >
                    🏠 À emporter
                  </button>
                  <button
                    onClick={() => setFulfillMode("livraison")}
                    className={`flex-1 border rounded-xl py-2.5 text-sm font-semibold transition-colors ${
                      fulfillMode === "livraison" ? "bg-red text-white border-red" : "border-line"
                    }`}
                  >
                    🛵 Livraison
                  </button>
                </div>
                {fulfillMode === "livraison" && (
                  <>
                    <input
                      value={quartier}
                      onChange={(e) => setQuartier(e.target.value)}
                      type="text"
                      placeholder="Votre quartier (pour la livraison)"
                      className="w-full bg-panel2 border border-line rounded-xl px-3.5 py-2.5 text-sm text-bone placeholder:text-mut/60 mb-3 focus:outline-none focus:border-red"
                    />
                    <button
                      onClick={requestLocation}
                      disabled={locationStatus === "loading"}
                      className={`w-full flex items-center justify-center gap-2 border rounded-xl py-2.5 text-sm font-semibold mb-4 transition-colors ${
                        locationStatus === "granted" ? "border-green-600 text-green-700 bg-green-50" : "border-line text-bone/80 hover:bg-panel2"
                      }`}
                    >
                      {locationStatus === "loading" && "📍 Récupération de votre position..."}
                      {locationStatus === "granted" && "✅ Position partagée"}
                      {(locationStatus === "idle") && "📍 Partager ma position exacte"}
                      {locationStatus === "denied" && "📍 Position refusée — réessayer"}
                      {locationStatus === "error" && "📍 Indisponible — réessayer"}
                    </button>
                  </>
                )}

                <div className="flex justify-between text-mut text-sm mb-1.5">
                  <span>Sous-total</span>
                  <span>{fmt(total)}</span>
                </div>
                <div className="flex justify-between text-mut text-sm mb-3">
                  <span>Livraison</span>
                  <span>À confirmer</span>
                </div>
                <div className="flex justify-between font-bold text-lg mb-3 text-bone">
                  <span>Total</span>
                  <span>{fmt(total)}</span>
                </div>
                <p className="text-[11px] text-mut leading-relaxed mb-4">
                  Règlement en espèces à la livraison ou sur place. Merci de préciser si vous avez besoin de monnaie (billet de 5 000 ou 10 000 FCFA).
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-red hover:bg-red-deep text-white font-bold px-6 py-4 rounded-full transition-colors"
                >
                  Commander maintenant
                </a>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
