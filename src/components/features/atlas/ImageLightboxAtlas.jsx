import { useState, useEffect } from "react";
import { useResponsiveImage } from "../../../hooks/useResponsiveImage";

const ImageLightboxAtlas = ({ imageData, toggleOpen, closeLightbox }) => {
  const [loaded, setLoaded] = useState(false);
  const imageUrl = useResponsiveImage(imageData, "lightbox");

  // Réinitialiser l'état de chargement quand imageData change
  useEffect(() => {
    setLoaded(false);
  }, [imageData]);

  // Ne pas rendre si pas d'image, mais toujours rendre le conteneur pour la transition
  if (!imageUrl) return null;

  return (
    <div 
      className={`fixed top-0 left-0 w-full h-full z-90 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
        toggleOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`} 
      onClick={closeLightbox}
    >
      <img
        key={imageData?.id || imageUrl}
        src={imageUrl}
        alt="Image Lightbox"
        className={`m-auto block max-h-screen max-w-screen`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default ImageLightboxAtlas;
