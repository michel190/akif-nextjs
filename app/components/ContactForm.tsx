export default function ContactForm() {
  return (
    <section id="contact" className="max-w-lg mx-auto px-5 sm:px-8 py-16">
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-flame">Besoin d&apos;aide ?</span>
        <h2 className="font-serif italic font-bold text-3xl mt-2 text-bone">Un souci, une suggestion ?</h2>
        <p className="text-mut text-sm mt-2">Si WhatsApp ne fonctionne pas, écrivez-nous ici.</p>
      </div>
      {/* ⚠️ Fonctionne automatiquement seulement si hébergé sur Netlify
          (comme pour les autres sites) — pas sur Vercel. Les messages
          arrivent dans l'onglet "Forms" du tableau de bord Netlify. */}
      <form name="contact-akif" method="POST" data-netlify="true" className="space-y-4">
        <input type="hidden" name="form-name" value="contact-akif" />
        <input type="text" name="nom" placeholder="Votre nom" required maxLength={80} className="w-full bg-panel border border-line rounded-xl px-4 py-3 text-sm text-bone placeholder:text-mut/60 focus:outline-none focus:border-red" />
        <input type="tel" name="telephone" placeholder="Votre numéro" required maxLength={20} className="w-full bg-panel border border-line rounded-xl px-4 py-3 text-sm text-bone placeholder:text-mut/60 focus:outline-none focus:border-red" />
        <textarea name="message" rows={3} placeholder="Votre message" required maxLength={500} className="w-full bg-panel border border-line rounded-xl px-4 py-3 text-sm text-bone placeholder:text-mut/60 focus:outline-none focus:border-red" />
        <button type="submit" className="w-full bg-red hover:bg-red-deep text-white font-bold py-3.5 rounded-full transition-colors">
          Envoyer
        </button>
      </form>
    </section>
  );
}
