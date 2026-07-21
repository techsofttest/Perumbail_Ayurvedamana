"use client";

import { useState,useEffect , useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import ProductBanner from "../components/home/ProductBanner";

interface Product {
  slug: string;
  title: string;
  category: string;
  image: string;
  price: number;
  offerprice: number;
  quality: string;
  content: string;
  
}
interface CategoryData{
  name:string
}

export default function ProductsPage() {
 const [selectedCategory, setSelectedCategory] = useState<string>("All");
const [products, setProducts] = useState<Product[]>([]);
const [categories, setCategories] = useState<CategoryData[]>([]);
  
 useEffect(() => {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`)
    .then((res) => res.json())
    .then((data) => {
      setProducts(data.products || []);
      setCategories(data.categories || []);
    })
    .catch(console.error);
}, []);
useEffect(() => {
  console.log(categories);
  console.log(products);
}, [categories, products]);
const filteredProducts = useMemo(() => {
  if (selectedCategory === "All") return products;

  return products.filter(
    (p) =>
      p.category?.toLowerCase() ===
      selectedCategory.toLowerCase()
  );
}, [products, selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen text-[#3D0004] selection:bg-[#a84e32]/25 selection:text-[#3D0004] font-serif">
      <Header onOpenBooking={() => window.location.href = "/online-consultation"} forceSolid={true} />

      <main className="flex-grow pt-28 md:pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Page Banner Header */}
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="font-samarn text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#3D0004] leading-tight">
              Ayurvedic Products Store
            </h1>
          </div>

          {/* Highlighted Products Banner */}
          <div className="-mx-6 md:-mx-12">
            <ProductBanner showViewAllLink={false} />
          </div>

          {/* Filtering Tabs */}
          <div className="flex justify-center space-x-2 md:space-x-4 mb-12 border-b border-[#680007]/10 pb-4 overflow-x-auto">

          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 text-md font-bold uppercase tracking-widest transition-all duration-300 border-b-2 whitespace-nowrap cursor-pointer ${
              selectedCategory === "All"
                ? "border-[#680007] text-[#680007]"
                : "border-transparent text-[#3D0004]/60 hover:text-[#680007]"
            }`}
          >
            All
          </button>

          {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 text-md font-bold uppercase tracking-widest transition-all duration-300 border-b-2 whitespace-nowrap cursor-pointer ${
                  selectedCategory === category.name
                    ? "border-[#680007] text-[#680007]"
                    : "border-transparent text-[#3D0004]/60 hover:text-[#680007]"
                }`}
              >
                {category.name}
              </button>
            ))}
        </div>

          {/* Product Listing Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filteredProducts.map((product) => (
              <Link
                key={product.title}
                href={`/products/${product.slug}`}
                className="group bg-[#ffff] flex flex-col transition-all duration-300 cursor-pointer"
              >
                {/* Image Container with Hover Actions */}
                <div className="relative w-full aspect-[4/5] bg-[#e6e0d5] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-w-768px) 100vw, 20vw"
                    className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Hover overlay containing 'Buy It Now' and 'View Details' */}
                  <div className="absolute inset-0 bg-[#3D0004]/65 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center space-y-4 px-4 z-20">
                    <span
                      className="w-full max-w-[160px] border border-white hover:bg-white text-white hover:text-[#3D0004] py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer text-center"
                    >
                      View Details
                    </span>
                    <span
                      className="w-full max-w-[160px] bg-[#A3000B] hover:bg-[#faf8f5] text-white hover:text-[#3D0004] py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer text-center"
                    >
                      Enquiry Now
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-serif text-base md:text-lg font-medium text-[#3D0004] group-hover:text-[#b38e5d] transition-colors mb-2">
                    {product.title}
                  </h3>
                  <p className="font-serif text-md text-[#3D0004]/70 leading-relaxed mb-4 line-clamp-2">
                    {product.content}
                  </p>

                  {/* Pricing Row */}
                  <div className="flex items-center space-x-3 mt-auto font-sans">
                    <span className="text-sm line-through text-[#3D0004]/70">
                      ₹{product.price}
                    </span>
                    <span className="text-lg font-bold text-[#680007]">
                      ₹{product.offerprice}
                    </span>
                    <span
                      className="w-full max-w-[160px] bg-[#A3000B] hover:bg-[#faf8f5] text-white hover:text-[#3D0004] py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer text-center"
                    >
                      Enquiry Now
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
