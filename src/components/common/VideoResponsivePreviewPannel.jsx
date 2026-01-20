// components/VideoResponsivePreviewPannel.jsx

export default function VideoResponsivePreviewPannel({ video, isVisible, onClick }) {
  if (!video?.url) return null;

  return (
    <video
      src={video.url}
      className={`max-w-full max-h-full object-contain absolute top-0 lg:top-y-body left-0 
        transition-opacity duration-300 
        ${isVisible ? "opacity-100 pointer-events-auto cursor-pointer" : "opacity-0 pointer-events-none"}`}
      onClick={isVisible ? onClick : undefined}
      loop
      muted
      playsInline
      autoPlay
    />
  );
}

