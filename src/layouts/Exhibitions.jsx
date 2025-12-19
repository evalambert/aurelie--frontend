// src/layouts/Exhibitions.jsx

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AccordionExhibition from "../components/features/exhibitions/AccordionExhibition.jsx";

export default function Exhibitions({ data, lang }) {
  const [open, setOpen] = useState([]);

  // --- TOGGLE FUNCTION FOR OPEN/CLOSE EXHIBITIONS ---
  const toggle = (id) => {
    if (open.includes(id)) {
      setOpen(open.filter((x) => x !== id));
    } else {
      setOpen([...open, id]);
    }
  };

  // Déclencher l'événement après les changements d'état des accordéons
  // Cela garantit que ScrollTrigger est rafraîchi même si onAnimationComplete ne se déclenche pas
  useEffect(() => {
    // Attendre que l'animation soit terminée (350ms + un peu de marge)
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("accordionAnimationComplete"));
    }, 400);

    return () => clearTimeout(timer);
  }, [open]);

  return (
    <div className="exhibition--wrapper">
      <ul className="exhibition--list">
        {data
          .slice() // clone pour ne pas muter l'original
          .sort((a, b) => {
            const dateA = a.startingDate
              ? new Date(a.startingDate).getTime()
              : new Date(a.createdAt).getTime();
            const dateB = b.startingDate
              ? new Date(b.startingDate).getTime()
              : new Date(b.createdAt).getTime();
            return dateB - dateA; // du plus récent au plus ancien
          })
          .map((item) => (
            <AccordionExhibition
              key={item.id}
              item={item}
              lang={lang}
              open={open}
              toggle={toggle}
              motion={motion}
              AnimatePresence={AnimatePresence}
            />
          ))}
      </ul>




      
    </div>
  );
}
