"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { fmt } from "@/lib/menu-data";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { sanitizeText } from "@/lib/sanitize";

const AGENCIES = ["Dékon", "Avénou", "Agoè"];

export default function CartDrawer() {
  const {
    cart, changeQty, total, isCartOpen, closeCart,
    fulfillMode, setFulfillMode, quartier, setQuartier,
    selectedAgency, setSelectedAgency,
    locationLink, locationStatus, requestLocation,
    nom, setNom, telephone, setTelephone, commentaire, setCommentaire,
    promoInput, setPromoInput, promoResult, applyPromo, removePromo,
  } = useCart();

  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [errors, setErrors] = useState<string[]>([]);

  const discount = promoResult?.valid ? promoResult.discount : 0;
  const finalTotal = Math.max(0, total - discount);

  const whatsappUrl = buildWhatsappUrl({
    cart, fulfillMode, quartier, selectedAgency, locationLink,
    nom, telephone, commentaire, promoDiscount: discount,
  });

  function handleClose() {
    closeCart();
    setStep("cart");
    setErrors([]);
  }

  function handleProceedToCheckout() {
    const errs: string[] = [];
    if (!fulfillMode) errs.push("Choisissez un mode de récupération.");
    if (!selectedAgency) errs.push("Choisissez une agence.");
    if (errs.length) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    track("begin_checkout", { total, count: cart.length, agency: selectedAgency, mode: fulfillMode });
    setStep("checkout");
  }

  function handleSendWhatsapp() {
    const errs: string[] = [];
    if (!nom.trim()) errs.push("Votre nom est requis.");
    if (!telephone.trim() || telephone.trim().replace(/[^0-9]/g, "").length < 8) errs.push("Un numéro de téléphone valide est requis.");
    if (errs.length) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    track("whatsapp_click", { total: finalTotal, agency: selectedAgency, mode: fulfillMode });
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
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
              <h3 className="font-serif italic font-bold text-xl text-bone">
                {step === "cart" ? "Mon panier" : "Finaliser la commande"}
              </h3>
              <button onClick={handleClose} className="w-9 h-9 rounded-full hover:bg-panel2 flex items-center justify-center">✕</button>
            </div>

            {cart.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
                <span className="text-4xl opacity-40">🛒</span>
                <p className="text-mut">Votre panier est vide pour l&apos;instant.</p>
              </div>
            )}

            {/* ============ ÉTAPE 1 : PANIER ============ */}
            {cart.length > 0 && step === "cart" && (
              <>
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

                <div className="border-t border-line px-6 py-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-mut mb-2.5">Agence la plus proche</p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {AGENCIES.map((a) => (
                      <button
                        key={a}
                        onClick={() => { setSelectedAgency(a); track("select_agency", { agency: a }); }}
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
                        onChange={(e) => setQuartier(sanitizeText(e.target.value, 100))}
                        type="text"
                        maxLength={100}
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

                  {errors.length > 0 && (
                    <div className="bg-red/10 border border-red/30 rounded-xl px-3.5 py-2.5 mb-4">
                      {errors.map((e) => (
                        <p key={e} className="text-xs text-red font-semibold">⚠ {e}</p>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between font-bold text-lg mb-4 text-bone">
                    <span>Sous-total</span>
                    <span>{fmt(total)}</span>
                  </div>

                  <button
                    onClick={handleProceedToCheckout}
                    className="block w-full text-center bg-red hover:bg-red-deep text-white font-bold px-6 py-4 rounded-full transition-colors"
                  >
                    Continuer la commande
                  </button>
                </div>
              </>
            )}

            {/* ============ ÉTAPE 2 : COORDONNÉES + CONFIRMATION ============ */}
            {cart.length > 0 && step === "checkout" && (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                  <button onClick={() => setStep("cart")} className="text-xs font-semibold text-red hover:underline mb-2">
                    ← Retour au panier
                  </button>

                  <input
                    value={nom}
                    onChange={(e) => setNom(sanitizeText(e.target.value, 80))}
                    type="text"
                    maxLength={80}
                    placeholder="Votre nom *"
                    className="w-full bg-panel2 border border-line rounded-xl px-3.5 py-2.5 text-sm text-bone placeholder:text-mut/60 focus:outline-none focus:border-red"
                  />
                  <input
                    value={telephone}
                    onChange={(e) => setTelephone(sanitizeText(e.target.value, 20))}
                    type="tel"
                    maxLength={20}
                    placeholder="Votre numéro de téléphone *"
                    className="w-full bg-panel2 border border-line rounded-xl px-3.5 py-2.5 text-sm text-bone placeholder:text-mut/60 focus:outline-none focus:border-red"
                  />
                  <textarea
                    value={commentaire}
                    onChange={(e) => setCommentaire(sanitizeText(e.target.value, 300))}
                    rows={2}
                    maxLength={300}
                    placeholder="Commentaire (facultatif)"
                    className="w-full bg-panel2 border border-line rounded-xl px-3.5 py-2.5 text-sm text-bone placeholder:text-mut/60 focus:outline-none focus:border-red"
                  />

                  <div>
                    <div className="flex gap-2">
                      <input
                        value={promoInput}
                        onChange={(e) => setPromoInput(sanitizeText(e.target.value, 30))}
                        type="text"
                        maxLength={30}
                        placeholder="Code promo"
                        className="flex-1 bg-panel2 border border-line rounded-xl px-3.5 py-2.5 text-sm text-bone placeholder:text-mut/60 focus:outline-none focus:border-red"
                      />
                      <button onClick={applyPromo} className="border border-line rounded-xl px-4 text-sm font-semibold hover:bg-panel2 transition-colors">
                        Appliquer
                      </button>
                    </div>
                    {promoResult && (
                      <p className={`text-xs mt-1.5 font-semibold ${promoResult.valid ? "text-green-700" : "text-red"}`}>
                        {promoResult.message}
                        {promoResult.valid && (
                          <button onClick={removePromo} className="ml-2 underline">retirer</button>
                        )}
                      </p>
                    )}
                  </div>

                  <div className="bg-panel2 rounded-xl px-4 py-3 space-y-1 text-sm">
                    <p className="text-mut">Agence : <span className="text-bone font-semibold">{selectedAgency}</span></p>
                    <p className="text-mut">Mode : <span className="text-bone font-semibold">{fulfillMode === "emporter" ? "À emporter" : "Livraison"}</span></p>
                    <p className="text-mut">{cart.reduce((s, c) => s + c.qty, 0)} article(s)</p>
                  </div>
                </div>

                <div className="border-t border-line px-6 py-5">
                  {errors.length > 0 && (
                    <div className="bg-red/10 border border-red/30 rounded-xl px-3.5 py-2.5 mb-4">
                      {errors.map((e) => (
                        <p key={e} className="text-xs text-red font-semibold">⚠ {e}</p>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between text-mut text-sm mb-1.5">
                    <span>Sous-total</span>
                    <span>{fmt(total)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-700 text-sm mb-1.5">
                      <span>Réduction</span>
                      <span>-{fmt(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-mut text-sm mb-3">
                    <span>Livraison</span>
                    <span>À confirmer</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mb-3 text-bone">
                    <span>Total</span>
                    <span>{fmt(finalTotal)}</span>
                  </div>
                  <p className="text-[11px] text-mut leading-relaxed mb-4">
                    Règlement en espèces à la livraison ou sur place. Merci de préciser si vous avez besoin de monnaie (billet de 5 000 ou 10 000 FCFA).
                    Votre commande est prête à être envoyée sur WhatsApp.
                  </p>
                  <button
                    onClick={handleSendWhatsapp}
                    className="block w-full text-center bg-red hover:bg-red-deep text-white font-bold px-6 py-4 rounded-full transition-colors"
                  >
                    Envoyer sur WhatsApp
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
