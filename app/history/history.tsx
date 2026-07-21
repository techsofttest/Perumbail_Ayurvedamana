"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import BookingModal from "../components/ui/BookingModal";
import HistoryCarousel from "../components/history/HistoryCarousel";

interface PageData {
  p1: string;
  p2: string;
  caption: string;
  bottom_content: string;
  images: string[];
  image: string;
  title: string;
}

export default function HistoryPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [pageContent, setPageContent] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    fetch(`${baseUrl}/history`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.page) {
          setPageContent(data.page);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching content layers:", err);
        setIsLoading(false);
      });
  }, []);

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

      <Header onOpenBooking={() => window.location.href = "/medical-consultation"} forceSolid={true} />

      <main className="flex-grow pt-28 md:pt-36 pb-20">
        <section className="relative w-full bg-transparent text-[#3D0004] font-serif py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-12">

            {isLoading ? (
              /* Smooth Shimmer State matching your color scheme */
              <div className="w-full flex flex-col items-center justify-center py-24 space-y-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#680007]/20 border-t-[#680007] animate-spin" />
                <p className="font-serif tracking-widest text-sm text-[#680007]/60 uppercase animate-pulse">
                  Loading Heritage Records...
                </p>
              </div>
            ) : pageContent ? (
              <>
                {/* Title Block */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full text-left mb-8 md:mb-12"
                >
                  <span className="font-serif text-md uppercase tracking-wider text-[#680007] block mb-2">
                    Our Lineage
                  </span>
                  <h1 className="font-samarn text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#680007] leading-tight uppercase">
                    {pageContent.title}
                  </h1>
                </motion.div>

                {/* Banner Block */}
                {pageContent.image && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-full aspect-[21/9] sm:aspect-[16/6] md:aspect-[21/9] mb-12 md:mb-16 overflow-hidden rounded-sm border border-[#680007]/10 bg-[#e6e0d5]"
                  >
                    <Image
                      src={pageContent.image}
                      alt="Historical map and architecture"
                      fill
                      priority
                      className="object-cover"
                    />
                  </motion.div>
                )}

                {/* Two-Column Middle Paragraph Blocks */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16 md:mb-24"
                >
                  <div
                    className="font-serif text-base md:text-lg text-[#3D0004]/80 leading-relaxed font-light"
                    dangerouslySetInnerHTML={{ __html: pageContent.p1 }}
                  />
                  <div
                    className="font-serif text-base md:text-lg text-[#3D0004]/80 leading-relaxed font-light"
                    dangerouslySetInnerHTML={{ __html: pageContent.p2 }}
                  />
                </motion.div>

                {/* Dynamic Bottom Layout Split Elements */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start"
                >
                  {/* Left Side: Dynamic Carousel & Parsed i-Tag Caption */}
                  <div className="md:col-span-6 space-y-3">
                    <HistoryCarousel images={pageContent.images || []} />
                    {pageContent.caption && (
                      <p className="font-serif text-md text-[#3D0004] italic pl-1">
                        {pageContent.caption}
                      </p>
                    )}
                  </div>

                  {/* Right Side: Tail End Headings and Content Blocks */}
                  <div className="md:col-span-6 space-y-6">
                    {pageContent.bottom_content && (
                      <div
                        className="font-serif text-base md:text-lg text-[#3D0004]/80 leading-relaxed font-light space-y-4
                                   [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-light [&_h2]:text-[#680007] [&_h2]:tracking-tight [&_h2]:uppercase [&_h2]:mt-2 [&_h2]:mb-4
                                   [&_span]:text-md [&_span]:uppercase [&_span]:tracking-wider [&_span]:text-[#680007] [&_span]:block"
                        dangerouslySetInnerHTML={{ __html: pageContent.bottom_content }}
                      />
                    )}
                  </div>
                </motion.div>
              </>
            ) : (
              /* Fallback state if API returns completely empty fields */
              <div className="text-center py-20 font-serif text-[#3D0004]/60">
                History data currently unavailable.
              </div>
            )}

          </div>
        </section>
      </main>

      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}