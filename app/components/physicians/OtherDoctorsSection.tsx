"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface DoctorItem {
  name: string;
  content: string; 
  images: string;  
}

interface OtherDoctorsSectionProps {
  items: DoctorItem[];
}

export default function OtherDoctorsSection({ items }: OtherDoctorsSectionProps) {
  // 2. Set state tracking typed safely to our dynamic model
  const [selectedDoctor, setSelectedDoctor] = useState<null | DoctorItem>(null);
const stripHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};
  // Guard clause: Hide section cleanly if array data hasn't loaded yet
  if (!items || items.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full bg-transparent py-16"
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
            Our Team
          </span>
          <h2 className="font-samarn text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#3D0004] leading-tight uppercase">
            OTHER DOCTORS
          </h2>
          <div className="w-[70%] h-0.5 bg-[#680007]/20"></div>
        </motion.div>

        {/* 3. Dynamic Doctors Grid Layout Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {items.map((doctor, index) => (
            <motion.div
              key={doctor.name + index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="group flex flex-col transition-all duration-300 h-full border border-[#680007]/5 p-4 bg-white/30 backdrop-blur-sm hover:bg-white/60"
            >
              {/* Portrait Image Block */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#e6e0d5]">
                <Image
                  src={doctor.images || "/physicians/placeholder.jpg"}
                  alt={doctor.name}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Profile Meta Info Layout Column */}
              <div className="mt-6 flex flex-col flex-grow">
                <h3 className="font-serif text-xl font-medium text-[#3D0004] group-hover:text-[#b38e5d] transition-colors mb-2 uppercase">
                  {doctor.name}
                </h3>
                
                {/* Truncated narrative display block */}
               <p className="font-serif text-base text-[#3D0004]/50 leading-relaxed line-clamp-3 mb-4">
                            {stripHtml(doctor.content)}
                          </p>

                <div className="mt-auto pt-2">
                  <button
                    onClick={() => setSelectedDoctor(doctor)}
                    className="font-serif text-sm uppercase tracking-wider text-[#680007] hover:text-[#b38e5d] transition-colors font-medium inline-flex items-center gap-1 group/btn cursor-pointer"
                  >
                    Read More <span className="transition-transform duration-300 group-hover/btn:translate-x-1">&rarr;</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Informative Footer Subtitle Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8 }}
          className="mt-20 pt-10 text-center max-w-4xl mx-auto border-t border-[#680007]/10"
        >
          <p className="font-serif text-base md:text-lg text-[#3D0004]/80 italic font-light leading-relaxed">
            &ldquo;Other than the above consultants, we bring specialized Senior Consultants on weekly basis and full time services of Resident Medical Officers (Male and Female) are available round the clock for the service of clients.&rdquo;
          </p>
        </motion.div>
      </div>

      {/* 4. Doctor Detail Pop-up Overlay Modal */}
      <AnimatePresence>
        {selectedDoctor && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <style>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: rgba(104, 0, 7, 0.2);
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background-color: rgba(104, 0, 7, 0.4);
              }
            `}</style>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FBF3EF] max-w-2xl w-full max-h-[85vh] relative flex flex-col shadow-2xl border border-[#680007]/10"
            >
              {/* Close Button Trigger */}
              <button
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 text-[#3D0004]/60 hover:text-[#680007] transition-colors p-1 text-3xl font-light cursor-pointer z-20 leading-none bg-[#FBF3EF]/80 hover:bg-[#680007]/10"
                aria-label="Close modal"
              >
                &times;
              </button>

              {/* Scrollable Modal Detail Contents Container */}
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-grow">
                <div className="flex flex-row items-center gap-4 md:gap-6 mb-6 pr-8">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 bg-[#e6e0d5] overflow-hidden flex-shrink-0">
                    <Image
                      src={selectedDoctor.images || "/physicians/placeholder.jpg"}
                      alt={selectedDoctor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg md:text-xl text-[#680007] font-semibold uppercase leading-snug">
                      {selectedDoctor.name}
                    </h3>
                  </div>
                </div>

                {/* Full Un-truncated Biography Content text */}
          <div
  className="font-serif text-base md:text-lg text-[#3D0004]/80 leading-relaxed font-light"
  dangerouslySetInnerHTML={{ __html: selectedDoctor.content }}
/>
               
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}