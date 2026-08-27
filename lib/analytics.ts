// Système de tracking léger, sans service tiers payant.
// Pousse les événements vers window.dataLayer (standard, compatible Google
// Analytics/Google Tag Manager si un jour installé), et logue en console en
// développement. Aucune donnée personnelle n'est envoyée automatiquement.

type AnalyticsEvent =
  | "whatsapp_click"
  | "add_to_cart"
  | "remove_from_cart"
  | "begin_checkout"
  | "select_agency"
  | "view_product";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[analytics]", event, data);
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}
