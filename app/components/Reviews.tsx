export default function Reviews() {
  return (
    <section className="max-w-3xl mx-auto px-5 sm:px-8 py-16 text-center">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-flame">Avis clients</span>
      <h2 className="font-serif italic font-bold text-3xl mt-2 mb-8 text-bone">Ce qu&apos;on en dit.</h2>
      <div className="border-2 border-dashed border-line rounded-2xl px-8 py-12 bg-panel">
        <div className="flex justify-center gap-1 text-mut/40 mb-3">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <p className="text-mut max-w-sm mx-auto">
          Aucun avis pour le moment. Les premiers retours de nos clients apparaîtront ici après leurs commandes.
        </p>
      </div>
    </section>
  );
}
