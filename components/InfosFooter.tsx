import { AGENCY_INFO } from "@/lib/menu-data";

export default function InfosFooter() {
  return (
    <>
      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-16 border-t border-line">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-flame">Infos pratiques</span>
          <h2 className="font-serif italic font-bold text-3xl mt-2 text-bone">On vous attend, dans 3 agences.</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {Object.entries(AGENCY_INFO).map(([name, info]) => (
            <div key={name} className="bg-panel border border-line rounded-2xl px-6 py-6 text-left">
              <h3 className="font-serif italic font-bold text-lg text-bone mb-3">{name}</h3>
              <p className="text-sm text-mut mb-2">📍 {info.address}</p>
              <p className="text-sm text-mut">📞 {info.phoneDisplay}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-mut mt-8">🕒 Tous les jours, de 8h00 à 4h00 du matin</p>
      </section>

      <footer className="border-t border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-mut">
          <p>Akif Fast Food — Lomé, Togo</p>
          <a href="https://instagram.com/akif.fastfood" target="_blank" rel="noopener noreferrer" className="hover:text-bone transition-colors">
            Instagram — @akif.fastfood
          </a>
          <p>Menu et prix indicatifs, susceptibles d&apos;évoluer.</p>
        </div>
        <div className="border-t border-line">
          <p className="max-w-7xl mx-auto px-5 sm:px-8 py-4 text-[11px] text-mut/70 text-center">
            Site non-officiel proposé par Michel — Menu et prix indicatifs, en attente de validation par l&apos;établissement.
          </p>
        </div>
      </footer>
    </>
  );
}
