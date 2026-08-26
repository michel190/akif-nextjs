import { CartItem } from "./cart-context";
import { RESTO_NUMBER, AGENCY_NUMBERS, fmt } from "./menu-data";

export function buildWhatsappUrl({
  cart,
  fulfillMode,
  quartier,
  selectedAgency,
  locationLink,
}: {
  cart: CartItem[];
  fulfillMode: "emporter" | "livraison" | null;
  quartier: string;
  selectedAgency: string | null;
  locationLink?: string | null;
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

  const total = cart.reduce((s, c) => s + c.unitPrice * c.qty, 0);
  const hasUnpricedItem = cart.some((c) => c.unitPrice === 0);
  const totalLine = hasUnpricedItem
    ? `\n\nTotal (hors articles à prix à confirmer) : ${fmt(total)}`
    : `\n\nTotal : ${fmt(total)}`;

  const msg = cart.length
    ? `Bonjour, je voudrais commander :\n\n${lines}${agencyLine}${modeLine}${totalLine}`
    : "Bonjour, je voudrais passer une commande.";

  const targetNumber = (selectedAgency && AGENCY_NUMBERS[selectedAgency]) || RESTO_NUMBER;
  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(msg)}`;
}

export { fmt };
