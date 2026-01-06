// components/VideoResponsivePreviewPannel.jsx

export default function VideoResponsivePreviewPannel({ video, isVisible }) {
  if (!video?.url) return null;

  return (
    <video
      src={video.url}
      className={`max-w-full max-h-full object-contain absolute top-0 md:top-y-body left-0 
        transition-opacity duration-300 
        ${isVisible ? "opacity-100" : "opacity-0"}`}
      loop
      muted
      playsInline
      autoPlay
    />
  );
}

