"use client";

interface DetailedHeaderProps {
  title: string;
  subtitle?: string;
}

export default function DetailedHeader({ title, subtitle }: DetailedHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-2 mb-12">
      <div className="w-[70%] h-0.5 bg-[#680007]/20"></div>
      {subtitle && (
        <span className="font-serif text-2xl font-light text-[#680007]">
          {subtitle}
        </span>
      )}
      <h1 className="font-samarn text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#3D0004] leading-tight uppercase px-4">
        {title}
      </h1>
      <div className="w-[70%] h-0.5 bg-[#680007]/20"></div>
    </div>
  );
}
