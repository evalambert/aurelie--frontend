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
        current: "opacity-[35%]",
        next: "opacity-[10%] pointer-events-none",
        hidden: "opacity-0 pointer-events-none",
    }[mode];

    return (
        <>

            <div className={`${loaded ? 'opacity-100' : 'opacity-0 pointer-events-none'} slider-landscape transition-opacity duration-700 max-md:hidden max-md:pointer-events-auto`}>
                <div className={`fixed top-[calc(var(--spacing-y-body)+17px)] md:left-[41.2vw] lg:left-[42vw] md:w-[57.8vw] lg:w-[58vw] z-20 hover:[&+div]:opacity-100 h-[calc(100vh-(var(--spacing-y-body)*2))] ${opacityClass}  ${backgroundOn ? 'z-100 !opacity-100 grayscale-0' : 'grayscale-100'}`} onMouseEnter={() => setBackgroundOn(true)} onMouseLeave={() => { setBackgroundOn(false); if (onLeave) onLeave(); }}>
                    <img src={imageCoverUrl} className={` -mt-[17px] pointer-events-none max-h-[calc(100vh-(var(--spacing-y-body)*2))] ${isCoverLandscape ? 'md:max-w-[calc(57.8vw-var(--spacing-x-body))] lg:max-w-[calc(58vw-var(--spacing-x-body))]' : 'pl-[10px]'}`} loading="lazy" onLoad={() => setLoaded(true)} onError={() => setLoaded(true)} ref={(img) => { if (img?.complete) setLoaded(true); }} alt="" />
                </div>

                <div className={`fixed top-0 right-0 w-screen h-screen pointer-events-none z-10 ${backgroundOn ? 'opacity-100 z-90' : 'opacity-0'}`}>
                    <img src={imageBackgroundUrl} loading="lazy" alt="" className="w-screen h-screen object-cover" />
                </div>
            </div>
        </>
    );
};

export default SliderLandscape;