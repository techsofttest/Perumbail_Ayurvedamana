"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface TreatmentCardProps {
  name: string;
  image: string;
  href: string;
  index: number;
}

export default function TreatmentCard({
  name,
  image,
  href,
  index,
}: TreatmentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={href}
        className="group relative flex flex-col justify-between h-full"
      >
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#e6e0d5]">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 1280px) 25vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Content */}
        <div className="py-4 flex flex-col flex-grow justify-between min-h-[160px]">
          <h3 className="font-serif text-lg md:text-xl font-medium text-[#3D0004] uppercase mb-6 group-hover:text-[#680007] transition-colors leading-snug">
            {name}
          </h3>

          <span className="inline-flex items-center text-md font-bold uppercase tracking-widest text-[#680007] border-b border-[#680007]/20 pb-1 w-fit group-hover:border-[#680007] transition-all">
            View Detail &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  );
}