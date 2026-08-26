"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  { q: "Comment passer commande ?", a: "Ajoutez vos plats au panier, choisissez À emporter ou Livraison, personnalisez-les si besoin, puis cliquez sur \"Commander maintenant\" — le message avec le détail de votre commande s'ouvre automatiquement sur WhatsApp." },
  { q: "Livrez-vous à domicile ?", a: "Oui — les frais de livraison sont confirmés directement avec vous sur WhatsApp selon votre quartier." },
  { q: "Quels sont les moyens de paiement acceptés ?", a: "Espèces à la livraison, Flooz ou T-Money." },
  { q: "Quels sont vos horaires d'ouverture ?", a: "Tous les jours, de 8h00 à 4h00 du matin." },
  { q: "Vos plats sont-ils halal ?", a: "Oui, tous nos plats sont préparés halal." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="border-t border-line bg-panel/40">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-flame">Questions</span>
          <h2 className="font-serif italic font-bold text-3xl mt-2 text-bone">Foire aux questions</h2>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between py-5 text-left">
                  <span className="font-serif italic font-bold text-lg text-bone">{item.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-red text-2xl leading-none">+</motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-mut text-sm leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
