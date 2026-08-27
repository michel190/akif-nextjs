"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedDishes from "@/components/FeaturedDishes";
import MenuSection from "@/components/MenuSection";
import ProductModal from "@/components/ProductModal";
import CartDrawer from "@/components/CartDrawer";
import MobileCartBar from "@/components/MobileCartBar";
import Engagements from "@/components/Engagements";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import InfosFooter from "@/components/InfosFooter";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import UpsellToast from "@/components/UpsellToast";
import { Product } from "@/lib/menu-data";

export default function HomePage() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);

  return (
    <>
      <Header />
      <Hero />
      <FeaturedDishes onOpenProduct={setActiveProduct} />
      <MenuSection onOpenProduct={setActiveProduct} />
      <Engagements />
      <Reviews />
      <FAQ />
      <ContactForm />
      <InfosFooter />

      <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} onAdded={setLastAddedId} />
      <CartDrawer />
      <MobileCartBar />
      <FloatingWhatsapp />
      <UpsellToast lastAddedId={lastAddedId} onClose={() => setLastAddedId(null)} />
    </>
  );
}
