"use client";

import { useState, useEffect } from "react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import BookingModal from "../components/ui/BookingModal";
import PhysiciansHero from "../components/physicians/PhysiciansHero";
import AshtaVidyaSection from "../components/physicians/AshtaVidyaSection";
import GuruparamparaSection from "../components/physicians/GuruparamparaSection";
import OtherDoctorsSection from "../components/physicians/OtherDoctorsSection";

// 1. TypeScript interfaces matching your exact Laravel JSON structural keys
interface DoctorItem {
  name: string;
  content: string;
  images: string;
}

interface SeoData {
  meta_title: string | null;
  meta_key: string | null;
  meta_desc: string | null;
}

interface ApiResponse {
  seo: SeoData | null;
  content: string;
  lineage: DoctorItem[];
  mentor: DoctorItem[];
  team: DoctorItem[];
}

export default function PhysiciansPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const openBooking = () => {
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
  };

  // 2. Fetch dataset from your Laravel backend API environment route
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/physicians`)
      .then((res) => res.json())
      .then((resData: ApiResponse) => {
        setData(resData);
        setLoading(false);

        // Optional: Dynamically inject basic browser metadata from your SEO panel record
        if (resData.seo?.meta_title) {
          document.title = resData.seo.meta_title;
        }
      })
      .catch((err) => {
        console.error("Failed to load clinical directory:", err);
        setLoading(false);
      });
  }, []);

  // 3. Keep layout clean with a matching heritage-themed loader
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#e6e0d5] text-[#3D0004]">
        <p className="font-serif text-xl uppercase tracking-widest animate-pulse">
          Loading Directory Records...
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-screen text-[#3D0004] overflow-x-hidden selection:bg-[#a84e32]/25 selection:text-[#3D0004]">
      {/* Background Layers */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          backgroundImage: "linear-gradient(to top, hsla(208, 60%, 85%, 0.5) 0%, transparent 50%)",
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          opacity: 0.9,
        }}
      />
      <div
        className="fixed inset-0 -z-30"
        style={{
          backgroundImage: "url('/backgrounds/cloud-texture.svg')",
          opacity: 0.5,
        }}
      />

      {/* Sticky Header */}
      <Header onOpenBooking={openBooking} />

      {/* Main Content */}
      <main className="flex-grow pb-20">
        <PhysiciansHero />

        <section className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-20">
          <div
            className="physician-content max-w-4xl mx-auto"
            dangerouslySetInnerHTML={{
              __html: data?.content ?? "",
            }}
          />
        </section>

        {/* 4. Pass custom target array properties directly down to sections */}
        <AshtaVidyaSection items={data?.lineage || []} />
        <GuruparamparaSection items={data?.mentor || []} />
        <OtherDoctorsSection items={data?.team || []} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Consultation/Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
}