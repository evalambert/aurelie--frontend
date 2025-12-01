// ImageAtlas.jsx


import { useState } from "react";

const ImageAtlas = ({ id, atlas }) => {
    const medium = atlas.medium;
    // Vérifie si l'image existe et récupère l'URL
    const imageUrl = atlas.Image?.formats?.large?.url;
    const [loaded, setLoaded] = useState(false);

    return (
        <div id={`atlas-${id}`} className="transition-opacity duration-700" 
        style={{ opacity: loaded ? 1 : 0 }}>
            {imageUrl ? (
                
                <img className="" src={imageUrl} alt={atlas.title} onLoad={() => setLoaded(true)} />
                
            ) : (<div></div>)}
        </div>
    );
};

export default ImageAtlas;