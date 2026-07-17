import AboutClient from "./detail";
import { Metadata } from "next";

interface SeoPayload {
  meta_title?: string;
  meta_key?: string;
  meta_desc?: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getSEO(slug: string): Promise<SeoPayload> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}/product/detail/${slug}`, {
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

  return {
    title: data.meta_title || "Ayurvedamana Product",
    description: data.meta_desc || "Discover Ayurvedamana product details.",
    keywords: data.meta_key,
  };
}

export default async function Page({ params }: PageProps) {
  return <AboutClient params={params} />;
}