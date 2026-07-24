
"use client";
import { useEffect, useState } from "react";
import ZigzagPageLayout from "../components/ui/ZigzagPageLayout";
import ZigzagSectionList, {
  ZigzagItem,
} from "../components/ui/ZigzagSectionList";




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