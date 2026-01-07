
// components/ImageResponsivePreviewPannel.jsx
import { useResponsiveImage } from "../../hooks/useResponsiveImage";

export default function ImageResponsivePreviewPannel({ img, isVisible }) {
  const url = useResponsiveImage(img, "cover"); // 👈 choix du contexte

  if (!url) return null;

  return (
    <img
      src={url}
      className={`max-w-full max-h-full object-contain absolute top-0 lg:top-y-body left-0 
        transition-opacity duration-300 
        ${isVisible ? "opacity-100" : "opacity-0"}`}
    />
  );
}