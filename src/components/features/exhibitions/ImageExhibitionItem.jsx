// components/features/exhibitions/ImageExhibitionItem.jsx
import { previewStore } from "../../../stores/previewStore";
import { useResponsiveImage } from "../../../hooks/useResponsiveImage";

export default function ImageExhibitionItem({ img }) {
  const isLandscape = img.width > img.height;

  // 🔥 Le hook remplace tout ton ancien code
  const imageUrl = useResponsiveImage(img, "card");

  if (!imageUrl) return null;

  return (
    <div className="w-full flex justify-start">
      <img
        src={imageUrl}
        alt={img.alternativeText || img.name}
        width={img.width}
        height={img.height}
        loading="lazy"
        onPointerEnter={() =>
          previewStore.setHoverImage(img.formats?.large?.url || img.url)
        }
        onPointerLeave={() => previewStore.clearHover()}
        className={
          "filter grayscale opacity-50 w-full h-auto pb-[10px] " +
          (isLandscape ? "md:w-[70%]" : "md:w-[50%]")
        }
      />
    </div>
  );
}
