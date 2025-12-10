import { useState, useEffect } from "react";
import { getResponsiveImageUrl } from "../../../assets/scripts/libs/getImageUrl";
import { previewStore } from "../../../stores/previewStore";

export default function ImagesExhibition({ item }) {

  return (
    <div className="exhibition--images flex flex-col md:pl-[55px]">
      {item.exhibitionView?.map((img) => {
        const isLandscape = img.width > img.height;
        const [imageUrl, setImageUrl] = useState(null);

        useEffect(() => {
          const updateImage = () => {
            const width = window.innerWidth;
            const url = getResponsiveImageUrl(img, "card", width);
            setImageUrl(url);
          };
          updateImage();
          window.addEventListener("resize", updateImage);
          return () => window.removeEventListener("resize", updateImage);
        }, [img]);

        return (
          <div key={img.id} className="w-full flex justify-start">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={img.alternativeText || img.name}
                width={img.width}
                height={img.height}
                loading="lazy"
                onPointerEnter={() => {
                  previewStore.setHoverImage(img.formats?.large?.url || img.url);
                  console.log("image enter");
                }
                }
                onPointerLeave={() =>
                  previewStore.clearHover()
                }
                className={
                  "filter grayscale opacity-50 w-full h-auto pb-[10px] " +
                  (isLandscape ? "md:w-[70%]" : "md:w-[50%]")
                }
              />
            )}
          </div>
        );
      })}
    </div>
  );
}