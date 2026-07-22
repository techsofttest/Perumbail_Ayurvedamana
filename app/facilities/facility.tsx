"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import BookingModal from "../components/ui/BookingModal";
import DetailedCarousel from "../components/detailed-pages/DetailedCarousel";

interface FacilityData {
  title: string;
  span: string;
  content: string;
  images: string[];
}
export default function FacilitiesPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  const heroRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? heroRef : undefined,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "4px"]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  const [facility, setFacilities] = useState<FacilityData[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/facility`)
      .then(res => res.json())
      .then(data => {
        setFacilities(data.facility);
      })
      .catch(console.error);
  }, []);
  return (
    <div className="relative flex flex-col min-h-screen text-[#3D0004] overflow-x-hidden selection:bg-[#a84e32]/25 selection:text-[#3D0004]">
      {/* Background Layers */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          backgroundImage: "linear-gradient(to top, hsla(208, 60%, 85%, 0.5) 0%, transparent 50%)",
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
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

        {/* Parallax Hero Section - Matching Wellness Treatments page banner design */}
        <motion.section
          ref={heroRef}
          className="relative w-full h-[60vh] bg-[#3D0004] z-20 flex flex-col justify-end"
          style={{ scale, borderRadius, opacity }}
        >
          {/* Background Image - Trust Heritage image used as banner */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/about-section/building3.png"
              alt="Facilities Banner"
              fill
              priority
              className="object-cover"
            />
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

          {/* Content Container */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-8 md:pb-12 pt-24 z-20">
            <div className="w-full flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-white/10 pb-6">
              {/* Title */}
              <div className="max-w-2xl text-left">
                <h1 className="font-samarn text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-tight uppercase">
                  Facilities
                </h1>
              </div>

              {/* Subtitle */}
              <div className="max-w-md text-left md:text-right">
                <p className="font-serif text-xs md:text-sm text-white/90 font-medium uppercase tracking-widest leading-relaxed">
                  20 Heritage Bedrooms, Organic Kitchens, <br /> and Lineage Treatment Sanctuaries.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          {/* Facilities Sections List - ZIGZAG Layout */}
          <div className="space-y-24 md:space-y-36">
            {facility.map((facility, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center"
                >
                  {/* Left/Right Column: Image Carousel based on index (zigzag) */}
                  <div className={`md:col-span-6 overflow-hidden rounded-none border border-[#680007]/10 ${isEven ? "md:order-first" : "md:order-last"
                    }`}>
                    <DetailedCarousel images={facility.images} />
                  </div>

                  {/* Right/Left Column: Title + Description with increased font sizes */}
                  <div className="md:col-span-6 space-y-5">
                    <div>
                      <span className="font-serif text-md md:text-lg uppercase tracking-wider text-[#680007] block mb-2">
                        {facility.span}
                      </span>
                      <h2 className="font-serif text-3xl md:text-4xl font-light text-[#680007] tracking-tight uppercase">
                        {facility.title}
                      </h2>
                    </div>

                    <p className="font-serif text-lg md:text-xl text-[#3D0004]/80 leading-relaxed font-light whitespace-pre-line"dangerouslySetInnerHTML={{ __html: facility.content }}/>
                      
                  </div>
                </motion.div>
              );
            })}
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
