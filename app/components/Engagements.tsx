export default function Engagements() {
  return (
    <section id="a-propos" className="bg-panel/40 border-y border-line">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-14 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-flame">À propos</span>
        <h2 className="font-serif italic font-bold text-3xl mt-2 mb-5 text-bone">Une chaîne populaire à Lomé.</h2>
        <p className="text-mut leading-relaxed">
          Akif Fast-Food est une chaîne de restauration rapide libanaise et moyen-orientale bien connue à Lomé.
          Chawarmas, kafta, brochettes, tacos et plats de poulet ou de poisson grillé — le tout accompagné de
          burgers, frites, jus naturels et milkshakes maison, dans trois agences réparties dans la ville.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-14 text-center">
        <div className="grid sm:grid-cols-3 gap-8 text-left">
          <div>
            <p className="font-serif italic font-bold text-lg text-bone mb-2">🥩 Viande halal</p>
            <p className="text-mut text-sm leading-relaxed">Tous nos plats sont préparés dans le respect des normes halal.</p>
          </div>
          <div>
            <p className="font-serif italic font-bold text-lg text-bone mb-2">🔥 Préparé à la commande</p>
            <p className="text-mut text-sm leading-relaxed">Chaque plat est préparé au moment de votre commande, pas à l&apos;avance.</p>
          </div>
          <div>
            <p className="font-serif italic font-bold text-lg text-bone mb-2">🚀 Service rapide</p>
            <p className="text-mut text-sm leading-relaxed">Un service pensé pour aller vite, sans sacrifier la qualité.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
