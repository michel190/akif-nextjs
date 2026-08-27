"use client";

import { RESTO_NUMBER } from "@/lib/menu-data";

export default function FloatingWhatsapp() {
  return (
    <a
      href={`https://wa.me/${RESTO_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter Akif Fast Food sur WhatsApp"
      className="fixed bottom-24 sm:bottom-6 right-4 sm:right-6 z-30 w-14 h-14 rounded-full bg-[#25D366] shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
      <svg viewBox="0 0 32 32" className="w-7 h-7 relative" fill="white">
        <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.7 4.607 1.902 6.472L4 29l7.72-1.866A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3zm0 21.818a9.78 9.78 0 0 1-4.99-1.362l-.358-.213-3.653.883.898-3.56-.234-.368A9.77 9.77 0 0 1 6.182 15c0-5.42 4.4-9.818 9.819-9.818S25.818 9.58 25.818 15 21.42 24.818 16.001 24.818zm5.373-7.35c-.294-.148-1.74-.859-2.01-.957-.27-.098-.467-.148-.664.148-.196.295-.76.957-.932 1.153-.171.196-.343.221-.637.074-.294-.148-1.243-.458-2.367-1.462-.875-.78-1.466-1.744-1.638-2.038-.171-.294-.018-.454.13-.6.134-.133.294-.344.442-.516.147-.171.196-.294.294-.49.098-.196.049-.368-.025-.516-.074-.147-.664-1.601-.911-2.192-.24-.577-.484-.499-.664-.508l-.565-.01c-.196 0-.516.074-.786.368s-1.03 1.006-1.03 2.454 1.055 2.848 1.202 3.045c.147.196 2.076 3.17 5.03 4.444.703.303 1.251.484 1.679.62.705.224 1.347.192 1.854.117.566-.085 1.74-.712 1.986-1.4.245-.688.245-1.278.172-1.4-.074-.123-.27-.196-.564-.344z"/>
      </svg>
    </a>
  );
}
