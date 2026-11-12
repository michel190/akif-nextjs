export type Supplement = { name: string; price: number };

export type Product = {
  id: string;
  name: string;
  desc: string;
  price: number;
  img: string;
  badge?: "Populaire" | "Best Seller" | "Nouveau";
  accomp?: string[];
  supplements?: Supplement[];
};

export type Category =
  | "populaires"
  | "poulet"
  | "burgers"
  | "chawarma"
  | "tacos"
  | "pizza"
  | "viande"
  | "fruitsdemer"
  | "glaces"
  | "boulangerie"
  | "boissons";

export const CATEGORY_LABELS: Record<Category, string> = {
  populaires: "⭐ Populaires",
  poulet: "🍗 Poulet",
  burgers: "🍔 Burgers",
  chawarma: "🌯 Chawarma",
  tacos: "🌮 Tacos",
  pizza: "🍕 Pizza",
  viande: "🥩 Viande & Sandwichs",
  fruitsdemer: "🦐 Fruits de Mer",
  glaces: "🍨 Glaces",
  boulangerie: "🥐 Boulangerie",
  boissons: "🥤 Boissons",
};

export const MENU: Record<Exclude<Category, "populaires">, Product[]> = {
  poulet: [
    { id: "pl-entier-frite", name: "Poulet Entier + Frite + Salade", desc: "Pain libanais, cornichon, sauce à l'ail, piment.", price: 8000, img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=80" },
    { id: "pl-entier-riz", name: "Poulet Entier + Riz + Salade", desc: "Pain libanais, cornichon, sauce à l'ail, riz cantonais, piment.", price: 9000, img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=80" },
    { id: "pl-demi-frite", name: "Demi Poulet + Frite + Salade", desc: "Pain libanais, cornichon, sauce à l'ail, piment.", price: 5000, badge: "Populaire", img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80" },
    { id: "pl-demi-riz", name: "Demi Poulet + Riz + Salade", desc: "Pain libanais, cornichon, sauce à l'ail, riz cantonais, piment.", price: 5500, img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80" },
    { id: "pl-entier-simple", name: "Poulet Entier Simple", desc: "Pain libanais, cornichon, sauce à l'ail, piment.", price: 7000, img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=80" },
    { id: "pl-demi-simple", name: "Demi Poulet Simple", desc: "Pain libanais, cornichon, sauce à l'ail, piment.", price: 3500, img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80" },
    { id: "pl-nuggets", name: "Plat de Nuggets + Frite + Salade", desc: "7 morceaux de poulet, frite, salade de choux, sauce cocktail.", price: 5000, img: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=80" },
    { id: "pl-hotchinese", name: "Hot Chinese + Frite + Salade", desc: "Poitrine de poulet en tranches, poivron, mozzarella, fromage, frite.", price: 5000, img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=80" },
    { id: "pl-fahita", name: "Plat de Fahita + Frite + Salade", desc: "Poitrine de poulet en tranche, poivron, mozzarella, fromage.", price: 5000, img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=80" },
    { id: "pl-crispy", name: "Plat de Crispy + Frite + Fromage", desc: "3 morceaux de poulet, salade de choux, sauce cocktail.", price: 5000, img: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=80" },
    { id: "pl-escalope", name: "Plat Escalope + Frite + Salade", desc: "2 morceaux de poulet, salade de choux, sauce cocktail.", price: 5000, img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=80" },
    { id: "pl-cordonbleu", name: "Plat Cordon Bleu", desc: "Poitrine de poulet enveloppée de viande mortadelle et de fromage à pâte molle, salade de choux, sauce cocktail.", price: 5500, img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=80" },
    { id: "pl-tawouk", name: "Plat Tawouk", desc: "Gros morceaux de filet de poulet, sauce à l'ail, piment.", price: 5500, badge: "Populaire", img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=80" },
    { id: "pl-frite", name: "Plat Frite Simple", desc: "Frites maison.", price: 1500, img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80" },
    { id: "pl-rizcantonais", name: "Plat Riz Cantonais", desc: "Riz cantonais.", price: 2000, img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80" },
    { id: "pl-rizblanc", name: "Plat Riz Blanc", desc: "Riz blanc.", price: 1500, img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80" },
  ],
  burgers: [
    { id: "bg-hamburger", name: "Hamburger", desc: "Viande, frite, salade de choux, ketchup, mayonnaise.", price: 2500, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80" },
    { id: "bg-chicken", name: "Chicken Burger", desc: "Poulet, frite, salade de choux, ketchup, mayonnaise.", price: 3000, badge: "Populaire", img: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=900&q=80" },
    { id: "bg-cheese", name: "Cheese Burger", desc: "Viande, œuf, fromage, salade de choux, ketchup, mayonnaise.", price: 3000, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80" },
    { id: "bg-big", name: "Big Burger", desc: "2 viandes, frite, salade de choux, ketchup, mayonnaise.", price: 3500, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80" },
    { id: "bg-doublecheese", name: "Double Cheese Burger", desc: "2 viandes, 2 fromages, œuf, salade de choux, ketchup, mayonnaise.", price: 4000, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80" },
    { id: "bg-veggie", name: "Burger Végétarien", desc: "Tomate, oignon, œuf, fromage, salade de choux, ketchup, mayonnaise.", price: 2000, img: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=900&q=80" },
    { id: "bg-crispy", name: "Crispy Burger", desc: "2 morceaux de crispy, tomate, laitue, oignons, cheddar cheese.", price: 3500, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80" },
    { id: "bg-hamburger-combo", name: "Hamburger + Frite + Coca", desc: "Viande, laitue, tomate, oignons, sauce cocktail.", price: 3500, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80" },
    { id: "bg-chicken-combo", name: "Chicken Burger + Frite + Coca", desc: "Poulet, frite, laitue, oignons, tomate.", price: 4000, img: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=900&q=80" },
    { id: "bg-cheese-combo", name: "Cheese Burger + Frite + Coca", desc: "Viande, laitue, tomate, œuf, fromage, oignons, sauce cocktail.", price: 3500, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80" },
    { id: "bg-big-combo", name: "Big Burger + Frite + Coca", desc: "2 viandes, laitue, tomate, oignons, sauce cocktail.", price: 4500, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80" },
    { id: "bg-doublecheese-combo", name: "Double Cheese Burger + Frite + Coca", desc: "2 viandes, 2 fromages, œuf, laitue, oignons, tomate, sauce cocktail.", price: 5000, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80" },
    { id: "bg-veggie-combo", name: "Burger Végétarien + Frite + Coca", desc: "Tomate, oignon, œuf, fromage, salade de choux, ketchup, mayonnaise.", price: 2500, img: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=900&q=80" },
  ],
  chawarma: [
    { id: "ch-poulet", name: "Chawarma Poulet", desc: "Pain libanais, poulet, frite, salade de choux.", price: 2500, badge: "Populaire", img: "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?auto=format&fit=crop&w=900&q=80" },
    { id: "ch-viande", name: "Chawarma Viande", desc: "Pain libanais, viande, tomate, oignon, sauce tarator.", price: 2000, img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=80" },
    { id: "ch-vegetarien", name: "Chawarma Végétarien", desc: "Pain libanais, tomate, oignon, œuf, salade de choux.", price: 2000, img: "https://images.unsplash.com/photo-1615557960916-5f4791effe9d?auto=format&fit=crop&w=900&q=80" },
    { id: "ch-kaftafromage", name: "Kafta Fromage", desc: "Pain libanais, viande hachée, fromage.", price: 1500, img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=80" },
    { id: "ch-brochette", name: "Sandwich Brochette", desc: "Viande, tomate, oignons.", price: 2000, img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=80" },
    { id: "ch-kafta", name: "Sandwich Kafta", desc: "Viande de mouton, tomate, oignons.", price: 2500, img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=80" },
    { id: "ch-poulet-combo", name: "Chawarma Poulet + Frite + Coca", desc: "Pain libanais, poulet, frite, salade de choux.", price: 4000, img: "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?auto=format&fit=crop&w=900&q=80" },
    { id: "ch-viande-combo", name: "Chawarma Viande + Frite + Coca", desc: "Pain libanais, viande, tomate, oignon, sauce tarator.", price: 3000, img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=80" },
    { id: "ch-brochette-combo", name: "Sandwich Brochette + Frite + Coca", desc: "Viande, tomate, oignons.", price: 3000, img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=80" },
    { id: "ch-kafta-combo", name: "Sandwich Kafta + Frite + Coca", desc: "Viande de mouton, tomate, oignons.", price: 3500, img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=80" },
  ],
  tacos: [
    // ⚠️ Prix "0" = à confirmer. Mentionnés comme spécialité par plusieurs
    // sources (Instagram, TripAdvisor, PetitFuté) mais absents du menu
    // photographié — variétés/tarifs exacts à obtenir directement.
    { id: "tc-akif", name: "Tacos AKIF", desc: "Garni et préparé avec soin — variétés à confirmer.", price: 0, img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80" },
  ],
  pizza: [
    { id: "pz-margherita", name: "Margherita", desc: "Sauce tomate, fromage, olives.", price: 3500, badge: "Populaire", img: "https://images.unsplash.com/photo-1548365328-9f547fb0953b?auto=format&fit=crop&w=900&q=80" },
    { id: "pz-americanne", name: "Americanne", desc: "Sauce tomate, fromage, olive noire, jambon.", price: 4000, img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80" },
    { id: "pz-forestiere", name: "Forestière", desc: "Sauce tomate, fromage, olives, champignon.", price: 4500, img: "https://images.unsplash.com/photo-1548365328-9f547fb0953b?auto=format&fit=crop&w=900&q=80" },
    { id: "pz-reine", name: "Reine", desc: "Sauces tomate, fromage, olives, champignon, jambon.", price: 5000, img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80" },
    { id: "pz-royale", name: "Royale", desc: "Sauce tomate, fromage, olives, champignon, jambon, crème fraîche, œuf.", price: 5500, img: "https://images.unsplash.com/photo-1548365328-9f547fb0953b?auto=format&fit=crop&w=900&q=80" },
    { id: "pz-sicilienne", name: "Sicilienne", desc: "Sauce tomate, fromage, oignon blanc, poivron, viande hachée.", price: 5000, img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80" },
    { id: "pz-pollopicante", name: "Pollopicante", desc: "Fromage, poulet barbecue, champignon, tabasco, olives, crème fraîche.", price: 6500, img: "https://images.unsplash.com/photo-1548365328-9f547fb0953b?auto=format&fit=crop&w=900&q=80" },
    { id: "pz-vegetarienne", name: "Végétarienne", desc: "Sauce tomate, fromage, olives, champignon, oignon blanc, maïs doux.", price: 4500, img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80" },
    { id: "pz-4saisons", name: "4 Saisons", desc: "Sauce tomate, fromage, olives, poivron, champignon, maïs, jambon.", price: 5500, img: "https://images.unsplash.com/photo-1548365328-9f547fb0953b?auto=format&fit=crop&w=900&q=80" },
    { id: "pz-ocean", name: "Océan", desc: "Sauce tomate, fromage, thon, oignon vert, olives, champignon.", price: 5500, img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80" },
    { id: "pz-santamaria", name: "Santa Maria", desc: "Crème fraîche, fromage, poulet grillé, champignon, olives.", price: 6000, img: "https://images.unsplash.com/photo-1548365328-9f547fb0953b?auto=format&fit=crop&w=900&q=80" },
  ],
  viande: [
    { id: "vd-stroganoff", name: "Beef Stroganoff", desc: "Filet de bœuf sauce, champignons, riz blanc.", price: 4500, img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80" },
    { id: "vd-philadelfia", name: "Plat Philadelfia", desc: "Filet de bœuf, oignons, poivron, mozzarella fromage, frite et salade.", price: 4500, img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80" },
    { id: "vd-steak", name: "Plat Steak", desc: "Filet de bœuf, sauce barbecue, mozzarella fromage, frite, salade.", price: 4500, img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80" },
    { id: "vd-brochette", name: "Plat Brochette", desc: "3 tiges de viande, salade.", price: 5000, img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=80" },
    { id: "vd-kafta", name: "Plat Kafta", desc: "3 tiges de viande, salade.", price: 5000, img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=80" },
    { id: "vd-philadelfia-sw", name: "Sandwich Philadelfia + Frite + Coca", desc: "Filet de bœuf, oignons, poivron, mozzarella fromage.", price: 3500, img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=900&q=80" },
    { id: "vd-fahita-sw", name: "Sandwich Fahita + Frite + Coca", desc: "Filet de bœuf, oignons, poivron, mozzarella fromage.", price: 4000, img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=900&q=80" },
    { id: "vd-crispy-sw", name: "Sandwich Crispy + Frite + Coca", desc: "Poulet crispy, salade, sauce.", price: 4000, img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=900&q=80" },
    { id: "vd-chinese-sw", name: "Sandwich Chinese + Frite + Coca", desc: "Poitrine de poulet en tranches, poivron, mozzarella.", price: 4000, img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=900&q=80" },
    { id: "vd-steak-sw", name: "Sandwich Steak + Frite + Coca", desc: "Filet de bœuf, sauce barbecue, mozzarella fromage.", price: 4000, img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=900&q=80" },
    { id: "vd-escalope-sw", name: "Sandwich Escalope + Frite + Coca", desc: "2 morceaux de poulet, salade, sauce cocktail.", price: 4000, img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=900&q=80" },
  ],
  fruitsdemer: [
    // ⚠️ Prix "0" = à confirmer. Mentionnés comme spécialité par plusieurs
    // sources (Instagram, TripAdvisor, PetitFuté) mais absents du menu
    // photographié — plats et tarifs exacts à obtenir directement.
    { id: "fdm-poisson", name: "Poisson Grillé", desc: "Poisson grillé — accompagnement à confirmer.", price: 0, img: "https://images.unsplash.com/photo-1580959375944-abd7e991f971?auto=format&fit=crop&w=900&q=80" },
    { id: "fdm-crevettes", name: "Crevettes", desc: "Plat de crevettes — préparation à confirmer.", price: 0, img: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80" },
  ],
  glaces: [
    { id: "gl-1boule", name: "1 Boule", desc: "Selon parfum disponible.", price: 1000, img: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=900&q=80" },
    { id: "gl-6boules", name: "6 Boules", desc: "Selon parfums disponibles.", price: 5000, img: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=900&q=80" },
    { id: "gl-12boules", name: "12 Boules", desc: "Selon parfums disponibles.", price: 9000, img: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=900&q=80" },
    { id: "gl-chocolatmou", name: "Chocolat Mou", desc: "3 boules de glaces, crème blanche, sirop de chocolat, à la fraise, au caramel.", price: 4500, img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80" },
    { id: "gl-milkshake", name: "Milk Shake", desc: "2 boules de glaces, lait, sirop chocolat, à la fraise, au caramel.", price: 3000, img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80" },
  ],
  boulangerie: [
    // ⚠️ Prix "0" = à confirmer. Mentionnés comme disponibles "dans certains
    // comptoirs" selon plusieurs sources — à vérifier pour l'agence retenue.
    { id: "bl-viennoiserie", name: "Viennoiseries", desc: "Sélection du jour — variétés à confirmer.", price: 0, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80" },
    { id: "bl-gateau", name: "Gâteaux", desc: "Sélection du jour — variétés à confirmer.", price: 0, img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=900&q=80" },
    { id: "bl-donuts", name: "Donuts", desc: "Sélection du jour — variétés à confirmer.", price: 0, img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80" },
  ],
  boissons: [
    { id: "bo-the", name: "Thé", desc: "", price: 600, img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80" },
    { id: "bo-nescafe", name: "Nescafé", desc: "", price: 600, img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80" },
    { id: "bo-capsole", name: "Café Capsule Normal", desc: "", price: 1000, img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80" },
    { id: "bo-lait", name: "Lait Chaud / Lait Froid", desc: "", price: 1000, img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80" },
    { id: "bo-cappucino", name: "Cappuccino", desc: "", price: 2000, img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80" },
    { id: "bo-grandcafe", name: "Grand Café", desc: "", price: 2000, img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80" },
    { id: "bo-canettes", name: "Canettes", desc: "Coca, Sprite, Fanta...", price: 1000, badge: "Populaire", img: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=900&q=80" },
    { id: "bo-cocazero", name: "Coca Zéro", desc: "", price: 1500, img: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=900&q=80" },
    { id: "bo-redbull", name: "Red Bull", desc: "", price: 1500, img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=900&q=80" },
    { id: "bo-jusnaturel", name: "Jus de Fruits Naturels Pressés", desc: "", price: 1500, img: "https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=900&q=80" },
    { id: "bo-perrier", name: "Perrier", desc: "", price: 1500, img: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=900&q=80" },
    { id: "bo-eaupetit", name: "Eau — Petite", desc: "", price: 500, img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=80" },
    { id: "bo-eaugrand", name: "Eau — Grande", desc: "", price: 1000, img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=80" },
  ],
};

export function getProductsForCategory(cat: Category): Product[] {
  if (cat === "populaires") {
    return Object.values(MENU)
      .flat()
      .filter((p) => p.badge === "Populaire" || p.badge === "Best Seller");
  }
  return MENU[cat];
}

// ⚠️ Numéro de TEST (celui de Michel, pour vérifier que le système fonctionne
// avant l'envoi final). Tant que ce numéro est actif, aucune commande ne part
// vers un vrai numéro Akif, même si un client clique sur une agence.
export const TEST_NUMBER = "221781103971";
export const RESTO_NUMBER = TEST_NUMBER;

// ⚠️ Numéros RÉELS de routage WhatsApp — actuellement tous désactivés (pointent
// vers le numéro de test) pour éviter d'envoyer de vrais messages à Akif
// pendant les tests. Remplace chaque valeur par AGENCY_INFO[nom].phone une
// fois prêt à passer en production (et une fois WhatsApp confirmé actif).
export const AGENCY_NUMBERS: Record<string, string> = {
  "Dékon": TEST_NUMBER,
  "Avénou": TEST_NUMBER,
  "Agoè": TEST_NUMBER,
};

// ✅ Vraies infos des 3 agences, à afficher sur le site (sourcées : Petit
// Futé, Instagram @akif.fastfood). Utilisées pour l'affichage uniquement —
// voir AGENCY_NUMBERS ci-dessus pour le routage réel des commandes.
export const AGENCY_INFO: Record<string, { address: string; phone: string; phoneDisplay: string }> = {
  "Dékon": { address: "299, Boulevard du 13-Janvier", phone: "22892182424", phoneDisplay: "92 18 24 24 / 97 04 14 14" },
  "Avénou": { address: "Avénou, Lomé", phone: "22890062124", phoneDisplay: "90 06 21 24" },
  "Agoè": { address: "Près de l'échangeur, entre la station Sanol et Fil'O Parc", phone: "22890314863", phoneDisplay: "90 31 48 63" },
};

export function fmt(n: number): string {
  return n > 0 ? n.toLocaleString("fr-FR") + " FCFA" : "Prix à confirmer";
}
