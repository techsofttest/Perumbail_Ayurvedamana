"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react"; // Added useEffect
import StyledButton from "../ui/StyledButton";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface ProductBannerProps {
  showViewAllLink?: boolean;
}

interface Product {
  title: string;
  slug: string;
  price: string;
  image: string;
}

export default function ProductBanner({ showViewAllLink = true }: ProductBannerProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]); // Initialized as array

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect(); // Set initial index
  }, [emblaApi]);

  const normalizeProductData = (payload: any): Product[] => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.products)) return payload.products;
    if (Array.isArray(payload?.pages)) return payload.pages;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.items)) return payload.items;
    return [];
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages`)
      .then((res) => res.json())
      .then((payload) => setProducts(normalizeProductData(payload)))
      .catch(console.error);
  }, []);

  const displayProducts = products.length > 0 && products.length < 12
    ? [...products, ...products, ...products]
    : products;

  if (products.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12"
    >
      <div className="relative w-full aspect-[16/7] md:aspect-[16/5] min-h-[340px] sm:min-h-[400px] md:min-h-[500px] overflow-hidden bg-[#061209]">

        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/product-banner/background.png"
            alt="Product Banner Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Desktop static layout (hidden on mobile) */}
        <div className="hidden sm:flex absolute inset-x-0 bottom-[12%] h-[50%] z-30 pointer-events-none justify-center items-end gap-x-4 md:gap-x-8">
          {products.map((product) => (
            <a
              key={product.slug}
              href={`/products/${product.slug}`}
              className={`relative flex flex-col items-center origin-bottom transition-all duration-300 ease-out cursor-pointer pointer-events-auto w-[80px] md:w-[100px] ${hovered === product.slug ? "scale-110 z-50" : "z-30"}`}
              onMouseEnter={() => setHovered(product.slug)}
              onMouseLeave={() => setHovered(null)}
              aria-label={product.title}
            >
              <div className={`relative w-full transition-all duration-300 ${hovered === product.slug ? "drop-shadow-[0_14px_30px_rgba(0,0,0,0.65)] brightness-110" : "drop-shadow-[0_8px_20px_rgba(0,0,0,0.50)]"}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL_BASE}/${product.image}`}
                  alt={product.title}
                  width={100}
                  height={140}
                  className="w-full h-auto object-contain block"
                />
              </div>

              {/* Center Dot */}
              <span className={`absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] bg-white rounded-full shadow-[0_0_0_3px_rgba(255,255,255,0.28),0_0_12px_5px_rgba(255,255,255,0.50)] transition-opacity duration-300 z-40 ${hovered === product.slug ? "opacity-100" : "opacity-0"}`} />

              {/* Top-Right Angled Tooltip */}
              <div className={`absolute top-[45%] left-1/2 z-40 transition-all duration-300 pointer-events-none ${hovered === product.slug ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 -translate-x-2 translate-y-2"}`}>
                <div className="absolute top-0 left-0 w-12 md:w-16 h-[1.5px] bg-white/80 origin-top-left -rotate-45" />
                <div className="absolute bottom-[34px] left-[34px] md:bottom-[45px] md:left-[45px] flex flex-col items-start px-4 py-1.5 bg-white -skew-x-[15deg] shadow-lg">
                  <span className="font-serif text-[10px] md:text-sm font-semibold text-[#3D0004] skew-x-[15deg] whitespace-nowrap">{product.title}</span>
                  <span className="text-[9px] md:text-xs text-[#3D0004]/70 skew-x-[15deg] whitespace-nowrap">₹{product.price}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile carousel layout (shown only on mobile) */}
        <div className="block sm:hidden absolute inset-x-0 bottom-[8%] h-[50%] z-30 pointer-events-auto overflow-visible">
          <div className="overflow-hidden w-full h-full" ref={emblaRef}>
            <div className="flex items-end h-full">
              {displayProducts.map((product, idx) => (
                <div key={`${product.slug}-${idx}`} className={`flex-[0_0_28%] min-w-0 flex justify-center items-end px-1 relative overflow-visible transition-all duration-300 ${idx === activeIndex ? "z-50" : "z-10"}`}>
                  <a
                    href={`/products/${product.slug}`}
                    className={`relative flex flex-col items-center origin-bottom transition-all duration-300 ease-out cursor-pointer w-[54px] ${idx === activeIndex ? "scale-110 z-50 animate-brightness-110" : "z-30"}`}
                    aria-label={product.title}
                  >
                    <div className={`relative w-full transition-all duration-300 ${idx === activeIndex ? "drop-shadow-[0_14px_30px_rgba(0,0,0,0.65)]" : "drop-shadow-[0_8px_20px_rgba(0,0,0,0.50)]"}`}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL_BASE}/${product.image}`}
                        alt={product.title}
                        width={100}
                        height={140}
                        className="w-full h-auto object-contain block"
                      />
                    </div>

                    {/* Center Dot (only on active product) */}
                    <span className={`absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[8px] h-[8px] bg-white rounded-full shadow-[0_0_0_2px_rgba(255,255,255,0.28),0_0_10px_4px_rgba(255,255,255,0.50)] transition-opacity duration-300 z-40 ${idx === activeIndex ? "opacity-100" : "opacity-0"}`} />

                    {/* Top-Right Angled Tooltip (only on active product) */}
                    <div className={`absolute top-[45%] left-1/2 z-40 transition-all duration-300 pointer-events-none ${idx === activeIndex ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 -translate-x-2 translate-y-2"}`}>
                      <div className="absolute top-0 left-0 w-8 h-[1.5px] bg-white/80 origin-top-left -rotate-45" />
                      <div className="absolute bottom-[22px] left-[22px] flex flex-col items-start px-2 py-1 bg-white -skew-x-[15deg] shadow-lg">
                        <span className="font-serif text-[9px] font-semibold text-[#3D0004] skew-x-[15deg] whitespace-nowrap">{product.title}</span>
                        <span className="text-[8px] text-[#3D0004]/70 skew-x-[15deg] whitespace-nowrap">₹{product.price}</span>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LAYER 3: Foreground grass cutout (z-40) */}
        <div className="absolute bottom-0 left-0 w-full h-[22%] sm:h-[35%] z-40 pointer-events-none">
          <Image
            src="/product-banner/foreground4.png"
            alt=""
            fill
            className="object-cover object-bottom"
            aria-hidden="true"
          />
        </div>

        {/* Heading Layer (Left Aligned) */}
        <div className="absolute top-6 sm:top-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center text-center space-y-2 w-full px-4">
          <div className="w-[70%] h-0.5 bg-white/20"></div>
          <span className="font-serif text-lg sm:text-xl md:text-2xl font-light text-white/90">
            Ancient Wisdom, Bottled
          </span>
          <h2 className="font-samarn text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
            Our Signature Products
          </h2>
          <div className="w-[70%] h-0.5 bg-white/20"></div>
        </div>

        {/* View All Products Button (Right Aligned) */}
        {showViewAllLink && (
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50">
            <StyledButton href="/products" variant="secondary" className="text-white border-1 border-white hover:bg-white/10 hover:text-white whitespace-nowrap !text-xs sm:!text-sm !px-6">
              View All Products
            </StyledButton>
          </div>
        )}

      </div>
    </motion.section>
  );
}