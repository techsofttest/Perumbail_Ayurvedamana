"use client";

import { useState , useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import BookingModal from "../components/ui/BookingModal";
import GalleryCard from "../components/ui/GalleryCard";

interface GalleryData {
  slug: string;
  title: string;
  content: string;
  images: string;
  video: string[];
}
export default function VideoGalleryPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);
  const [gallery, setGallery] = useState<GalleryData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/video-gallery`)
        .then((res) => res.json())
        .then((data) => {
            setGallery(data.gallery);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
        });
}, []);
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
        <section className="relative w-full h-[50vh] bg-[#3D0004] z-20 flex flex-col justify-end">
          <div className="absolute inset-0 z-0">
            <Image
              src="/package-banner/welcome2.png"
              alt="Video Gallery Banner"
              fill
              priority
              className="object-cover opacity-60"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

          <div className="relative w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-8 md:pb-12 pt-24 z-20">
            <div className="w-full flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-white/10 pb-6">
              <div className="max-w-2xl text-left">
                <h1 className="font-samarn text-4xl md:text-6xl lg:text-7.5xl font-light tracking-tight text-white leading-tight uppercase">
                  Video Gallery
                </h1>
              </div>
              <div className="max-w-md text-left md:text-right">
                <p className="font-serif text-xs md:text-sm text-white/90 font-medium uppercase tracking-widest leading-relaxed">
                  Watch our medical processes, heritage <br /> and restorative methods.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 font-serif">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {loading ? (
                <div className="col-span-full text-center py-20">
                    Loading...
                </div>
            ) : (
                gallery.map((category) => (
                    <GalleryCard
                        key={category.slug}
                        name={category.title}
                        coverImage={
                            category.images.length
                                ? category.images
                                : "/images/placeholder.jpg"
                        }
                        count={category.video.length}
                        countLabel={category.video.length === 1 ? "Video" : "Videos"}
                        href={`/video-gallery/${category.slug}`}
                        description={category.content}
                        showPlayButton={true}
                    />
                ))
            )}
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
}
