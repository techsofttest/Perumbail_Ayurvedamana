"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface TherapyData {
  id:number;
  title: string;
  slug: string;
  content: string;
  image: string;
}
export default function TherapiesGrid() {
    const [therapy, setTherapies] = useState<TherapyData[]>([]);
      useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/therapy`)
      .then((res) => res.json())
       .then((data) => {
                      setTherapies(data.therapy);
                  })
      .catch(console.error);
  }, []);
  return (
    <section className="relative w-full bg-transparent py-8 pt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {therapy.map((therapy, index) => (
          <motion.div
  key={therapy.id}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.1 }}
  transition={{
    duration: 0.6,
    delay: (index % 3) * 0.1,
    ease: "easeOut",
  }}
>
  <Link
    href={`/therapies/${therapy.slug}`}
    className="flex flex-col group h-full cursor-pointer"
  >
    <CardCarousel
      images={[therapy.image]}
      title={therapy.title}
    />

    <div className="flex flex-col flex-grow">
      <h3 className="font-serif text-xl font-medium text-[#3D0004] group-hover:text-[#b38e5d] transition-colors mb-2 uppercase">
        {therapy.title}
      </h3>

      <p className="font-serif text-lg text-[#3D0004]/60 leading-relaxed font-light line-clamp-3 mb-4">
        {therapy.content}
      </p>

      <div className="mt-auto pt-2">
        <span className="font-serif text-sm uppercase tracking-wider text-[#680007] group-hover:text-[#b38e5d] transition-colors font-medium inline-flex items-center gap-1">
          Read More
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </div>
  </Link>
</motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CardCarousel = ({ images, title }: { images: string[], title: string }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect) };
  }, [emblaApi]);

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#e6e0d5] rounded-sm mb-6 border border-[#680007]/5" ref={emblaRef}>
      <div className="flex h-full">
        {images.map((src, index) => (
          <div key={index} className="relative flex-[0_0_100%] h-full">
            <Image src={src} alt={`${title} - ${index + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <div key={index} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === selectedIndex ? 'bg-white' : 'bg-white/40'}`} />
          ))}
        </div>
      )}
    </div>
  );
};
