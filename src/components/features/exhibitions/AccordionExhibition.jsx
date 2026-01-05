//components/features/exhibitions/AccordionExhibition.jsx
import { useState, useEffect } from "react";
import ImagesExhibition from "./ImagesExhibition.jsx";
import { previewStore } from "../../../stores/previewStore.js";
import AtlasList from "./AtlasList.jsx";

export default function AccordionExhibition({
  item,
  lang,
  open,
  toggle,
  motion,
  AnimatePresence,
}) {

  const [mobileClicked, setMobileClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // état pour mobile


  useEffect(() => {
    // Ce code ne s'exécute que côté client
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  
  return (
    <li
      className={`transition-opacity duration-300 opacity-10 md:hover:opacity-100 ${mobileClicked ? "opacity-100" : "opacity-10"}`}
      key={item.id}
    >
      {/* --- EXHIBITION LIST --- */}
      <button
        onClick={() => {
          // Récupère les images de l'expo
          const expoImages = item.exhibitionView || [];

          // Récupère les images des œuvres de l'Atlas
          // Récupère les images des œuvres de l'Atlas sous forme d'objets standardisés
          const atlasImages =
            item.atlasRelation
              ?.map((work) => {
                const url = work.image?.formats?.large?.url || work.image?.url;
                if (!url) return null;
                return {
                  id: work.id, // identifiant unique
                  url, // URL de l'image
                };
              })
              .filter(Boolean) || [];

          // Combine les deux
          const allImages = [...expoImages, ...atlasImages];
          previewStore.setImages(allImages);

          // Toggle l'accordion
          toggle(item.id);
          if (isMobile && !mobileClicked) {
            setMobileClicked(true);
          }else{
            setMobileClicked(false);
          }
        }}
        className="exhibition--item w-full grid grid-cols-[1fr_100px] md:grid-cols-10 text-left"
      >
        <div className="grid grid-cols-[45px_1fr] md:grid-cols-[55px_1fr] md:col-span-6">
          <p>{item.year}</p>
          <h2>{item.title}</h2>
        </div>

        <p className="md:col-span-4 text-left hidden md:inline">
          {item.structure}, {item.place}
        </p>
      </button>

      {/* --- ACCORDION ANIMATION --- */}
      <AnimatePresence initial={false}>
        {open.includes(item.id) && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            onAnimationComplete={() => {
              console.log("Animation complete");
              // Déclencher un événement personnalisé pour notifier ScrollAnimations
              window.dispatchEvent(new CustomEvent("accordionAnimationComplete"));
            }}
            className="overflow-hidden"
          >
            {/* --- EXHIBITION WRAPPER-CONTENTS --- */}
            <div className="exhibition--wrapper-content  pb-[55px] flex flex-col gap-[60px] md:gap-[35px]">
              {/* --- EXHIBITION INFO –-- */}
              <div className="exhibition--infos pl-[45px] md:pl-[55px] md:pt-[12px] flex flex-col gap-[30px] md:gap-[25px]">
                <div className="exhibition--description">
                  {item.text?.map((block, i) => (
                    <p key={i}>{block.children.map((c) => c.text).join(" ")}</p>
                  ))}
                </div>
                <div className="exhibition--credits">
                  {item.startingDate && item.endingDate && (
                    <p>
                      {" "}
                      {new Date(item.startingDate)
                        .toISOString()
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join(".")}{" "}
                      –{" "}
                      {new Date(item.endingDate)
                        .toISOString()
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join(".")}
                    </p>
                  )}
                  {item.curator && <p> Commissariat : {item.curator}</p>}
                  {item.scenographie && (
                    <p> Scénographie : {item.scenographie}</p>
                  )}
                  {item.copyright && (
                    <p className=""> Crédits photos : © {item.copyright}</p>
                  )}
                  {item.link && (
                    <p>
                      <a href={item.link} target="_blank">
                        En savoir plus…
                      </a>
                    </p>
                  )}
                </div>
              </div>

              {/* --- EXHIBITION IMAGES --- */}
              <ImagesExhibition item={item} />

              {/* --- EXHIBITION WORKS-LIST --- */}
              <AtlasList item={item} lang={lang} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
