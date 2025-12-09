// SliderLandscape.jsx
import { useState, useRef, useEffect } from "react";

const SliderLandscape = ({ slider, mode, isMobile, onMouseLeave }) => {
  const [hovered, setHovered] = useState(false);
  const rootRef = useRef(null);

  const imageCoverUrl =
    slider.cover?.formats?.large?.url || slider.cover?.url || "";
  const imageBackgroundUrl =
    slider.background?.formats?.xlarge?.url || slider.background?.url || "";

  const isLandscape = slider.cover?.width > slider.cover?.height;
  const isScrolling = useRef(false);

  const opacityClass = {
    current: "opacity-[35%]",
    next: "opacity-[10%] pointer-events-none",
    hidden: "opacity-0 pointer-events-none",
  }[mode];

  const handlePressStart = (e) => {
    // console.log pour debugging
    console.log("handler start (react)", e.type);
    setHovered(true);
  };

  const handlePressEnd = (e) => {
    console.log("handler end (react)", e?.type);
    // e.preventDefault(); // si besoin mais ici on utilise native avec passive:false
    setHovered(false);
    if (onMouseLeave) onMouseLeave();
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onTouchStart = (ev) => {
      isScrolling.current = false;
      setHovered(true);
      console.log("native touchstart");
    };

    const onTouchMove = (ev) => {
      console.log("native touchmove");
      isScrolling.current = true; // l’utilisateur scroll
    };

    const onTouchEnd = (ev) => {
      console.log("native touchend");

      if (!isScrolling.current) {
        // ➤ Super court : c’était un TAP → on change de slide
        setHovered(false);
        if (onMouseLeave) onMouseLeave();
      } else {
        // ➤ C’était un scroll → on ne déclenche rien
        setHovered(false);
      }
    };
    const onTouchCancel = (ev) => {
      console.log("native touchcancel", ev.type);
      setHovered(false);
    };

    const onPointerDown = (ev) => {
      console.log("native pointerdown", ev.type);
      setHovered(true);
    };
    const onPointerUp = (ev) => {
      console.log("native pointerup", ev.type);
      setHovered(false);
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
  }, [onMouseLeave]);

  return (
    <>
      <div
        ref={rootRef}
        // ajout de touch-action none inline pour forcer Safari à envoyer les events
        style={{ WebkitTapHighlightColor: "transparent" }}
        className={`slider-landscape absolute md:fixed md:top-[calc(var(--spacing-y-body)+17px)] md:left-[41.2vw] lg:left-[42vw] w-full md:w-[57.8vw] lg:w-[58vw] z-20 md:h-[calc(100vh-(var(--spacing-y-body)*2))] max-md:flex max-md:items-end max-md:h-[100svh] ${opacityClass} ${hovered ? "z-80 !opacity-100 grayscale-0" : "grayscale-100"}`}
        // on conserve tes handlers react au cas où
        {...(!isMobile
          ? {
            onMouseEnter: () => setHovered(true),
            onMouseLeave: () => {
              setHovered(false);
              if (onMouseLeave) onMouseLeave();
            },
          }
          : {
            onTouchStart: handlePressStart,
            onTouchEnd: handlePressEnd,
            // onTouchMove: () => {}, // plus nécessaire ici car on a natif
            onTouchCancel: () => {
              setHovered(false);
            },
            // onPointerDown & up natifs aussi ajoutés via useEffect
          })}
      >
        <img
          src={imageCoverUrl}
          draggable="false"
          className={` max-md:pb-[10px] max-md:pl-[10px] md:-mt-[17px] md:pointer-events-none max-h-[calc(100vh-(var(--spacing-y-body)*2))] ${isLandscape
            ? "max-w-[calc(100vw-var(--spacing-x-body))] md:max-w-[calc(57.8vw-var(--spacing-x-body))] lg:max-w-[calc(58vw-var(--spacing-x-body))]"
            : "max-w-[80vw] pl-[10px]"
            }`}
          alt=""
          loading="lazy"
        />
      </div>

      {imageBackgroundUrl && (
        <div
          className={`background-landscape fixed top-0 right-0 w-screen h-screen pointer-events-none z-10 ${hovered ? "opacity-100 z-70" : "opacity-0"}`}
        >
          <img
            src={imageBackgroundUrl}
            alt=""
            className="w-screen h-screen object-cover"
            loading="lazy"
            draggable="false"
          />
        </div>
      )}
    </>
  );
};

export default SliderLandscape;