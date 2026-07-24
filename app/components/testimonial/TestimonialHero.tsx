"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function TestimonialHero() {
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
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <motion.section
      ref={heroRef}
      className="relative w-full flex flex-col md:block h-auto md:h-[80vh] lg:h-[90vh] md:min-h-[500px] overflow-hidden bg-[#3D0004] mb-16"
      style={isMounted && window.innerWidth >= 768 ? { scale, opacity } : {}}
    >
      {/* Background Image */}
      <div className="relative w-full aspect-[16/9] md:absolute md:inset-0 z-0">
        <Image
          src="/nearby-places/banner.webp"
          alt="Patient Success Stories Banner"
          fill
          priority
          className="object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#3D0004] via-[#3D0004]/10 to-transparent min-[1241px]:from-black/80 min-[1241px]:via-black/5 min-[1241px]:to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative w-full h-auto max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center py-12 z-20 md:absolute md:inset-0 md:h-full md:justify-end md:py-20">
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
