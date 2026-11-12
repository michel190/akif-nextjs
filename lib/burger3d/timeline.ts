/**
 * Chronologie du scroll (progression 0 → 1) partagée par la scène 3D et le
 * texte superposé, pour que les deux restent synchronisés.
 *
 *  0.00 – 0.04  Hero : le burger tourne
 *  0.04 – 0.10  Le burger s'ouvre légèrement
 *  0.10 – 0.12  Pause
 *  0.12 – 0.88  Histoire : 8 ingrédients, un par un
 *  0.88 – 0.90  Réassemblage
 *  0.90 – 1.00  Appel à l'action final
 */

export const HERO_END = 0.04;
export const OPEN_END = 0.1;
export const STORY_START = 0.12;
export const STORY_END = 0.88;
export const ASSEMBLE_END = 0.9;

/**
 * Hauteur totale de la section, en "écrans" de défilement.
 * Valeur d'origine du projet burger : 30. Réduite pour un site de commande
 * (le client veut commander, pas scroller 30 écrans). Plus petit = plus rapide.
 */
export const TOTAL_SCREENS = 22;

export function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function remap(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return outMin + ((v - inMin) / (inMax - inMin)) * (outMax - outMin);
}

export function remapClamped(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return clamp(remap(v, inMin, inMax, outMin, outMax), Math.min(outMin, outMax), Math.max(outMin, outMax));
}

export type Phase = "hero" | "opening" | "pause" | "story" | "assemble" | "cta";

export function getPhase(s: number): Phase {
  if (s < HERO_END) return "hero";
  if (s < OPEN_END) return "opening";
  if (s < STORY_START) return "pause";
  if (s < STORY_END) return "story";
  if (s < ASSEMBLE_END) return "assemble";
  return "cta";
}
