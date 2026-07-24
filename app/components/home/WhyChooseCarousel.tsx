"use client";

import { useCallback,useEffect,useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import StyledButton from "../ui/StyledButton";

interface CommunityData{
    title:string;
    content:string;
    image:string;
}
export default function WhyChooseCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
        Autoplay({ delay: 4000, stopOnInteraction: true }),
    ]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
const [community, setCommunityData] = useState<CommunityData[]>([]);
      useEffect(() => {
              fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages`) // Ensure this matches your route
                  .then((res) => res.json())
                  .then((data) => {
                      setCommunityData(data.community);
                  })
                  .catch(console.error);
          }, []);
    return (
        <section className="w-full text-[#3D0004] py-16 md:py-24 bg-[#FBF3EF]/40">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-7xl mx-auto px-6 md:px-12"
            >
                <div className="flex flex-col items-center text-center space-y-2 mb-16">
                    <div className="w-[70%] h-0.5 bg-[#680007]/20"></div>
                    <span className="font-serif text-lg sm:text-xl md:text-2xl font-light text-[#680007]">
                        Our Commitment
                    </span>
                    <h2 className="font-samarn text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#3D0004] leading-tight">
                        Why Choose Ayurveda Mana?
                    </h2>
                    <div className="w-[70%] h-0.5 bg-[#680007]/20"></div>
                </div>

                <div className="relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4">
                            {community.map((item, index) => (
                                <div
                                    key={index}
                                    className="group flex flex-col transition-all duration-300 flex-[0_0_100%] md:flex-[0_0_33.333%] pl-4"
                                >
                                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#e6e0d5]">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            sizes="(max-w-768px) 100vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="mt-6 flex flex-col flex-grow">
                                        <h3 className="font-serif text-xl font-medium text-[#3D0004] group-hover:text-[#b38e5d] transition-colors mb-2 uppercase">
                                            {item.title}
                                        </h3>
                                        <p className="font-serif text-lg text-[#3D0004]/60 leading-relaxed font-light line-clamp-3">
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
                        aria-label="Previous"
                    >
                        &larr;
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full border border-[#680007]/15 flex items-center justify-center text-[#3D0004]/60 hover:text-[#3D0004] hover:border-[#b38e5d] transition-all hover:scale-105 active:scale-95 bg-[#FBF3EF] shadow-md cursor-pointer z-10"
                        aria-label="Next"
                    >
                        &rarr;
                    </button>
                </div>
            </motion.div>
        </section>
    );
}