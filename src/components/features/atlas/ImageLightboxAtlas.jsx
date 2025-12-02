import { useState, useEffect } from 'react';

const ImageLightboxAtlas = ({ imageData, toggleOpen, closeLightbox }) => {
    const [loaded, setLoaded] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (toggleOpen && imageData) {
            // Si imageData est une URL texte, on remplace "medium" par "large"
            let url = imageData;
            if (typeof imageData === 'string' && imageData.includes('medium')) {
                url = imageData.replace('medium', 'large');
            }
            setImageUrl(url);
            setLoaded(false);
        } else {
            // Vider l'URL quand la lightbox se ferme
            setImageUrl(null);
            setLoaded(false);
        }
    }, [toggleOpen, imageData]);

    return (
        <div 
            className={`fixed top-0 left-0 w-full h-full 
                        ${toggleOpen ? 'block' : 'hidden'}`}
            onClick={closeLightbox}
        >
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="Image Lightbox"
                    className={`
                        m-auto block
                        w-fit h-full object-contain 
                        transition-opacity duration-300
                        ${loaded ? 'opacity-100' : 'opacity-0'}
                    `}
                    onLoad={() => setLoaded(true)}
                    // si zoom sur image au click
                    // onClick={(e) => e.stopPropagation()} 
                />
            )}
        </div>
    );
};

export default ImageLightboxAtlas;