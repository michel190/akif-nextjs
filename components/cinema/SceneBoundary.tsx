"use client";

import { Component, type ReactNode } from "react";

/**
 * Filet de sécurité autour d'un canvas 3D : si le chargement des modèles ou le
 * rendu échoue (réseau coupé, WebGL qui plante, mémoire insuffisante…), l'erreur
 * est capturée ici au lieu de faire tomber toute la page.
 */
export default class SceneBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error("[3D] La scène a échoué", error);
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
