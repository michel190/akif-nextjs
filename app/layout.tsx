import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { AGENCY_INFO } from "@/lib/menu-data";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const SITE_URL = "https://akif-fastfood-tg.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Akif Fast Food — Chawarma, Burgers, Pizza à Lomé",
  description:
    "Akif Fast Food : chawarmas, burgers, pizzas, poulet grillé et plus, dans 3 agences à Lomé (Dékon, Avénou, Agoè). Commandez directement sur WhatsApp.",
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Akif Fast Food — Restaurant rapide à Lomé",
    description: "Chawarmas, burgers, pizzas et plus — 3 agences à Lomé. Commande directe sur WhatsApp.",
    url: SITE_URL,
    siteName: "Akif Fast Food",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/burger-hero.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akif Fast Food — Restaurant rapide à Lomé",
    description: "Chawarmas, burgers, pizzas et plus — 3 agences à Lomé.",
    images: ["/burger-hero.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // ✅ Schema.org — uniquement des données réelles (adresses/téléphones des agences)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Akif Fast Food",
    servesCuisine: ["Libanaise", "Fast Food", "Moyen-orientale"],
    url: SITE_URL,
    location: Object.entries(AGENCY_INFO).map(([name, info]) => ({
      "@type": "Place",
      name: `Akif Fast Food — ${name}`,
      address: { "@type": "PostalAddress", streetAddress: info.address, addressLocality: "Lomé", addressCountry: "TG" },
      telephone: info.phoneDisplay,
    })),
  };

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className={`${fraunces.variable} ${inter.variable} font-body bg-bg text-bone`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
