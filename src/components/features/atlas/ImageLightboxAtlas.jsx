import { useState } from "react";
import { useResponsiveImage } from "../../../hooks/useResponsiveImage";

const ImageLightboxAtlas = ({ imageData, toggleOpen, closeLightbox }) => {
  const [loaded, setLoaded] = useState(false);
  const imageUrl = useResponsiveImage(imageData, "lightbox");

  if (!toggleOpen || !imageUrl) return null;

  return (
    <div className="fixed m-auto top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-90 w-fit h-fit">
      <img
        src={imageUrl}
        alt="Image Lightbox"
        className={`m-auto block max-h-screen max-w-screen transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onClick={closeLightbox}
      />
    </div>
  );
};

export default ImageLightboxAtlas;
