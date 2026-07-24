"use client";

import Link from "next/link";
import Image from "next/image";

interface GalleryCardProps {
  name: string;
  coverImage: string;
  count?: number;
  countLabel?: string;
  href?: string;
  onClick?: () => void;
  description?: string;
  showPlayButton?: boolean;
  actionLabel?: string;
  aspectRatio?: string;
}

export default function GalleryCard({
  name,
  coverImage,
  count,
  countLabel,
  href,
  onClick,
  description,
  showPlayButton = false,
  actionLabel,
  aspectRatio = "aspect-[4/3]"
}: GalleryCardProps) {
  const cardContent = (
    <>
      {/* Cover Image Container */}
      <div className={`relative w-full ${aspectRatio} overflow-hidden bg-[#e6e0d5]`}>
        <Image
          src={coverImage}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay play icon */}
        {showPlayButton && (
          <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#680007]/90 text-white flex items-center justify-center pl-1 text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
              &#9658;
            </div>
          </div>
        )}

        {/* Floating count badge (optional) */}
        {count !== undefined && countLabel !== undefined && (
          <div className="absolute top-4 right-4 bg-[#680007] text-white font-sans text-xs px-2.5 py-1 uppercase tracking-wider font-semibold">
            {count} {countLabel}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 md:p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-sm sm:text-base md:text-2xl font-light tracking-tight text-[#680007] uppercase line-clamp-2 group-hover:text-[#680007] transition-colors leading-snug">
            {name}
          </h3>
          {description && (
            <p className="text-xs md:text-md text-[#680007]/90 font-light mt-2 line-clamp-2">
              {description}
            </p>
          )}
        </div>
        <div className="mt-4 pt-3 border-t border-[#680007]/10 flex items-center justify-between">
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#680007]">
            {actionLabel || (
              showPlayButton ? (
                <>Explore<span className="hidden md:inline"> Collection</span></>
              ) : (
                <>View<span className="hidden md:inline"> Collection</span></>
              )
            )}
          </span>
          <span className="text-sm md:text-lg group-hover:translate-x-1.5 transition-transform duration-300">
            &rarr;
          </span>
        </div>
      </div>
    </>
  );

  const baseClasses = "group flex flex-col justify-between border border-[#680007]/10 hover:border-[#680007]/30 bg-white/40 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md text-left w-full h-full";

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {cardContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {cardContent}
    </button>
  );
}
