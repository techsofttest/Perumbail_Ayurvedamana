import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import DetailedCarousel from "../detailed-pages/DetailedCarousel";
interface DetailedCarouselProps {
  images: string[];
  onImageClick?: (image: string) => void;
}
export interface ZigzagItem {
  title: string;
  tagline: string;
  description: string;
  images: string[];
}

interface ZigzagSectionListProps {
  items: ZigzagItem[];
  enableImageModal?: boolean;
}

export default function ZigzagSectionList({
  items,
  enableImageModal = false,
}: ZigzagSectionListProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  return (
    <>
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      {/* Sections List - ZIGZAG Layout */}
      <div className="space-y-24 md:space-y-36">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center"
            >
              {/* Left/Right Column: Image Carousel based on index (zigzag) */}
              <div className={`md:col-span-6 overflow-hidden rounded-none border border-[#680007]/10 ${
                isEven ? "md:order-first" : "md:order-last"
              }`}>
                <DetailedCarousel images={item.images}   onImageClick={
    enableImageModal
      ? (image) => setSelectedImage(image)
      : undefined
  }/>
              </div>

              {/* Right/Left Column: Title + Description */}
              <div className="md:col-span-6 space-y-5">
                <div>
                  <span className="font-serif text-md md:text-lg uppercase tracking-wider text-[#680007] block mb-2">
                    {item.tagline}
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-light text-[#680007] tracking-tight uppercase">
                    {item.title}
                  </h2>
                </div>
                 <div className="font-serif text-lg md:text-xl text-[#3D0004]/80 leading-relaxed font-light whitespace-pre-line text-justify [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2"
                  dangerouslySetInnerHTML={{ __html: item.description }}/>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
    {enableImageModal && selectedImage && (
    <div
        className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-6"
        onClick={() => setSelectedImage(null)}
    >
        <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white text-4xl"
        >
            ×
        </button>

        <Image
            src={selectedImage}
            alt=""
            width={1400}
            height={900}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
        />
    </div>
)}
</>
  );

}