"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Illustration originale (SVG dessiné à la main), pas une photo —
// se décompose en couches au survol pour montrer la composition du burger.
export default function ExplodedBurger() {
  const [open, setOpen] = useState(false);

  const spring = { type: "spring" as const, stiffness: 180, damping: 16 };

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
      className="relative w-full aspect-square max-w-md mx-auto cursor-pointer select-none"
    >
      <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
        {/* Ombre au sol */}
        <motion.ellipse
          cx="200" cy="330" rx="120" ry="18" fill="#000"
          animate={{ opacity: open ? 0.06 : 0.12, rx: open ? 150 : 120 }}
          transition={spring}
        />

        {/* Pain du bas */}
        <motion.g animate={{ y: open ? 70 : 0 }} transition={spring}>
          <path d="M90 260 Q90 220 200 220 Q310 220 310 260 L310 275 Q310 285 300 285 L100 285 Q90 285 90 275 Z" fill="#D98A3D" />
        </motion.g>

        {/* Feuille de salade */}
        <motion.g animate={{ y: open ? 30 : 0, x: open ? -18 : 0, rotate: open ? -4 : 0 }} transition={{ ...spring, delay: 0.02 }}>
          <path d="M85 225 Q100 205 140 215 Q170 200 200 215 Q230 200 260 215 Q300 205 315 225 Q300 235 200 232 Q100 235 85 225 Z" fill="#7CB342" />
        </motion.g>

        {/* Tomate */}
        <motion.g animate={{ y: open ? -5 : 0, x: open ? 55 : 0, rotate: open ? 8 : 0 }} transition={{ ...spring, delay: 0.05 }}>
          <ellipse cx="230" cy="215" rx="45" ry="10" fill="#E24B3C" />
          <ellipse cx="230" cy="215" rx="45" ry="10" fill="none" stroke="#B8382C" strokeWidth="1.5" strokeDasharray="4 5" />
        </motion.g>

        {/* Fromage */}
        <motion.g animate={{ y: open ? -40 : 0, x: open ? -50 : 0, rotate: open ? -10 : 0 }} transition={{ ...spring, delay: 0.08 }}>
          <path d="M110 210 L290 205 L275 225 L125 228 Z" fill="#F5C542" />
        </motion.g>

        {/* Steak grillé */}
        <motion.g animate={{ y: open ? -80 : 0, rotate: open ? 3 : 0 }} transition={{ ...spring, delay: 0.11 }}>
          <ellipse cx="200" cy="205" rx="105" ry="20" fill="#6B4030" />
          <ellipse cx="170" cy="200" rx="6" ry="3" fill="#4A2A20" />
          <ellipse cx="220" cy="210" rx="6" ry="3" fill="#4A2A20" />
          <ellipse cx="245" cy="198" rx="5" ry="2.5" fill="#4A2A20" />
        </motion.g>

        {/* Oignons */}
        <motion.g animate={{ y: open ? -115 : 0, x: open ? 60 : 0, rotate: open ? 14 : 0 }} transition={{ ...spring, delay: 0.14 }}>
          <ellipse cx="235" cy="195" rx="38" ry="9" fill="none" stroke="#C9A8D9" strokeWidth="4" />
        </motion.g>

        {/* Pain du haut avec graines */}
        <motion.g animate={{ y: open ? -170 : 0, rotate: open ? -3 : 0 }} transition={{ ...spring, delay: 0.17 }}>
          <path d="M95 190 Q95 110 200 105 Q305 110 305 190 Z" fill="#E39A45" />
          <path d="M95 190 Q95 175 200 172 Q305 175 305 190 Z" fill="#D98A3D" />
          {[[150, 140], [180, 125], [210, 128], [240, 145], [170, 155], [225, 160]].map(([cx, cy], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx="3.5" ry="2" fill="#FBE7C6" transform={`rotate(${i * 25} ${cx} ${cy})`} />
          ))}
        </motion.g>
      </svg>

      <p className="text-center text-xs font-semibold text-mut mt-2">
        {open ? "Voici ce qu'il y a dedans 👀" : "Survolez pour découvrir la composition"}
      </p>
    </div>
  );
}
