"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import StyledButton from "../ui/StyledButton";

interface FooterProps {
  onOpenBooking?: () => void;
}
interface FooterData {
  contact: {
    address: string;
    phone: string;
    email: string;
    linkedin: string;
    facebook: string;
    instagram: string;
    youtube: string;
    time: string;
  };
  footer: {
    title: string;
    content: string;
  }
}
export default function Footer({ onOpenBooking }: FooterProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const triggerBooking = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      const btn = document.querySelector('[data-booking-trigger]') as HTMLButtonElement;
      if (btn) btn.click();
    }
  };
  const [data, setData] = useState<FooterData | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/layout`) // Ensure this matches your route
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);


const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/newsletter`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message);
        }

        setMessage(result.message);
setEmail("");
    } catch (err) {
        if (err instanceof Error) {
            setMessage(err.message);
        }
    } finally {
        setLoading(false);
    }
};
  return (
    <footer id="footer" className="w-full bg-transparent text-[#3D0004] font-sans">

      {/* 1. BEGIN YOUR HEALING JOURNEY CTA BANNER */}
      <div className="relative bg-[#680007] text-[#faf8f5] py-12 md:py-16 px-6 md:px-12 border-b border-[#faf8f5]/10 overflow-hidden">
        {/* Background Geometric Chakra SVG */}
        <svg className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 text-[#faf8f5]/10 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.1">
          <circle cx="12" cy="12" r="11" />
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="2" />
          <path d="M12 1 L12 23" />
          <path d="M1 12 L23 12" />
          <path d="M3.5 3.5 L20.5 20.5" />
          <path d="M3.5 20.5 L20.5 3.5" />
        </svg>
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

          <div className="text-center md:text-left max-w-2xl">
            <div className="space-y-2">
              <h3 className="font-serif text-2xl md:text-3xl font-light text-[#faf8f5] tracking-wide">
                {data?.footer?.title}
              </h3>
              <p className="text-xs md:text-sm text-[#faf8f5]/80 font-light max-w-xl"> {data?.footer?.content}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 items-center">
            <StyledButton
             href="/medical-consultation"
               onClick={triggerBooking}
              variant="secondary"
              className="bg-white hover:bg-[#b38e5d] text-[#3D0004] hover:text-white"
            >
              Medical Consultation
            </StyledButton>
            <StyledButton    
            
            href="/contact"
              onClick={triggerBooking}
              variant="secondary"
              className="text-white border-2 border-white/20  hover:bg-[#b38e5d] text-[#3D0004] hover:text-white"
            >
              Send An Enquiry
            </StyledButton>
          </div>

        </div>
      </div>

      {/* 2. PREMIUM FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 border-b border-[#680007]/10 pb-16">

          {/* Identity and Socials (Spans 4 columns) */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <a href="/" className="block">
              <Image
                src="/logo/logo.png"
                alt="Perumbayil Ayurvedamana Logo"
                width={200}
                height={55}
                className="h-28 w-auto object-contain"
              />
            </a>

            <p className="text-xs text-[#3D0004]/75 leading-relaxed font-md max-w-sm">
              For over 100 years, we have been committed to preserving the timeless wisdom of traditional Ayurveda and delivering authentic clinical healing to seekers worldwide.
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center space-x-3 pt-2">
              {[
                {
                  name: "Facebook",
                  url: data?.contact?.facebook ?? "",
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  ),
                },
                {
                  name: "Instagram",
                  url: data?.contact?.instagram ?? "",
                  icon: (
                    <svg className="w-4 h-4 fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
                    </svg>
                  ),
                },
                {
                  name: "YouTube",
                  url: data?.contact?.youtube ?? "",
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.002 3.002 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  ),
                },
                {
                  name: "LinkedIn",
                  url: data?.contact?.linkedin ?? "",
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  ),
                },
              ].map((social, sIdx) => (
                <a
                  key={sIdx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#680007]/15 flex items-center justify-center text-[#3D0004]/75 hover:text-[#faf8f5] hover:bg-[#680007] hover:border-[#680007] transition-all"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column (Spans 2 columns) */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#3D0004]">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "Why Choose Us", href: "/why-choose-us" },
                { label: "Wellness Treatments", href: "/wellness-treatments" },
                { label: "Facilities", href: "/facilities" },
                { label: "Contact Us", href: "/contact" },
                { label: "Cancellation Policy", href: "/cancellation"},
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs text-[#3D0004]/75 hover:text-[#b38e5d] transition-colors font-light">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column (Spans 2 columns) */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#3D0004]">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Ayurveda", href: "/ayurveda" },
                { label: "Nearby Places", href: "/nearby-place" },
                { label: "Joint Venture", href: "/joint-venture" },
                { label: "Patient Stories", href: "/testimonials" },
                { label: "Gallery", href: "/gallery" },
                { label: "Video Gallery", href: "/video-gallery" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs text-[#3D0004]/75 hover:text-[#b38e5d] transition-colors font-light">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Column (Spans 2 columns) */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#3D0004]">
              Contact Us
            </h4>
            <div className="space-y-3 text-xs text-[#3D0004]/75 font-light leading-relaxed">
              <p>{data?.contact?.address}</p>
              <p className="font-semibold text-[#3D0004]">
                Phone: <a href={`tel:${data?.contact?.phone}`} className="hover:underline">{data?.contact?.phone}</a>
              </p>
              <p className="font-semibold text-[#3D0004]">
                Email: <a href={`mailto:${data?.contact?.email}`} className="hover:underline">{data?.contact?.email}</a>
              </p>
              <p>
                {data?.contact?.time}
              </p>
            </div>
          </div>

          {/* Newsletter Column (Spans 2 columns) */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#3D0004]">
              Newsletter
            </h4>
            <p className="text-xs text-[#3D0004]/75 leading-relaxed font-light">
              Stay updated with health tips, offers and Ayurveda insights.
            </p>
            <form
    onSubmit={handleNewsletter}
    className="flex items-center border border-[#680007]/15 rounded-xs overflow-hidden bg-[#faf8f5]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
             className="w-full px-3 py-2.5 text-xs text-[#3D0004] placeholder-[#3D0004]/50 bg-transparent border-none focus:outline-none"
              />
             <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#680007] hover:bg-[#b38e5d] text-[#faf8f5] px-3.5 py-2.5 transition-colors cursor-pointer border-l border-[#680007] disabled:opacity-50"
                >
                    {loading ? "..." : "→"}
                </button>
            </form>
              {message && (
                  <p
                      className={`mt-2 text-xs ${
                          message.toLowerCase().includes("thank")
                              ? "text-green-600"
                              : "text-red-600"
                      }`}
                  >
                      {message}
                  </p>
              )}

          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] text-[#3D0004]/60 font-light">
            &copy; {new Date().getFullYear()} Ayurveda Mana. All Rights Reserved.
          </span>
          <div className="flex space-x-6 text-[10px] text-[#3D0004]/60 font-light">
            <a href="#" className="hover:text-[#b38e5d] transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-[#b38e5d] transition-colors">Terms & Conditions</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
