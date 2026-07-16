"use client";

import { FaWhatsapp } from "react-icons/fa6";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import StyledButton from "../ui/StyledButton";
import Image from "next/image";
interface aboutData {
    title: string;
    content: string;
    image: string;
}
export default function TrustHeritage() {
    const [isSticky, setIsSticky] = useState(false);
    const imageRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [about, setData] = useState<aboutData | null>(null);
    const [contact, setContact] = useState({ whatsapp: '' });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages`) // Ensure this matches your route
            .then((res) => res.json())
            .then((data) => {
                setData(data.about);
                setContact(data.contact);
            })
            .catch(console.error);
    }, []);
    // Framer Motion scroll animations
    const { scrollYProgress } = useScroll({
        offset: ["start end", "end end"]
    });

    const imageScale = useTransform(scrollYProgress, [0, 0.8], [0.5, 1]);
    const imageParallax = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
    const backgroundParallax = useTransform(scrollYProgress, [0, 1], ['-25%', '25%']);

    useEffect(() => {
        const imageElement = imageRef.current;
        const handleScroll = () => {
            if (imageElement) {
                const { bottom } = imageElement.getBoundingClientRect();
                // Show sticky buttons when the bottom of the image is visible in the viewport
                setIsSticky(bottom <= window.innerHeight);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Check on initial load

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <motion.section
            ref={sectionRef}
            id="why-choose"
            className="relative w-full bg-transparent text-[#132b15] font-serif overflow-hidden"
        >

            {/* Background Layers: Gradient and Cloud Texture separated for reliability */}
            <motion.div
                className="absolute inset-0 -z-20"
                style={{
                    backgroundImage: "linear-gradient(to top, hsla(208, 60%, 85%, 0.5) 0%, transparent 50%)",
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.9,
                    y: backgroundParallax,
                }}
            />
            <motion.div
                className="absolute inset-0 -z-30"
                style={{
                    backgroundImage: "url('/backgrounds/cloud-texture.svg')",
                    opacity: 0.5,
                    y: backgroundParallax,
                }}
            />
            <div className="w-full">

                {/* Top Text Content */}
                <div className="relative z-10 pt-16 md:pt-24 pb-12 md:pb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-3xl mx-auto flex flex-col items-center text-center"
                    >
                        <div className="relative flex flex-col items-center space-y-2">

                            <div className="w-[70%] h-0.5 bg-[#680007]/20"></div>
                            <span className="font-serif text-2xl font-light text-[#680007]">
                                Since 1923
                            </span>
                            <h2 className="font-samarn text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#680007] pb-6">{about?.title}</h2>
                            <div className="w-[70%] h-0.5 bg-[#680007]/20"></div>
                        </div>
                        <p className="font-serif text-3xl text-[#680007]/70 leading-relaxed max-w-3xl mt-16">{about?.content}</p>
                    </motion.div>
                </div>

                {/* Building Image */}
                <div ref={imageRef} className="w-full px-12">
                    <motion.div
                        style={{ y: imageParallax, scale: imageScale }}
                        className="relative w-full h-auto"
                    >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL_BASE}/${about?.image}`}
                            alt="Perumbayil Ayurvedamana Heritage Building"
                            width={1920}
                            height={780}
                            className="w-full h-auto object-contain"
                        />
                    </motion.div>
                </div>

                {/* Sticky Navigation Island */}
                <div
                    className={`fixed bottom-0 left-0 right-0 z-[60] transition-transform duration-500 ease-in-out ${isSticky ? "translate-y-0" : "translate-y-full"}`}
                >
                    <div className="max-w-lg mx-auto py-2 px-6 mb-4 bg-[#faf8f5]/80 backdrop-blur-md border border-[#680007]/10 rounded-full shadow-2xl flex items-center justify-center space-x-8">
                        <StyledButton
                            href="/online-consultation"
                            className="flex-1 !text-md text-white"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            <span>Enquire Now</span>
                        </StyledButton>
                        <StyledButton
                            href={contact.whatsapp}
                            variant="secondary"
                            className="flex-1 border-2 border-[#680007] !text-md text-[#680007] hover:text-[#faf8f5]"
                        >
                            <FaWhatsapp className="w-4 h-4" />
                            <span>Whatsapp Us</span>
                        </StyledButton>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}