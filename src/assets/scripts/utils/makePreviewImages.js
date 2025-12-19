// src/assets/scripts/utils/makePreviewImages.js
import { getResponsiveImageUrl } from "../assets/scripts/libs/getImageUrl";

export function makePreviewImages(images, context = "cover") {
  const width = window.innerWidth;

  return (images || []).map((img) => ({
    id: img.id,
    url: getResponsiveImageUrl(img, context, width)
  }));
}