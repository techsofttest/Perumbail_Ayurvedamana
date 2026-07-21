"use client";

import StyledButton from "@/app/components/ui/StyledButton";

interface DetailedSidebarProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick: () => void;
  backText: string;
  backHref: string;
}

export default function DetailedSidebar({
  title = "Experience Authentic Healing",
  description = "Perumbayil Ayurvedamana offers authentic, traditional treatments in a heritage sanctuary, customized exactly to your unique body type.",
  buttonText = "Medical Consultation",
  onButtonClick,
  backText,
  backHref
}: DetailedSidebarProps) {
  return (
    <div className="md:col-span-5 bg-[#FBF3EF]/40 border border-[#680007]/10 p-8 rounded-sm space-y-6 sticky top-28">
      <div>
        <h3 className="font-serif text-xl text-[#680007] font-medium uppercase mb-2">
          {title}
        </h3>
        <p className="font-serif text-md text-[#3D0004]/70 leading-relaxed font-light">
          {description}
        </p>
      </div>

      <StyledButton
        onClick={onButtonClick}
        className="w-full text-center text-white"
      >
        {buttonText}
      </StyledButton>

      <div className="pt-4 border-t border-[#680007]/10 flex flex-col gap-2">
        <a
          href={backHref}
          className="font-serif text-sm uppercase tracking-wider text-[#680007] hover:text-[#b38e5d] transition-colors font-medium inline-flex items-center gap-1 group/btn cursor-pointer"
        >
          &larr; {backText}
        </a>
      </div>
    </div>
  );
}
