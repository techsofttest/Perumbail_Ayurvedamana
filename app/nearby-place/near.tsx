import { Metadata } from "next";
"use client";
import { useEffect, useState } from "react";
import ZigzagPageLayout from "../components/ui/ZigzagPageLayout";
import ZigzagSectionList, {
  ZigzagItem,
} from "../components/ui/ZigzagSectionList";

interface SeoResponse {
  seo?: {
    meta_title?: string;
    meta_key?: string;
    meta_desc?: string;
  };
}

async function getSEO(): Promise<SeoResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}/near`, {
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
    title: seo?.meta_title || "Nearby Places | Ayurvedamana",
    description: seo?.meta_desc || "Explore nearby places and attractions around Ayurvedamana.",
    keywords: seo?.meta_key,
  };
}


export default function NearbyPlacesPage() {

  const [data, setData] = useState({
    cms_title: "",
    title: "",
    banner_image: "",
    sections: [],
  });

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${baseUrl}/near`)
      .then(res => res.json())
      .then(res => {
        if (res.status) {
          setData(res.data);
        }
      });
  }, []);
  return (
    <ZigzagPageLayout
      title={data.title || "Nearby Places"}
      subtitle={data.cms_title || "Discover the nearby places around Ayurvedamana."}
      bannerImage={data.banner_image || "/nearby-place/nearby-places-banner.jpg"}
    >
      <ZigzagSectionList items={data.sections} />
    </ZigzagPageLayout>
  );
}