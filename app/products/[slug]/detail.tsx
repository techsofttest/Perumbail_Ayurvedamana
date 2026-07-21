"use client";

import { useState, use, useEffect } from "react";
import Image from "next/image";
import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";
import StyledButton from "@/app/components/ui/StyledButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}
interface Product {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  price: number;
  offerprice: number;
  quality: string;
  content: string;
  benefits: string[];
  usage: string;
  ingredients: string[];
  meta_title: string;
  meta_key: string;
  meta_desc: string;
}
export default function ProductDetailedPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const productSlug = resolvedParams.slug;

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
    deliveryMethod: "Shipping"
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [product, setProducts] = useState<Product | null>(null);

  const openBooking = () => {
    window.location.href = "/online-consultation";
  };
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/detail/${productSlug}`)
      .then((res) => res.json())
      .then((data) => {
        // Change this line:
        setProducts(data);
      })
      .catch(console.error);
  }, [productSlug]);
  if (!product) {
    return (
      <div className="relative flex flex-col min-h-screen text-[#3D0004] overflow-x-clip font-serif">
        <Header onOpenBooking={openBooking} forceSolid={true} />
        <main className="flex-grow pt-36 pb-20 flex flex-col items-center justify-center">
          <h1 className="font-samarn text-3xl text-[#680007] mb-4">Product Not Found</h1>
          <a href="/products" className="font-serif text-sm uppercase tracking-wider text-[#680007] hover:underline">
            &larr; Back to Products Store
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product-enquiry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            quantity: formData.quantity,
            deliveryMethod: formData.deliveryMethod,
            product: product.title,
            price: product.offerprice,
            total: product.offerprice * formData.quantity,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setIsSubmitted(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        quantity: 1,
        deliveryMethod: "Shipping",
      });
    } catch (error) {
      console.error(error);
      alert("Unable to submit enquiry. Please try again.");
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen text-[#3D0004] overflow-x-clip selection:bg-[#a84e32]/25 selection:text-[#3D0004] font-serif">
      {/* Background Layers */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          backgroundImage: "linear-gradient(to top, hsla(208, 60%, 85%, 0.5) 0%, transparent 50%)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          opacity: 0.9,
        }}
      />
      <div
        className="fixed inset-0 -z-30"
        style={{
          backgroundImage: "url('/backgrounds/cloud-texture.svg')",
          opacity: 0.5,
        }}
      />

      {/* Sticky Header */}
      <Header onOpenBooking={openBooking} forceSolid={true} />

      {/* Main Content */}
      <main className="flex-grow pt-28 md:pt-24 pb-20">
        <section className="relative w-full bg-transparent text-[#3D0004] py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-12">

            {/* Top Title Section */}
            <div className="flex flex-col items-center text-center space-y-2 mb-12">
              <div className="w-[70%] h-0.5 bg-[#680007]/20"></div>
              <span className="font-serif text-md uppercase tracking-widest text-[#680007] block">
                {product.category} &bull; {product.quality}
              </span>
              <h1 className="font-samarn text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#3D0004] leading-tight uppercase px-4">
                {product.title}
              </h1>
              <div className="w-[70%] h-0.5 bg-[#680007]/20"></div>
            </div>

            {/* Main Product Image display */}
            <div className="relative w-full aspect-[21/9] sm:aspect-[16/6] md:aspect-[21/9] bg-[#e6e0d5] border border-[#680007]/10 overflow-hidden mb-12 md:mb-16 flex items-center justify-center p-6">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-8"
                priority
              />
            </div>

            {/* Split Bottom Section - Description Left, Inquiry/Checkout Form Right */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start mt-8">
              {/* Left Column: Description, Benefits, Ingredients, Usage */}
              <div className="md:col-span-7 space-y-8">
                <div>
                  <span className="font-serif text-md uppercase tracking-wider text-[#680007] block mb-1">
                    Product Details
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl font-light text-[#680007] tracking-tight uppercase">
                    Description & Features
                  </h2>
                  <p className="font-serif text-lg md:text-xl text-[#3D0004]/80 leading-relaxed font-light mt-4 whitespace-pre-line">
                    {product.content}
                  </p>
                </div>

                {/* Key Benefits */}{product.benefits?.length > 0 && (
                <div className="pt-6 border-t border-[#680007]/10">
                  <h3 className="font-serif text-lg font-medium text-[#680007] uppercase mb-4">
                    Therapeutic & Wellness Benefits
                  </h3>
                  <ul className="space-y-3 font-serif text-base text-[#3D0004]/80 leading-relaxed font-light list-none">
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#680007] mt-1">✦</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>)}

                {/* Recommended Usage */}{product.usage && (
                <div className="pt-6 border-t border-[#680007]/10">
                  <h3 className="font-serif text-lg font-medium text-[#680007] uppercase mb-3">
                    Recommended Usage
                  </h3>
                  <p className="font-serif text-base text-[#3D0004]/80 leading-relaxed font-light">
                    {product.usage}
                  </p>
                </div>)}

                {/* Key Ingredients */}{product.ingredients?.length > 0 && (
                <div className="pt-6 border-t border-[#680007]/10">
                  <h3 className="font-serif text-lg font-medium text-[#680007] uppercase mb-4">
                    Key Herbal Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="bg-[#faf8f5]/60 border border-[#680007]/15 px-3 py-1.5 text-sm text-[#3D0004] font-serif"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>)}
              </div>

              {/* Right Column: Inquiry / Checkout Block */}
              <div className="md:col-span-5 bg-[#FBF3EF]/40 border border-[#680007]/10 p-8 rounded-sm space-y-6">
                {isSubmitted ? (
                  <div className="text-center py-8 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-2 border-[#680007]/30 flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-[#680007]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-xl font-medium text-[#680007] uppercase mb-3">
                      Enquiry Received
                    </h3>
                    <p className="font-serif text-sm text-[#3D0004]/80 leading-relaxed font-light mb-6">
                      Thank you, <span className="font-semibold">{formData.name}</span>. Your request for <span className="font-semibold">{formData.quantity}x {product.title}</span> has been logged. Our store supervisor will contact you shortly to finalize shipping/pickup.
                    </p>
                    <StyledButton onClick={() => setIsSubmitted(false)} variant="primary" className="w-full">
                      Submit Another Inquiry
                    </StyledButton>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#b38e5d] mb-1.5 block">
                        Direct Order Enquiry
                      </span>
                      <h3 className="font-serif text-xl text-[#680007] font-medium uppercase">
                        Purchase Order Inquiry
                      </h3>
                      <div className="flex items-center space-x-3 mt-3 font-sans">
                        <span className="text-sm line-through text-[#3D0004]/40 font-light">
                          ₹{product.price}
                        </span>
                        <span className="text-xl font-bold text-[#680007]">
                          ₹{product.offerprice}
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handleCheckoutSubmit} className="space-y-4" >
                      <div className="space-y-1.5">
                        <label className="font-sans text-xs font-semibold text-[#3D0004]/80">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white border border-[#3D0004]/20 px-3 py-2 focus:outline-none focus:border-[#680007] font-sans text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-sans text-xs font-semibold text-[#3D0004]/80">Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white border border-[#3D0004]/20 px-3 py-2 focus:outline-none focus:border-[#680007] font-sans text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-sans text-xs font-semibold text-[#3D0004]/80">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white border border-[#3D0004]/20 px-3 py-2 focus:outline-none focus:border-[#680007] font-sans text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-sans text-xs font-semibold text-[#3D0004]/80">Quantity</label>
                          <input
                            type="number"
                            min={1}
                            max={10}
                            required
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                            className="w-full bg-white border border-[#3D0004]/20 px-3 py-2 focus:outline-none focus:border-[#680007] font-sans text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-sans text-xs font-semibold text-[#3D0004]/80">Delivery Method</label>
                          <select
                            value={formData.deliveryMethod}
                            onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                            className="w-full bg-white border border-[#3D0004]/20 px-3 py-2 focus:outline-none focus:border-[#680007] font-sans text-sm"
                          >
                            <option value="Shipping">Home Shipping</option>
                            <option value="Store Pickup">Pickup at Hospital Desk</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-sans text-xs font-semibold text-[#3D0004]/80">Shipping Address (Not required for Store Pickup)</label>
                        <textarea
                          rows={2}
                          required={formData.deliveryMethod === "Shipping"}
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full bg-white border border-[#3D0004]/20 px-3 py-2 focus:outline-none focus:border-[#680007] font-sans text-sm resize-none"
                        />
                      </div>

                      <div className="pt-4 border-t border-[#680007]/10 flex justify-between items-center">
                        <div className="text-left font-serif">
                          <span className="text-[10px] text-[#3D0004]/50 uppercase block font-semibold">Total Price</span>
                          <span className="text-lg font-bold text-[#680007]">₹{product.offerprice * formData.quantity}</span>
                        </div>
                        <StyledButton
                          type="submit"
                          variant="primary"
                        >
                          Submit Enquiry
                        </StyledButton>
                      </div>
                    </form>
                  </div>
                )}

                <div className="pt-4 border-t border-[#680007]/10 flex flex-col gap-2">
                  <a
                    href="/products"
                    className="font-serif text-sm uppercase tracking-wider text-[#680007] hover:text-[#b38e5d] transition-colors font-medium inline-flex items-center gap-1 group/btn cursor-pointer"
                  >
                    &larr; Back to Products Store
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
