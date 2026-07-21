"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import BookingModal from "../components/ui/BookingModal";
import StyledButton from "../components/ui/StyledButton";
import {
  IoAirplaneOutline,
  IoTrainOutline,
  IoBusOutline,
  IoWarningOutline,
  IoLocationOutline,
  IoGlobeOutline,
  IoMailOutline,
  IoCallOutline
} from "react-icons/io5";

// 1. Updated TypeScript Interface to map all incoming fields
interface ContactData {
  phone: string;
  phone2?: string;
  email: string;
  map: string;
  address: string;
}

interface ConnectivityItem {
  title: string;
  items: string[];
}

interface NoticeData {
  title: string;
  paragraphs: string;
  content: string[];
}

export default function ContactPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  const heroRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "4px"]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  const [contact, setContact] = useState<ContactData | null>(null);
  const [connectivity, setConnectivity] = useState<ConnectivityItem[]>([]);
  const [notice, setNotice] = useState<NoticeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`)
      .then((res) => res.json())
      .then((data) => {
        setContact(data.contact);
        setConnectivity(data.connectivity || []);
        setNotice(data.notice);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);
  const getConnectivityIcon = (title: string) => {
    const normalize = title.toLowerCase();
    if (normalize.includes("airport")) return <IoAirplaneOutline className="text-[#680007]/70 flex-shrink-0 text-xl" />;
    if (normalize.includes("railway") || normalize.includes("station")) return <IoTrainOutline className="text-[#680007]/70 flex-shrink-0 text-xl" />;
    return <IoBusOutline className="text-[#680007]/70 flex-shrink-0 text-xl" />;
  };

  // UI Helper: Isolates digits and distance fractions (e.g., 2 ½, 30, 3) to switch to font-sans styling
  const formatNumberStrings = (text: string) => {
    const tokens = text.split(/(\d+(?:\s?½)?|\d+)/g);
    return tokens.map((token, index) =>
      /(\d+(?:\s?½)?|\d+)/.test(token) ? (
        <span key={index} className="font-sans font-medium">{token}</span>
      ) : (
        token
      )
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#e6e0d5] text-[#680007]">
        <p className="font-serif text-xl uppercase tracking-widest animate-pulse">Loading Contact Details...</p>
      </div>
    );
  }

  // Fallback check if the database item doesn't exist
  if (!contact) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#e6e0d5] text-[#680007]">
        <p className="font-serif text-xl uppercase">Contact information unavailable.</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-screen text-[#680007] overflow-x-hidden selection:bg-[#a84e32]/25 selection:text-[#680007]">
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

      <Header onOpenBooking={openBooking} />

      <main className="flex-grow pb-20">
        {/* Parallax Hero Section */}
        <motion.section
          ref={heroRef}
          className="relative w-full h-[60vh] bg-[#3D0004] z-20 flex flex-col justify-end"
          style={{ scale, borderRadius, opacity }}
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/package-banner/welcome2.png"
              alt="Contact Banner"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

          <div className="relative w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-8 md:pb-12 pt-24 z-20">
            <div className="w-full flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-white/10 pb-6">
              <div className="max-w-2xl text-left">
                <h1 className="font-samarn text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-tight uppercase">
                  Contact Us
                </h1>
              </div>
              <div className="max-w-md text-left md:text-right">
                <p className="font-serif text-xs md:text-sm text-white/90 font-medium uppercase tracking-widest leading-relaxed">
                  Start your journey to healing <br /> at our ancestral heritage retreat.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 font-serif">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Column */}
            <div className="lg:col-span-7 space-y-10">
              <div>
                <span className="text-md md:text-lg uppercase tracking-wider text-[#680007] block mb-2 font-medium">
                  Location & Office
                </span>
                <h2 className="text-4xl md:text-5xl font-light text-[#680007] uppercase">
                  Perumbayil Ayurveda Mana
                </h2>
                <p className="text-[#680007] text-base mt-1 uppercase tracking-widest">
                  A NABH-Accredited Ayurveda Hospital
                </p>
              </div>

              {/* Address Block */}
              <div className="space-y-3 text-xl md:text-2xl text-[#680007]/80 font-light leading-relaxed">
                <p className="flex items-start gap-3">
                  <IoLocationOutline className="text-[#680007] mt-1.5 flex-shrink-0 text-xl md:text-2xl" />
                  <span>{contact.address}</span>
                </p>
                <p className="flex items-center gap-3 pt-2">
                  <IoGlobeOutline className="text-[#680007] flex-shrink-0 text-xl md:text-2xl" />
                  <a
                    href="http://www.ayurvedamana.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#680007] hover:underline font-normal"
                  >
                    www.ayurvedamana.com
                  </a>
                </p>
              </div>

              {/* Contacts Block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#680007]/10">
                <div className="space-y-2">
                  <h4 className="text-sm uppercase tracking-widest text-[#680007] font-semibold flex items-center gap-2">
                    <IoMailOutline className="text-[#680007] flex-shrink-0 text-lg" />
                    Room Bookings & Enquiries
                  </h4>
                  <p className="text-lg md:text-xl text-[#680007]/80 font-light">
                    <a href={`mailto:${contact.email}`} className="hover:underline text-[#680007] font-normal">
                      {contact.email}
                    </a>
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm uppercase tracking-widest text-[#680007] font-semibold flex items-center gap-2">
                    <IoCallOutline className="text-[#680007] flex-shrink-0 text-lg" />
                    Consultation Bookings
                  </h4>
                  <div className="text-lg md:text-xl text-[#680007]/80 font-light space-y-1 font-sans">
                    <p>
                      <a href={`tel:${contact.phone}`} className="hover:underline">
                        {contact.phone}
                      </a>
                    </p>
                    {contact.phone2 && (
                      <p>
                        <a href={`tel:${contact.phone2}`} className="hover:underline">
                          {contact.phone2}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Dynamic Important Notice Card (From Page 5) */}
              {notice && (
                <div className="bg-[#680007]/5 border border-[#680007]/15 p-8 rounded-none space-y-3 mt-8">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#680007] flex items-center gap-2">
                    <IoWarningOutline className="text-[#680007] text-xl" /> {notice.title}
                  </h4>
                  <p className="text-[#680007] text-lg md:text-xl font-medium uppercase tracking-wide leading-relaxed">
                    {notice.paragraphs}
                  </p>
                  {notice.content.map((paragraph, index) => (

                    <p className="text-[#680007]/80 text-base md:text-lg font-light leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Dynamic Connectivity Guide (From Page 4) */}
            <div className="lg:col-span-5 bg-white border border-[#680007]/10 p-8 rounded-none space-y-8 sticky top-28">
              <div>
                <h3 className="text-2xl font-medium text-[#680007] uppercase border-b border-[#680007]/10 pb-3 mb-6">
                  Connectivity Guide
                </h3>

                {connectivity.map((section, sectionIdx) => (
                  <div key={sectionIdx} className="space-y-3 mb-6 last:mb-0">
                    <h4 className="text-sm uppercase tracking-widest text-[#680007]/60 font-semibold flex items-center gap-2">
                      {getConnectivityIcon(section.title)} {section.title}
                    </h4>
                    <ul className="space-y-2 text-lg text-[#680007]/80 font-light pl-6 list-disc">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          {formatNumberStrings(item)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#680007]/10">
                <StyledButton
                  onClick={openBooking}
                  className="w-full text-center text-white"
                >
                  Send Enquiry Now
                </StyledButton>
              </div>
            </div>

          </div>

          {/* Embedded Map Section */}
          <div className="mt-16 md:mt-24 bg-white border border-[#680007]/10 w-full overflow-hidden">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#680007] mb-4 pt-4 pl-1 flex items-center gap-2">
              <IoLocationOutline className="text-[#680007] text-xl" /> Find Us On Google Maps
            </h3>
            <div className="relative w-full h-[400px] md:h-[500px]">
              <iframe
                src={contact.map}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
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