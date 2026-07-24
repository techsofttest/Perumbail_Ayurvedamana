"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

interface HistoryCarouselProps {
  images: string[];
}

export default function HistoryCarousel({ images }: HistoryCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  ]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-sm" ref={emblaRef}>
        <div className="flex">
          {images.map((imgSrc, index) => (
            <div
              key={index}
              className="relative flex-[0_0_100%] aspect-[4/3] w-full bg-[#e6e0d5]"
            >
              <Image
                src={imgSrc}
                alt={`Historical archive representation ${index + 2}`}
                fill
                sizes="(max-w-768px) 100vw, 500px"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-3 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-white/70 hover:bg-white text-[#3D0004]/80 hover:text-[#3D0004] transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer z-10 text-sm"
        aria-label="Previous image"
      >
        &#8592;
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-3 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-white/70 hover:bg-white text-[#3D0004]/80 hover:text-[#3D0004] transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer z-10 text-sm"
        aria-label="Next image"
      >
        &#8594;
      </button>
    </div>
  );
}