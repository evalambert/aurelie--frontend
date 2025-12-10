// src/components/features/exhibitions/ImagesExhibition.jsx
import ImageExhibitionItem from "./ImageExhibitionItem";

export default function ImagesExhibition({ item }) {
  return (
    <div className="exhibition--images flex flex-col md:pl-[55px]">
      {item.exhibitionView?.map((img) => (
        <ImageExhibitionItem key={img.id} img={img} />
      ))}
    </div>
  );
}
