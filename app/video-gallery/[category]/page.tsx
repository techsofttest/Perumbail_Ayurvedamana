"use client";

import { useState, use, useEffect, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/global/Header";
import Footer from "../../components/global/Footer";
import BookingModal from "../../components/ui/BookingModal";
import VideoLightboxModal from "../../components/ui/VideoLightbox";

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


  const getVideoSource = (videoValue: string | string[] | undefined) =>
    Array.isArray(videoValue) ? videoValue[0] ?? "" : videoValue ?? "";

  useEffect(() => {
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

        {/* Page Banner */}
        <section className="relative w-full h-[45vh] bg-[#3D0004] z-20 flex flex-col justify-end">
          <div className="absolute inset-0 z-0">
            <Image
              src={gallery.images}
              alt={gallery.title}
              fill
              priority
              className="object-cover opacity-60"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

          <div className="relative w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-8 md:pb-12 pt-24 z-20">
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
        </section>

        {/* Video Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 font-serif">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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

      {/* Video Lightbox Modal */}
      <VideoLightboxModal
        videos={gallery.video}
        title={gallery.title}
        initialIndex={activeVideoIndex}
        onClose={() => setActiveVideoIndex(null)}
        onNext={showNext}
        onPrev={showPrev}
      />

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
}
