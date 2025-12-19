//components/features/exhibitions/AtlasList.jsx
import { previewStore } from "../../../stores/previewStore";
import { useIsDesktop } from "../../../hooks/isDesktop";

export default function AtlasList({ item, lang }) {
  const isDesktop = useIsDesktop(1024);

  return (
    <div className="exhibition--atlas-list flex flex-col md:gap-[10px]">
      {item.atlasRelation.length > 0 && (
        <h3>{lang === "fr" ? "Œuvres exposées :" : "Works exhibited :"}</h3>
      )}
      <div>
        {item.atlasRelation?.map((work) => {
          if (!work.Image) return null;
          const url = work.Image.formats?.large?.url || work.Image.url;
          const fields = [work.title, work.technique, work.origin, work.year].filter(Boolean);

          return (
            <div key={work.id} className="flex items-center gap-2">
              <p
                className="cursor-pointer"
                onPointerEnter={
                  isDesktop
                    ? () => previewStore.setHoverImage(url)
                    : undefined
                }
                onPointerLeave={
                  isDesktop ? () => previewStore.clearHover() : undefined
                }
              >
                {fields.join(", ")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
