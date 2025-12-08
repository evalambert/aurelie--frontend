// SliderLandscape.jsx
import { useState } from "react";

const SliderLandscape = ({ slider, mode, onMouseLeave }) => {
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

  return (
    <>
      {/* Image principale */}
      <div
        className={`slider-landscape fixed top-[calc(var(--spacing-y-body)+17px)] md:left-[41.2vw] lg:left-[42vw] md:w-[57.8vw] lg:w-[58vw] z-20 h-[calc(100vh-(var(--spacing-y-body)*2))]  ${opacityClass} ${hovered ? "z-50 !opacity-100 grayscale-0" : "grayscale-100"}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          if (onMouseLeave) onMouseLeave();
        }}
      >
        <img
          src={imageCoverUrl}
          className={`-mt-[17px] pointer-events-none max-h-[calc(100vh-(var(--spacing-y-body)*2))] ${
            isLandscape
              ? "md:max-w-[calc(57.8vw-var(--spacing-x-body))] lg:max-w-[calc(58vw-var(--spacing-x-body))]"
              : "pl-[10px]"
          }`}
          alt=""
          loading="lazy"
        />
      </div>

      {/* Background */}
      {imageBackgroundUrl && (
        <div
          className={`fixed top-0 right-0 w-screen h-screen pointer-events-none z-10 ${
            hovered ? "opacity-100 z-40" : "opacity-0"
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