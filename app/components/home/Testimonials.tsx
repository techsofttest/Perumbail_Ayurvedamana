"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Testimonial {
  title: string;
  location: string;
  image: string;
  content: string;
  video?: string;
}


export default function Testimonials() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);
  const [tes, setTestimonyData] = useState<Testimonial[]>([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages`) // Ensure this matches your route
      .then((res) => res.json())
      .then((data) => {
        setTestimonyData(data.tes);
      })
      .catch(console.error);
  }, []);
  const nextSlide = () => {
    if (tes.length === 0) return;
    setActiveSlide((prev) => (prev + 1) % tes.length);
    setPlayVideo(false);
  };

  const prevSlide = () => {
    if (tes.length === 0) return;
    setActiveSlide((prev) => (prev - 1 + tes.length) % tes.length);
    setPlayVideo(false);
  };

  const currentTestimonial = tes.length > 0 ? tes[activeSlide] : null;
  const imageSrc = currentTestimonial?.image && process.env.NEXT_PUBLIC_API_URL_BASE
    ? `${process.env.NEXT_PUBLIC_API_URL_BASE.replace(/\/+$/, "")}/${currentTestimonial.image.replace(/^\/+/, "")}`
    : null;

  if (!currentTestimonial) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="testimonials" className="w-full text-[#3D0004] font-serif py-16 md:py-24 bg-transparent"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <div className="flex flex-col items-center text-center space-y-2 mb-16">
            <div className="w-[70%] h-0.5 bg-[#680007]/20"></div>
            <span className="font-serif text-lg sm:text-xl md:text-2xl font-light text-[#680007]">
              Trusted by Thousands
            </span>
            <h2 className="font-samarn text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#3D0004] leading-tight">
              Patient Success Stories
            </h2>
            <div className="w-[70%] h-0.5 bg-[#680007]/20"></div>
          </div>
          <div className="py-24 text-[#3D0004]">Loading testimonials...</div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="testimonials" className="w-full text-[#3D0004] font-serif py-16 md:py-24 bg-transparent"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        <div className="flex flex-col items-center text-center space-y-2 mb-16">
          <div className="w-[70%] h-0.5 bg-[#680007]/20"></div>
          <span className="font-serif text-lg sm:text-xl md:text-2xl font-light text-[#680007]">
            Trusted by Thousands
          </span>
          <h2 className="font-samarn text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#3D0004] leading-tight">
            Patient Success Stories
          </h2>
          <div className="w-[70%] h-0.5 bg-[#680007]/20"></div>
        </div>

        <div className="relative w-full flex flex-col items-center min-h-[260px] md:min-h-[200px] justify-center">
          <span className="font-serif text-7xl text-[#b38e5d]/60 leading-none pointer-events-none select-none h-8">
            &ldquo;
          </span>

          {playVideo && currentTestimonial?.video ? (
            <div className="relative w-full max-w-xl aspect-video border border-[#680007]/15 mt-4 overflow-hidden bg-black shadow-md rounded-sm animate-fade-in">
              <iframe
                src={`${currentTestimonial.video}?autoplay=1`}
                title={`Testimonial video by ${currentTestimonial.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: "none" }}
              ></iframe>
            </div>
          ) : (
            <p className="font-serif italic text-lg md:text-4xl text-[#3D0004] leading-relaxed max-w-2xl mt-2 transition-all duration-500 animate-fade-in">
              {currentTestimonial?.content}
            </p>
          )}

          <div className="flex items-center space-x-6 mt-8">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#b38e5d]/30 bg-[#faf8f5]">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={currentTestimonial?.title ?? "Testimonial image"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#e5e0db]" aria-hidden="true" />
                )}
              </div>
              <div className="text-left leading-tight">
                <h4 className="font-serif text-sm font-semibold text-[#3D0004]">
                  {currentTestimonial?.title}
                </h4>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#3D0004]/60">
                  {currentTestimonial?.location}
                </span>
              </div>
            </div>

            {currentTestimonial.video && (
              <button
                onClick={() => setPlayVideo(!playVideo)}
                className="flex items-center space-x-1.5 bg-[#680007] hover:bg-[#b38e5d] text-[#faf8f5] px-3 py-1.5 rounded-sm text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer shadow-xs border border-[#680007] hover:border-[#b38e5d]"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>{playVideo ? "Show Text Review" : "Play Video Review"}</span>
              </button>
            )}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#680007]/10 flex items-center justify-center text-[#3D0004]/60 hover:text-[#3D0004] hover:border-[#b38e5d] transition-all hover:scale-105 active:scale-95 bg-[#FBF3EF] shadow-xs cursor-pointer z-10"
            aria-label="Previous Testimonial"
          >
            &larr;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#680007]/10 flex items-center justify-center text-[#3D0004]/60 hover:text-[#3D0004] hover:border-[#b38e5d] transition-all hover:scale-105 active:scale-95 bg-[#FBF3EF] shadow-xs cursor-pointer z-10"
            aria-label="Next Testimonial"
          >
            &rarr;
          </button>
        </div>

        <div className="flex space-x-2 mt-8">
          {tes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveSlide(idx);
                setPlayVideo(false);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSlide === idx ? "bg-[#680007] w-4" : "bg-[#680007]/20"}`}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
