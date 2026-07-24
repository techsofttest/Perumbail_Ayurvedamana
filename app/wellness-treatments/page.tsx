import AboutClient from "./wellnesstreatment";
import { Metadata } from "next";


interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
}

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL_BASE ? `${process.env.NEXT_PUBLIC_API_URL_BASE}/api` : "https://www.techsoftwebsolutions.com/techsoft/demo/ayurvedamana/public/api";

  const res = await fetch(`${baseUrl}/wellness-treatments`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch SEO data");
  }

  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSEO();

  return {
    title: data.seo.meta_title,
    description: data.seo.meta_desc,
    keywords: data.seo.meta_key,
  };
}

// 2. Your actual Server Page component that renders the Client view layer
export default function Page() {
    return <AboutClient />;
}