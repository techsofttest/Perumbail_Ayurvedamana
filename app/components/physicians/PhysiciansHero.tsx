"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function PhysiciansHero() {
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
                    src="/physicians-banner/physicians-b3.png"
                    alt="Physicians Banner"
                    fill
                    priority
                    className="object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#3D0004] via-[#3D0004]/10 to-transparent min-[1241px]:from-black/80 min-[1241px]:via-black/5 min-[1241px]:to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative w-full h-auto max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center py-12 z-20 md:absolute md:inset-0 md:h-full md:justify-end md:py-20">

                <div className="w-full flex flex-col md:flex-row md:justify-between md:items-end gap-8 text-center md:text-left">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-2xl mx-auto md:mx-0"
                    >
                        <h1 className="font-samarn text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-tight uppercase">
                            PHYSICIANS
                        </h1>
                    </motion.div>

                    {/* Right Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-md mx-auto md:mx-0 md:text-right"
                    >
                        <p className="font-serif text-base md:text-lg text-white/90 font-medium uppercase leading-relaxed">
                            LEGENDS OF KERALA AYUREVDA <br />
                            ASHTA VIDAYAN VAIDYA MADOM LATE.VALYA NARAYANAN NAMPOOTHIRI AND LATE POOMULLY NEELAKANDAN NAMBUTHIRIPAD(AARAMTHAMPURAN)
                        </p>
                    </motion.div>
                </div>

            </div>
        </motion.section>
    );
}
