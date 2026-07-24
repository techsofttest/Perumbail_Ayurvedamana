"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import StyledButton from "../ui/StyledButton";
interface Treatment {
  title: string;
  content: string[];
  image: string;
  benefits: string[];
}

export default function FeaturedTherapy() {
  const [treatment, setTreatment] = useState<Treatment | null>(null);
  const [loading, setLoading] = useState(true);

  const imageSrc: string = treatment?.image && treatment.image.trim() !== ""
    ? treatment.image
    : "/hero-bg/client-tratment.png";
  const title: string = treatment?.title?.trim() || "Featured Therapy";

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${baseUrl}/therapy`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.treatment) {
          setTreatment(data.treatment);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching content layers:", err);
        setLoading(false);
      });
  }, []);
  if (loading) return null;

  // Don't render if no treatment
  if (
    !treatment ||
    (!treatment.title &&
      !treatment.image &&
      (!treatment.content || treatment.content.length === 0) &&
      (!treatment.benefits || treatment.benefits.length === 0))
  ) {
    return null;
  }
  return (
    <section className="relative w-full bg-transparent py-16 mt-12 border-t border-[#680007]/10 bg-[#FBF3EF]/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Column: Sticky Image */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-36 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-[3/4] bg-[#e6e0d5] overflow-hidden flex-shrink-0"
            >
              <Image
                src={imageSrc}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Right Column: Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-7/12 space-y-8 pt-4"
          >
            <div>
              <span className="font-serif text-md uppercase tracking-wider text-[#680007] block mb-2">
                Specialized Treatment
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#680007] uppercase leading-snug">
                {title}
              </h2>
            </div>

            <div className="space-y-4">
              {treatment.content?.length > 0 && (
                  <div className="space-y-4">
                    {treatment.content.map((paragraph, index) => (
                      <p
                        key={index}
                        className="font-serif text-base md:text-lg text-[#3D0004]/80 leading-relaxed font-light"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
            </div>

           
              <div className="pt-6 border-t border-[#680007]/10 space-y-6">
             {treatment.benefits?.length > 0 && (
  <>
            <h3 className="font-serif text-xl text-[#3D0004] font-medium mb-4">
              Benefits
            </h3>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 font-serif text-base text-[#3D0004]/80 font-light mb-6">
              {treatment.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-[#680007] mt-1 text-sm">◆</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </>
        )}
                <div className="pt-4 flex">
                  <StyledButton
                    onClick={() => {
                      const btn = document.querySelector(
                        "[data-booking-trigger]"
                      ) as HTMLButtonElement;
                      btn?.click();
                    }}
                    className=" cursor-pointer"
                  >
                    Book a Consultation
                  </StyledButton>
                </div>
              </div>
           
          </motion.div>
        </div>
      </div>
    </section>
  );
}
