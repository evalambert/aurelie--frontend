import { useState } from "react";
import { useResponsiveImage } from "../../../hooks/useResponsiveImage";

const AtlasCard = ({ id, atlas, onCardClick }) => {
  const [loaded, setLoaded] = useState(false);
  const imageUrl = useResponsiveImage(atlas.Image, "card");

  return (
    <div
      id={`atlas-${id}`}
      className="transition-opacity duration-500 cursor-pointer"
      style={{ opacity: loaded ? 1 : 0 }}
      onClick={() => onCardClick(atlas.Image)}
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
