//components/features/exhibitions/AtlasList.jsx
import { previewStore } from "../../../stores/previewStore";


export default function AtlasListItem({ work }) {
    if (!work.image) return null;
    const url = work.image.formats?.large?.url || work.image.url;
    const fields = [work.title, work.technique, work.origin, work.year].filter(Boolean);
    return (

        <ul key={work.id} className="flex items-center gap-2">
            <li
                className="cursor-pointer"
                onPointerEnter={() => previewStore.setHoverImage(url)}
                onPointerLeave={() => previewStore.clearHover()}
            >
                {fields.join(", ")}
            </li>
        </ul>

    );
}
