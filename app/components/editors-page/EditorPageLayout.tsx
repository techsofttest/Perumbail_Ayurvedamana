"use client";

import { useState, ReactNode } from "react";
import Header from "../global/Header";
import Footer from "../global/Footer";
import BookingModal from "../ui/BookingModal";

interface EditorPageLayoutProps {
  title: string;
  children: ReactNode;
}

export default function EditorPageLayout({ title, children }: EditorPageLayoutProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

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

      <Header onOpenBooking={openBooking} forceSolid={true} />

      <main className="flex-grow pt-28 md:pt-40 pb-20">
        <section className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="editor-content-wrapper p-0 rounded-none">
            {/* Editor Title */}
            <h1 className="font-samarn text-3xl md:text-5xl text-[#680007] uppercase mb-6 pb-4 border-b border-[#680007]/10">
              {title}
            </h1>

            {/* Editor Body Content */}
            <div className="font-serif text-base md:text-lg text-[#3D0004]/95 leading-relaxed space-y-6 text-justify">
              {children}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
}