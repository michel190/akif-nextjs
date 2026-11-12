"use client";

/**
 * CinemaSection — le "hero 3D" complet d'Akif.
 *
 * Structure :
 *   <section>  (haute de TOTAL_SCREENS écrans : c'est elle qui crée la distance de scroll)
 *     <div sticky>  (la "scène" : reste collée à l'écran, sous l'en-tête, pendant tout le scroll)
 *        canvas 3D  +  textes (CinemaOverlay)
 *
 * Contrairement au projet burger d'origine (canvas fixé sur TOUTE la page), la
 * scène est confinée à cette section : le menu, le panier et le reste du site
 * s'affichent normalement en dessous.
 *
 * - Défilement fluide (Lenis) actif uniquement tant que cette section est à l'écran
 * - Rendu 3D mis en pause quand la section n'est pas visible (batterie / GPU)
 * - Bouton "Passer l'animation" toujours disponible
 * - Si la 3D plante ou ne charge pas : la section se réduit à un écran avec un bouton Menu
 */

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import CinemaOverlay from "./CinemaOverlay";
import SceneBoundary from "./SceneBoundary";
import { getLoadFraction, subscribeLoadProgress } from "@/lib/burger3d/loader";
import { TOTAL_SCREENS, clamp } from "@/lib/burger3d/timeline";
import { SKIP_LABEL } from "@/lib/burger3d/copy";

const CinemaScene = dynamic(() => import("./CinemaScene"), { ssr: false, loading: () => null });

/** Hauteur de l'en-tête sticky d'Akif (h-20 = 5rem = 80px). */
const HEADER_OFFSET = 80;

// ─── Pastille de chargement (ne bloque pas le texte ni les boutons) ───────────

function LoadPill({ visible }: { visible: boolean }) {
  const fraction = useSyncExternalStore(subscribeLoadProgress, getLoadFraction, () => 0);
  return (
    <AnimatePresence>
      {visible && (
        <div className="absolute inset-x-0 top-[46%] z-30 pointer-events-none flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex flex-col items-center gap-2"
            role="status"
            aria-live="polite"
          >
            <div className="w-40 h-[3px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-300"
                style={{ width: `${Math.max(6, fraction * 100)}%`, background: "linear-gradient(to right,#E31E27,#F5A623)" }}
              />
            </div>
            <span className="cinema-label">Chargement du burger 3D… {Math.round(fraction * 100)}%</span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function CinemaSection() {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);

  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // true pendant un défilement programmé (bouton "Commander"…) : Lenis ne doit pas
  // être arrêté en cours de route quand la section quitte l'écran.
  const [navigating, setNavigating] = useState(false);

  // Mobile ?
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Section visible à l'écran ? (avec une marge pour anticiper)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "200px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Progression du scroll → ref (pour la scène) + state (pour les textes)
  const compute = useCallback(() => {
    const el = containerRef.current;
    const stage = stageRef.current;
    if (!el || !stage) return;
    const rect = el.getBoundingClientRect();
    const total = el.offsetHeight - stage.offsetHeight;
    const p = total > 0 ? clamp((HEADER_OFFSET - rect.top) / total, 0, 1) : 0;
    progressRef.current = p;
    setProgress((prev) => (Math.abs(prev - p) > 0.0003 ? p : prev));
  }, []);

  useEffect(() => {
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [compute, failed]);

  // Défilement fluide (Lenis), uniquement quand la section est à l'écran
  const lenisActive = (inView || navigating) && !failed;
  useEffect(() => {
    if (!lenisActive) return;
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Ne pas détourner le scroll dans le panier / la fenêtre produit (éléments "fixed")
      prevent: (node: HTMLElement) => !!node.closest(".fixed"),
    });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [lenisActive]);

  const scrollToY = useCallback((y: number) => {
    const lenis = lenisRef.current;
    if (lenis) {
      setNavigating(true);
      lenis.scrollTo(y, { duration: 1.4, onComplete: () => setNavigating(false) });
      // filet de sécurité : si l'utilisateur interrompt l'animation, onComplete n'est jamais appelé
      window.setTimeout(() => setNavigating(false), 2600);
    } else {
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  const onNavigate = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      scrollToY(el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET + 1);
    },
    [scrollToY]
  );

  const onScrollBy = useCallback((px: number) => scrollToY(window.scrollY + px), [scrollToY]);

  const handleReady = useCallback(() => setReady(true), []);
  const handleError = useCallback(() => setFailed(true), []);

  return (
    <section
      ref={containerRef}
      aria-label="Découvrez la composition d'un burger Akif"
      className="cinema-root relative isolate"
      style={{
        height: failed ? "var(--stage-h)" : `calc(var(--stage-h) * ${TOTAL_SCREENS})`,
        background: "#141010",
      }}
    >
      <div ref={stageRef} className="cinema-stage overflow-hidden text-white">
        {/* Lueur chaude derrière le burger */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, rgba(245,166,35,0.13) 0%, rgba(227,30,39,0.05) 40%, transparent 70%)",
          }}
        />

        {!failed && (
          <SceneBoundary onError={handleError}>
            <CinemaScene progress={progressRef} active={inView} onReady={handleReady} />
          </SceneBoundary>
        )}

        {failed ? (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 px-6 text-center">
            <p className="font-serif italic font-bold text-3xl sm:text-5xl">
              Le goût qui vous fait <span style={{ color: "#F5A623", fontStyle: "normal" }}>revenir.</span>
            </p>
            <p className="text-white/70 max-w-sm text-sm">
              La présentation 3D n&apos;a pas pu se charger sur cet appareil. Le menu reste disponible juste en dessous.
            </p>
            <button onClick={() => onNavigate("menu")} className="cinema-btn">
              Voir le menu ↓
            </button>
          </div>
        ) : (
          <>
            <CinemaOverlay progress={progress} isMobile={isMobile} onNavigate={onNavigate} onScrollBy={onScrollBy} />
            <LoadPill visible={!ready && inView} />

            {/* Raccourci : aller directement au menu */}
            <button
              onClick={() => onNavigate("menu")}
              className="cinema-btn-ghost absolute top-3 right-3 sm:right-6 z-30"
              style={{ fontSize: 10, padding: "7px 14px", opacity: progress > 0.9 ? 0 : 1, pointerEvents: progress > 0.9 ? "none" : "auto" }}
            >
              {SKIP_LABEL}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
