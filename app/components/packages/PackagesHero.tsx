"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface Category {
    name: string;
    slug: string;
}

interface PackagesHeroProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    categories: Category[];
}

export default function PackagesHero({
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    categories
}: PackagesHeroProps) {
    const heroRef = useRef<HTMLElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { scrollYProgress } = useScroll({
        target: isMounted ? heroRef : undefined,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "4px"]);
    const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

    return (
        <motion.section
            ref={heroRef}
            className="relative w-full flex flex-col md:block h-auto md:h-[80vh] lg:h-[90vh] md:min-h-[500px] overflow-hidden bg-[#3D0004]"
            style={isMounted && window.innerWidth >= 768 ? { scale, borderRadius, opacity } : {}}
        >
            {/* Background Image */}
            <div className="relative w-full aspect-[16/9] md:absolute md:inset-0 z-0">
                <Image
                    src="/package-banner/welcome2.png"
                    alt="Packages Banner"
                    fill
                    priority
                    className="object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#3D0004] via-[#3D0004]/10 to-transparent min-[1241px]:from-black/85 min-[1241px]:via-black/35 min-[1241px]:to-black/10" />
            </div>

            {/* Content Container */}
            <div className="relative w-full h-auto max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center py-12 z-20 md:absolute md:inset-0 md:h-full md:justify-end md:py-20">
                <div className="w-full flex flex-col gap-6 md:gap-8">

                    {/* Upper content row (Titles) */}
                    <div className="w-full flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-white/10 pb-6">
                        {/* Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="max-w-2xl text-left"
                        >
                            <h1 className="font-samarn text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-tight uppercase">
                                PACKAGES
                            </h1>
                        </motion.div>

                        {/* Subtitle */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="max-w-md text-left md:text-right"
                        >
                            <p className="font-serif text-xs md:text-sm text-white/90 font-medium uppercase tracking-widest leading-relaxed">
                                GET THE BENEFIT OF AUTHENTIC  <br />AYURVEDA AT THE PLACE WHERE IT NURTURED
                            </p>
                        </motion.div>
                    </div>

                    {/* Bottom controls row (Search + Tabs) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col lg:flex-row gap-6 items-center justify-between z-30"
                    >
                        {/* Search Input */}
                        <div className="relative w-full lg:max-w-md">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/60 z-10">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Search by name, treatment or symptom..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 backdrop-blur-md border border-white/25 text-white placeholder:text-white/60 rounded-full py-2.5 pl-11 pr-10 text-sm md:text-base tracking-wide transition-all duration-300 outline-none focus:ring-1 focus:ring-white/40 focus:border-white/40 font-serif"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-white focus:outline-none"
                                    aria-label="Clear search"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Category Filter Tabs */}
                        <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-start lg:justify-end">

    {/* All Button */}
    <button
        onClick={() => setActiveTab("all")}
        className={`px-4 py-2 font-serif text-[11px] md:text-xs rounded-full tracking-wider transition-all duration-300 uppercase border ${
            activeTab === "all"
                ? "bg-white text-[#3D0004] border-white font-medium shadow-sm"
                : "bg-white/10 text-white/90 border-white/20 hover:bg-white/20 hover:text-white"
        }`}
    >
        All Packages
    </button>

    {/* Dynamic Categories */}
    {categories.map((category) => {
        const isActive = activeTab === category.slug;

        return (
            <button
                key={category.slug}
                onClick={() => setActiveTab(category.slug)}
                className={`px-4 py-2 font-serif text-[11px] md:text-xs rounded-full tracking-wider transition-all duration-300 uppercase border ${
                    isActive
                        ? "bg-white text-[#3D0004] border-white font-medium shadow-sm"
                        : "bg-white/10 text-white/90 border-white/20 hover:bg-white/20 hover:text-white"
                }`}
            >
                {category.name}
            </button>
        );
    })}
</div>
                    </motion.div>

                </div>
            </div>
        </motion.section>
    );
}
