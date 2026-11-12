"use client";

/**
 * CinemaOverlay — tous les textes HTML de l'expérience, pilotés par la
 * progression du scroll. Posé par-dessus le canvas 3D (dans la scène collante).
 *
 * Porté de TextOverlay (projet "theburger") :
 *  - textes réécrits en français pour Akif (voir lib/burger3d/copy.ts)
 *  - aucune donnée inventée (plus de "Michelin", "42g de protéines", etc.)
 *  - boutons réels : "Commander" et "Nos agences" mènent aux vraies sections
 *  - boutons ◀ ▶ pour faire tourner le burger dans le hero
 */

import { motion, AnimatePresence } from "framer-motion";
import { BURGER_CONFIG, BURGER_KEYS, type BurgerKey } from "@/lib/burger3d/config";
import {
  HERO_END,
  OPEN_END,
  STORY_START,
  STORY_END,
  ASSEMBLE_END,
  clamp,
  remapClamped,
  getPhase,
} from "@/lib/burger3d/timeline";
import {
  INGREDIENT_COPY,
  HERO_COPY,
  OPENING_COPY,
  ASSEMBLE_COPY,
  CTA_COPY,
} from "@/lib/burger3d/copy";

function getActiveIngredient(s: number): { key: BurgerKey; t: number } | null {
  if (s < STORY_START || s >= STORY_END) return null;
  const storyT = (s - STORY_START) / (STORY_END - STORY_START);
  const idx = Math.floor(clamp(storyT * BURGER_KEYS.length, 0, BURGER_KEYS.length - 1));
  const t = storyT * BURGER_KEYS.length - idx;
  return { key: BURGER_KEYS[idx], t };
}

interface CinemaOverlayProps {
  progress: number;
  isMobile: boolean;
  onNavigate: (id: string) => void;
  onScrollBy: (px: number) => void;
}

const FLAME = "#F5A623";

