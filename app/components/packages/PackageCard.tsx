import Link from "next/link";
import Image from "next/image";
import StyledButton from "@/app/components/ui/StyledButton";

interface PackageCardProps {
    pkg: {
        id: string;
        title: string;
        duration?: string;
        content: string;
        image?: string;
    };
    index: number;
    onOpenBooking?: () => void;
}

export default function PackageCard({
    pkg,
    index,
    onOpenBooking
}: PackageCardProps) {
    return (
        <Link href={`/packages/${pkg.id}`} className="flex flex-col h-full group">
            <div
                className="flex flex-col h-full bg-white/60 backdrop-blur-sm border border-[#680007]/10 rounded-none overflow-hidden group-hover:shadow-xl group-hover:border-[#680007]/20 group-hover:-translate-y-1 transition-all duration-300"
            >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#e6e0d5]">
                    {pkg.image ? (
                        <Image
                            src={pkg.image}
                            alt={pkg.title}
                            fill
                            sizes="(max-w-7xl) 25vw, 100vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[#3D0004]/30 font-serif text-xs text-center px-4">
                            [ {pkg.title} IMAGE PLACEHOLDER ]
                        </div>
                    )}
                </div>

                <div className="flex flex-col flex-grow p-6">
                    {pkg.duration && (
                        <span className="font-serif text-xs md:text-sm font-semibold uppercase tracking-widest text-[#680007]/80 mb-2 block">
                            {pkg.duration}
                        </span>
                    )}
                    <h3 className="font-serif text-lg md:text-xl font-medium text-[#3D0004] group-hover:text-[#680007] transition-colors mb-3 uppercase leading-snug">
                        {pkg.title}
                    </h3>
                    <p className="font-serif text-base text-[#3D0004]/70 leading-relaxed font-light mb-6 flex-grow line-clamp-3">
                        {pkg.content}
                    </p>

                    {/* StyledButton replacement with frame-ornament-safe padding */}
                    <div className="mt-auto pt-2">
                        <StyledButton
                            variant="primary"
                            className="w-full"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (onOpenBooking) {
                                    onOpenBooking();
                                } else {
                                    window.location.href = "/online-consultation";
                                }
                            }}
                        >
                            Enquire Now
                        </StyledButton>
                    </div>
                </div>
            </div>
        </Link>
    );
}
