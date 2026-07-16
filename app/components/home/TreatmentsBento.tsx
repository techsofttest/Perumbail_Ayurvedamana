"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import StyledButton from "../ui/StyledButton";
import Image from "next/image";


interface TherapyData {
  title: string;
  subtitle: string;
  content: string;
  image: string;
  duration: string;
  symptoms: string[];
  therapies: string[];
}

export default function TreatmentsBento() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  ]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const [therapy, setTherapies] = useState<TherapyData[]>([]);
  const [selectedTherapy, setSelectedTherapy] = useState<TherapyData | null>(null);

  const normalizeTherapyData = (payload: any): TherapyData[] => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.therapy)) return payload.therapy;
    return [];
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages`)
      .then((res) => res.json())
      .then((payload) => setTherapies(normalizeTherapyData(payload)))
      .catch(console.error);
  }, []);
  return (
    <div className="bg-transparent w-full overflow-hidden">
      {/* MOST REQUESTED SERVICES SECTION */}
      <section id="treatments" className="w-full text-[#3D0004] py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-6 md:px-12"
        >
          {/* Section Header */}
          <div className="flex flex-col items-center text-center space-y-2 mb-16">
            <div className="w-[70%] h-0.5 bg-[#680007]/20"></div>
            <span className="font-serif text-2xl font-light text-[#680007]">
              Our Ayurvedic services
            </span>
            <h2 className="font-samarn text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#3D0004] leading-tight">
              Most Requested Services
            </h2>
            <div className="w-[70%] h-0.5 bg-[#680007]/20"></div>
          </div>

          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {therapy.map((item) => (
                  <div
                    key={item.title}
                    className="group flex flex-col transition-all duration-300 flex-[0_0_100%] md:flex-[0_0_33.333%] pl-4"
                  >
                    {/* Large Image Container */}
                    <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#e6e0d5]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-w-768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Hover Overlay containing 'Learn More' and 'Book Consultation' */}
                      <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center space-y-4 px-6">
                        <button
                          onClick={() => setSelectedTherapy(item)}
                          className="w-full max-w-[200px] border border-white hover:bg-white text-white hover:text-[#3D0004] py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
                        >
                          Learn More
                        </button>
                        <button
                          onClick={() => {
                            // Open booking directly
                            const btn = document.querySelector('[data-booking-trigger]') as HTMLButtonElement;
                            if (btn) btn.click();
                          }}
                          className="w-full max-w-[200px] bg-[#680007] hover:bg-[#3D0004] text-white py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
                        >
                          Book Consultation
                        </button>
                      </div>
                    </div>

                    {/* Text Content - Elegant Editorial Styles */}
                    <div className="mt-6 flex flex-col flex-grow">
                      <h3 className="font-serif text-xl font-medium text-[#3D0004] group-hover:text-[#b38e5d] transition-colors mb-2 uppercase">
                        {item.title}
                      </h3>
                      <p className="font-serif text-xl text-[#3D0004]/60 leading-relaxed font-light line-clamp-3">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={scrollPrev}
              className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full border border-[#680007]/15 flex items-center justify-center text-[#3D0004]/60 hover:text-[#3D0004] hover:border-[#b38e5d] transition-all hover:scale-105 active:scale-95 bg-[#FBF3EF] shadow-md cursor-pointer z-10"
              aria-label="Previous Service"
            >
              &larr;
            </button>
            <button
              onClick={scrollNext}
              className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full border border-[#680007]/15 flex items-center justify-center text-[#3D0004]/60 hover:text-[#3D0004] hover:border-[#b38e5d] transition-all hover:scale-105 active:scale-95 bg-[#FBF3EF] shadow-md cursor-pointer z-10"
              aria-label="Next Service"
            >
              &rarr;
            </button>
          </div>

          {/* View All Button */}
          <div className="mt-16 text-center">
            <StyledButton
              href="#treatments"
              variant="secondary"
            >View All Services</StyledButton>
          </div>
        </motion.div>
      </section>

      {/* Details Drawer / Modal */}
      {selectedTherapy && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-[2px] p-4 animate-fade-in">
          {/* Backdrop close */}
          <div className="absolute inset-0" onClick={() => setSelectedTherapy(null)}></div>

          {/* Sidebar Details Drawer */}
          <div className="relative z-10 w-full max-w-xl h-full bg-[#faf8f5] text-[#3D0004] border-l border-[#680007]/15 shadow-xl p-8 md:p-12 overflow-y-auto flex flex-col justify-between font-serif animate-slide-left">
            <div>
              {/* Close Drawer Button */}
              <div className="flex justify-between items-center mb-8 border-b border-[#680007]/10 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#b38e5d]">
                  Clinical Specifications
                </span>
                <button
                  onClick={() => setSelectedTherapy(null)}
                  className="text-[#3D0004]/60 hover:text-[#3D0004] text-lg font-serif cursor-pointer"
                >
                  Close ✕
                </button>
              </div>

              <h3 className="font-serif text-3xl md:text-4xl font-light text-[#3D0004] mb-4">
                {selectedTherapy.title}
              </h3>
              <p className="text-xs text-[#b38e5d] font-bold uppercase tracking-wider mb-2">
                {selectedTherapy.subtitle}
              </p>

              <p className="text-sm text-[#3D0004]/80 leading-relaxed font-light mb-8 border-t border-[#680007]/5 pt-4">
                {selectedTherapy.content}
              </p>

              {/* Grid details */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#b38e5d] mb-3">
                    Core Indications / Symptoms Treated
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedTherapy.symptoms?.map((symptom, sIdx) => (
                      <li key={sIdx} className="text-xs flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-[#b38e5d] rounded-full"></span>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#680007]/10 pt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#b38e5d] mb-3">
                    Traditional Lineage Therapies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTherapy.therapies?.map((therapyName, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-[#f7f4f0] border border-[#680007]/15 px-3 py-1.5 text-xs text-[#3D0004]"
                      >
                        {therapyName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action drawer footer */}
            <div className="border-t border-[#680007]/10 pt-8 mt-12">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-[#3D0004]/60 uppercase">Recommended Stay</span>
                <span className="text-sm font-bold text-[#3D0004]">{selectedTherapy.duration}</span>
              </div>
              <button
                onClick={() => {
                  setSelectedTherapy(null);
                  // Open booking directly
                  const btn = document.querySelector('[data-booking-trigger]') as HTMLButtonElement;
                  if (btn) btn.click();
                }}
                className="w-full bg-[#680007] hover:bg-[#3D0004] text-[#faf8f5] py-4 uppercase font-bold tracking-widest text-xs transition-colors cursor-pointer"
              >
                Consult On This Condition
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
