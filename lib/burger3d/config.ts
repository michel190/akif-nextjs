/**
 * Configuration de la scène 3D du burger (portée du projet "theburger").
 *
 * Les positions / rotations / échelles ont été réglées à la main dans le
 * projet d'origine : NE LES MODIFIEZ PAS sans tester visuellement.
 *
 * Les fichiers .glb sont dans /public/models (déjà compressés en KTX2).
 * `model` = nom du fichier sans extension.
 */

import { Vector3, Euler } from "three";

export interface IngredientConfig {
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
  explodedPosition: Vector3;
  /** nom du fichier dans /public/models (sans .glb) */
  model: string;
  /** couleur d'accent utilisée par le texte pendant l'étape de l'ingrédient */
  color: string;
}

export const BURGER_KEYS = [
  "topBun",
  "lettuce",
  "tomato",
  "cheese",
  "patty",
  "pickles",
  "onions",
  "bottomBun",
] as const;

export type BurgerKey = (typeof BURGER_KEYS)[number];

export const BURGER_CONFIG: Record<BurgerKey, IngredientConfig> = {
  topBun: {
    position: new Vector3(0.0759, 2.2519, 0.0898),
    rotation: new Euler(-0.3563, 0.7054, 0.2331),
    scale: new Vector3(0.4, 0.4, 0.4),
    explodedPosition: new Vector3(0, 6, 0),
    model: "top-bun",
    color: "#F5A623",
  },
  lettuce: {
    position: new Vector3(0, 3.137, 0.0996),
    rotation: new Euler(0.193, 0.06, 3.088),
    scale: new Vector3(0.4, 0.4, 0.4),
    explodedPosition: new Vector3(0, 4.5, 0),
    model: "lettuce",
    color: "#90EE90",
  },
  tomato: {
    position: new Vector3(-0.0436, 1.7618, 0.2795),
    rotation: new Euler(-0.5132, -0.0256, -0.0016),
    scale: new Vector3(0.31, 0.31, 0.31),
    explodedPosition: new Vector3(0, 3.2, 0),
    model: "tomato",
    color: "#FF6347",
  },
  cheese: {
    position: new Vector3(-0.0141, 1.9596, 0.0232),
    rotation: new Euler(-0.0009, 0, 0),
    scale: new Vector3(0.36, 0.36, 0.36),
    explodedPosition: new Vector3(0, 2.2, 0),
    model: "cheese",
    color: "#FFD700",
  },
  patty: {
    position: new Vector3(-0.02, 1.1479, 0.3262),
    rotation: new Euler(-0.4643, -0.1723, -0.0424),
    scale: new Vector3(0.35, 0.35, 0.35),
    explodedPosition: new Vector3(0, 1.2, 0),
    model: "patty",
    color: "#C97B4A",
  },
  pickles: {
    position: new Vector3(-0.1, 1.2285, 0.0099),
    rotation: new Euler(-0.2469, 0, 0),
    scale: new Vector3(0.34, 0.17, 0.44),
    explodedPosition: new Vector3(0, 0.2, 0),
    model: "pickles",
    color: "#9ACD32",
  },
  onions: {
    position: new Vector3(0, 0.9232, 0.1),
    rotation: new Euler(-0.3763, 0.0024, 0.0593),
    scale: new Vector3(0.35, 0.3, 0.51),
    explodedPosition: new Vector3(0, -0.3, 0),
    model: "onions",
    color: "#DEB887",
  },
  bottomBun: {
    position: new Vector3(-0.06, 1.7263, -0.2105),
    rotation: new Euler(2.8724, 0, 0),
    scale: new Vector3(0.39, 0.39, 0.39),
    explodedPosition: new Vector3(0, -1.5, 0),
    model: "top-bun", // même modèle que le pain du dessus, retourné
    color: "#F5A623",
  },
};

/** Liste unique des fichiers à charger (le pain est partagé : 7 fichiers, pas 8). */
export const MODEL_URLS: string[] = Array.from(
  new Set(BURGER_KEYS.map((k) => `/models/${BURGER_CONFIG[k].model}.glb`))
);

// Caméra — réglée pour un burger centré autour de y ≈ 2.0
export const CAMERA_CONFIG = {
  position: new Vector3(0, 2.0, 8),
  fov: 42,
  near: 0.1,
  far: 1000,
};
