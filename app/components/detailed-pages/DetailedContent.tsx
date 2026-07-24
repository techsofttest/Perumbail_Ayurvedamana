"use client";

interface DetailedContentProps {
  aboutLabel?: string;
  mainTitle?: string;
  description: string[];
  inclusionsTitle?: string;
  inclusions?: string[];
  therapyTitle?: string;
  therapy?: string[];
}

export default function DetailedContent({
  aboutLabel = "About the Treatment",
  mainTitle = "Description & Benefits",
  description,
  inclusionsTitle = "Treatment Inclusions & Highlights",
  inclusions,
  therapyTitle = "Treatment Inclusions & Highlights",
  therapy,
}: DetailedContentProps) {
  return (
    <div className="md:col-span-7 space-y-6">
          {description && description.some(item => item.trim() !== "") && (
        <>
          <div>
            <span className="font-serif text-md uppercase tracking-wider text-[#680007] block mb-1">
              {aboutLabel}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-[#680007] tracking-tight uppercase">
              {mainTitle}
            </h2>
          </div>

          <div className="font-serif text-lg md:text-xl text-[#3D0004]/80 leading-relaxed font-light space-y-6   [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_strong]:font-bold [&_b]:font-bold">
            {description.map((item, index) => (
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </div>
        </>
      )}

     {inclusions && inclusions.filter(item => item.trim() !== "").length > 0 && (
  <div className="pt-6 border-t border-[#680007]/10">
    <h3 className="font-serif text-lg font-medium text-[#680007] uppercase mb-4">
      {inclusionsTitle}
    </h3>

    <ul className="space-y-3 font-serif text-base text-[#3D0004]/80 leading-relaxed font-light list-none">
      {inclusions
        .filter(item => item.trim() !== "")
        .map((point, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-[#680007] mt-1">✦</span>
            <span>{point}</span>
          </li>
        ))}
    </ul>
  </div>
)}
      {therapy && therapy.filter(item => item.trim() !== "").length > 0 && (
  <div className="pt-6 border-t border-[#680007]/10">
    <h3 className="font-serif text-lg font-medium text-[#680007] uppercase mb-4">
      {therapyTitle}
    </h3>

    <div className="flex flex-wrap gap-2">
      {therapy
        .filter(item => item.trim() !== "")
        .map((point, index) => (
          <span
            key={index}
            className="bg-[#f7f4f0] border border-[#680007]/15 px-3 py-1.5 text-xs text-[#3D0004]"
          >
            {point}
          </span>
        ))}
    </div>
  </div>
)}
    </div>
  );
}
