/**
 * Détection : cet appareil peut-il (et doit-il) afficher l'expérience 3D ?
 *
 * La 3D télécharge ~23 Mo de modèles. Pour ne pas pénaliser les clients sur
 * un réseau vraiment lent ou un appareil modeste, on garde le hero classique
 * (image) dans ces cas-là :
 *   - préférence "réduire les animations" activée
 *   - mode "économiseur de données" activé
 *   - connexion 2G, ou débit mesuré inférieur à 1 Mb/s
 *   - mémoire appareil très faible (≤ 2 Go, quand le navigateur l'indique)
 *   - WebGL indisponible
 *
 * Pourquoi pas "3G" ? Chrome classe une connexion en "3g" dès que le temps de
 * réponse dépasse ~270 ms. C'est fréquent en Afrique de l'Ouest même sur une
 * bonne 4G ou la fibre (serveurs éloignés) : on regarde donc le DÉBIT réel.
 *
 * Le verdict est calculé une première fois par un petit script inline exécuté
 * AVANT l'affichage (voir app/layout.tsx) et stocké dans <html data-cinema="1|0">,
 * pour éviter tout clignotement entre l'ancien hero et la version 3D.
 *
 * ⚠️ Si une extension du navigateur (traduction, numéros cliquables, etc.)
 * modifie la page avant React, React redessine TOUTE la page et efface cet
 * attribut. cinemaEnabled() refait alors le test lui-même : la 3D s'affiche quand même.
 *
 * Forcer pour tester :  ?3d=1  (activer)   ou   ?3d=0  (désactiver)
 */

/** Débit minimal (Mb/s) en dessous duquel on garde le hero classique. */
const MIN_DOWNLINK_MBPS = 1;

/**
 * La règle de décision, écrite UNE seule fois. Elle doit rester du JavaScript
 * simple : elle est aussi injectée telle quelle dans le script inline.
 */
const DETECT_SOURCE = `function(){
var q=location.search.match(/[?&]3d=([01])/);
if(q)return q[1]==='1';
var c=navigator.connection||{},et=c.effectiveType||'';
var slow=/(^|-)2g$/.test(et)||(typeof c.downlink==='number'&&c.downlink>0&&c.downlink<${MIN_DOWNLINK_MBPS});
var rm=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
var mem=navigator.deviceMemory;
var gl=false;try{var cv=document.createElement('canvas');var ctx=cv.getContext('webgl2')||cv.getContext('webgl');gl=!!ctx;var lose=ctx&&ctx.getExtension('WEBGL_lose_context');if(lose)lose.loseContext();}catch(e){}
return gl&&!rm&&!c.saveData&&!slow&&!(mem&&mem<=2);
}`;

export const CINEMA_DETECTION_SCRIPT = `(function(){var d=document.documentElement;try{
d.setAttribute('data-cinema',(${DETECT_SOURCE})()?'1':'0');
}catch(e){d.setAttribute('data-cinema','0');}})();`;

// Même règle, côté application (secours si l'attribut a été effacé).
function detectCinema(): boolean {
  try {
    const q = location.search.match(/[?&]3d=([01])/);
    if (q) return q[1] === "1";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nav = navigator as any;
    const c = nav.connection || {};
    const et: string = c.effectiveType || "";
    const slow =
      /(^|-)2g$/.test(et) || (typeof c.downlink === "number" && c.downlink > 0 && c.downlink < MIN_DOWNLINK_MBPS);
    const rm = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const mem: number | undefined = nav.deviceMemory;
    let gl = false;
    try {
      const cv = document.createElement("canvas");
      const ctx = (cv.getContext("webgl2") || cv.getContext("webgl")) as WebGLRenderingContext | null;
      gl = !!ctx;
      ctx?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      gl = false;
    }
    return gl && !rm && !c.saveData && !slow && !(mem && mem <= 2);
  } catch {
    return false;
  }
}

let fallbackVerdict: boolean | null = null;

/** Verdict : afficher la 3D ? (côté client uniquement) */
export function cinemaEnabled(): boolean {
  if (typeof document === "undefined") return false;
  const html = document.documentElement;
  const attr = html.getAttribute("data-cinema");
  if (attr === "1" || attr === "0") return attr === "1";
  // Attribut absent : la page a été entièrement redessinée par React → on refait le test.
  if (fallbackVerdict === null) fallbackVerdict = detectCinema();
  html.setAttribute("data-cinema", fallbackVerdict ? "1" : "0");
  return fallbackVerdict;
}
