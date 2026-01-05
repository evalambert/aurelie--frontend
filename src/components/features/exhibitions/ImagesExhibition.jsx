// src/components/features/exhibitions/ImagesExhibition.jsx
import { useState, useRef, useEffect } from "react";
import ImageExhibitionItem from "./ImageExhibitionItem";
// import { previewStore } from "../../../stores/previewStore";
// import { useIsDesktop } from "../../../hooks/isDesktop";

export default function ImagesExhibition({ item }) {
  
  return (
    <div className="exhibition--images flex flex-col md:pl-[55px]">
      {item.exhibitionView?.map((img) => (
        <ImageExhibitionItem key={img.id} img={img} />
      ))}
    </div>
  );
}