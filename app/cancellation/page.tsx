import AboutClient from "./cancellation";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {

  return {
    title:  "Cancellation | Ayurvedamana",
    description: "Read patient testimonials and stories of healing at Ayurvedamana.",
    keywords: "Ayurveda, healing, testimonials, patient stories",
  };
}

export default function Page() {
  return <AboutClient />;
}