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
    <div className="max-w-5xl mx-auto">

      <div className="mb-16">


        <h2 className="text-4xl lg:text-5xl font-serif text-[#3D0004] mb-8 leading-tight">
          Guided by the Wisdom of the Ashtavaidya Tradition
        </h2>

        <p className="text-lg leading-9 text-[#5b3c35]">
          At <strong>Perumbayil Ayurvedamana</strong>, authentic Ayurveda is not
          merely practiced—it is preserved through one of Kerala's most
          respected traditions of medical knowledge.
        </p>

        <p className="mt-6 text-lg leading-9 text-[#5b3c35]">
          Our clinical philosophy is inspired by the
          <strong> Ashtavaidya heritage </strong>
          and the timeless
          <strong> Guruparampara system</strong>, where Ayurvedic wisdom is
          transmitted directly from master physicians to dedicated disciples
          across generations.
        </p>

        <p className="mt-6 text-lg leading-9 text-[#5b3c35]">
          This tradition combines profound knowledge of the classical Ayurvedic
          texts with decades of practical clinical experience, ensuring every
          patient receives personalised, authentic and evidence-based Ayurvedic
          care.
        </p>
      </div>

      {/* Ashtavaidya Legacy */}

      <div className="border-t border-[#d9c7bb] pt-14 mb-16">
        <h3 className="text-3xl font-serif text-[#3D0004] mb-8">
          The Ashtavaidya Legacy
        </h3>

        <p className="text-lg leading-9 text-[#5b3c35]">
          The word <strong>Ashtavaidya</strong> literally means
          <em> "master of the eight classical branches of Ayurveda."</em>
          Kerala's Ashtavaidya families have safeguarded this remarkable medical
          heritage for centuries, becoming internationally respected for
          treating complex and chronic diseases through classical Ayurvedic
          methods.
        </p>

        <p className="mt-6 text-lg leading-9 text-[#5b3c35]">
          Perumbayil Ayurvedamana is privileged to have inherited guidance from
          this distinguished lineage.
        </p>
      </div>

      {/* Doctor 1 */}

      <div className="border-t border-[#d9c7bb] pt-14 mb-16">
        <h3 className="text-2xl font-serif text-[#3D0004] mb-6">
          Late Ashtavaidyan Vaidyamadam Valiya Narayanan Namboothiri
        </h3>

        <span className="text-[#9c6b46] font-medium">
          (1912 – 1988)
        </span>

        <p className="mt-6 text-lg leading-9 text-[#5b3c35]">
          Widely regarded as one of Kerala's greatest Ayurvedic physicians,
          <strong> Valiya Narayanan Namboothiri</strong> devoted his life to the
          advancement of classical Ayurveda.
        </p>

        <p className="mt-6 text-lg leading-9 text-[#5b3c35]">
          He travelled extensively across India treating difficult and chronic
          illnesses while delivering lectures and participating in scholarly
          discussions on Ayurveda.
        </p>

        <p className="mt-6 text-lg leading-9 text-[#5b3c35]">
          His remarkable knowledge extended beyond medicine to Sanskrit, the
          Vedas, Indian philosophy, mythology, classical arts and cultural
          traditions, earning him recognition as a living encyclopedia and one
          of the most respected Ayurvedic scholars of his generation.
        </p>
      </div>

      {/* Doctor 2 */}

      <div className="border-t border-[#d9c7bb] pt-14 mb-16">
        <h3 className="text-2xl font-serif text-[#3D0004] mb-6">
          Late Astavidyan Vidyamadom Dr. Rishikumaran Namboothiri
        </h3>

        <p className="text-lg leading-9 text-[#5b3c35]">
          A distinguished physician trained directly under his legendary father,
          Dr. Rishikumaran Namboothiri served the Government Ayurveda Department
          for over <strong>37 years</strong> before retiring as
          <strong> District Medical Officer.</strong>
        </p>

        <p className="mt-6 text-lg leading-9 text-[#5b3c35]">
          Renowned for treating complex disorders that many considered difficult
          to manage, he remains respected for his deep clinical insight and
          commitment to classical Ayurveda.
        </p>

        <p className="mt-6 text-lg leading-9 text-[#5b3c35]">
          He received the prestigious title
          <strong> "Vaidyashastra Mahodadhi"</strong> from His Holiness Sri
          Jayendra Saraswathi Swamigal of Kanchi Kamakoti Peetham in recognition
          of his exceptional contribution to Ayurveda.
        </p>
      </div>

      {/* Guruparampara */}

      <div className="border-t border-[#d9c7bb] pt-14">
        <h3 className="text-3xl font-serif text-[#3D0004] mb-8">
          The Guruparampara Tradition
        </h3>

        <p className="text-lg leading-9 text-[#5b3c35]">
          Alongside the Ashtavaidya lineage, Perumbayil Ayurvedamana also
          follows the ancient <strong>Guruparampara</strong> system of learning,
          where knowledge is preserved through direct teacher-disciple
          transmission.
        </p>

        <p className="mt-6 text-lg leading-9 text-[#5b3c35]">
          This approach places equal emphasis on practical wisdom, ethical
          practice, patient-centred care and spiritual understanding, ensuring
          that Ayurveda is practised in its complete and authentic form.
        </p>
      </div>

    </div>
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