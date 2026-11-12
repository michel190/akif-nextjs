"use client";

/**
 * Chargeur de modèles GLB avec textures KTX2 (compression Basis Universal).
 *
 * - Fonctionne avec React Suspense (le hook "suspend" tant que le modèle charge)
 * - Cache par URL : un modèle n'est téléchargé qu'une seule fois
 * - preloadModels() lance TOUS les téléchargements en parallèle (sinon React 18
 *   charge les 7 modèles l'un après l'autre)
 * - Petit "store" de progression pour afficher une vraie barre de chargement
 *
 * Le transcodeur Basis est servi depuis /basis/ (fichiers dans /public/basis).
 */

import { useThree } from "@react-three/fiber";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { WebGLRenderer } from "three";

// `any` volontaire : évite les conflits de types entre three et three-stdlib
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GLTFResult = any;

const gltfCache = new Map<string, GLTFResult>();
const loadingPromises = new Map<string, Promise<GLTFResult>>();
const failures = new Map<string, Error>();

let ktx2Loader: KTX2Loader | null = null;

function getKTX2Loader(renderer: WebGLRenderer): KTX2Loader {
  if (!ktx2Loader) {
    ktx2Loader = new KTX2Loader();
    ktx2Loader.setTranscoderPath("/basis/");
    ktx2Loader.detectSupport(renderer);
  }
  return ktx2Loader;
}

// ─── Progression globale du chargement ────────────────────────────────────────

type Progress = { loaded: number; total: number };
const progressByUrl = new Map<string, Progress>();
const listeners = new Set<() => void>();
let expectedFiles = 0;

function emit() {
  listeners.forEach((l) => l());
}

/** Fraction 0 → 1 de l'ensemble des modèles attendus (selon les octets reçus). */
export function getLoadFraction(): number {
  if (expectedFiles === 0) return 0;
  let sum = 0;
  progressByUrl.forEach((p, url) => {
    if (gltfCache.has(url)) sum += 1;
    else if (p.total > 0) sum += Math.min(p.loaded / p.total, 0.99);
  });
  return Math.min(sum / expectedFiles, 1);
}

export function subscribeLoadProgress(cb: () => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

// ─── Chargement ───────────────────────────────────────────────────────────────

function loadGLTF(url: string, gl: WebGLRenderer): Promise<GLTFResult> {
  const cached = gltfCache.get(url);
  if (cached) return Promise.resolve(cached);

  const failed = failures.get(url);
  if (failed) return Promise.reject(failed);

  const pending = loadingPromises.get(url);
  if (pending) return pending;

  const promise = new Promise<GLTFResult>((resolve, reject) => {
    const loader = new GLTFLoader();
    // Doit être appelé AVANT load()
    loader.setKTX2Loader(getKTX2Loader(gl));

    loader.load(
      url,
      (gltf) => {
        gltfCache.set(url, gltf);
        loadingPromises.delete(url);
        emit();
        resolve(gltf);
      },
      (evt) => {
        progressByUrl.set(url, { loaded: evt.loaded, total: evt.total });
        emit();
      },
      (err) => {
        loadingPromises.delete(url);
        const error = err instanceof Error ? err : new Error(`Échec du chargement de ${url}`);
        // On mémorise l'échec : sans ça, React Suspense relancerait le téléchargement en boucle.
        failures.set(url, error);
        // eslint-disable-next-line no-console
        console.error(`[3D] Échec du chargement de ${url}`, err);
        reject(error);
      }
    );
  });

  loadingPromises.set(url, promise);
  return promise;
}

/** Lance le téléchargement de tous les modèles en parallèle. */
export function preloadModels(urls: string[], gl: WebGLRenderer): void {
  expectedFiles = Math.max(expectedFiles, urls.length);
  urls.forEach((u) => {
    if (!progressByUrl.has(u)) progressByUrl.set(u, { loaded: 0, total: 0 });
    loadGLTF(u, gl).catch(() => {});
  });
}

/** Hook Suspense : retourne le GLTF, ou "suspend" tant qu'il charge. */
export function useGLTFWithKTX2(url: string): GLTFResult {
  const { gl } = useThree();

  const cached = gltfCache.get(url);
  if (cached) return cached;

  // Échec déjà constaté : on remonte l'erreur (capturée par SceneBoundary)
  const failure = failures.get(url);
  if (failure) throw failure;

  const pending = loadingPromises.get(url);
  if (pending) throw pending;

  throw loadGLTF(url, gl);
}
