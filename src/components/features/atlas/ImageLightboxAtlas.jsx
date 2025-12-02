import { useState, useEffect } from 'react';

const ImageLightboxAtlas = ({ imageData, toggleOpen, closeLightbox }) => {
    const [loaded, setLoaded] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (toggleOpen && imageData) {
            // Si imageData est une URL texte, on remplace "medium" par "large"
            let url = imageData;
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
            className={`fixed m-auto top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-fit h-fit
                        ${toggleOpen ? 'block' : 'hidden'}`}
            
        >
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="Image Lightbox"
                    className={`
                        m-auto block max-h-screen max-w-screen                       
                        transition-opacity duration-300
                        ${loaded ? 'opacity-100' : 'opacity-0'}
                    `}
                    onLoad={() => setLoaded(true)}
                    onClick={closeLightbox}
                    // si zoom sur image au click
                    // onClick={(e) => e.stopPropagation()} 
                />
            )}
        </div>
    );
};

export default ImageLightboxAtlas;