"use client";

import { useState, useEffect, useCallback, type MouseEvent } from "react";

interface VideoLightboxProps {
  /** Array of video URLs to play */
  videos: string[];
  /** Label shown in the top bar (e.g. category title) */
  title?: string;
  /** Which video to start on (0-based index) */
  initialIndex?: number;
  /** Called when the user closes the lightbox */
  onClose: () => void;
}

export default function VideoLightbox({
  videos,
  title = "",
  initialIndex = 0,
  onClose,
}: VideoLightboxProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const showNext = useCallback(
    (e?: MouseEvent) => {
      e?.stopPropagation();
      setActiveIndex((i) => (i + 1) % videos.length);
    },
    [videos.length]
  );

  const showPrev = useCallback(
    (e?: MouseEvent) => {
      e?.stopPropagation();
      setActiveIndex((i) => (i - 1 + videos.length) % videos.length);
    },
    [videos.length]
  );
  const isYouTube = (url: string) =>
  /youtu\.be|youtube\.com/.test(url);

const getYoutubeEmbedUrl = (url: string) => {
  try {
    const u = new URL(url);

    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}?autoplay=1`;
    }

    const id = u.searchParams.get("v");
    if (id) {
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }

    const shorts = u.pathname.match(/\/shorts\/([^/?]+)/);
    if (shorts) {
      return `https://www.youtube.com/embed/${shorts[1]}?autoplay=1`;
    }
  } catch {}

  return url;
};

  // Keyboard navigation + Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, showNext, showPrev]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!videos.length) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col justify-between bg-black/95 text-white"
      style={{ zIndex: 99999 }}
      onClick={onClose}
    >
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between p-6">
        <span className="font-serif text-sm uppercase tracking-widest text-white/70">
          {title && <>{title}&nbsp;&mdash;&nbsp;</>}
          <span className="font-sans">{activeIndex + 1}</span>
          {" / "}
          <span className="font-sans">{videos.length}</span>
        </span>

        <button
          onClick={onClose}
          className="text-white text-3xl font-light hover:text-white/70 transition-colors cursor-pointer leading-none"
          aria-label="Close video player"
        >
          &times;
        </button>
      </div>

      {/* ── Main Player Area ── */}
      <div className="relative flex-grow flex items-center justify-center p-4">
        {/* Prev */}
        {videos.length > 1 && (
          <button
            onClick={showPrev}
            className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 text-2xl cursor-pointer z-10 select-none"
            aria-label="Previous video"
          >
            &#8592;
          </button>
        )}

        {/* Video — key forces re-mount on source change */}
 
          <div
  className="relative w-full max-w-4xl aspect-[16/9] shadow-2xl"
  onClick={(e) => e.stopPropagation()}
>
  {isYouTube(videos[activeIndex]) ? (
    <iframe
      key={videos[activeIndex]}
      src={getYoutubeEmbedUrl(videos[activeIndex])}
      className="w-full h-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  ) : (
    <video
      key={videos[activeIndex]}
      src={videos[activeIndex]}
      autoPlay
      controls
      className="w-full h-full object-contain bg-black"
    />
  )}
        </div>

        {/* Next */}
        {videos.length > 1 && (
          <button
            onClick={showNext}
            className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 text-2xl cursor-pointer z-10 select-none"
            aria-label="Next video"
          >
            &#8594;
          </button>
        )}
      </div>

      {/* ── Bottom Caption ── */}
      <div className="p-6 text-center text-sm font-serif text-white/50">
        Click outside or press <kbd className="font-mono">Esc</kbd> to close
        {videos.length > 1 && (
          <>
            &nbsp;·&nbsp; Use <kbd className="font-mono">←</kbd>{" "}
            <kbd className="font-mono">→</kbd> to navigate
          </>
        )}
      </div>
    </div>
  );
}
