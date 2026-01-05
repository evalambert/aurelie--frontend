import { useState } from "react";
import { useResponsiveImage } from "../../../hooks/useResponsiveImage";
import { useIsDesktop } from "../../../hooks/isDesktop";
import { getResponsiveImageUrl } from "../../../assets/scripts/libs/getImageUrl";

const AtlasCard = ({ id, atlas, onCardClick }) => {
  const [loaded, setLoaded] = useState(false);
  const imageUrl = useResponsiveImage(atlas.Image, "card");
  const isDesktop = useIsDesktop(1024);

  const getClickImage = () => {
    if (!atlas.Image) return atlas.Image;
    const width = window.innerWidth;
    let imageUrl;
    
    if (isDesktop) {
      // Version lightbox en desktop (comme useResponsiveImage(slider.background, "lightbox"))
      imageUrl = getResponsiveImageUrl(atlas.Image, "lightbox", width);
    } else {
      // Version medium en mobile
      imageUrl = atlas.Image.formats?.medium?.url || atlas.Image.url;
    }
    
    // Retourner un objet image avec l'URL mise à jour et sans formats
    // pour que ImageLightboxAtlas utilise directement cette URL
    return {
      ...atlas.Image,
      url: imageUrl,
      formats: undefined // Supprimer formats pour forcer l'utilisation de l'URL
    };
  };

  return (
    <div
      id={`atlas-${id}`}
      className="transition-opacity duration-500 cursor-pointer"
      style={{ opacity: loaded ? 1 : 0 }}
      onClick={() => onCardClick(getClickImage())}
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
        <h2 className="inline">{atlas.title}</h2>
        {atlas.medium && (
          <span className="inline lowercase">, {atlas.medium.medium}</span>
        )}
        {atlas.format && (
          <span className="inline lowercase">, {atlas.format}</span>
        )}
        {atlas.year && <span className="inline">, {atlas.year}</span>}
        {atlas.duration && <span className="inline">, {atlas.duration}</span>}
      </div>
    </div>
  );
};

export default AtlasCard;
