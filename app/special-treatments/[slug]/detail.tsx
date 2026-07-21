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

interface TreatmentData {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  highlights: string[];
   meta_title:string;
  meta_key:string;
  meta_desc:string;
  care:{
    title:string;
    content:string;
  }
}


export default function SpecialTreatmentDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => {
    window.location.href = "/medical-consultation";
  };
  const closeBooking = () => setIsBookingOpen(false);
  const [treatment, setTherapy] = useState<any>(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/special-treatments/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setTherapy(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [slug]);

  if (!treatment) {
    return (
      <div className="relative flex flex-col min-h-screen text-[#3D0004]">
        <Header onOpenBooking={openBooking} forceSolid={true} />
        <main className="flex-grow pt-36 pb-20 flex flex-col items-center justify-center">
          <h1 className="font-samarn text-3xl text-[#680007] mb-4">Treatment Not Found</h1>
          <a href="/special-treatments" className="font-serif text-sm uppercase tracking-wider text-[#680007] hover:underline">
            &larr; Back to Special Treatments
          </a>
        </main>
        <Footer />
      </div>
    );
  }
  
if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  return (
    <div className="relative flex flex-col min-h-screen text-[#3D0004] overflow-x-clip">
      <Header onOpenBooking={openBooking} forceSolid={true} />

      <main className="flex-grow pt-28 md:pt-36 pb-20">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header Title Section */}
          <DetailedHeader title={treatment.title} subtitle="Special Treatment" />

          {/* Banner Image / Carousel */}
          <div className="relative w-full mb-12 md:mb-16 overflow-hidden rounded-none border border-[#680007]/10">
           <DetailedCarousel images={[treatment.image]} />
          </div>

          {/* Split Content Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start mt-8">
            <DetailedContent
              aboutLabel="About the Treatment"
              mainTitle="Description & Details"
              description={treatment.content}
              inclusionsTitle="Treatment Inclusions & Highlights"
              inclusions={treatment.highlights}
            />

            <DetailedSidebar
              title={treatment.care.title}
                description={treatment.care.content}
                buttonText="Medical Consulting"
              onButtonClick={openBooking}
              backText="Back to Special Treatments"
              backHref="/special-treatments"
            />
          </div>

        </section>
      </main>

      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
}
