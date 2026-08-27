"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  // Parallaxe liée au scroll : le burger dérive légèrement pendant qu'on
  // défile la page, en plus de l'inclinaison à la souris et du flottement.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = imgWrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 22, y: -y * 22 });
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-[85vh] overflow-hidden bg-bg flex items-center py-16 sm:py-20"
      style={{ perspective: "1600px" }}
    >
      {/* ---- Formes géométriques décoratives (inspirées du style repéré) ---- */}
      <div className="absolute top-10 right-8 sm:right-16 w-40 h-40 sm:w-56 sm:h-56 border border-flame/30 rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-flame rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-red rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-4 items-center w-full">
        {/* ---- Colonne texte ---- */}
        <div>
          {/* Logo mis en avant */}
          <div className="flex items-center gap-3 mb-8">
            <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-2xl flex-shrink-0">
              <span className="absolute -top-1.5 -right-1.5 text-lg">🔥</span>
              <span className="font-serif italic font-bold text-red text-xl leading-none">
                Ak<span className="lowercase">if</span>
              </span>
            </span>
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-bold text-mut tracking-[0.25em]">ETS.</span>
              <span className="font-serif italic font-bold text-bone text-xl -mt-0.5">Fast Food</span>
            </div>
          </div>

          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-flame mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-flame" /> Spécialités libanaises — Lomé
          </span>

          <h1 className="font-serif italic font-bold text-5xl sm:text-6xl leading-[0.98] text-bone">
            Le goût qui
            <br />
            vous fait <span className="text-red not-italic">revenir.</span>
          </h1>

          <p className="mt-5 text-bone/70 text-lg max-w-md">
            Poulet, burgers, chawarma, pizza et viande grillée — préparés vite, servis généreux.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 bg-red hover:bg-red-deep text-white font-bold px-8 py-4 rounded-full transition-colors"
            >
              Commander maintenant ↓
            </a>
            <a
              href="tel:+22892182424"
              className="inline-flex items-center gap-2 border border-bone/20 hover:border-bone/40 text-bone font-semibold px-6 py-4 rounded-full transition-colors text-sm"
            >
              📞 Appeler
            </a>
          </div>
        </div>

        {/* ---- Colonne image (licence stock achetée) avec vraie bascule 3D au survol ---- */}
        <motion.div style={{ y: parallaxY }} className="relative">
        <div
          ref={imgWrapRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => { setHovering(false); setTilt({ x: 0, y: 0 }); }}
          className="relative flex items-center justify-center min-h-[420px] sm:min-h-[520px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Halo premium derrière l'image */}
          <div className="absolute inset-0 bg-gradient-to-br from-flame/25 via-red/15 to-transparent blur-[90px] rounded-full" />
          <div className="absolute w-[85%] h-[85%] rounded-full border border-flame/20" />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div
              style={{
                transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${hovering ? 1.06 : 1})`,
                transition: "transform .15s ease-out",
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src="/burger-hero.png"
                alt="Burger Akif Fast Food"
                className="w-full h-auto max-w-lg sm:max-w-xl mx-auto"
                style={{ filter: "drop-shadow(0 35px 45px rgba(20,15,10,0.28))" }}
              />
            </div>
          </motion.div>

          {/* Badge flottant */}
          <div className="absolute bottom-2 left-0 sm:left-4 bg-flame text-ink rounded-2xl px-6 py-5 shadow-2xl rotate-[-4deg] border-2 border-ink z-10">
            <p className="text-[11px] uppercase tracking-[0.2em] opacity-70 font-semibold">Depuis 1998</p>
            <p className="font-serif italic font-bold text-lg sm:text-xl leading-tight mt-1">
              Fast Food
              <br />
              Libanais
            </p>
          </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
}
