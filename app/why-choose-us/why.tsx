"use client";

import { useEffect, useState } from "react";
import ZigzagPageLayout from "../components/ui/ZigzagPageLayout";
import ZigzagSectionList from "../components/ui/ZigzagSectionList";
import DetailedCarousel from "../components/detailed-pages/DetailedCarousel";
export interface ZigzagItem {
  title: string;
  tagline: string;
  description: string;
  images: string[];
}

interface ZigzagSectionListProps {
  items: ZigzagItem[];
}
export default function WhyChooseUsPage() {
  const [items, setItems] = useState<ZigzagItem[]>([]);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${baseUrl}/why`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          setItems(res.data);
        }
      })
      .catch(console.error);
  }, []);

  if (!items.length) {
    return null;
  }

  const [firstItem, ...remainingItems] = items;

  return (
    <ZigzagPageLayout
      title="Why Choose Us"
      subtitle="Experience the true essence of Ayurveda—the Ayurvedamana Way."
      bannerImage="/about-section/building3.png"
    >
      {/* L-shaped first section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div>
          <span className="font-serif text-md uppercase tracking-wider text-[#680007] block mb-2">
            {firstItem.tagline}
          </span>

          <h2 className="font-serif text-3xl md:text-4xl font-light text-[#680007] uppercase mb-8">
            {firstItem.title}
          </h2>
        </div>

        <div className="flow-root">
          <div className="md:w-[42%] float-left mr-8 mb-6">
            <DetailedCarousel images={firstItem.images} />
          </div>

          <div
            className="font-serif text-lg md:text-xl text-[#3D0004]/80 leading-relaxed font-light text-justify
            [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2"
            dangerouslySetInnerHTML={{ __html: firstItem.description }}
          />
        </div>
      </section>

      {/* Remaining sections */}
      <ZigzagSectionList items={remainingItems} />
    </ZigzagPageLayout>
  );
}