// PreviewPanel.jsx
import { useState } from "react";
import SliderLandscape from "./landscape/SliderLandscape.jsx";

export default function PreviewPanel({ slidersLandscape }) {
  const slides = slidersLandscape.slideLandscape || [];
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // pour savoir si la souris est sur le panel

  const nextIndex = (current + 1) % slides.length;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // On ne change de slide que si la souris est entrée avant
    if (isHovered) {
      setCurrent(nextIndex);
      setIsHovered(false); // reset hover pour le prochain cycle
    }
  };

  return (
    <div
      className="preview-panel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {slides.map((slide, index) => {
        if (index !== current && index !== nextIndex) return null;
        const mode = index === current ? "current" : "next";

        return (
          <SliderLandscape
            key={slide.id}
            slider={slide}
            mode={mode}
            // onMouseLeave n'est plus nécessaire ici
          />
        );
      })}
    </div>
  );
}