// PreviewPanel.jsx
import { useState } from "react";
import SliderLandscape from "./landscape/SliderLandscape.jsx";
// import WrapperExhibitionPreview from "./exhibitions/WrapperExhibitionPreview.jsx";

export default function PreviewPanel({ slidersLandscape }) {

    // SLIDER ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    const slides = slidersLandscape.slideLandscape || [];
    const [current, setCurrent] = useState(0);
    const next = (current + 1) % slides.length;

    const handleMouseLeave = () => {
        console.log("coucou 8!8");
        setCurrent(next);
    };

    return (
        <>
            {slides.map((slide, index) => {
                let mode = "hidden";
                
                if (index !== current && index !== next) return null;
                if (index === current) mode = "current";
                else if (index === next) mode = "next";
                else mode = "hidden";

                return (
                    <SliderLandscape
                        key={slide.id}
                        slider={slide}
                        mode={mode}
                        onLeave={handleMouseLeave}
                    />
                );
            })}

        </>
    );
}
