import AboutClient from "./testimony";
import { Metadata } from "next";

interface ProductResponse {
  seo?: {
    meta_title?: string;
    meta_key?: string;
    meta_desc?: string;
  };
}

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL_BASE ? `${process.env.NEXT_PUBLIC_API_URL_BASE}/api` : "https://www.techsoftwebsolutions.com/techsoft/demo/ayurvedamana/public/api";

  const res = await fetch(`${baseUrl}/testimonial`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch SEO data");
  }

  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSEO();
  const seo = data.seo;

  return {
    title: seo?.meta_title || "Testimonials | Ayurvedamana",
    description: seo?.meta_desc || "Read patient testimonials and stories of healing at Ayurvedamana.",
    keywords: seo?.meta_key,
  };
}

export default function Page() {
  return <AboutClient />;
}