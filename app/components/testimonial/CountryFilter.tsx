"use client";

import useEmblaCarousel from "embla-carousel-react";

interface CountryFilterProps {
  countries: string[];
  activeFilter: string;
  onFilterChange: (country: string) => void;
}

export default function CountryFilter({ countries, activeFilter, onFilterChange }: CountryFilterProps) {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex gap-3 py-1">
          {countries.map((country, index) => (
            <div key={index} className="flex-shrink-0 select-none">
              <button
                onClick={() => onFilterChange(country)}
                className={`px-6 py-2 rounded-full font-serif text-md font-bold uppercase tracking-widest transition-all duration-300 border ${activeFilter === country
                  ? "bg-[#680007] text-white border-[#680007] shadow-md"
                  : "bg-white/50 text-[#3D0004] border-[#680007]/20 hover:border-[#680007]/50 hover:text-[#680007]"
                  }`}
              >
                {country}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}