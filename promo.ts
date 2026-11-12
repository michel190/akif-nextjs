export type PromoCode = {
  code: string;
  type: "percentage" | "fixed";
  amount: number; // % si "percentage", montant FCFA si "fixed"
  minAmount?: number; // montant minimum du panier pour que le code s'applique
  expiresAt?: string; // format ISO, ex: "2026-12-31"
};

// ⚠️ Aucun code promo actif pour l'instant — liste vide volontairement.
// Ajoute ici de vrais codes une fois qu'Akif en définit (ex: { code: "BIENVENUE10", type: "percentage", amount: 10 }).
export const ACTIVE_PROMO_CODES: PromoCode[] = [];

export function validatePromoCode(
  input: string,
  cartTotal: number
): { valid: boolean; discount: number; message: string } {
  const code = ACTIVE_PROMO_CODES.find((c) => c.code.toLowerCase() === input.trim().toLowerCase());

  if (!code) {
    return { valid: false, discount: 0, message: "Code promo invalide." };
  }
  if (code.expiresAt && new Date(code.expiresAt) < new Date()) {
    return { valid: false, discount: 0, message: "Ce code promo a expiré." };
  }
  if (code.minAmount && cartTotal < code.minAmount) {
    return { valid: false, discount: 0, message: `Ce code s'applique à partir de ${code.minAmount.toLocaleString("fr-FR")} FCFA d'achat.` };
  }

  const discount = code.type === "percentage" ? Math.round((cartTotal * code.amount) / 100) : code.amount;
  return { valid: true, discount, message: `Code appliqué : -${discount.toLocaleString("fr-FR")} FCFA` };
}
