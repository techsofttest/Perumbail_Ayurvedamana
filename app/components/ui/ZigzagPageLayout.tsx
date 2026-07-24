"use client";

import { useState, useRef, ReactNode, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Header from "../global/Header";
import Footer from "../global/Footer";
import BookingModal from "./BookingModal";

interface ZigzagPageLayoutProps {
  title: string;
  subtitle: string;
  bannerImage: string;
  children: ReactNode;
}

export default function ZigzagPageLayout({
  title,
  subtitle,
  bannerImage,
  children
}: ZigzagPageLayoutProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  const heroRef = useRef<HTMLElement>(null);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "4px"]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

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
          backgroundImage: "url('/backgrounds/cloud-texture.png')",
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
          {/* Background Image */}
          <div className="relative w-full aspect-[16/9] md:absolute md:inset-0 z-0">
            <Image
              src={bannerImage}
              alt={`${title} Banner`}
              fill
              priority
              className="object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#3D0004] via-[#3D0004]/10 to-transparent min-[1241px]:from-black/85 min-[1241px]:via-black/35 min-[1241px]:to-black/10" />
          </div>

          {/* Content Container */}
          <div className="relative w-full h-auto max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center py-12 z-20 md:absolute md:inset-0 md:h-full md:justify-end md:py-20">
            <div className="w-full flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-white/10 pb-6">
              {/* Title */}
              <div className="max-w-2xl text-left">
                <h1 className="font-samarn text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-tight uppercase">
                  {title}
                </h1>
              </div>

              {/* Subtitle */}
              <div className="max-w-md text-left md:text-right">
                <p className="font-serif text-xs md:text-sm text-white/90 font-medium uppercase tracking-widest leading-relaxed">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
}
