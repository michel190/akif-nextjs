"use client";

/**
 * Viewer360 — section "Vue 360°" : le burger complet que l'on fait tourner.
 *
 * - N'apparaît que sur les appareils qui font tourner l'expérience 3D
 *   (même verdict que le hero : réseau rapide, WebGL, pas de "réduire animations")
 * - Le canvas n'est monté que lorsque la section approche de l'écran, et mis
 *   en pause dès qu'elle en sort
 * - Écran tactile : le viewer ne capte les doigts qu'après un appui
 *   ("Toucher pour tourner"), pour ne jamais bloquer le défilement de la page
 * - Pas de zoom à la molette (il piégerait le scroll de la page)
 */

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import SceneBoundary from "./SceneBoundary";
import { cinemaEnabled } from "@/lib/burger3d/capability";
import { VIEWER_COPY } from "@/lib/burger3d/copy";

const Viewer360Scene = dynamic(() => import("./Viewer360Scene"), { ssr: false, loading: () => null });

export default function Viewer360() {
  const sectionRef = useRef<HTMLElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [near, setNear] = useState(false); // monter le canvas
  const [visible, setVisible] = useState(false); // le faire tourner
  const [ready, setReady] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isTouch, setIsTouch] = useState(false);
  const [touchActive, setTouchActive] = useState(false);

  useEffect(() => {
    setEnabled(cinemaEnabled());
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!enabled || !el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "500px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  if (!enabled) return null;

  const interactive = !isTouch || touchActive;

  return (
    <section
      id="vue-360"
      ref={sectionRef}
      className="relative text-white overflow-hidden"
      style={{ background: "#141010" }}
      aria-label="Vue 360° du burger"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-6">
        <p className="cinema-label mb-4" style={{ color: "#F5A623" }}>
          {VIEWER_COPY.eyebrow}
        </p>
        <h2 className="font-serif font-bold leading-none" style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", letterSpacing: "-0.02em" }}>
          {VIEWER_COPY.titleLine1}
          <br />
          <em style={{ color: "#F5A623" }}>{VIEWER_COPY.titleAccent}</em>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">
        <div
          className="relative w-full rounded-3xl overflow-hidden"
          style={{
            height: "min(70vh, 640px)",
            minHeight: 380,
            background: "#1b1613",
            border: "1px solid rgba(255,255,255,0.07)",
            touchAction: interactive ? "none" : "pan-y",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(245,166,35,0.12) 0%, transparent 70%)" }}
          />

          {near && (
            <div className="absolute inset-0">
              <SceneBoundary onError={() => setEnabled(false)}>
                <Viewer360Scene
                  active={visible}
                  autoRotate={autoRotate && interactive}
                  allowZoom={isTouch && touchActive}
                  onReady={() => setReady(true)}
                />
              </SceneBoundary>
            </div>
          )}

          {!ready && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="cinema-label">Chargement du burger 3D…</span>
            </div>
          )}

          {/* Écran tactile : on n'attrape les doigts qu'après un appui */}
          {isTouch && !touchActive && (
            <button
              onClick={() => setTouchActive(true)}
              className="absolute inset-0 z-10 flex items-end justify-center pb-20 cursor-pointer"
              style={{ touchAction: "pan-y", background: "transparent" }}
              aria-label="Activer la rotation du burger"
            >
              <span className="cinema-btn" style={{ fontSize: 11 }}>
                Toucher pour tourner le burger
              </span>
            </button>
          )}

          {/* Barre de commandes */}
          <div
            className="absolute bottom-0 inset-x-0 px-4 sm:px-8 py-4 flex items-center justify-between gap-3 z-20 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(10,8,7,0.85), transparent)" }}
          >
            <p className="cinema-label hidden sm:block">
              {isTouch ? "Glissez pour tourner · Pincez pour zoomer" : "Glissez pour tourner le burger"}
            </p>
            <div className="flex gap-2 ml-auto pointer-events-auto">
              {isTouch && touchActive && (
                <button onClick={() => setTouchActive(false)} className="cinema-btn-ghost" style={{ fontSize: 10, padding: "7px 14px" }}>
                  Terminer
                </button>
              )}
              <button
                onClick={() => setAutoRotate((v) => !v)}
                className="cinema-btn-ghost flex items-center gap-2"
                style={{ fontSize: 10, padding: "7px 14px" }}
                aria-pressed={autoRotate}
              >
                <span
                  className="rounded-full"
                  style={{
                    width: 6,
                    height: 6,
                    background: autoRotate ? "#F5A623" : "rgba(255,255,255,0.3)",
                    boxShadow: autoRotate ? "0 0 6px #F5A623" : "none",
                  }}
                />
                {autoRotate ? VIEWER_COPY.autoOn : VIEWER_COPY.autoOff}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6 justify-center">
          {VIEWER_COPY.pills.map((f) => (
            <span
              key={f}
              className="cinema-label px-4 py-2 rounded-full"
              style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
