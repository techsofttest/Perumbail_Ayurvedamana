"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import BookingModal from "../components/ui/BookingModal";
import TreatmentCard from "../components/ui/TreatmentCard";
import Image from "next/image";

interface WellnessTreatment {
  title: string;
  slug: string;
  image: string;
}

export default function WellnessTreatmentsPage() {
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
  const [treatment, setTreatment] = useState<WellnessTreatment[]>([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/wellness-treatments`)
      .then((res) => res.json())
      .then((data) => {
        setTreatment(Array.isArray(data.treatment) ? data.treatment : []);
      })
      .catch((err) => console.error("Error fetching treatments:", err));
  }, []);
  return (
    <div className="relative flex flex-col min-h-screen text-[#3D0004] overflow-x-hidden">
      <Header onOpenBooking={openBooking} />

      <main className="flex-grow pb-20">

        {/* Parallax Hero Section */}
        <motion.section
          ref={heroRef}
          className="relative w-full h-[60vh] bg-[#3D0004] z-20 flex flex-col justify-end"
          style={{ scale, borderRadius, opacity }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/wellness-banner/banner.png"
              alt="Wellness Treatments Banner"
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
                  Wellness Treatments
                </h1>
              </div>

              {/* Subtitle */}
              <div className="max-w-md text-left md:text-right">
                <p className="font-serif text-xs md:text-sm text-white/90 font-medium uppercase tracking-widest leading-relaxed">
                  Lineage-based rejuvenation and healing <br /> therapies designed for complete wellness.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          {/* Treatment Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {treatment.map((treatment, index) => (
              <TreatmentCard
                key={index}
                name={treatment.title}
                image={treatment.image}
                href={`/wellness-treatments/${treatment.slug}`}
                index={index}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
}
