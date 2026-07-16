"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface DoctorItem {
  name: string;
  content: string;
  images: string; 
}

interface AshtaVidyaSectionProps {
  items: DoctorItem[];
}

export default function AshtaVidyaSection({ items }: AshtaVidyaSectionProps) {

  if (!items || items.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full py-20 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header Block */}
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
            ASHTA VIDYA LINEAGE
          </h2>
          <div className="w-[70%] h-0.5 bg-[#680007]/20"></div>
        </motion.div>

        {/* Dynamic Directory Profiles List */}
        <div className="space-y-24">
          {items.map((profile, index) => {
            const paragraphs = profile.content
              ? profile.content.split(/\r?\n/).filter((p) => p.trim() !== "")
              : [];

            return (
              <motion.div
                key={profile.name + index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
                } gap-8 md:gap-12 items-center`}
              >
                {/* Portrait Container Block */}
                <div className="w-full md:w-2/5 relative aspect-[3/4] bg-[#e6e0d5] overflow-hidden flex-shrink-0">
                  <Image
                    src={profile.images} // Corrected pointer reference matching 'images' from Laravel
                    alt={profile.name}
                    fill
                    sizes="(max-w-7xl) 40vw"
                    className="object-cover"
                  />
                </div>

                {/* Profile Copy Specifications */}
                <div className="w-full md:w-3/5">
                  <h3 className="font-serif text-2xl md:text-3xl text-[#680007] font-medium uppercase leading-snug">
                    {profile.name}
                  </h3>
                  <div className="space-y-4 mt-5">
                      <p className="font-serif text-base md:text-lg text-[#3D0004]/80 leading-relaxed font-light" >
                        {profile?.content}
                      </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}