import AboutClient from "./detail";
import { Metadata } from "next";


interface TreatmentResponse {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: string;
  highlights: string[];
  meta_title?: string;
  meta_key?: string;
  meta_desc?: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getSEO(slug: string): Promise<TreatmentResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/special-treatments/${slug}`, {
    cache: "no-store",
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch SEO data");
    }
  
    return res.json();
  }
  export async function generateMetadata({
    params,
  }: PageProps): Promise<Metadata> {
    const { slug } = await params;
  
    const treatment = await getSEO(slug);
  return {
    title: treatment.meta_title || "Ayurvedamana Special Treatment",
    description: treatment.meta_desc || "Discover the special treatment details at Ayurvedamana.",
    keywords: treatment.meta_key,
  };
}

export default async function Page({ params }: PageProps) {
  return <AboutClient params={params} />;
}