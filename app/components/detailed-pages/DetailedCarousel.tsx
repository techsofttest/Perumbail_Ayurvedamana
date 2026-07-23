"use client";

import { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface DetailedCarouselProps {
  images: string[];
  onImageClick?: (image: string) => void;
}


export default function DetailedCarousel({ images,onImageClick }: DetailedCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  ]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-none" ref={emblaRef}>
        <div className="flex">
          {images.map((imgSrc, index) => (
            <div
              key={index}
              className="relative flex-[0_0_100%] aspect-[4/3] sm:aspect-[4/3] md:aspect-[4/3] w-full bg-[#e6e0d5]"
            >
              <Image
                src={imgSrc}
                alt={`Slide ${index + 1}`}
                fill
                sizes="100vw"
                 className={`object-cover ${
    onImageClick ? "cursor-zoom-in" : ""
  }`}
 onClick={() => onImageClick?.(imgSrc)}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/70 hover:bg-white text-[#3D0004]/80 hover:text-[#3D0004] transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer z-10 text-lg"
            aria-label="Previous image"
          >
            &#8592;
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/70 hover:bg-white text-[#3D0004]/80 hover:text-[#3D0004] transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer z-10 text-lg"
            aria-label="Next image"
          >
            &#8594;
          </button>
        </>
      )}
    </div>
  );
}
