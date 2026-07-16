"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface DoctorItem {
  name: string;
  content: string[];
  images: string;
}

interface GuruparamparaSectionProps {
  items: DoctorItem[];
}

export default function GuruparamparaSection({ items }: GuruparamparaSectionProps) {
  // Guard clause: Hide section cleanly if array data hasn't loaded yet
  if (!items || items.length === 0) return null;

  // Dynamically divide the CMS array collection 
  const topGridLineage = items.slice(0, 3);
  const detailedProfiles = items.slice(3);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full py-20 bg-[#FBF3EF]/40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Heading Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-2 mb-16"
        >
          <div className="w-[70%] h-0.5 bg-[#680007]/20"></div>
          <span className="font-serif text-2xl font-light text-[#680007]">
            Our Mentors
          </span>
          <h2 className="font-samarn text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#3D0004] leading-tight uppercase">
            GURUPARAMPARA LINEAGE
          </h2>
          <div className="w-[70%] h-0.5 bg-[#680007]/20"></div>
        </motion.div>

        {/* 1. Top Core Historical Grid (First 3 Doctors) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-24">
          {topGridLineage.map((item, index) => (
            <div key={item.name + index} className="group flex flex-col transition-all duration-300">
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#e6e0d5]">
                <Image
                  src={item.images}
                  alt={item.name}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 flex flex-col flex-grow">
                <span className="font-serif text-xl font-medium text-[#3D0004] group-hover:text-[#b38e5d] transition-colors mb-2 uppercase">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {detailedProfiles.map((profile, index) => {


          return (
            <div
              key={profile.name + index}
              className="flex flex-col md:flex-row gap-8 md:gap-16 items-start mt-16 pt-16 border-t border-[#680007]/10 first:border-t-0 first:mt-0 first:pt-0"
            >
              {/* Dynamic image path used instead of hardcoded string profile path */}
              <div className="w-full md:w-1/3 relative aspect-[3/4] bg-[#e6e0d5] overflow-hidden flex-shrink-0">
                <Image
                  src={profile.images}
                  alt={profile.name}
                  fill
                  sizes="(max-w-7xl) 30vw"
                  className="object-cover"
                />
              </div>

              <div className="w-full md:w-2/3 space-y-4 pt-4">
                <h3 className="font-serif text-xl md:text-2xl text-[#680007] font-medium uppercase leading-snug">
                  {profile.name}
                </h3>

                <div className="space-y-4 mt-4">
                  {profile.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="font-serif text-base md:text-lg text-[#3D0004]/80 leading-relaxed font-light"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </motion.section>
  );
}