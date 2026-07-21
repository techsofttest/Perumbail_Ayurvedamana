"use client";

import { useState } from "react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import BookingModal from "../components/ui/BookingModal";
import TherapiesHero from "../components/therapies/TherapiesHero";
import TherapiesGrid from "../components/therapies/TherapiesGrid";
import FeaturedTherapy from "../components/therapies/FeaturedTherapy";


export default function TherapiesPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => {
    window.location.href = "/medical-consultation";
  };
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <div className="relative flex flex-col min-h-screen text-[#3D0004] overflow-x-clip selection:bg-[#a84e32]/25 selection:text-[#3D0004]">
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

        {/* HERO SECTION */}
        <TherapiesHero />

        {/* THERAPIES GRID SECTION */}
        <TherapiesGrid />

        {/* FEATURED THERAPY: CHAVITTI UZHICHIL */}
        <FeaturedTherapy />

      </main>

      {/* Footer */}
      <Footer />

      {/* Hidden button for triggering modal programmatically from child components */}
      <button
        data-booking-trigger
        onClick={openBooking}
        className="sr-only"
        aria-hidden="true"
      >
        Trigger Booking
      </button>

      {/* Consultation/Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
}