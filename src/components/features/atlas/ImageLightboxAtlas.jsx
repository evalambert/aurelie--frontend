import { useState, useEffect } from 'react';
import { getResponsiveImageUrl } from '../../../assets/scripts/libs/getImageUrl';

const ImageLightboxAtlas = ({ imageData, toggleOpen, closeLightbox }) => {
  const [loaded, setLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const updateImage = () => {
      if (toggleOpen && imageData) {
        const width = window.innerWidth;
        const url = getResponsiveImageUrl(imageData, 'lightbox', width);
        setImageUrl(url);
        setLoaded(false);
      } else {
        setImageUrl(null);
        setLoaded(false);
      }
    };

    updateImage();
    window.addEventListener('resize', updateImage);
    return () => window.removeEventListener('resize', updateImage);
  }, [toggleOpen, imageData]);

  if (!imageUrl) return null;

  return (
    <div className={`fixed m-auto top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-90 w-fit h-fit ${toggleOpen ? 'block' : 'hidden'}`}>
      <img
        src={imageUrl}
        alt="Image Lightbox"
        className={`m-auto block max-h-screen max-w-screen transition-opacity duration-300 z-90 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onClick={closeLightbox}
      />
    </div>
  );
};

export default ImageLightboxAtlas;
