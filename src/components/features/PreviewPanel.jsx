// PreviewPanel.jsx
import { useState, useEffect } from "react";
import SliderLandscape from "./landscape/SliderLandscape.jsx";

export default function PreviewPanel({ slidersLandscape }) {
  const slides = slidersLandscape.slideLandscape || [];
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // état pour mobile

  const nextIndex = (current + 1) % slides.length;

  useEffect(() => {
    // Ce code ne s'exécute que côté client
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    if (isHovered) {
      setCurrent(nextIndex);
      setIsHovered(false);
    }
  };

  return (
    <div
      className="preview-panel"
      {...(!isMobile
        ? { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }
        : {})}
    >
      {slides.map((slide, index) => {
        if (index !== current && index !== nextIndex) return null;
        const mode = index === current ? "current" : "next";

        return (
          <SliderLandscape
            key={slide.id}
            slider={slide}
            mode={mode}
            isMobile={isMobile}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
}