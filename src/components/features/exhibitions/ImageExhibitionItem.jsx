// components/features/exhibitions/ImageExhibitionItem.jsx
import { previewStore } from "../../../stores/previewStore";
import { useResponsiveImage } from "../../../hooks/useResponsiveImage";
import { useIsDesktop } from "../../../hooks/isDesktop";

export default function ImageExhibitionItem({ img }) {
  const isLandscape = img.width > img.height;
  const isDesktop = useIsDesktop(1024);

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
        onPointerEnter={
          isDesktop
            ? () => previewStore.setHoverImage(img.formats?.large?.url || img.url)
            : undefined
        }
        onPointerLeave={
          isDesktop ? () => previewStore.clearHover() : undefined
        }
        className={
          "filter grayscale opacity-50 w-full h-auto pb-[10px] " +
          (isLandscape ? "md:w-[70%]" : "md:w-[50%]")
        }
      />
    </div>
  );
}
