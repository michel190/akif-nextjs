"use client";

/**
 * Viewer360Scene — le burger complet, assemblé, que l'on fait tourner à la main.
 * (Porté de Viewer360 / Burger / Ingredient du projet "theburger".)
 *
 * Les matériaux sont clonés : la scène cinématique modifie l'opacité de ses
 * matériaux pendant l'animation, ce qui ne doit pas déteindre sur ce viewer.
 */

import { Suspense, useEffect, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import type { Material, Mesh, Object3D } from "three";
import { useGLTFWithKTX2, preloadModels } from "@/lib/burger3d/loader";
import { BURGER_CONFIG, BURGER_KEYS, CAMERA_CONFIG, MODEL_URLS, type BurgerKey } from "@/lib/burger3d/config";
import StudioEnvironment from "./StudioEnvironment";

function StaticIngredient({ ingKey }: { ingKey: BurgerKey }) {
  const cfg = BURGER_CONFIG[ingKey];
  const gltf = useGLTFWithKTX2(`/models/${cfg.model}.glb`);

  const scene = useMemo(() => {
    const clone: Object3D = gltf.scene.clone(true);
    clone.traverse((o: Object3D) => {
      const mesh = o as Mesh;
      if (mesh.isMesh) {
        mesh.frustumCulled = false;
        const m = mesh.material as Material | Material[];
        mesh.material = Array.isArray(m) ? m.map((x) => x.clone()) : m.clone();
      }
    });
    return clone;
  }, [gltf.scene]);

  return (
    <group
      position={[cfg.position.x, cfg.position.y, cfg.position.z]}
      rotation={[cfg.rotation.x, cfg.rotation.y, cfg.rotation.z]}
      scale={[cfg.scale.x, cfg.scale.y, cfg.scale.z]}
    >
      <primitive object={scene} />
    </group>
  );
}

function Preloader() {
  const { gl } = useThree();
  useEffect(() => {
    preloadModels(MODEL_URLS, gl);
  }, [gl]);
  return null;
}

function Ready({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    onReady?.();
  }, [onReady]);
  return null;
}

interface Viewer360SceneProps {
  active: boolean;
  autoRotate: boolean;
  /** Sur écran tactile : zoom au pincement autorisé uniquement en mode actif */
  allowZoom: boolean;
  onReady?: () => void;
}

export default function Viewer360Scene({ active, autoRotate, allowZoom, onReady }: Viewer360SceneProps) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.75]}
    >
      <PerspectiveCamera
        makeDefault
        position={[CAMERA_CONFIG.position.x, CAMERA_CONFIG.position.y, CAMERA_CONFIG.position.z]}
        fov={CAMERA_CONFIG.fov}
        near={CAMERA_CONFIG.near}
        far={CAMERA_CONFIG.far}
      />

      <ambientLight intensity={0.7} color="#f5f5f5" />
      <directionalLight position={[6, 10, 6]} intensity={2.0} color="#ffffff" />
      <directionalLight position={[-6, 6, 4]} intensity={0.9} color="#fdf8f3" />
      <directionalLight position={[0, 2, 12]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-8, 2, -4]} intensity={1.1} color="#E8452D" distance={20} decay={2} />
      <pointLight position={[8, 2, -4]} intensity={1.1} color="#F5A623" distance={20} decay={2} />
      <StudioEnvironment />
      <ContactShadows position={[0, -0.8, 0]} opacity={0.3} scale={10} blur={2.5} far={4} resolution={512} color="#000000" />

      <Preloader />
      <Suspense fallback={null}>
        <group>
          {BURGER_KEYS.map((k) => (
            <StaticIngredient key={k} ingKey={k} />
          ))}
        </group>
        <Ready onReady={onReady} />
      </Suspense>

      <OrbitControls
        target={[0, 2, 0]}
        enablePan={false}
        enableZoom={allowZoom}
        minDistance={4}
        maxDistance={12}
        autoRotate={autoRotate}
        autoRotateSpeed={0.9}
        enableDamping
      />
    </Canvas>
  );
}
