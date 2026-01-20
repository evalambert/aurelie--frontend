//components/features/exhibitions/AtlasList.jsx
import { useState } from "react";
import { previewStore } from "../../../stores/previewStore";
import { useIsDesktop } from "../../../hooks/isDesktop";

export default function AtlasList({ item, lang }) {
  const isDesktop = useIsDesktop(1024);
  const [activeImageUrl, setActiveImageUrl] = useState(null);

  const handleClick = (url) => {
    if (activeImageUrl === url) {
      // Si l'image est déjà affichée, on la ferme
      previewStore.clearHover();
      setActiveImageUrl(null);
    } else {
      // Sinon, on affiche la nouvelle image
      previewStore.setHoverImage(url);
      setActiveImageUrl(url);
    }
  };

  return (
    <div className="exhibition--atlas-list flex flex-col lg:gap-[10px]">
      {item.atlasRelation.length > 0 && (
        <h3>{lang === "fr" ? "Œuvres exposées :" : "Works exhibited :"}</h3>
      )}
      <div>
        {item.atlasRelation?.map((work) => {
          // On priorise la shortVideo pour le hover (previewUrl si disponible, sinon url de la vidéo)
          // Sinon on utilise l'image
          const url =
            work.shortVideo?.previewUrl ||
            work.shortVideo?.url ||
            work.image?.formats?.large?.url ||
            work.image?.url;
          if (!url) return null;
          const fields = [work.title, work.technique, work.origin, work.year].filter(Boolean);

          return (
            <ul key={work.id} className="flex items-center gap-2">
              <li>
                <a href="#" className="cursor-pointer"
                  onPointerEnter={
                    isDesktop
                      ? () => previewStore.setHoverImage(url)
                      : undefined
                  }
                  onPointerLeave={
                    isDesktop ? () => previewStore.clearHover() : undefined
                  }
                  onClick={(e) => {
                    e.preventDefault(); // ← Empêche le comportement par défaut (navigation)
                    !isDesktop && handleClick(url);
                  }}
                >
                  {fields.join(", ")}
                </a>

              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
