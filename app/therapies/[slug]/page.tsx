import AboutClient from "./detail";
import { Metadata } from "next";

interface SeoPayload {
  meta_title?: string;
  meta_key?: string;
  meta_desc?: string;
  seo?: {
    meta_title?: string;
    meta_key?: string;
    meta_desc?: string;
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getSEO(slug: string): Promise<SeoPayload> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL_BASE ? `${process.env.NEXT_PUBLIC_API_URL_BASE}/api` : "https://www.techsoftwebsolutions.com/techsoft/demo/ayurvedamana/public/api";
  const res = await fetch(`${baseUrl}/therapy/detail/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch SEO data");
  }

  return res.json();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getSEO(slug);
  const seo = data.seo ?? data;

  return {
    title: seo.meta_title || "Ayurvedamana Therapy",
    description: seo.meta_desc || "Explore Ayurvedamana therapy details.",
    keywords: seo.meta_key,
  };
}

export default async function Page({ params }: PageProps) {
  return <AboutClient params={params} />;
}