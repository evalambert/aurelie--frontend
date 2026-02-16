import { useState } from "react";
import { useResponsiveImage } from "../../../hooks/useResponsiveImage";
import { useIsDesktop } from "../../../hooks/isDesktop";
import { getResponsiveImageUrl } from "../../../assets/scripts/libs/getImageUrl";

const AtlasCard = ({ id, atlas, onCardClick }) => {
  const [loaded, setLoaded] = useState(false);
  const imageUrl = useResponsiveImage(atlas.image, "card");
  const isDesktop = useIsDesktop(1024);

  const getClickData = () => {
    if (!atlas.image) return atlas;

    const width = window.innerWidth;
    let imageUrl;

    if (isDesktop) {
      // Version lightbox en desktop (comme useResponsiveImage(slider.background, "lightbox"))
      imageUrl = getResponsiveImageUrl(atlas.image, "lightbox", width);
    } else {
      // Version medium en mobile
      imageUrl = atlas.image.formats?.medium?.url || atlas.image.url;
    }

    // Retourner l'objet atlas complet avec l'image traitée pour mobile/desktop
    // pour que ImageLightboxAtlas puisse utiliser l'URL et accéder à oembedVideo
    return {
      ...atlas,
      image: {
        ...atlas.image,
        url: imageUrl,
        formats: undefined, // Supprimer formats pour forcer l'utilisation de l'URL
      },
    };
  };

  // Fonction pour capitaliser seulement le premier mot
  const capitalizeFirstWord = (str) => {
    if (!str) return str;
    const words = str.split(" ");
    if (words.length === 0) return str;
    return words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase() + 
           (words.length > 1 ? " " + words.slice(1).join(" ") : "");
  };

  return (
    <div
      className="transition-opacity duration-500 cursor-pointer"
      style={{ opacity: loaded ? 1 : 0 }}
      onClick={() => onCardClick(getClickData())}
    >
      {imageUrl ? (
        <div className="mb-[10px]">
          <img
            loading="lazy"
            className="grayscale block w-full h-auto opacity-50"
            src={imageUrl}
            alt={atlas.title}
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
            ref={(img) => {
              if (img?.complete) setLoaded(true);
            }}
          />
        </div>
      ) : null}
      <div>
        <h2 className="inline">[&thinsp;{capitalizeFirstWord(atlas.title)}&thinsp;] </h2> 
        {atlas.medium && (
          <span className="inline lowercase">{atlas.technique}, </span>
        )}
        {atlas.format && (
          <span className="inline lowercase whitespace-nowrap">
             {atlas.format},{" "}
          </span>
        )}
        {atlas.duration && <span className="inline">{atlas.duration}, </span>}
        {atlas.year && <span className="inline">{atlas.year}</span>}
      </div>
    </div>
  );
};

export default AtlasCard;
