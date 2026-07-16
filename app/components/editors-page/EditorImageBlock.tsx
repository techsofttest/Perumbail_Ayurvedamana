"use client";

import Image from "next/image";

interface EditorImageBlockProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function EditorImageBlock({ src, alt, caption }: EditorImageBlockProps) {
  return (
    <div className="my-8 flex flex-col items-center">
      <div className="relative w-full aspect-[16/9] overflow-hidden border border-[#680007]/10">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
      {caption && (
        <span className="mt-2 text-sm text-[#3D0004]/70 italic block text-center">
          {caption}
        </span>
      )}
    </div>
  );
}