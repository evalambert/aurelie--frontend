import { useState, useEffect } from "react";
import { useResponsiveImage } from "../../../hooks/useResponsiveImage";

const ImageLightboxAtlas = ({ imageData, toggleOpen, closeLightbox }) => {
  const [loaded, setLoaded] = useState(false);
  
  // Vérifier si oembedVideo existe et contient du HTML
  const hasVideo = imageData?.oembedVideo?.oembed?.html;
  const videoHtml = hasVideo ? imageData.oembedVideo.oembed.html : null;
  
  // Pour l'image, utiliser imageData.image si c'est un objet atlas complet
  const imageObj = imageData?.image || imageData;
  
  // Si l'image a déjà une URL traitée (formats undefined), l'utiliser directement
  // Sinon, utiliser useResponsiveImage pour traiter l'image
  // Note: getResponsiveImageUrl retourne directement image.url si formats n'existe pas
  const responsiveImageUrl = useResponsiveImage(imageObj, "lightbox");
  const imageUrl = imageObj?.formats === undefined && imageObj?.url 
    ? imageObj.url 
    : responsiveImageUrl;

  // Réinitialiser l'état de chargement quand imageData change
  useEffect(() => {
    setLoaded(false);
  }, [imageData]);

  // Ne pas rendre si pas d'image ni de vidéo
  if (!imageUrl && !videoHtml) return null;

  // Si on a une vidéo, l'afficher
  if (hasVideo && videoHtml) {
    return (
      <div 
        className={`fixed top-0 left-0 w-full h-full z-90 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
          toggleOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`} 
        onClick={closeLightbox}
      >
        <div 
          className="m-auto max-h-[90vh] max-w-screen md:max-w-[90vw] w-full aspect-video "
          onClick={(e) => e.stopPropagation()}
          dangerouslySetInnerHTML={{ __html: videoHtml }}
        />
      </div>
    );
  }

  // Sinon, afficher l'image
  return (
    <div 
      className={`fixed top-0 left-0 w-full h-full z-90 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
        toggleOpen && imageUrl && loaded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`} 
      onClick={closeLightbox}
    >
      <img
        key={imageObj?.id || imageUrl}
        src={imageUrl}
        alt="Image Lightbox"
        className={`m-auto block max-h-screen max-w-screen`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default ImageLightboxAtlas;
