import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-center px-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-flame mb-4">Erreur 404</p>
        <h1 className="font-serif italic font-bold text-4xl text-bone mb-4">Cette page n&apos;existe pas.</h1>
        <p className="text-mut mb-8">Elle a peut-être été déplacée ou n&apos;a jamais existé.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="bg-red hover:bg-red-deep text-white font-bold px-7 py-3.5 rounded-full transition-colors">
            Retour à l&apos;accueil
          </Link>
          <Link href="/#menu" className="border border-line text-bone font-semibold px-7 py-3.5 rounded-full hover:bg-panel transition-colors">
            Voir le menu
          </Link>
        </div>
      </div>
    </div>
  );
}
