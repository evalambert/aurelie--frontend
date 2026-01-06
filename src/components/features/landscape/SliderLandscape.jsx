// SliderLandscape.jsx
import { useState, useRef, useEffect } from "react";
import { useResponsiveImage } from "../../../hooks/useResponsiveImage";

const SliderLandscape = ({ slider, mode, isMobile, onMouseLeave }) => {
  const [hovered, setHovered] = useState(false);
  const coverUrl = useResponsiveImage(slider.cover, "cover"); // image ou vidéo
  const backgroundUrl = useResponsiveImage(slider.background, "lightbox");
  const coverVideoImage = useResponsiveImage(slider.coverVideo, "cover");
  console.log("coverVideoImage", coverVideoImage);

  const isCoverVideo = slider.cover?.mime?.startsWith("video/");
  const isBackgroundVideo = slider.background?.mime?.startsWith("video/");
  const hasCoverVideoImage = !!slider.coverVideo; // existe et n'est pas null/undefined

  const rootRef = useRef(null);
  const coverVideoRef = useRef(null);

  const isLandscape = slider.cover?.width > slider.cover?.height;
  const isScrolling = useRef(false);

  const opacityClass = {
    current: "opacity-[35%]",
    next: "opacity-[10%] pointer-events-none",
    hidden: "opacity-0 pointer-events-none",
  }[mode];

  const playCoverVideo = () => {
    if (isCoverVideo && coverVideoRef.current) {
      coverVideoRef.current.play().catch(() => { });
    }
  };

  const pauseCoverVideo = () => {
    if (isCoverVideo && coverVideoRef.current) {
      coverVideoRef.current.pause();
    }
  };

  const handlePressStart = (e) => {
    // console.log pour debugging
    console.log("handler start (react)", e.type);
    setHovered(true);
    playCoverVideo();
  };

  const handlePressEnd = (e) => {
    console.log("handler end (react)", e?.type);
    // e.preventDefault(); // si besoin mais ici on utilise native avec passive:false
    setHovered(false);
    pauseCoverVideo();
    if (onMouseLeave) onMouseLeave();
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onTouchStart = (ev) => {
      isScrolling.current = false;
      setHovered(true);
      console.log("native touchstart");
      playCoverVideo();
    };

    const onTouchMove = (ev) => {
      console.log("native touchmove");
      setHovered(false);
      isScrolling.current = true; // l’utilisateur scroll
      pauseCoverVideo();
    };

    const onTouchEnd = (ev) => {
      console.log("native touchend");

      if (!isScrolling.current) {
        // ➤ Super court : c’était un TAP → on change de slide
        setHovered(false);
        pauseCoverVideo();
        if (onMouseLeave) onMouseLeave();
      } else {
        // ➤ C’était un scroll → on ne déclenche rien
        setHovered(false);
        pauseCoverVideo();
      }
    };
    const onTouchCancel = (ev) => {
      console.log("native touchcancel", ev.type);
      setHovered(false);
      pauseCoverVideo();
    };

    const onPointerDown = (ev) => {
      console.log("native pointerdown", ev.type);
      setHovered(true);
      playCoverVideo();
    };
    const onPointerUp = (ev) => {
      console.log("native pointerup", ev.type);
      setHovered(false);
      pauseCoverVideo();
      if (onMouseLeave) onMouseLeave();
    };

    // IMPORTANT: passive: false pour pouvoir preventDefault si nécessaire
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: false });
    el.addEventListener("touchcancel", onTouchCancel, { passive: false });

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchCancel);

      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
    };
  }, [onMouseLeave, isCoverVideo]);

  return (
    <>
      <div
        ref={rootRef}
        // ajout de touch-action none inline pour forcer Safari à envoyer les events
        style={{ WebkitTapHighlightColor: "transparent" }}
        className={`slider-landscape absolute md:fixed md:top-[calc(var(--spacing-y-body)+17px)] md:left-[41.2vw] lg:left-[42vw] w-full md:w-[57.8vw] lg:w-[58vw] z-20 md:h-[calc(100vh-(var(--spacing-y-body)*2))] max-md:flex max-md:items-end max-md:h-[100svh] ${opacityClass} ${hovered ? "z-80 !opacity-100 grayscale-0" : "grayscale-100"
          }`}
        // on conserve tes handlers react au cas où
        {...(!isMobile
          ? {
            onMouseEnter: () => {
              setHovered(true);
              playCoverVideo();
            },
            onMouseLeave: () => {
              setHovered(false);
              pauseCoverVideo();
              if (onMouseLeave) onMouseLeave();
            },
          }
          : {
            onTouchStart: handlePressStart,
            onTouchEnd: handlePressEnd,
            // onTouchMove: () => {}, // plus nécessaire ici car on a natif
            onTouchCancel: () => {
              setHovered(false);
              pauseCoverVideo();
            },
            // onPointerDown & up natifs aussi ajoutés via useEffect
          })}
      >
        <div className="relative">
 
          {/* Affiche la vidéo SI cover est une vidéo */}
          {isCoverVideo && (
            <div className="max-md:pb-x-body max-md:pl-x-body md:mt-[-17px] max-w-[calc(100vw-10px)] md:max-w-[calc(57.8vw-10px)] lg:max-w-[calc(58vw-10px)]">
              <video
                ref={coverVideoRef}
                src={coverUrl || slider.cover?.url}
                className={`opacity-100 md:pointer-events-none`}
                loop
                muted
                playsInline
              />
            </div>
          )}

          {/* Affiche l'image coverVideo SI elle existe (peut être une image, même si cover est une vidéo) */}
          {hasCoverVideoImage && coverVideoImage && (
            <div className="md:hidden absolute overflow-hidden top-0 max-md:left-[10px] md:mt-[-17px] max-w-[calc(100vw-20px)] md:max-w-[calc(57.8vw-10px)] lg:max-w-[calc(58vw-10px)]">
              <img className="image--video w-full h-full object-cover " src={coverVideoImage} alt="" />
            </div>
          )}
        </div>

        {/* Si ce n'est pas une vidéo, affiche l'image cover */}
        {!isCoverVideo && (
          <img
            src={coverUrl}
            draggable="false"
            className={` max-md:pb-[10px] max-md:pl-[10px] md:-mt-[17px] md:pointer-events-none max-h-[calc(100vh-(var(--spacing-y-body)*2))] ${isLandscape
              ? "max-w-[calc(100vw-var(--spacing-x-body))] md:max-w-[calc(57.8vw-10px)] lg:max-w-[calc(58vw-10px)]"
              : "max-w-[80vw] pl-[10px]"
              }`}
            alt=""
            loading="lazy"
          />
        )}
      </div>

      {(backgroundUrl || slider.background) && (
        <div
          className={`background-landscape fixed top-0 right-0 w-screen h-screen pointer-events-none z-10 ${hovered ? "opacity-100 z-70" : "opacity-0"
            }`}
        >
          {isBackgroundVideo ? (
            <video
              src={backgroundUrl || slider.background?.url}
              className="w-screen h-screen object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={backgroundUrl}
              alt=""
              className="w-screen h-screen object-cover"
              loading="lazy"
              draggable="false"
            />
          )}
        </div>
      )}
    </>
  );
};

export default SliderLandscape;
