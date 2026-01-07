// PreviewPanel.jsx
import { useState, useEffect } from "react";
import SliderLandscape from "./landscape/SliderLandscape.jsx";
import ImageResponsivePreviewPannel from "../common/ImageResponsivePreviewPannel.jsx";
import VideoResponsivePreviewPannel from "../common/VideoResponsivePreviewPannel.jsx";

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

      {/* Zone PREVIEW IMAGE/VIDEO */}
      <div
        className={
          "preview-panel-exhibition z-80 transition-opacity duration-300 fixed lg:left-[41.2vw] lg:left-[42vw] w-full lg:w-[57.8vw] lg:w-[58vw] lg:h-[calc(100vh-(var(--spacing-y-body)*2))] max-lg:flex max-lg:items-end max-lg:h-[100svh] lg:pt-y-body " +
          (preview.hoverImage ? "opacity-100 pointer-events-auto" : "lg:opacity-0 pointer-events-none")
        }
      >
        {preview.images.map((media) => {
          const isVisible =
            (media.formats?.large?.url || media.url) === preview.hoverImage;
          
          // Si c'est une vidéo, utiliser VideoResponsivePreviewPannel
          if (media.type === 'video') {
            return (
              <VideoResponsivePreviewPannel
                key={media.id}
                video={{ url: media.videoUrl }}
                isVisible={isVisible}
              />
            );
          }
          
          // Sinon, utiliser ImageResponsivePreviewPannel
          return (
            <ImageResponsivePreviewPannel
              key={media.id}
              img={media}
              isVisible={isVisible}
            />
          );
        })}
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