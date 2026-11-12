/**
 * Tous les textes de l'expérience 3D, en un seul endroit — faciles à modifier.
 *
 * ⚠️ Règle : uniquement des descriptions et des faits vrais pour Akif
 * (3 agences, commande WhatsApp, préparé à la commande, halal — déjà affirmés
 * sur le site). Pas de chiffres ou de labels inventés (pas de "Michelin",
 * pas de "grain-fed", pas de grammes de protéines, etc.).
 */

import type { BurgerKey } from "./config";

export interface IngredientCopy {
  label: string;
  headline: string;
  sub: string;
  detail: string;
  tag: string;
}

export const INGREDIENT_COPY: Record<BurgerKey, IngredientCopy> = {
  topBun: {
    label: "Couche 01",
    headline: "Le chapeau",
    sub: "Pain du dessus",
    detail: "Doré et moelleux, il referme le burger et garde toute la chaleur à l'intérieur.",
    tag: "Moelleux",
  },
  lettuce: {
    label: "Couche 02",
    headline: "La fraîcheur",
    sub: "Laitue",
    detail: "Une touche verte et croquante qui allège les couches chaudes.",
    tag: "Croquante",
  },
  tomato: {
    label: "Couche 03",
    headline: "L'acidulé",
    sub: "Tomate",
    detail: "Juteuse et légèrement acidulée, elle équilibre la richesse du fromage et de la viande.",
    tag: "Juteuse",
  },
  cheese: {
    label: "Couche 04",
    headline: "Le fondant",
    sub: "Fromage",
    detail: "Posé sur la viande encore chaude, il fond et lie toutes les saveurs.",
    tag: "Fondant",
  },
  patty: {
    label: "Couche 05",
    headline: "Le cœur",
    sub: "Viande",
    detail: "Le centre du burger : grillée, généreuse, c'est elle qui fait toute la différence.",
    tag: "Viande halal",
  },
  pickles: {
    label: "Couche 06",
    headline: "Le peps",
    sub: "Cornichons",
    detail: "Un petit croquant acidulé qui relève chaque bouchée.",
    tag: "Acidulé",
  },
  onions: {
    label: "Couche 07",
    headline: "La douceur",
    sub: "Oignons",
    detail: "Parfumés et tendres, ils apportent la rondeur qui termine le goût.",
    tag: "Parfumés",
  },
  bottomBun: {
    label: "Couche 08",
    headline: "La base",
    sub: "Pain du dessous",
    detail: "Il porte tout le reste sans jamais céder. Le héros discret du burger.",
    tag: "Solide",
  },
};

export const HERO_COPY = {
  eyebrow: "Akif Fast Food · Lomé",
  titleLine1: "Le goût qui",
  titleLine2a: "vous fait",
  titleAccent: "revenir.",
  sub: "Poulet, burgers, chawarma, pizza et viande grillée — préparés vite, servis généreux.",
  primaryCta: "Commander maintenant",
  secondaryCta: "Voir la composition",
  facts: [
    { value: "3 agences à Lomé", sub: "Dékon · Avénou · Agoè" },
    { value: "Commande WhatsApp", sub: "Directe, en quelques clics" },
    { value: "Préparé à la commande", sub: "Chaque plat, à la minute" },
  ],
};

export const OPENING_COPY = {
  eyebrow: "— Ouverture",
  titleLine1: "Découvrez",
  titleAccent: "les couches",
  sub: "Chaque ingrédient trouve sa place, de haut en bas.",
  hint: "Faites défiler pour ouvrir le burger",
};

export const ASSEMBLE_COPY = "— On referme le burger";

export const CTA_COPY = {
  eyebrow: "— À vous de jouer",
  titleLine1: "Faim ?",
  titleAccent: "Commandez.",
  sub: "Choisissez vos plats, ajoutez-les au panier, envoyez la commande sur WhatsApp.",
  primary: "Voir le menu",
  secondary: "Nos agences",
  stats: [
    { value: "8", label: "Couches", detail: "Du pain au pain" },
    { value: "3", label: "Agences", detail: "Dékon · Avénou · Agoè" },
    { value: "WhatsApp", label: "Commande directe", detail: "Panier → message prêt" },
  ],
  footnote: "Illustration 3D — la composition varie selon le burger choisi.",
};

export const SKIP_LABEL = "Passer l'animation ↓ Menu";

export const VIEWER_COPY = {
  eyebrow: "— Vue 360°",
  titleLine1: "Tous les angles.",
  titleAccent: "Tous les détails.",
  hint: "Glissez pour tourner · Molette ou pincez pour zoomer",
  autoOff: "Rotation auto",
  autoOn: "Rotation auto activée",
  pills: ["Rotation 360°", "Zoom", "Glisser-déposer"],
};
