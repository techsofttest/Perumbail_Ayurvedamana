"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { THERAPIES_LIST } from "@/app/therapies/data";

export default function TherapiesHero() {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

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

  // Click outside to close search dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredTherapies = searchQuery
    ? THERAPIES_LIST.filter(
      (t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  return (
    <motion.section
      ref={heroRef}
      className="relative w-full h-[60vh] bg-[#3D0004] z-20"
      style={{ scale, borderRadius, opacity }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg/client-tratment.png"
          alt="Therapies Banner"
          fill
          priority
          className="object-cover"
        />
      </div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />

      {/* Content Container */}
      <div className="relative w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-10 md:pb-14 pt-20 z-20">
        <div className="w-full flex flex-col gap-6 md:gap-8">
          <div className="w-full flex flex-col md:flex-row md:justify-between md:items-end gap-6">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl text-left"
            >
              <h1 className="font-samarn text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-tight uppercase">
                THERAPIES
              </h1>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-md text-left md:text-right"
            >
              <p className="font-serif text-base md:text-lg text-white/90 font-medium uppercase leading-relaxed">
                GET THE BENEFIT OF AUTHENTIC AYURVEDA AT THE PLACE WHERE IT NURTURED
              </p>
            </motion.div>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-md z-30"
            ref={searchRef}
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Search therapies..."
                className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 backdrop-blur-md border border-white/25 text-white placeholder:text-white/60 rounded-full py-3 pl-12 pr-6 text-sm md:text-base tracking-wide transition-all duration-300 outline-none focus:ring-1 focus:ring-white/40 focus:border-white/40 font-serif"
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-white/70 z-10">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/60 hover:text-white cursor-pointer z-10"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showDropdown && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 mt-2 bg-[#FBF3EF] border border-[#680007]/10 rounded-md shadow-2xl max-h-60 overflow-y-auto z-[9999] py-2 search-scrollbar"
                >
                  <style>{`
                    .search-scrollbar::-webkit-scrollbar { width: 6px; }
                    .search-scrollbar::-webkit-scrollbar-track { background: transparent; }
                    .search-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(104, 0, 7, 0.2); }
                    .search-scrollbar::-webkit-scrollbar-thumb:hover { background-color: rgba(104, 0, 7, 0.4); }
                  `}</style>
                  {filteredTherapies.length > 0 ? (
                    filteredTherapies.map((therapy) => (
                      <button
                        key={therapy.id}
                        onClick={() => {
                          router.push(`/therapies/${therapy.id}`);
                          setSearchQuery("");
                          setShowDropdown(false);
                        }}
                        className="w-full px-6 py-3 hover:bg-[#680007]/5 cursor-pointer flex flex-col justify-start text-left transition-colors border-none outline-none"
                      >
                        <span className="text-[#3D0004] font-medium font-serif text-sm md:text-base uppercase">
                          {therapy.title}
                        </span>
                        <span className="text-[#3D0004]/60 font-light font-serif text-xs line-clamp-1 mt-0.5">
                          {therapy.description}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="px-6 py-4 text-[#3D0004]/60 font-serif text-sm text-left">
                      No therapies found matching "{searchQuery}"
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
