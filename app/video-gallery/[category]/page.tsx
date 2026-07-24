"use client";

import { useState, use, useEffect, useRef, type MouseEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/global/Header";
import Footer from "../../components/global/Footer";
import BookingModal from "../../components/ui/BookingModal";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

interface Gallery {
  slug: string;
  title: string;
  images: string;
  video: string[];
}

export default function CategoryVideoGalleryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = use(params);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const heroRef = useRef<HTMLElement>(null);


  const getVideoSource = (videoValue: string | string[] | undefined) =>
    Array.isArray(videoValue) ? videoValue[0] ?? "" : videoValue ?? "";

  useEffect(() => {
    setIsMounted(true);
    const fetchGallery = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/video-gallery/${categorySlug}`
        );

        if (!res.ok) {
          setGallery(null);
          return;
        }

        const data = await res.json();
        setGallery(data.gallery);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [categorySlug]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "4px"]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeVideoIndex === null) return;
      if (e.key === "Escape") setActiveVideoIndex(null);
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Category not found
      </div>
    );
  }

  const videos = gallery.video;

  const showNext = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (activeVideoIndex !== null) {
      setActiveVideoIndex(
        (activeVideoIndex + 1) % gallery.video.length
      );
    }
  };
  const showPrev = (e?: MouseEvent) => {
    e?.stopPropagation();

    if (activeVideoIndex !== null) {
      setActiveVideoIndex(
        (activeVideoIndex - 1 + gallery.video.length) %
        gallery.video.length
      );
    }
  };


  return (
    <div className="relative flex flex-col min-h-screen text-[#680007] overflow-x-hidden selection:bg-[#a84e32]/25 selection:text-[#680007]">
      {/* Background Layers */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          backgroundImage: "linear-gradient(to top, hsla(208, 60%, 85%, 0.5) 0%, transparent 50%)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          opacity: 0.9,
        }}
      />
      <div
        className="fixed inset-0 -z-30"
        style={{
          backgroundImage: "url('/backgrounds/cloud-texture.svg')",
          opacity: 0.5,
        }}
      />

      {/* Header */}
      <Header onOpenBooking={openBooking} />

      {/* Main Content */}
      <main className="flex-grow pb-20">

        {/* Parallax Hero Section */}
        <motion.section
          ref={heroRef}
          className="relative w-full flex flex-col md:block h-auto md:h-[80vh] lg:h-[90vh] md:min-h-[500px] overflow-hidden bg-[#3D0004]"
          style={isMounted && window.innerWidth >= 768 ? { scale, borderRadius, opacity } : {}}
        >
          <div className="relative w-full aspect-[16/9] md:absolute md:inset-0 z-0">
            <Image
              src={gallery.images}
              alt={gallery.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#3D0004] via-[#3D0004]/10 to-transparent min-[1241px]:from-black/85 min-[1241px]:via-black/35 min-[1241px]:to-black/10" />
          </div>

          <div className="relative w-full h-auto max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center py-12 z-20 md:absolute md:inset-0 md:h-full md:justify-end md:py-20">
            <div className="w-full flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-white/10 pb-6">
              <div className="max-w-2xl text-left">
                <Link
                  href="/video-gallery"
                  className="font-serif text-xs md:text-sm text-white/70 hover:text-white uppercase tracking-wider mb-2 inline-block"
                >
                  &larr; Back to Video Gallery
                </Link>
                <h1 className="font-samarn text-2xl md:text-3xl lg:text-5xl font-light tracking-tight text-white leading-tight uppercase">
                  {gallery?.title}
                </h1>
              </div>
              <div className="max-w-md text-left md:text-right">
                <p className="font-serif text-xs md:text-sm text-white/90 font-medium uppercase tracking-widest leading-relaxed">
                  Viewing collection &mdash; <span className="font-sans font-normal">{videos.length}</span> items
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Video Grid */}
        <section className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-24 font-serif">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {gallery.video.map((video, index) => (
              <div
                key={index}
                onClick={() => setActiveVideoIndex(index)}
                className="group relative aspect-[16/10] w-full overflow-hidden border border-[#680007]/10 bg-black/10 cursor-pointer hover:border-[#680007]/30 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <video
                  src={video}
                  preload="metadata"
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />

                {/* Play icon overlay */}
                <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#680007]/90 text-white flex items-center justify-center pl-1 text-base group-hover:scale-110 transition-transform duration-300">
                    &#9658;
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Premium Full-Screen Video Lightbox Modal */}
      {activeVideoIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 text-white z-[99999]"
          onClick={() => setActiveVideoIndex(null)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between p-6">
            <span className="font-serif text-sm uppercase tracking-widest text-white/70">
              {gallery.title} &mdash; <span className="font-sans">{activeVideoIndex + 1}</span> / <span className="font-sans">{videos.length}</span>
            </span>
            <button
              onClick={() => setActiveVideoIndex(null)}
              className="text-white text-3xl font-light hover:text-white/70 transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              &times;
            </button>
          </div>

          {/* Main Interactive Slide */}
          <div className="relative flex-grow flex items-center justify-center p-4">
            {/* Left Button */}
            {gallery.video.length > 1 && (
              <button
                onClick={showPrev}
                className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 text-2xl cursor-pointer z-10 select-none"
                aria-label="Previous video"
              >
                &#8592;
              </button>
            )}

            {/* Video Player Container */}
            <div className="relative w-full max-w-4xl aspect-[16/9] shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <video
                src={gallery.video[activeVideoIndex]}
                autoPlay
                controls
                className="w-full h-full object-contain outline-none bg-black"
              />
            </div>

            {/* Right Button */}
            {gallery.video.length > 1 && (
              <button
                onClick={showNext}
                className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 text-2xl cursor-pointer z-10 select-none"
                aria-label="Next video"
              >
                &#8594;
              </button>
            )}
          </div>

          {/* Bottom Bar Caption */}
          <div className="p-6 text-center text-sm font-serif text-white/50">
            Click outside or press Esc to close
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
}
