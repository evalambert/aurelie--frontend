// components/ImageResponsivePreviewPannel.jsx
import { useResponsiveImage } from '../../hooks/useResponsiveImage';

export default function ImageResponsivePreviewPannel({
    img,
    isVisible,
    onClick,
}) {
    const url = useResponsiveImage(img, 'cover'); // 👈 choix du contexte

    if (!url) return null;

    return (
        <img
            src={url}
            className={`max-w-full md:max-w-[calc(58vw-20px)] max-h-full object-contain absolute top-0 lg:top-y-body max-lg:left-0 lg:left-[10px] max-md:h-[100dvh]
        transition-opacity duration-300
        ${isVisible ? 'opacity-100 pointer-events-auto cursor-pointer' : 'opacity-0 pointer-events-none'}`}
            onClick={isVisible ? onClick : undefined}
        />
    );
}
