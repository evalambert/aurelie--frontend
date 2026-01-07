// components/features/exhibitions/ImageExhibitionItem.jsx
import { useState, useRef, useEffect } from "react";
import { previewStore } from "../../../stores/previewStore";
import { useResponsiveImage } from "../../../hooks/useResponsiveImage";
import { useIsDesktop } from "../../../hooks/isDesktop";

export default function ImageExhibitionItem({ img }) {
  const isLandscape = img.width > img.height;
  const isDesktop = useIsDesktop(1024);

  const imageUrl = useResponsiveImage(img, "card");

  const previewUrl = img.formats?.large?.url || img.url;

  //// Mobile
  const [hovered, setHovered] = useState(false);
  const isScrolling = useRef(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (isDesktop) return; // ❌ pas de GSAP desktop
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
  }, [isDesktop]);

  // Tous les hooks doivent être appelés avant tout return conditionnel
  if (!imageUrl) return null;

  const handlePressStart = (e) => {
    console.log("handler start (react)", e.type);
    setHovered(true);
  };

  const handlePressEnd = (e) => {
    console.log("handler end (react)", e?.type);
    setHovered(false);
  };

  return (
    <div className="w-full flex justify-start">
      <img
        ref={rootRef}
        src={imageUrl}
        alt={img.alternativeText || img.name}
        width={img.width}
        height={img.height}
        loading="lazy"
        data-preview={previewUrl} // 🔥 nécessaire pour GSAP mobile
        className={
          "exhibition-image filter grayscale opacity-50 w-full h-auto pb-[10px] " +
          (isLandscape ? "lg:w-[70%] " : "lg:w-[50%] ") +
          (hovered ? " z-80 !opacity-100 grayscale-0" : " grayscale-100")
        }
        onPointerEnter={
          isDesktop ? () => previewStore.setHoverImage(previewUrl) : undefined
        }
        onPointerLeave={isDesktop ? () => previewStore.clearHover() : undefined}
        {...(!isDesktop
          ? {
            onTouchStart: handlePressStart,
            onTouchEnd: handlePressEnd,
            onTouchCancel: () => {
              setHovered(false);
            },
            // onPointerDown & up natifs aussi ajoutés via useEffect
          }
          : {
            // Desktop handlers
          })}
      />
    </div>
  );
}