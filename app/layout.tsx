import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Perumbayil Ayurvedamana | NABH-Accredited Ayurvedic Hospital, Kerala",
  description: "Experience authentic traditional Kerala Ayurveda at Perumbayil Ayurvedamana, an internationally recognized, NABH-accredited hospital in Guruvayur with 100+ years of healing legacy. Specializing in Neurological, Spine, and Joint care.",
  keywords: [
    "Ayurveda Kerala",
    "Ayurvedic Hospital Kerala",
    "Perumbayil Ayurvedamana",
    "NABH Ayurveda Hospital",
    "AYUSH Diamond Category",
    "Traditional Kerala Ayurveda Treatment",
    "Panchakarma Kerala",
    "Ayurvedic Neurology Treatment",
    "Spine and Joint Ayurveda Care"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
      >
        {children}
      </body>
    </html>
  );
}
