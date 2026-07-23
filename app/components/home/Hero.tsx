"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import TrustIndicators from "./TrustIndicators";
import StyledButton from "../ui/StyledButton";
import { FaPlay } from "react-icons/fa6";
import VideoLightboxModal from "../ui/VideoLightbox";

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

  const heroRef = useRef<HTMLElement>(null); // kept for future use
  const [data, setData] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [indexPage, setIndexPage] = useState<string[]>([]);
  const [videoModal, setVideoModal] = useState<{ title: string ; url: string} | null>(null);

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

        setIndexPage(payload.indexpage?.content || []);
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
    <>
    <motion.section
      ref={heroRef}
      className="relative w-full h-[90vh] min-h-[480px] lg:min-h-[520px] overflow-hidden bg-[#3D0004] font-serif"
      style={{ scale, borderRadius ,opacity }}
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
 <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/90 via-black/45 to-transparent z-5 pointer-events-none"></div>

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
     <TrustIndicators
  isHero={true}
  content={indexPage}
/>
 <div className="absolute z-40 bottom-6 left-0 right-0 w-full flex flex-wrap justify-center items-center gap-4 px-4">
        <a href="/video-gallery" className="flex items-center justify-center h-[40px] space-x-3 bg-transparent hover:bg-white/10 px-6 rounded-sm text-white transition-all border border-white/30 hover:border-white/60 group">
          <FaPlay className="text-[10px] text-white/80 group-hover:text-white transition-colors" />
          <span className="font-serif text-[15px] font-medium tracking-wide">Treatment Videos</span>
        </a>
       <a
  href="https://youtu.be/3dtY9cxJlBQ"
  onClick={(e) => {
    e.preventDefault(); // Prevents navigating to YouTube directly
    setVideoModal({
      title: "A day @ Ayurvedamana",
      url: "https://youtu.be/3dtY9cxJlBQ",
    });
  }}
  className="flex items-center justify-center h-[40px] space-x-3 bg-transparent hover:bg-white/10 px-6 rounded-sm text-white transition-all border border-white/30 hover:border-white/60 group cursor-pointer"
>
  <FaPlay className="text-[10px] text-white/80 group-hover:text-white transition-colors" />
  <span className="font-serif text-[15px] font-medium tracking-wide">A day @ Ayurvedamana</span>
</a>
        <a href="/Perumbayil-Brochure-EN.pdf"   target="_blank"
  rel="noopener noreferrer" className="flex items-center justify-center h-[40px] space-x-3 bg-transparent hover:bg-white/10 px-6 rounded-sm text-white transition-all border border-white/30 hover:border-white/60 group">
          <Image src="/flags/en-icon.png" alt="EN" width={18} height={14} className="opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-sm" />
          <span className="font-serif text-[15px] font-medium tracking-wide">E-Brochure EN</span>
        </a>
        <a href="/Perumbayil-Brochure-RU.pdf"  target="_blank"
  rel="noopener noreferrer" className="flex items-center justify-center h-[40px] space-x-3 bg-transparent hover:bg-white/10 px-6 rounded-sm text-white transition-all border border-white/30 hover:border-white/60 group">
          <Image src="/flags/ru-icon.png" alt="RU" width={18} height={14} className="opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-sm" />
          <span className="font-serif text-[15px] font-medium tracking-wide">E-Brochure RU</span>
        </a>
      </div>
    </motion.section>
{videoModal && (
  <VideoLightboxModal
    title={videoModal.title}
    videos={[videoModal.url]}
    onClose={() => setVideoModal(null)}
  />
)}
    </>
  );
}
