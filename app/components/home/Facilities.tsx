import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const FACILITIES = [
  { colSpan: "md:col-span-1" },
  { colSpan: "md:col-span-2" },
  { colSpan: "md:col-span-2" },
  { colSpan: "md:col-span-1" },
];
interface FacilityData{
  title:string;
  image:string;
}

export default function Facilities() {
     const [facility, setFacilityData] = useState<FacilityData[]>([]);
      useEffect(() => {
              fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages`) // Ensure this matches your route
                  .then((res) => res.json())
                  .then((data) => {
                      setFacilityData(data.facility);
                  })
                  .catch(console.error);
          }, []);
  return (
    <section id="facilities" className="w-full text-[#3D0004] font-serif py-16 md:py-24 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 md:px-12"
      >
        <div className="flex flex-col items-center text-center space-y-2 mb-16">
          <div className="w-[70%] h-0.5 bg-[#680007]/20"></div>
          <span className="font-serif text-2xl font-light text-[#680007]">
            A Healing Sanctuary
          </span>
          <h2 className="font-samarn text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#3D0004] leading-tight">
            Our Facilities
          </h2>
          <div className="w-[70%] h-0.5 bg-[#680007]/20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 md:gap-6 h-[600px]">
          {facility.map((facility, index) => (
            <div key={index} className={`relative rounded-sm overflow-hidden group shadow-md md:col-span-${index % 3 === 0 ? 1 : 2}` }>
              <Image
                src={facility.image}
                alt={facility.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
              <div className="relative h-full flex flex-col justify-end p-6">
                <h3 className="font-serif text-xl font-semibold text-white tracking-wide">{facility.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
