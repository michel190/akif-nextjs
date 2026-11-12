"use client";

/**
 * Hero3D — choisit entre l'expérience 3D complète et le hero classique (image).
 *
 * Le choix est fait par un petit script inline AVANT l'affichage (voir
 * app/layout.tsx) qui pose <html data-cinema="1|0">. Le CSS (globals.css)
 * masque le hero classique tout de suite quand la 3D est prévue → pas de
 * clignotement. Sans JavaScript, le hero classique (avec son texte, utile
 * pour le référencement) reste affiché.
 *
 * Le hero classique est conservé pour : réseau lent / économiseur de données,
 * "réduire les animations", WebGL absent, mémoire très faible, et si la 3D échoue.
 */

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import { cinemaEnabled } from "@/lib/burger3d/capability";

function CinemaPlaceholder() {
  return (
    <div
      className="cinema-placeholder cinema-root flex items-center justify-center"
      style={{ height: "var(--stage-h)", background: "#141010" }}
      aria-hidden
    >
      <span className="cinema-label">Chargement…</span>
    </div>
  );
}

const CinemaSection = dynamic(() => import("./CinemaSection"), {
  ssr: false,
  loading: () => <CinemaPlaceholder />,
});

export default function Hero3D() {
  const [mode, setMode] = useState<"pending" | "3d" | "classic">("pending");

  useEffect(() => {
    setMode(cinemaEnabled() ? "3d" : "classic");
  }, []);

  return (
    <div id="top">
      {mode === "3d" ? (
        <CinemaSection />
      ) : (
        <>
          <div className="hero-classic">
            <Hero />
          </div>
          {mode === "pending" && <CinemaPlaceholder />}
        </>
      )}
    </div>
  );
}
