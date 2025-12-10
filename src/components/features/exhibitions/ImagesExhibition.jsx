// src/components/features/exhibitions/ImagesExhibition.jsx
import { useEffect } from "react";
import ImageExhibitionItem from "./ImageExhibitionItem";
import { previewStore } from "../../../stores/previewStore";
import { useIsDesktop } from "../../../hooks/isDesktop";

export default function ImagesExhibition({ item }) {
  const isDesktop = useIsDesktop(1024);

  useEffect(() => {
    if (isDesktop) return; // ❌ pas de GSAP desktop

    let ctx;

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // 💡 GSAP context pour cleanup propre
        ctx = gsap.context(() => {
          const images = gsap.utils.toArray(".exhibition-image");

          images.forEach((imgEl) => {
            const previewUrl = imgEl.dataset.preview;

            ScrollTrigger.create({
              trigger: imgEl,
              start: "top 40px",
              end: "bottom 40px",
              markers: true,
              onEnter: () => previewStore.setHoverImage(previewUrl),
              onEnterBack: () => previewStore.setHoverImage(previewUrl),
              onLeave: () => previewStore.clearHover(),
              onLeaveBack: () => previewStore.clearHover(),
            });
          });
        });
      });
    });

    return () => ctx?.revert();
  }, [isDesktop, item]);

  return (
    <div className="exhibition--images flex flex-col md:pl-[55px]">
      {item.exhibitionView?.map((img) => (
        <ImageExhibitionItem key={img.id} img={img} />
      ))}
    </div>
  );
}