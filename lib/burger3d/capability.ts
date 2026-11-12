/**
 * Détection : cet appareil peut-il (et doit-il) afficher l'expérience 3D ?
 *
 * La 3D télécharge ~23 Mo de modèles. Pour ne pas pénaliser les clients sur
 * un réseau lent ou un téléphone modeste, on garde le hero classique (image)
 * dans ces cas-là :
 *   - préférence "réduire les animations" activée
 *   - mode "économiseur de données" activé
 *   - connexion 2G / 3G détectée
 *   - mémoire appareil très faible (≤ 2 Go, quand le navigateur l'indique)
 *   - WebGL indisponible
 *
 * Le verdict est calculé par un petit script inline exécuté AVANT l'affichage
 * (voir app/layout.tsx) et stocké dans <html data-cinema="1|0">. Cela évite
 * tout clignotement entre l'ancien hero et la version 3D.
 *
 * Forcer pour tester :  ?3d=1  (activer)   ou   ?3d=0  (désactiver)
 */

export const CINEMA_DETECTION_SCRIPT = `(function(){try{
var d=document.documentElement,q=location.search.match(/[?&]3d=([01])/);
var ok;
if(q){ok=q[1]==='1';}
else{
var c=navigator.connection||{},slow=/(^|-)2g$|^3g$/.test(c.effectiveType||'');
var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var mem=navigator.deviceMemory;
var gl=false;try{var cv=document.createElement('canvas');gl=!!(cv.getContext('webgl2')||cv.getContext('webgl'));}catch(e){}
ok=gl&&!rm&&!c.saveData&&!slow&&!(mem&&mem<=2);
}
d.setAttribute('data-cinema',ok?'1':'0');
}catch(e){document.documentElement.setAttribute('data-cinema','0');}})();`;

/** Lit le verdict posé par le script inline (côté client uniquement). */
export function cinemaEnabled(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.getAttribute("data-cinema") === "1";
}
