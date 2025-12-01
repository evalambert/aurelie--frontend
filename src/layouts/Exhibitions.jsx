import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { div, p } from "framer-motion/client";

export default function Exhibitions({ data, lang }) {
  const [open, setOpen] = useState([]);

  const toggle = (id) => {
    if (open.includes(id)) {
      setOpen(open.filter((x) => x !== id));
    } else {
      setOpen([...open, id]);
    }
  };

  function ImageWithOrientation({ src, width, height, alt }) {
    const orientation = width > height ? "landscape" : "portrait";

    // Col-span dynamique selon orientation
    const colSpan = orientation === "landscape" ? "col-span-6" : "col-span-4";

    return (
      <div className={`${colSpan} p-1`}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{ width: "100%", height: "auto" }} // préserve le ratio
        />
      </div>
    );
  }

  return (
    <div>
      <ul className="exhibition-list">
        {data.map((item) => (
          <li key={item.id}>
            {/* --- EXHIBITION LIST --- */}
            <button
              onClick={() => toggle(item.id)}
              className="exhibition-item w-full grid grid-cols-10 text-left"
            >
              <div className="col-span-5 grid grid-cols-[55px_1fr]">
                <p>{item.year}</p>
                <h2>{item.title}</h2>
              </div>

              <p className="col-span-4">
                {item.structure}, {item.place}
              </p>
            </button>

            {/* --- ANIMATION --- */}
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
                  <div className="exhibition-wrapper-content flex flex-col gap-[25px]">
                    {/* --- EXHIBITION INFO-TEXTE--- */}
                    <div className="exhibition-infos pt-[12px] flex flex-col gap-[25px]">
                      <div className="exhibition-text">
                        {/* Texte principal (Strapi text array) */}
                        {item.text?.map((block, i) => (
                          <p key={i}>
                            {block.children.map((c) => c.text).join(" ")}
                          </p>
                        ))}
                      </div>
                      <div className="exhibition-credits">
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
                          <p className=""> Crédits photos © {item.copyright}</p>
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

                    {/* --- EXHIBITION IMAGES--- */}
                    <div className="exhibition-images ">
                      {item.exhibitionView?.map((img) => (
                        <div className="grid grid-cols-10 gap-[10px]">
                          <ImageWithOrientation
                            key={img.id}
                            src={img.url}
                            alt={img.alternativeText || img.name}
                            width={img.width}
                            height={img.height}
                          />
                        </div>
                      ))}
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
