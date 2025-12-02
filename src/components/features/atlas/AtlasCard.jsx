// AtlasCard.jsx
import { useState } from "react";

const AtlasCard = ({ id, atlas, onCardClick }) => {
    const medium = atlas.medium;

    const imageUrl =
        atlas.Image?.formats?.medium?.url ||
        atlas.Image?.url ||
        null;

    const imageLightbox =
        atlas.Image?.formats?.xlarge?.url ||
        atlas.Image?.url ||
        null;

    const [loaded, setLoaded] = useState(!imageUrl);



    return (
        <div id={`atlas-${id}`} className="transition-opacity duration-500 cursor-pointer"
            style={{ opacity: loaded ? 1 : 0 }} onClick={() => onCardClick(imageLightbox)} >
            {imageUrl ? (
                <div className="mb-[10px]">
                    <img className="grayscale block w-full h-auto opacity-50" src={imageUrl} alt={atlas.title} onLoad={() => setLoaded(true)}
                        onError={() => setLoaded(true)}
                        ref={(img) => {
                            if (img?.complete) setLoaded(true);
                        }} />
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