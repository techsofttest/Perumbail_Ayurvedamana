"use client";

import { useState, useMemo, useEffect } from "react";
import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";
import BookingModal from "@/app/components/ui/BookingModal";
import StyledButton from "@/app/components/ui/StyledButton";
import PackagesHero from "@/app/components/packages/PackagesHero";
import PackageCard from "@/app/components/packages/PackageCard";

interface PackageData {
    id: string;
    slug: string;
    title: string;
    content: string;
    image: string;
    category: string;
}

interface Category {
    name: string;
    slug: string;
}

export default function PackagesPage() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [categories, setCategories] = useState<Category[]>([]);
    const [packages, setPackages] = useState<PackageData[]>([]);
    const [loading, setLoading] = useState(true);

    const openBooking = () => {
        window.location.href = "/online-consultation";
    };
    const closeBooking = () => setIsBookingOpen(false);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/package`)
            .then((res) => {
                if (!res.ok) throw new Error("Server responded with an error status code");
                return res.json();
            })
            .then((data) => {
                setCategories(data.categories || []);
                setPackages(data.packages || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, []);

    // Memoize the packages filtering matching the search queries
    const filteredPackages = useMemo(() => {
        return packages.filter((pkg) => {
            const matchesCategory = activeTab === "all" || pkg.category === activeTab;
            const matchesSearch =
                pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pkg.content.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [packages, activeTab, searchQuery]);

    const hasResults = filteredPackages.length > 0;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center font-serif text-xl text-[#3D0004]">
                Loading Packages...
            </div>
        );
    }

    return (
        <div className="relative flex flex-col min-h-screen text-[#3D0004] overflow-x-hidden selection:bg-[#a84e32]/25 selection:text-[#3D0004]">
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
                    backgroundImage: "url('/backgrounds/cloud-texture.png')",
                    opacity: 0.5,
                }}
            />

            {/* Header */}
            <Header onOpenBooking={openBooking} />

            {/* Main Content Area */}
            <main className="flex-grow pb-20">
                <PackagesHero
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                categories={categories}
            />

                <div className="relative w-full">
                    {!hasResults ? (
                        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 text-center">
                            <div className="max-w-md mx-auto flex flex-col items-center">
                                <span className="text-[#680007] text-4xl mb-4">◆</span>
                                <h3 className="font-serif text-2xl font-medium text-[#680007] uppercase mb-3">
                                    No Packages Found
                                </h3>
                                <p className="font-serif text-md text-[#3D0004]/70 leading-relaxed font-light mb-6">
                                    We couldn't find any packages matching "{searchQuery}". Please try another search query or request a custom consultation tailored to your wellness needs.
                                </p>
                                <StyledButton href="/online-consultation" variant="primary">
                                    Custom Consultation
                                </StyledButton>
                            </div>
                        </div>
                    ) : (
                        <div key="results-container" className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col gap-16">
                            {categories.map((category) => {
                                const items = filteredPackages.filter((p) => p.category === category.slug);

                                if (activeTab !== "all" && activeTab !== category.slug) {
                                    return null;
                                }

                                if (items.length === 0) return null;

                                return (
                                    <section key={category.slug} className="flex flex-col gap-8">
                                        <div className="border-b border-[#3D0004]/10 pb-4">
                                            <h2 className="font-serif text-3xl font-medium text-[#680007] uppercase tracking-wide">
                                                {category.name}
                                            </h2>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                            {items.map((pkg, index) => (
                                                <PackageCard
                                                    key={pkg.id}
                                                    pkg={pkg}
                                                    index={index}
                                                    onOpenBooking={openBooking}
                                                />
                                            ))}
                                        </div>
                                    </section>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <Footer />

            <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
        </div>
    );
}