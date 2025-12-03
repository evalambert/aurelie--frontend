// SliderLandscape.jsx
import { useState } from "react";

const SliderLandscape = ({ slider, mode, onLeave }) => {
    const [backgroundOn, setBackgroundOn] = useState(false);


    const imageCoverUrl =
        slider.cover?.formats?.large?.url ||
        slider.cover?.url ||
        null;

    const isCoverLandscape = slider.cover?.width > slider.cover?.height;
    const [loaded, setLoaded] = useState(!imageCoverUrl);

    const imageBackgroundUrl =
        slider.background?.formats?.xlarge?.url ||
        slider.background?.url ||
        null;

    // Gestion des opacités selon le mode
    const opacityClass = {
        current: "opacity-30",
        next: "opacity-[3%] pointer-events-none",
        hidden: "opacity-0 pointer-events-none",
    }[mode];

    return (
        <>

            <div className={`${loaded ? 'opacity-100' : 'opacity-0 pointer-events-none'} slider-landscape transition-opacity duration-700`}>
                <img src={imageCoverUrl} loading="lazy" onLoad={() => setLoaded(true)} onError={() => setLoaded(true)} ref={(img) => { if (img?.complete) setLoaded(true); }} onMouseEnter={() => setBackgroundOn(true)} onMouseLeave={() => { setBackgroundOn(false); if (onLeave) onLeave(); }} className={`fixed top-y-body md:left-[41.2vw] lg:left-[42vw] z-20 hover:[&+div]:opacity-100 max-h-[calc(100vh-(var(--spacing-y-body)*2))] ${opacityClass} ${isCoverLandscape ? 'md:max-w-[calc(57.8vw-var(--spacing-x-body))] lg:max-w-[calc(58vw-var(--spacing-x-body))]' : ''} ${backgroundOn ? 'z-100 !opacity-100 grayscale-0' : 'grayscale-100'}`} alt="" />

                <div className={`fixed top-0 right-0 w-screen h-screen pointer-events-none z-10 ${backgroundOn ? 'opacity-100 z-90' : 'opacity-0'}`}>
                    <img src={imageBackgroundUrl} loading="lazy" alt="" className="w-screen h-screen object-cover" />
                </div>
            </div>
        </>
    );
};

export default SliderLandscape;