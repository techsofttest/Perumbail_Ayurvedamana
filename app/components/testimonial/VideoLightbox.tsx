"use client";

interface VideoLightboxProps {
  video: {
    src: string;
    title: string;
    link: boolean;
  } | null;
  onClose: () => void;
}

export default function VideoLightbox({ video, onClose }: VideoLightboxProps) {
  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 text-white z-[99999]"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between p-6">
        <span className="font-serif text-sm uppercase tracking-widest text-white/70">
          {video.title}
        </span>
        <button
          onClick={onClose}
          className="text-white text-3xl font-light hover:text-white/70 transition-colors cursor-pointer"
          aria-label="Close lightbox"
        >
          &times;
        </button>
      </div>

      {/* Main Interactive Slide */}
      <div className="relative flex-grow flex items-center justify-center p-4">
        {/* Video Player Container */}
        <div
  className="relative w-full max-w-4xl aspect-[16/9] shadow-2xl"
  onClick={(e) => e.stopPropagation()}
>
  {video.link ? (
    <iframe
      src={video.src}
      title={video.title}
      className="w-full h-full rounded-md"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  ) : (
    <video
    src={video.src}
    controls
    autoPlay
    playsInline
    className="w-full h-full object-contain bg-black"
/>
  )}
</div>
      </div>

      {/* Bottom Bar Caption */}
      <div className="p-6 text-center text-sm font-serif text-white/50">
        Click outside or press Esc to close
      </div>
    </div>
  );
}