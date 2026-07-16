"use client";

import { useEffect, useState } from "react";
import ZigzagPageLayout from "../components/ui/ZigzagPageLayout";
import ZigzagSectionList, {
  ZigzagItem,
} from "../components/ui/ZigzagSectionList";

export default function WhyChooseUsPage() {

  const [items, setItems] = useState<ZigzagItem[]>([]);

  useEffect(() => {
 const baseUrl =process.env.NEXT_PUBLIC_API_URL;
    fetch(`${baseUrl}/why`)
      .then((res) => res.json())
      .then((res) => {

        if (res.status) {
          setItems(res.data);
        }

      })
      .catch(console.error);

  }, []);

  return (
    <ZigzagPageLayout
      title="Why Choose Us"
      subtitle="Experience the true essence of Ayurveda—the Ayurvedamana Way."
      bannerImage="/about-section/building3.png"
    >
      <ZigzagSectionList items={items} />
    </ZigzagPageLayout>
  );
}