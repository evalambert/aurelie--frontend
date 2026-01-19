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
  const [shuffledSlides, setShuffledSlides] = useState([]);

  // Calcul de l'index suivant selon l'ordre aléatoire
  const nextIndex =
    shuffledSlides.length > 0 ? (current + 1) % shuffledSlides.length : 0;

  useEffect(() => {
    // Ce code ne s'exécute que côté client
    setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Détermine si un slide est paysage ou portrait à partir des dimensions de la cover
  const isLandscapeCover = (slide) => {
    const width = slide?.cover?.width;
    const height = slide?.cover?.height;
    if (typeof width !== "number" || typeof height !== "number") return null;
    return width > height; // même logique que dans SliderLandscape
  };

  // Crée un ordre aléatoire au chargement, en évitant que le premier slide
  // soit le même que lors du précédent chargement de page
  // et en alternant au maximum les formats portrait / paysage
  useEffect(() => {
    if (!slides || slides.length === 0) {
      setShuffledSlides([]);
      return;
    }

    // Sépare les slides par orientation
    const landscape = [];
    const portrait = [];

    slides.forEach((slide) => {
      const landscapeFlag = isLandscapeCover(slide);
      if (landscapeFlag === null) {
        // Si pas d'info, on le met au hasard dans un des deux groupes pour ne pas bloquer
        (Math.random() < 0.5 ? landscape : portrait).push(slide);
      } else if (landscapeFlag) {
        landscape.push(slide);
      } else {
        portrait.push(slide);
      }
    });

    // Shuffle simple de chaque groupe
    const shuffleInPlace = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    };

    shuffleInPlace(landscape);
    shuffleInPlace(portrait);

    // Choix du type qui commence : on essaie de garder une alternance réaliste
    let startWithLandscape;
    if (!landscape.length && portrait.length) {
      startWithLandscape = false;
    } else if (!portrait.length && landscape.length) {
      startWithLandscape = true;
    } else {
      const diff = landscape.length - portrait.length;
      if (Math.abs(diff) > 1) {
        startWithLandscape = diff > 0;
      } else {
        startWithLandscape = Math.random() < 0.5;
      }
    }

    // Construit une séquence alternée paysage/portrait autant que possible
    const alternated = [];
    let lIndex = 0;
    let pIndex = 0;
    let turn = 0;

    while (lIndex < landscape.length || pIndex < portrait.length) {
      const wantLandscape =
        startWithLandscape ? turn % 2 === 0 : turn % 2 === 1;

      if (wantLandscape) {
        if (lIndex < landscape.length) {
          alternated.push(landscape[lIndex++]);
        } else if (pIndex < portrait.length) {
          alternated.push(portrait[pIndex++]);
        }
      } else {
        if (pIndex < portrait.length) {
          alternated.push(portrait[pIndex++]);
        } else if (lIndex < landscape.length) {
          alternated.push(landscape[lIndex++]);
        }
      }

      turn++;
    }

    let finalSlides = alternated;

    if (typeof window !== "undefined") {
      const LAST_FIRST_KEY = "landscapeSlider:lastFirstId";
      const lastFirstId = window.localStorage.getItem(LAST_FIRST_KEY);

      // Si le premier est le même que le précédent, on cherche un autre slide
      // de même orientation pour le remplacer, afin de conserver l'alternance.
      if (
        lastFirstId &&
        finalSlides.length > 1 &&
        String(finalSlides[0]?.id) === String(lastFirstId)
      ) {
        const firstIsLandscape = isLandscapeCover(finalSlides[0]);
        const idxSwap = finalSlides.findIndex((s, idx) => {
          if (idx === 0) return false;
          if (String(s.id) === String(lastFirstId)) return false;
          return isLandscapeCover(s) === firstIsLandscape;
        });

        if (idxSwap > 0) {
          const tmp = finalSlides[0];
          finalSlides[0] = finalSlides[idxSwap];
          finalSlides[idxSwap] = tmp;
        }
      }

      // On mémorise le nouveau premier slide
      if (finalSlides[0]?.id) {
        window.localStorage.setItem(LAST_FIRST_KEY, String(finalSlides[0].id));
      }
    }

    setShuffledSlides(finalSlides);
    setCurrent(0);
  }, [slides]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    if (!shuffledSlides.length) return;

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
        {shuffledSlides.map((slide, index) => {
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