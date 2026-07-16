"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function TestimonialHero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <motion.section
      ref={heroRef}
      className="relative w-full h-[60vh] bg-[#3D0004] z-20 flex flex-col justify-end mb-16"
      style={{ scale, opacity }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/nearby-places/banner.webp"
          alt="Patient Success Stories Banner"
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
              Patient Success Stories
            </h1>
          </div>

          {/* Subtitle */}
          <div className="max-w-md text-left md:text-right">
            <p className="font-serif text-xs md:text-sm text-white/90 font-medium uppercase tracking-widest leading-relaxed">
              Read and watch the transformational healing journeys of our international patients.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
