// AtlasCard.jsx
import { useState } from "react";

const AtlasCard = ({ id, atlas }) => {
    const medium = atlas.medium;
    // Vérifie si l'image existe et récupère l'URL
    const imageUrl = atlas.Image?.formats?.medium?.url;
    const [loaded, setLoaded] = useState(false);

    return (
        <div id={`atlas-${id}`} className="transition-opacity duration-700" 
        style={{ opacity: loaded ? 1 : 0 }}>
            {imageUrl ? (
                <div className="mb-[10px]">
                <img className="grayscale block w-full h-auto opacity-50" src={imageUrl} alt={atlas.title} onLoad={() => setLoaded(true)} />
                </div>
            ) : (<div></div>)}
            <div>
                <h2 className="inline">{atlas.title}</h2>
                {medium && <span className="inline lowercase">, {medium.medium}</span>}
                {atlas.format && <span className="inline lowercase">, {atlas.format}</span>}
                {atlas.year && <span className="inline">, {atlas.year}</span>}
                {atlas.duration && <span className="inline">, {atlas.duration}</span>}
            </div>
        </div>
    );
};

export default AtlasCard;