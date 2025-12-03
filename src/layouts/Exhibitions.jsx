// src/layouts/Exhibitions.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
            <li
              className="transition-opacity duration-300 opacity-10 hover:opacity-100"
              key={item.id}
            >
              {/* --- EXHIBITION LIST --- */}
              <button
                onClick={() => toggle(item.id)}
                className="exhibition--item w-full grid grid-cols-2 md:grid-cols-10 text-left"
              >
                <div className="grid grid-cols-[45px_1fr] md:grid-cols-[55px_1fr] md:col-span-6">
                  <p>{item.year}</p>
                  <h2>{item.title}</h2>
                </div>

                <p className="md:col-span-4 text-right md:text-left">
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
                    className="overflow-hidden"
                  >
                    {/* --- EXHIBITION WRAPPER-CONTENTS --- */}
                    <div className="exhibition--wrapper-content pb-[55px] flex flex-col gap-[60px] md:gap-[35px]">
                      {/* --- EXHIBITION INFO –-- */}
                      <div className="exhibition--infos pl-[55px] md:pt-[12px] flex flex-col gap-[30px] md:gap-[25px]">
                        <div className="exhibition--description">
                          {item.text?.map((block, i) => (
                            <p key={i}>
                              {block.children.map((c) => c.text).join(" ")}
                            </p>
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
                          {item.curator && (
                            <p> Commissariat : {item.curator}</p>
                          )}
                          {item.scenographie && (
                            <p> Scénographie : {item.scenographie}</p>
                          )}
                          {item.copyright && (
                            <p className="">
                              {" "}
                              Crédits photos : © {item.copyright}
                            </p>
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
                      <div className="exhibition--images flex flex-col gap-[10px] md:pl-[55px]">
                        {item.exhibitionView?.map((img) => {
                          const isLandscape = img.width > img.height;

                          return (
                            <div
                              key={img.id}
                              className="w-full flex justify-start"
                            >
                              <img
                                src={img.url}
                                alt={img.alternativeText || img.name}
                                width={img.width}
                                height={img.height}
                                className={
                                  "filter grayscale opacity-50 w-full h-auto " +
                                  (isLandscape ? "md:w-[70%]" : "md:w-[50%]")
                                }
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* --- EXHIBITION WORKS-LIST --- */}
                      <div className="exhibition--work-list flex flex-col md:gap-[10px]">
                        <h3>
                          {lang === "fr"
                            ? "Œuvres exposées"
                            : "Works exhibited"}
                        </h3>

                        <div>
                          {item.atlasRelation.map((work) => {
                            // Crée un tableau avec les champs disponibles
                            const fields = [
                              work.title,
                              work.technique,
                              work.origin,
                              work.year,
                            ].filter(Boolean); // filtre les valeurs null ou undefined

                            return <p key={work.id}>{fields.join(", ")}</p>;
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
      </ul>
    </div>
  );
}
