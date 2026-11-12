import { CartItem } from "./cart-context";
import { RESTO_NUMBER, AGENCY_NUMBERS, fmt } from "./menu-data";

export function buildWhatsappUrl({
  cart,
  fulfillMode,
  quartier,
  selectedAgency,
  locationLink,
  nom,
  telephone,
  commentaire,
  promoDiscount,
}: {
  cart: CartItem[];
  fulfillMode: "emporter" | "livraison" | null;
  quartier: string;
  selectedAgency: string | null;
  locationLink?: string | null;
  nom?: string;
  telephone?: string;
  commentaire?: string;
  promoDiscount?: number;
}) {
  const lines = cart
    .map((c) => {
      let l = `${c.qty}x ${c.name}`;
      if (c.accomp) l += ` (${c.accomp})`;
      if (c.supplements.length) l += ` + ${c.supplements.map((s) => s.name).join(", ")}`;
      if (c.instructions) l += ` — "${c.instructions}"`;
      l += ` — ${fmt(c.unitPrice * c.qty)}`;
      return l;
    })
    .join("\n");

  let modeLine = "";
  if (fulfillMode === "emporter") modeLine = "\nMode : À emporter";
  else if (fulfillMode === "livraison") {
    modeLine = `\nMode : Livraison${quartier.trim() ? " — Quartier : " + quartier.trim() : ""}`;
    if (locationLink) modeLine += `\nPosition exacte : ${locationLink}`;
  }
  const agencyLine = selectedAgency ? `\nAgence : ${selectedAgency}` : "";
  const clientLines = [
    nom?.trim() ? `\nNom : ${nom.trim()}` : "",
    telephone?.trim() ? `\nTéléphone : ${telephone.trim()}` : "",
  ].join("");
  const commentLine = commentaire?.trim() ? `\nCommentaire : ${commentaire.trim()}` : "";

  const subtotal = cart.reduce((s, c) => s + c.unitPrice * c.qty, 0);
  const discount = promoDiscount || 0;
  const total = Math.max(0, subtotal - discount);
  const hasUnpricedItem = cart.some((c) => c.unitPrice === 0);

  let totalBlock = `\n\nSous-total : ${fmt(subtotal)}`;
  if (discount > 0) totalBlock += `\nRéduction : -${fmt(discount)}`;
  totalBlock += hasUnpricedItem
    ? `\nTotal (hors articles à prix à confirmer) : ${fmt(total)}`
    : `\nTotal : ${fmt(total)}`;

  const msg = cart.length
    ? `AKIF FAST FOOD — Nouvelle commande\n\n${lines}${agencyLine}${modeLine}${clientLines}${commentLine}${totalBlock}`
    : "Bonjour, je voudrais passer une commande.";

  const targetNumber = (selectedAgency && AGENCY_NUMBERS[selectedAgency]) || RESTO_NUMBER;
  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(msg)}`;
}

export { fmt };
