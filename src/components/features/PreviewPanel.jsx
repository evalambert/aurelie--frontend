// PreviewPanel.jsx
import { useState, useEffect } from "react";
import SliderLandscape from "./landscape/SliderLandscape.jsx";
import ImageResponsivePreviewPannel from "../common/ImageResponsivePreviewPannel.jsx";

export default function PreviewPanel({ slidersLandscape }) {

  // PREVIEW EXHIBITION
  const [preview, setPreview] = useState({
    images: [],
    active: false,
    hoverImage: null
  });

  useEffect(() => {
    const handler = (e) => {
      // e.detail contient maintenant images, active, hoverImage
      setPreview({
        images: e.detail.images || [],
        active: e.detail.active || false,
        hoverImage: e.detail.hoverImage || null
      });
    };

    window.addEventListener("preview:update", handler);
    return () => window.removeEventListener("preview:update", handler);
  }, []);




  // SLIDER LANDSCAPE
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
    } else if (isMobile) {
      setCurrent(nextIndex);
    }
  };

  return (
    <>

      {/* Zone PREVIEW IMAGE */}
      <div
        className={
          "preview-panel-exhibition z-80 transition-opacity duration-300 absolute md:fixed md:left-[41.2vw] lg:left-[42vw] w-full md:w-[57.8vw] lg:w-[58vw] md:h-[calc(100vh-(var(--spacing-y-body)*2))] max-md:flex max-md:items-end max-md:h-[100svh] md:pt-y-body " +
          (preview.hoverImage ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
        }
      >
        {preview.images.map((img) => (
          <ImageResponsivePreviewPannel
            key={img.id}
            img={img}
            isVisible={
              (img.formats?.large?.url || img.url) === preview.hoverImage
            }
          />
        ))}
      </div>
      <div
        className={
          "preview-panel-landscape transition-opacity duration-300 " +
          (preview.hoverImage ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto")
        }
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

    </>
  );
}