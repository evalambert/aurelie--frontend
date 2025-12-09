//components/features/exhibitions/ImageExhibition.jsx
import { useState } from "react";

export default function ImagesExhibition({ item }) {
  return (
    <div className="exhibition--images flex flex-col gap-[10px] md:pl-[55px]">
      {item.exhibitionView?.map((img) => {
        const isLandscape = img.width > img.height;

        return (
          <div key={img.id} className="w-full flex justify-start">
            <img
              src={img.url}
              alt={img.alternativeText || img.name}
              width={img.width}
              height={img.height}
              loading="lazy"
              className={
                "filter grayscale opacity-50 w-full h-auto " +
                (isLandscape ? "md:w-[70%]" : "md:w-[50%]")
              }
            />
          </div>
        );
      })}
    </div>
  );
}
