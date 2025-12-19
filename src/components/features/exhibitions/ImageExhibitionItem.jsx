// components/features/exhibitions/ImageExhibitionItem.jsx
import { previewStore } from "../../../stores/previewStore";
import { useResponsiveImage } from "../../../hooks/useResponsiveImage";
import { useIsDesktop } from "../../../hooks/isDesktop";

export default function ImageExhibitionItem({ img }) {
  const isLandscape = img.width > img.height;
  const isDesktop = useIsDesktop(1024);

  const imageUrl = useResponsiveImage(img, "card");
  if (!imageUrl) return null;

  const previewUrl = img.formats?.large?.url || img.url;

  return (
    <div className="w-full flex justify-start">
      <img
        src={imageUrl}
        alt={img.alternativeText || img.name}
        width={img.width}
        height={img.height}
        loading="lazy"
        data-preview={previewUrl} // 🔥 nécessaire pour GSAP mobile
        className={
          "exhibition-image filter grayscale opacity-50 w-full h-auto pb-[10px] " +
          (isLandscape ? "md:w-[70%]" : "md:w-[50%]")
        }
        onPointerEnter={
          isDesktop ? () => previewStore.setHoverImage(previewUrl) : undefined
        }
        onPointerLeave={isDesktop ? () => previewStore.clearHover() : undefined}
      />
    </div>
  );
}