"use client";

import { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
import Header from "../../components/global/Header";
import Footer from "../../components/global/Footer";
import BookingModal from "../../components/ui/BookingModal";
import DetailedHeader from "@/app/components/detailed-pages/DetailedHeader";
import DetailedCarousel from "@/app/components/detailed-pages/DetailedCarousel";
import DetailedContent from "@/app/components/detailed-pages/DetailedContent";
import DetailedSidebar from "@/app/components/detailed-pages/DetailedSidebar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function TherapyDetailedPage({ params }: PageProps) {
  // 1. Resolve params once
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [therapy, setTherapy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data based on the dynamic slug
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/therapy/detail/${slug}`)
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

  const openBooking = () => (window.location.href = "/online-consultation");
  const closeBooking = () => setIsBookingOpen(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!therapy) {
    return (
      <div className="relative flex flex-col min-h-screen text-[#3D0004]">
        <Header onOpenBooking={openBooking} forceSolid={true} />
        <main className="flex-grow pt-36 flex flex-col items-center justify-center">
          <h1 className="text-3xl text-[#680007]">Therapy Not Found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-screen text-[#3D0004] overflow-x-clip">
      {/* Backgrounds */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-t from-transparent to-[hsla(208,60%,85%,0.5)]" />
      <div className="fixed inset-0 -z-30 opacity-50 bg-[url('/backgrounds/cloud-texture.svg')]" />

      <Header onOpenBooking={openBooking} forceSolid={true} />

      <main className="flex-grow pt-28 md:pt-24 pb-20">
        <section className="relative w-full py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <DetailedHeader title={therapy.title} subtitle="Ayurveda Therapy" />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-full mb-12">
              {/* Ensure therapy.images is an array */}
              <DetailedCarousel images={Array.isArray(therapy.images) ? therapy.images : [therapy.images]} />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mt-8">
              <DetailedContent
                aboutLabel="About the Treatment"
                mainTitle="Description & Benefits"
                description={therapy.description}
              />
              <DetailedSidebar
                onButtonClick={openBooking}
                backText="Back to Therapies"
                backHref="/therapies"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
}