"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import TrustIndicators from "./TrustIndicators";

interface HeroProps {
  onOpenBooking: () => void;
}
interface HeroImage {
  title: string;
  content: string;
  image: string;
}
export default function Hero({ onOpenBooking }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const [data, setData] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);


const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
});

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "4px"]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  useEffect(() => {
    const normalizeHeroData = (payload: any): HeroImage[] => {
      if (Array.isArray(payload)) return payload;
      if (Array.isArray(payload?.hero)) return payload.hero;
      if (Array.isArray(payload?.slides)) return payload.slides;
      if (Array.isArray(payload?.data)) return payload.data;
      if (Array.isArray(payload?.pages)) return payload.pages;
      if (Array.isArray(payload?.hero?.slides)) return payload.hero.slides;
      return [];
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages`)
      .then((res) => res.json())
      .then((payload) => {
        const slides = normalizeHeroData(payload);

        setData(slides);
        setCurrentSlide(0);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (data.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [data.length]);
  const handleNext = () => {
    if (!data.length) return;

    setCurrentSlide((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    if (!data.length) return;

    setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);
  };

  if (loading) {
    return (
      <section className="relative h-[90vh] bg-[#3D0004] flex items-center justify-center text-white">
        Loading...
      </section>
    );
  }

  if (data.length === 0) {
    return (
      <section className="relative h-[90vh] bg-[#3D0004] flex items-center justify-center text-white">
        No hero slides found.
      </section>
    );
  }
  return (
    <motion.section
      ref={heroRef}
      className="relative w-full h-[90vh] min-h-[480px] lg:min-h-[520px] overflow-hidden bg-[#3D0004] font-serif"
      style={{ scale, borderRadius, opacity }}
    >
      <style>{`
        @keyframes progressBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress-bar {
          animation: progressBar 5000ms linear forwards;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Horizontal Storytelling Sliding Background Layer */}
      <div
        className="absolute inset-0 z-0 flex transition-transform duration-[1200ms] ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {data.map((slide, idx) => (
          <div
            key={`${slide.title}-${idx}`}
            className="relative w-full h-full flex-shrink-0"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL_BASE}/${slide.image}`}
              alt={slide.title}
              fill
              priority={idx === 0}
              className="object-cover object-center opacity-85"
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlay on Top-Left Corner only for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/30 via-30% to-transparent to-60% z-5"></div>

      {/* Top-Left Content: Title & Chapter */}
      <div
        key={`title-${currentSlide}`}
       className="absolute top-24 left-6 md:top-40 md:left-12 max-w-lg md:max-w-xl text-left z-10 animate-fade-in-up"
      >
        {/* Chapter Designation */}
        <span className="block font-mono text-xs md:text-sm uppercase tracking-widest text-[#c8ab80] mb-2 md:mb-3">
          {data[currentSlide]?.title}
        </span>

        {/* Main Title Heading */}
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#faf8f5] leading-[1.2] mb-6">
          {data[currentSlide]?.content}
        </h1>

        {/* Carousel Controls (Placed below title) */}
        <div className="flex flex-col space-y-2 text-left">
          <div className="flex items-center space-x-3">
            {/* Previous Arrow */}
            <button
              onClick={handlePrev}
              className="p-2 text-[#faf8f5]/60 hover:text-[#faf8f5] transition-colors border border-white/10 hover:border-white/30 rounded-full cursor-pointer bg-black/10 hover:bg-black/25"
              aria-label="Previous Slide"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Slide Indicator */}
            <span className="text-[11px] font-mono text-[#faf8f5]/85 bg-black/20 px-2.5 py-1 border border-white/10 rounded-sm">
              {String(currentSlide + 1).padStart(2, "0")} / {String(data.length).padStart(2, "0")}
            </span>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              className="p-2 text-[#faf8f5]/60 hover:text-[#faf8f5] transition-colors border border-white/10 hover:border-white/30 rounded-full cursor-pointer bg-black/10 hover:bg-black/25"
              aria-label="Next Slide"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Current slide tagline */}
          {/* <span className="text-[9px] text-white/40 tracking-widest uppercase font-mono pl-1">
            {data[currentSlide].shortName}
          </span> */}
        </div>
      </div>

      {/* Bottom Content: Trust Indicators inside Hero with light black gradient overlay */}
      <TrustIndicators isHero={true} />
    </motion.section>
  );
}
