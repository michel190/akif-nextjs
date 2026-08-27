// Nettoyage basique des entrées texte libres (nom, commentaire, quartier...).
// Supprime les caractères de contrôle et limite la longueur, en défense en
// profondeur — même si encodeURIComponent() protège déjà le lien WhatsApp
// et que React échappe déjà tout affichage à l'écran (pas d'innerHTML brut).
export function sanitizeText(input: string, maxLength = 200): string {
  return input
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .slice(0, maxLength)
    .trim();
}
