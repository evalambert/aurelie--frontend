// SliderLandscape.jsx
import { useState } from "react";
const SliderLandscape = ({ slider, mode, isMobile, onMouseLeave }) => {
  const [hovered, setHovered] = useState(false);

  const imageCoverUrl =
    slider.cover?.formats?.large?.url || slider.cover?.url || "";
  const imageBackgroundUrl =
    slider.background?.formats?.xlarge?.url || slider.background?.url || "";

  const isLandscape = slider.cover?.width > slider.cover?.height;

  const opacityClass = {
    current: "opacity-[35%]",
    next: "opacity-[10%] pointer-events-none",
    hidden: "opacity-0 pointer-events-none",
  }[mode];

  const handlePressStart = (e) => {
    // e.preventDefault(); // empêche le scroll si nécessaire
    setHovered(true);
  };

  const handlePressEnd = (e) => {
    e.preventDefault();
    setHovered(false);
    onMouseLeave(); // change de slide
    console.log("couuucouuu");
  };

  return (
    <>
      {/* Image principale */}
      <div
        className={`slider-landscape border-2 border-red-500 absolute md:fixed md:top-[calc(var(--spacing-y-body)+17px)] md:left-[41.2vw] lg:left-[42vw] w-full md:w-[57.8vw] lg:w-[58vw] z-20 md:h-[calc(100vh-(var(--spacing-y-body)*2))] max-md:flex max-md:items-end max-md:h-[100svh] ${opacityClass} ${hovered ? "z-80 !opacity-100 grayscale-0" : "grayscale-100"}`}
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
          })}
      >
        <img
          src={imageCoverUrl}
          className={` max-md:pb-[10px] max-md:pl-[10px] md:-mt-[17px] md:pointer-events-none max-h-[calc(100vh-(var(--spacing-y-body)*2))] ${isLandscape
              ? "max-w-[calc(100vw-var(--spacing-x-body))] md:max-w-[calc(57.8vw-var(--spacing-x-body))] lg:max-w-[calc(58vw-var(--spacing-x-body))]"
              : "max-w-[80vw] pl-[10px]"
            }`}
          alt=""
          loading="lazy"
        />
      </div>

      {/* Background */}
      {imageBackgroundUrl && (
        <div
          className={`background-landscape fixed top-0 right-0 w-screen h-screen pointer-events-none z-10 ${hovered ? "opacity-100 z-70" : "opacity-0"
            }`}
        >
          <img
            src={imageBackgroundUrl}
            alt=""
            className="w-screen h-screen object-cover"
            loading="lazy"
          />
        </div>
      )}
    </>
  );
};

export default SliderLandscape;