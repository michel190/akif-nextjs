"use client";

import { Environment, Lightformer } from "@react-three/drei";

/**
 * Environnement "studio" fabriqué localement avec des panneaux lumineux.
 * Remplace <Environment preset="studio"/> du projet d'origine, qui téléchargeait
 * une image HDR depuis un CDN externe (bloqué par la CSP du site, et dépendant
 * d'un serveur tiers). Ici : zéro requête réseau.
 */
export default function StudioEnvironment({ intensity = 0.6 }: { intensity?: number }) {
  return (
    <Environment resolution={256} frames={1} environmentIntensity={intensity}>
      <color attach="background" args={["#0d0b0a"]} />
      {/* grande boîte à lumière au-dessus */}
      <Lightformer form="rect" intensity={3} position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[14, 8, 1]} color="#ffffff" />
      {/* panneaux latéraux */}
      <Lightformer form="rect" intensity={2} position={[-7, 2, 3]} rotation={[0, Math.PI / 2.4, 0]} scale={[8, 6, 1]} color="#fff4e6" />
      <Lightformer form="rect" intensity={2} position={[7, 2, 3]} rotation={[0, -Math.PI / 2.4, 0]} scale={[8, 6, 1]} color="#ffe9cc" />
      {/* face avant, douce */}
      <Lightformer form="rect" intensity={1.2} position={[0, 2, 9]} rotation={[0, Math.PI, 0]} scale={[10, 5, 1]} color="#ffffff" />
      {/* reflets chauds à l'arrière (rouge Akif / flamme) */}
      <Lightformer form="circle" intensity={2.5} position={[-6, 2, -5]} scale={4} color="#E31E27" />
      <Lightformer form="circle" intensity={2.5} position={[6, 2, -5]} scale={4} color="#F5A623" />
    </Environment>
  );
}
