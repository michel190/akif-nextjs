# Akif Fast Food — expérience 3D (v19)

Ce projet = le site Akif (menu, panier, commande WhatsApp, agences) **+** l'expérience 3D du projet "theburger" :

1. **Hero 3D** : le burger tourne en haut de page.
2. **Ouverture** : en défilant, le burger s'ouvre couche par couche (8 couches).
3. **Histoire des ingrédients** : un texte par couche.
4. **Fermeture + appel à l'action** : boutons « Voir le menu » et « Nos agences ».
5. **Vue 360°** (juste après le menu) : le burger que l'on fait tourner avec la souris / le doigt.

Le reste du site (menu, panier, WhatsApp, agences, avis, FAQ, contact) n'a pas changé.

## Où modifier quoi

| Je veux… | Fichier |
|---|---|
| Changer les textes 3D (titres, descriptions des couches, boutons) | `lib/burger3d/copy.ts` |
| Raccourcir / rallonger l'animation | `lib/burger3d/timeline.ts` → `TOTAL_SCREENS` (22 = 22 écrans de défilement ; 14 pour une version plus courte) |
| Changer les couleurs / positions des couches | `lib/burger3d/config.ts` (réglé à la main : tester visuellement après chaque changement) |
| Remplacer un modèle 3D | `public/models/*.glb` — **donnez un nouveau nom de fichier** (ex. `top-bun-v2.glb`) et mettez-le dans `config.ts`, car les modèles sont gardés 30 jours en cache par les navigateurs (`netlify.toml`) |

⚠️ `components/cinema/CinemaScene.tsx` est un fichier généré depuis le projet d'origine : à éviter de modifier à la main.

## Tester

- `npm run dev` puis ouvrir http://localhost:3000
- `?3d=1` à la fin de l'adresse : force la 3D (utile pour une démo, même sur un téléphone jugé « faible »)
- `?3d=0` : force la version classique (sans 3D)

## Appareils pour lesquels la 3D est désactivée automatiquement

Le site affiche alors l'ancien hero classique, plus léger : connexion 2G/3G ou mode « économie de données », « réduire les animations » activé dans le système, très peu de mémoire (≤ 2 Go), navigateur sans WebGL. Si les modèles ne se chargent pas, la section se réduit à un écran avec un bouton « Voir le menu ».

## Points d'attention

- **Poids** : 7 modèles = environ 23 Mo, téléchargés en une fois à l'ouverture de la page sur les appareils qui font tourner la 3D. Ils sont mis en cache ensuite.
- **Sécurité (CSP)** : `netlify.toml` contient maintenant `'unsafe-eval'` dans `script-src`. C'est nécessaire au décodeur de textures KTX2 (sans lui, les modèles ne s'affichent pas). C'est un léger recul par rapport à la v18.
- **Licence** : vérifiez que vous avez le droit d'utiliser les modèles 3D du projet d'origine pour un site commercial.
- **Illustration** : le burger 3D est une illustration générique (il contient des cornichons, qui ne sont pas forcément sur tous les burgers Akif) ; la mention est affichée en bas de l'animation.
- **Numéros WhatsApp** : toujours le numéro de TEST. À remplacer par les vrais avant de vendre.
