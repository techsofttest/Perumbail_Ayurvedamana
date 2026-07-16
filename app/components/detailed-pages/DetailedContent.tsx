"use client";

interface DetailedContentProps {
  aboutLabel?: string;
  mainTitle?: string;
  description: string[];
  inclusionsTitle?: string;
  inclusions?: string[];
}

export default function DetailedContent({
  aboutLabel = "About the Treatment",
  mainTitle = "Description & Benefits",
  description,
  inclusionsTitle = "Treatment Inclusions & Highlights",
  inclusions
}: DetailedContentProps) {
  return (
    <div className="md:col-span-7 space-y-6">
      <div>
        <span className="font-serif text-md uppercase tracking-wider text-[#680007] block mb-1">
          {aboutLabel}
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-light text-[#680007] tracking-tight uppercase">
          {mainTitle}
        </h2>
      </div>

   <div className="font-serif text-lg md:text-xl text-[#3D0004]/80 leading-relaxed font-light space-y-6">
  {description.map((item, index) => (
    <div
      key={index}
      dangerouslySetInnerHTML={{ __html: item }}
    />
  ))}
</div>

      {inclusions && inclusions.length > 0 && (
        <div className="pt-6 border-t border-[#680007]/10">
          <h3 className="font-serif text-lg font-medium text-[#680007] uppercase mb-4">
            {inclusionsTitle}
          </h3>
          <ul className="space-y-3 font-serif text-base text-[#3D0004]/80 leading-relaxed font-light list-none">
            {inclusions.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-[#680007] mt-1">✦</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