function Arrow({ dir }: { dir: "down" | "right" }) {
  return dir === "down" ? (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CinemaOverlay({ progress, isMobile, onNavigate, onScrollBy }: CinemaOverlayProps) {
  const s = progress;
  const phase = getPhase(s);
  const active = getActiveIngredient(s);

  const copy = active ? INGREDIENT_COPY[active.key] : null;
  const cfg = active ? BURGER_CONFIG[active.key] : null;

  // Panneau d'ingrédient : fondu + glissement entrée / sortie
  let panelOpacity = 0;
  let panelTranslateX = -40;
  if (active && active.t >= 0.12) {
    const fadeIn = remapClamped(active.t, 0.12, 0.3, 0, 1);
    const fadeOut = 1 - remapClamped(active.t, 0.7, 0.88, 0, 1);
    panelOpacity = Math.min(fadeIn, fadeOut);
    panelTranslateX = remapClamped(active.t, 0.12, 0.3, -40, 0) + remapClamped(active.t, 0.7, 0.88, 0, -40);
  }
  const showPanel = phase === "story" && !!active && active.t >= 0.12;

  const ctaOpacity = remapClamped(s, ASSEMBLE_END, 1, 0, 1);
  const assembleProgress = remapClamped(s, STORY_END, ASSEMBLE_END, 0, 1);
  const openingOpacity =
    remapClamped(s, HERO_END, OPEN_END, 0, 1) * (1 - remapClamped(s, OPEN_END, STORY_START, 0, 1));

  const heroOpacity = remapClamped(s, 0, HERO_END, 1, 0);

  const rotate = (dir: "left" | "right") => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const c = (window as any).__burgerControls;
    if (c) dir === "left" ? c.rotateLeft() : c.rotateRight();
  };

  const heroButtons = (
    <button
      onClick={() => onScrollBy(window.innerHeight * 0.6)}
      className="cinema-btn-ghost"
      style={{ fontSize: "clamp(10px, 2vw, 11.5px)", padding: "clamp(9px, 2vw, 11px) clamp(18px, 4vw, 24px)" }}
    >
      {HERO_COPY.secondaryCta}
      <Arrow dir="down" />
    </button>
  );

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ opacity: heroOpacity, pointerEvents: s < HERO_END ? "auto" : "none" }}
      >
        <div className="cinema-container h-full flex flex-col justify-between lg:justify-center py-6">
          <div
            className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-0 items-start lg:items-center"
            style={{ paddingTop: isMobile ? "6vh" : "0" }}
          >
            <div
              className="flex flex-col gap-5 text-center lg:text-left items-center lg:items-start"
              style={{ transform: `translateX(${remapClamped(s, 0, HERO_END, 0, -40)}px)` }}
            >
              <p className="cinema-label" style={{ color: FLAME }}>
                {HERO_COPY.eyebrow}
              </p>
              <h1
                className="font-serif italic font-bold leading-none"
                style={{ fontSize: "clamp(34px, 4.4vw, 64px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
              >
                {HERO_COPY.titleLine1}
                <br />
                {HERO_COPY.titleLine2a}
                <br />
                <span style={{ fontStyle: "normal", color: FLAME }}>{HERO_COPY.titleAccent}</span>
              </h1>
              <p
                style={{
                  fontSize: "clamp(13px, 2.5vw, 16px)",
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.72)",
                  maxWidth: 380,
                }}
              >
                {HERO_COPY.sub}
              </p>
              <div className="hidden lg:flex flex-wrap gap-3 pointer-events-auto mt-2" style={{ maxWidth: 330 }}>
                <button onClick={() => onNavigate("menu")} className="cinema-btn" style={{ fontSize: 11.5 }}>
                  {HERO_COPY.primaryCta}
                  <Arrow dir="right" />
                </button>
                <button onClick={() => onScrollBy(window.innerHeight * 0.6)} className="cinema-btn-ghost" style={{ fontSize: 11.5 }}>
                  {HERO_COPY.secondaryCta}
                </button>
              </div>
            </div>

            <div className="hidden lg:block" />

            {/* Faits réels d'Akif (desktop) */}
            <div
              className="hidden xl:flex flex-col items-end gap-10 text-right"
              style={{ transform: `translateX(${remapClamped(s, 0, HERO_END, 0, 40)}px)` }}
            >
              {HERO_COPY.facts.map((f) => (
                <div key={f.value}>
                  <div className="flex items-baseline justify-end gap-2 mb-1">
                    <span style={{ color: FLAME, fontSize: 12 }}>✦</span>
                    <span className="font-serif font-bold" style={{ fontSize: "clamp(16px, 2.2vw, 21px)" }}>
                      {f.value}
                    </span>
                  </div>
                  <div className="cinema-label" style={{ fontSize: 9.5 }}>
                    {f.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile : boutons en bas */}
          <div className="lg:hidden flex flex-col items-center gap-3 pointer-events-auto" style={{ paddingBottom: "5vh" }}>
            <button onClick={() => onNavigate("menu")} className="cinema-btn" style={{ fontSize: 11.5, padding: "11px 24px" }}>
              {HERO_COPY.primaryCta}
              <Arrow dir="right" />
            </button>
            {heroButtons}
          </div>
        </div>

        {/* Rotation manuelle du burger */}
        <div className="absolute bottom-3 lg:bottom-6 left-1/2 -translate-x-1/2 flex gap-3 pointer-events-auto">
          <button onClick={() => rotate("left")} className="cinema-btn-ghost" style={{ padding: 10 }} aria-label="Tourner le burger vers la gauche">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={() => rotate("right")} className="cinema-btn-ghost" style={{ padding: 10 }} aria-label="Tourner le burger vers la droite">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── OUVERTURE ────────────────────────────────────────────── */}
      {(phase === "opening" || phase === "pause") && (
        <div
          className="absolute left-4 sm:left-10 lg:left-20 max-w-[85vw] sm:max-w-md"
          style={{
            top: isMobile ? "12%" : "50%",
            transform: `${isMobile ? "translateY(0)" : "translateY(-50%)"} translateX(${
              remapClamped(s, HERO_END, HERO_END + 0.02, -30, 0) + remapClamped(s, OPEN_END - 0.01, STORY_START, 0, -40)
            }px)`,
            opacity:
              remapClamped(s, HERO_END, HERO_END + 0.02, 0, 1) * (1 - remapClamped(s, OPEN_END, STORY_START, 0, 1)),
          }}
        >
          <div className="flex flex-col gap-4">
            <p className="cinema-label" style={{ color: FLAME }}>
              {OPENING_COPY.eyebrow}
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: "clamp(28px, 6vw, 54px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              {OPENING_COPY.titleLine1}
              <br />
              <em style={{ color: FLAME }}>{OPENING_COPY.titleAccent}</em>
            </h2>
            <p style={{ fontSize: "clamp(12px, 2.5vw, 14px)", lineHeight: 1.6, color: "rgba(255,255,255,0.7)", maxWidth: 280 }}>
              {OPENING_COPY.sub}
            </p>
          </div>
        </div>
      )}

      {/* Indication en bas */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center" style={{ opacity: openingOpacity }}>
        <p className="cinema-label">{OPENING_COPY.hint}</p>
      </div>

      {/* ── PANNEAU D'INGRÉDIENT ─────────────────────────────────── */}
      {showPanel && copy && cfg && active && (
        <div
          key={active.key}
          className="absolute left-0 pointer-events-none flex flex-col"
          style={{
            top: isMobile ? "8%" : "50%",
            transform: `${isMobile ? "translateY(0)" : "translateY(-50%)"} translateX(${panelTranslateX}px)`,
            opacity: panelOpacity,
            maxWidth: "min(340px, 85vw)",
            paddingLeft: "clamp(1rem, 4vw, 4rem)",
            paddingRight: "1rem",
          }}
        >
          <p className="cinema-label mb-2" style={{ color: cfg.color, fontSize: "clamp(9px, 2vw, 10px)" }}>
            {copy.label}
          </p>
          <h2 className="font-serif font-bold leading-none mb-2" style={{ fontSize: "clamp(1.75rem, 5vw, 3.6rem)", letterSpacing: "-0.02em" }}>
            {copy.headline}
          </h2>
          <div
            className="mb-3 origin-left"
            style={{ background: cfg.color, width: "clamp(24px, 8vw, 40px)", height: 2, transform: `scaleX(${panelOpacity})` }}
          />
          <p className="font-semibold uppercase mb-2" style={{ color: cfg.color, fontSize: "clamp(9px, 2vw, 11px)", letterSpacing: "0.14em" }}>
            {copy.sub}
          </p>
          <p className="mb-3" style={{ fontSize: "clamp(12px, 2.2vw, 15px)", lineHeight: 1.55, color: "rgba(255,255,255,0.78)" }}>
            {copy.detail}
          </p>
          <div
            className="inline-flex items-center gap-2 self-start rounded-full"
            style={{
              background: `${cfg.color}1f`,
              border: `1px solid ${cfg.color}40`,
              padding: "clamp(4px, 1vw, 5px) clamp(10px, 2.5vw, 12px)",
            }}
          >
            <div className="rounded-full flex-shrink-0" style={{ background: cfg.color, width: 5, height: 5 }} />
            <span className="font-semibold tracking-wide" style={{ color: cfg.color, fontSize: "clamp(9px, 2vw, 11px)" }}>
              {copy.tag}
            </span>
          </div>
        </div>
      )}

      {/* Compteur à droite pendant l'histoire */}
      <div className="absolute right-4 sm:right-10 lg:right-16 top-0 bottom-0 flex items-center pointer-events-none">
      <AnimatePresence>
        {phase === "story" && active && (
          <motion.div
            key="counter"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col items-end gap-3"
          >
            {BURGER_KEYS.map((k, i) => {
              const idx = BURGER_KEYS.indexOf(active.key);
              const isCurrent = i === idx;
              const isPast = i < idx;
              return (
                <div key={k} className="flex items-center gap-3">
                  <span className="cinema-label" style={{ opacity: isCurrent ? 1 : isPast ? 0.45 : 0.25 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="h-px"
                    style={{
                      width: isCurrent ? 32 : isPast ? 16 : 8,
                      background: isCurrent ? BURGER_CONFIG[k].color : isPast ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.12)",
                    }}
                  />
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* ── RÉASSEMBLAGE ─────────────────────────────────────────── */}
      <AnimatePresence>
        {phase === "assemble" && (
          <motion.div
            key="assemble"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-end pb-16"
          >
            <p className="cinema-label mb-3">{ASSEMBLE_COPY}</p>
            <div className="w-48 h-px bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${assembleProgress * 100}%`, background: `linear-gradient(to right, #E31E27, ${FLAME})` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── APPEL À L'ACTION FINAL ───────────────────────────────── */}
      <div className="absolute inset-0" style={{ opacity: ctaOpacity, pointerEvents: ctaOpacity > 0.5 ? "auto" : "none" }}>
        <div className="cinema-container h-full flex flex-col justify-between py-6 lg:py-0 lg:justify-center">
          {/* Mobile : texte + boutons en haut */}
          <div className="block lg:hidden text-center" style={{ paddingTop: "6vh" }}>
            <p className="cinema-label mb-3" style={{ color: FLAME }}>{CTA_COPY.eyebrow}</p>
            <h2 className="font-serif font-bold leading-none mb-2" style={{ fontSize: "clamp(1.9rem, 7vw, 2.6rem)", letterSpacing: "-0.02em" }}>
              {CTA_COPY.titleLine1}
              <br />
              <em style={{ color: FLAME }}>{CTA_COPY.titleAccent}</em>
            </h2>
            <p className="max-w-xs mx-auto mb-4" style={{ fontSize: "clamp(12px, 3vw, 14px)", lineHeight: 1.5, color: "rgba(255,255,255,0.75)" }}>
              {CTA_COPY.sub}
            </p>
            <div className="flex gap-2 justify-center">
              <button onClick={() => onNavigate("menu")} className="cinema-btn" style={{ fontSize: 11, padding: "10px 18px" }}>
                {CTA_COPY.primary}
                <Arrow dir="right" />
              </button>
              <button onClick={() => onNavigate("a-propos")} className="cinema-btn-ghost" style={{ fontSize: 11, padding: "10px 18px" }}>
                {CTA_COPY.secondary}
              </button>
            </div>
          </div>

          {/* Desktop : grille */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p className="cinema-label mb-5" style={{ color: FLAME }}>{CTA_COPY.eyebrow}</p>
              <h2 className="font-serif font-bold leading-none mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", letterSpacing: "-0.02em" }}>
                {CTA_COPY.titleLine1}
                <br />
                <em style={{ color: FLAME }}>{CTA_COPY.titleAccent}</em>
              </h2>
              <p className="mb-8" style={{ maxWidth: 330, fontSize: "clamp(13px, 2.5vw, 15px)", lineHeight: 1.6, color: "rgba(255,255,255,0.75)" }}>
                {CTA_COPY.sub}
              </p>
              <div className="flex flex-wrap gap-3" style={{ maxWidth: 340 }}>
                <button onClick={() => onNavigate("menu")} className="cinema-btn" style={{ fontSize: 13, padding: "12px 26px" }}>
                  {CTA_COPY.primary}
                  <Arrow dir="right" />
                </button>
                <button onClick={() => onNavigate("a-propos")} className="cinema-btn-ghost" style={{ fontSize: 13, padding: "12px 26px" }}>
                  {CTA_COPY.secondary}
                </button>
              </div>
            </div>

            <div className="hidden xl:flex flex-col items-end justify-center gap-7 text-right">
              {CTA_COPY.stats.map((st) => (
                <div key={st.label}>
                  <div className="font-serif font-bold mb-1" style={{ fontSize: "clamp(1.5rem, 4vw, 2.1rem)", color: FLAME }}>
                    {st.value}
                  </div>
                  <div className="font-semibold mb-1" style={{ fontSize: "clamp(13px, 2.5vw, 16px)" }}>{st.label}</div>
                  <div className="cinema-label" style={{ fontSize: 10 }}>{st.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile : stats en bas */}
          <div className="block lg:hidden" style={{ paddingBottom: "4vh" }}>
            <div className="flex items-start justify-center gap-10 text-center">
              {CTA_COPY.stats.slice(0, 2).map((st) => (
                <div key={st.label}>
                  <div className="font-serif font-bold mb-1" style={{ fontSize: "clamp(1.1rem, 5vw, 1.6rem)", color: FLAME }}>
                    {st.value}
                  </div>
                  <div className="font-semibold" style={{ fontSize: 11, lineHeight: 1.3 }}>{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p
          className="absolute left-0 right-0 text-center px-4"
          style={{ bottom: 6, fontSize: 9.5, color: "rgba(255,255,255,0.4)" }}
        >
          {CTA_COPY.footnote}
        </p>
      </div>

      {/* Barre de progression fine, bord gauche */}
      <div className="absolute left-0 top-0 bottom-0 w-px">
        <div
          className="w-full"
          style={{
            height: `${s * 100}%`,
            background: `linear-gradient(to bottom, #E31E27, ${FLAME})`,
            opacity: phase !== "hero" && phase !== "cta" ? 0.6 : 0,
          }}
        />
      </div>
    </div>
  );
}
