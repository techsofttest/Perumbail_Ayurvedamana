"use client";

import { useState, use ,useEffect} from "react";
import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";
import BookingModal from "@/app/components/ui/BookingModal";
import DetailedHeader from "@/app/components/detailed-pages/DetailedHeader";
import DetailedCarousel from "@/app/components/detailed-pages/DetailedCarousel";
import DetailedContent from "@/app/components/detailed-pages/DetailedContent";
import DetailedSidebar from "@/app/components/detailed-pages/DetailedSidebar";


interface PageProps {
    params: Promise<{ slug: string }>;
}

function getPackageImages(slug: string, pkgImage?: string): string[] {
    if (pkgImage) {
        return [pkgImage];
    }
    // Fallback images from the services-methods directories to display a beautiful default slider
    return [
        "/services-methods/Abhyanga/thumbnail.JPG",
        "/services-methods/Shirodhara/thumbnail.JPG",
        "/services-methods/Shirovasti-Kopfzirkulation/thumbnail.JPG",
    ];
}

interface PackageData {
    id: number;
    slug: string;
    title: string;
    duration: string;
    highlight: string[];
    content: string;
    image: string | null;
    type: string;
}

export default function PackageDetailedPage({ params }: PageProps) {
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;

    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const openBooking = () => {
        window.location.href = "/online-consultation";
    };
    const closeBooking = () => setIsBookingOpen(false);

    // Look up the package data
     const [pkg, setTherapy] = useState<any>(null);
        const [loading, setLoading] = useState(true);
        const [seo, setSeo] = useState(null);
      useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/packages/${slug}`)
          .then((res) => res.json())
            .then((data) => {
                setTherapy(data.pkg);
                setSeo(data.seo);
                setLoading(false);
            })
          .catch((err) => {
            console.error("Fetch error:", err);
            setLoading(false);
          });
      }, [slug]);
if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            Loading...
        </div>
    );
}
    if (!pkg) {
        return (
            <div className="relative flex flex-col min-h-screen text-[#3D0004] overflow-x-clip">
                <Header onOpenBooking={openBooking} forceSolid={true} />
                <main className="flex-grow pt-36 pb-20 flex flex-col items-center justify-center">
                    <h1 className="font-samarn text-3xl text-[#680007] mb-4">Package Not Found</h1>
                    <a href="/packages" className="font-serif text-sm uppercase tracking-wider text-[#680007] hover:underline">
                        &larr; Back to Packages
                    </a>
                </main>
                <Footer />
            </div>
        );
    }

    const images = getPackageImages(slug, "image" in pkg ? pkg.image : undefined);

    return (
        <div className="relative flex flex-col min-h-screen text-[#3D0004] overflow-x-clip selection:bg-[#a84e32]/25 selection:text-[#3D0004]">
            {/* Background Layers */}
            <div
                className="fixed inset-0 -z-20"
                style={{
                    backgroundImage: "linear-gradient(to top, hsla(208, 60%, 85%, 0.5) 0%, transparent 50%)",
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.9,
                }}
            />
            <div
                className="fixed inset-0 -z-30"
                style={{
                    backgroundImage: "url('/backgrounds/cloud-texture.png')",
                    opacity: 0.5,
                }}
            />

            {/* Sticky Header */}
            <Header onOpenBooking={openBooking} forceSolid={true} />

            {/* Main Content */}
            <main className="flex-grow pt-28 md:pt-24 pb-20">
                <section className="relative w-full bg-transparent text-[#3D0004] font-serif py-12">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">

                        {/* Top Title Section */}
                        <DetailedHeader
                            title={pkg.title}
                            subtitle={"duration" in pkg && pkg.duration ? pkg.duration : undefined}
                        />

                        {/* Top Image Carousel */}
                        <div className="relative w-full mb-12 md:mb-16 overflow-hidden rounded-none border border-[#680007]/10">
                            <DetailedCarousel images={images} />
                        </div>

                        {/* Split Bottom Section */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start mt-8">
                            <DetailedContent
                                aboutLabel="About the Package"
                                mainTitle="Description & Details"
                                description={pkg.content}
                                inclusionsTitle="Package Inclusions & Highlights"
                                inclusions={pkg.highlight}
                            />

                            <DetailedSidebar
                                onButtonClick={openBooking}
                                backText="Back to Packages"
                                backHref="/packages"
                            />
                        </div>

                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />

            {/* Consultation/Booking Modal */}
            <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
        </div>
    );
}
