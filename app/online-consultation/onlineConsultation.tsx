"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import StyledButton from "@/app/components/ui/StyledButton";

const DEFAULT_IMAGES = [
    "/package-banner/welcome2.png",
    "/services-methods/Abhyanga/thumbnail.JPG",
    "/services-methods/Shirodhara/thumbnail.JPG",
    "/services-methods/Yoga/thumbnail.JPG",
    "/services-methods/Wellness-Mask/thumbnail.JPG",
];

interface OnlineData {
    title: string;
    paragraphs: string;
    content: string[];
    images: string[];
}

export default function OnlineConsultationPage() {
    const [onlineData, setOnlineData] = useState<OnlineData | null>(null);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1);
    const totalSteps = 4;
    const [activeImage, setActiveImage] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const [carouselImages, setCarouselImages] =
        useState<string[]>(DEFAULT_IMAGES);
    // Form inputs state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        country: "",
        state: "",
        zipCode: "",
        treatmentInterest: "",
        preferredDate: "",
        reports: [] as File[],
        sex: "",
        age: "",
        maritalStatus: "",
        bloodPressure: "",
        weight: "",
        height: "",
        vegetarian: "yes",
        healthProblems: "",
        personalHistory: "",
        clinicalDetails: "",
        otherInfo: ""
    });
    useEffect(() => {
        const fetchOnlineData = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "")}/online`
                );

                const data = await res.json();

                if (data.online) {
                    setOnlineData(data.online);

                    // Use API images for carousel
                    if (data.online.images?.length) {
                        setCarouselImages(data.online.images);
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOnlineData();
    }, []);
    // Automated image slideshow on the left
    useEffect(() => {
        const interval = setInterval(() => {
            (activeImage + 1) % carouselImages.length
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setFormData((prev) => ({
                ...prev,
                reports: [...prev.reports, ...filesArray]
            }));
        }
    };

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();

        if (step < totalSteps) {
            setStep((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        setIsSubmitting(true);
        setSubmitError("");

        try {
            const submissionUrl = `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "")}/online-consultation`;

            const data = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (key !== "reports") {
                    data.append(key, value as string);
                }
            });

            formData.reports.forEach((file) => {
                data.append("reports[]", file);
            });

            const response = await fetch(submissionUrl, {
                method: "POST",
                body: data,
            });

            const result = await response.json();

            if (!response.ok) {
                if (response.status === 422 && result.errors) {
                    const firstError = Object.values(result.errors).flat()[0] as string;
                    throw new Error(firstError);
                }

                throw new Error(
                    result.message || "Unable to submit your consultation request."
                );
            }
            if (!result.success) {
                throw new Error(
                    result.message || "Unable to submit your consultation request."
                );
            }

            setIsSubmitted(true);

            // Optional: reset form
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                address: "",
                country: "",
                state: "",
                zipCode: "",
                treatmentInterest: "",
                preferredDate: "",
                reports: [],
                sex: "",
                age: "",
                maritalStatus: "",
                bloodPressure: "",
                weight: "",
                height: "",
                vegetarian: "yes",
                healthProblems: "",
                personalHistory: "",
                clinicalDetails: "",
                otherInfo: "",
            });

        } catch (error) {
            console.error(error);

            let message = "Something went wrong. Please try again.";

            if (error instanceof Error) {
                message = error.message;
            }

            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };
        const handleBack = () => {
            if (step > 1) {
                setStep((prev) => prev - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };

        const stepNames = [
            "Contact Information",
            "Consultation Details",
            "Health Metrics",
            "Personal Medical History"
        ];

        return (
            <div className="min-h-screen bg-[#faf8f5] text-[#3D0004] selection:bg-[#a84e32]/25 selection:text-[#3D0004] flex flex-col lg:grid lg:grid-cols-12">

                {/* LEFT COLUMN: Visual Heritage Sidebar Carousel */}
                <div className="relative lg:sticky lg:top-0 col-span-5 h-[45vh] lg:h-screen bg-[#3D0004] overflow-hidden flex flex-col justify-between p-8 lg:p-12 z-20">
                    {/* Cross-fading Slideshow Background */}
                    <div className="absolute inset-0 z-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeImage}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={carouselImages[activeImage]}
                                    alt="Ayurveda Heritage"
                                    fill
                                    priority
                                    className="object-cover opacity-60"
                                />
                            </motion.div>
                        </AnimatePresence>
                        {/* Editorial Rich Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#200002]/95 via-black/30 to-[#200002]/40 z-10" />
                    </div>

                    {/* Back Button */}
                    <div className="relative z-20 self-start">
                        <a
                            href="/"
                            className="inline-flex items-center space-x-2 text-white/80 hover:text-white group transition-colors duration-300 font-serif text-sm tracking-wide"
                        >
                            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span>Back to Home</span>
                        </a>
                    </div>

                    {/* Editorial Brand / Accreditations Info */}
                    <div className="relative z-20 text-white mt-auto space-y-6">
                        <div className="space-y-2">
                            <span className="font-serif text-[10px] lg:text-xs tracking-[0.2em] font-bold text-[#c8ab80] block uppercase">
                                {onlineData?.title}
                            </span>
                            <h2 className="font-samarn text-3xl lg:text-5xl font-light tracking-wide leading-tight uppercase text-white">
                                {onlineData?.paragraphs}
                            </h2>
                        </div>
                        {onlineData?.content?.length ? (
                            <div className="mb-10 space-y-4">
                                {onlineData.content.map((item, index) => (
                                    <p
                                        key={index}
                                        className="font-serif text-sm text-[#3D0004]/70 leading-7"
                                    >
                                        {item}
                                    </p>
                                ))}
                            </div>
                        ) : null}<div className="w-12 h-[2px] bg-[#c8ab80]"></div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Interactive Form Content */}
                <div className="col-span-7 min-h-screen flex flex-col justify-between bg-[#faf8f5] px-6 py-12 md:p-16 lg:p-24 relative z-10">
                    <div className="w-full max-w-2xl mx-auto my-auto">

                        {isSubmitted ? (
                            /* SUCCESSFUL SUBMISSION FRAME */
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="text-center py-16 flex flex-col items-center justify-center"
                            >
                                <div className="w-20 h-20 rounded-full border-2 border-[#680007]/30 flex items-center justify-center mb-8">
                                    <svg className="w-10 h-10 text-[#680007]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                                <h3 className="font-serif text-3xl md:text-4xl font-medium text-[#680007] uppercase mb-4 tracking-wide">
                                    Consultation Request Received
                                </h3>
                                <p className="font-serif text-base md:text-lg text-[#3D0004]/80 leading-relaxed font-light mb-8 max-w-md">
                                    Thank you, <span className="font-medium text-[#680007]">{formData.firstName}</span>. Your case summary has been sent directly to our senior physician's desk. We will reach out to you within <span className="font-sans">24</span> hours.
                                </p>
                                <StyledButton href="/" variant="primary">
                                    Return Home
                                </StyledButton>
                            </motion.div>
                        ) : (
                            /* CONSULTATION REGISTRATION FORM */
                            <div>
                                {/* Heading Header */}
                                <div className="mb-10">
                                    <span className="font-serif text-[11px] font-bold uppercase tracking-widest text-[#a84e32] mb-1.5 block">
                                        STEP <span className="font-sans">{step}</span> OF <span className="font-sans">{totalSteps}</span> &bull; {stepNames[step - 1]}
                                    </span>
                                    <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#3D0004] tracking-tight uppercase leading-none">
                                        Online Consultation
                                    </h2>
                                    <p className="font-serif text-sm text-[#3D0004]/60 leading-relaxed font-light mt-3">
                                        Fill out this detailed wellness questionnaire to help us plan your treatments accurately.
                                    </p>
                                </div>

                                {/* Improved Stepped Progress Bar Design */}
                                <div className="flex justify-between items-center w-full mb-16 relative">
                                    {/* Connecting background line */}
                                    <div className="absolute top-4 left-0 right-0 h-[2px] bg-[#680007]/10 z-0" />

                                    {/* Connecting active fill line */}
                                    <div
                                        className="absolute top-4 left-0 h-[2px] bg-[#680007] z-0 transition-all duration-500 ease-out"
                                        style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                                    />

                                    {[1, 2, 3, 4].map((num) => {
                                        const isActive = num <= step;
                                        const isCurrent = num === step;
                                        return (
                                            <div key={num} className="flex flex-col items-center relative z-10">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (num < step) setStep(num);
                                                    }}
                                                    disabled={num >= step}
                                                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-sans text-xs font-semibold transition-all duration-500 ${isCurrent
                                                        ? "bg-[#680007] border-[#680007] text-[#faf8f5] ring-4 ring-[#680007]/15"
                                                        : isActive
                                                            ? "bg-[#680007] border-[#680007] text-[#faf8f5] cursor-pointer"
                                                            : "bg-[#faf8f5] border-[#680007]/25 text-[#3D0004]/40"
                                                        }`}
                                                >
                                                    {num}
                                                </button>
                                                <span className={`absolute top-10 font-sans text-[10px] uppercase tracking-widest whitespace-nowrap hidden sm:block transition-colors duration-500 ${isCurrent ? "text-[#680007] font-semibold" : "text-[#3D0004]/50"
                                                    }`}>
                                                    {stepNames[num - 1].split(" ")[0]}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <form onSubmit={handleNext} className="space-y-8">
                                    <AnimatePresence mode="wait">
                                        {step === 1 && (
                                            <motion.div
                                                key="step1"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.4 }}
                                                className="space-y-6"
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">First Name <span className="text-[#680007]">*</span></label>
                                                        <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full bg-white border border-[#3D0004]/20 rounded-none px-4 py-3 focus:outline-none focus:border-[#680007] focus:ring-1 focus:ring-[#680007]/30 transition-all font-sans text-[#3D0004]" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">Last Name</label>
                                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-white border border-[#3D0004]/20 rounded-none px-4 py-3 focus:outline-none focus:border-[#680007] focus:ring-1 focus:ring-[#680007]/30 transition-all font-sans text-[#3D0004]" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">Email Address <span className="text-[#680007]">*</span></label>
                                                        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-white border border-[#3D0004]/20 rounded-none px-4 py-3 focus:outline-none focus:border-[#680007] focus:ring-1 focus:ring-[#680007]/30 transition-all font-sans text-[#3D0004]" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">Telephone Number <span className="text-[#680007]">*</span></label>
                                                        <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-white border border-[#3D0004]/20 rounded-none px-4 py-3 focus:outline-none focus:border-[#680007] focus:ring-1 focus:ring-[#680007]/30 transition-all font-sans text-[#3D0004]" />
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">Postal Address</label>
                                                        <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-white border border-[#3D0004]/20 rounded-none px-4 py-3 focus:outline-none focus:border-[#680007] focus:ring-1 focus:ring-[#680007]/30 transition-all font-sans text-[#3D0004]" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">Country <span className="text-[#680007]">*</span></label>
                                                        <div className="relative">
                                                            <select name="country" required value={formData.country} onChange={handleChange} className="w-full bg-white border border-[#3D0004]/20 rounded-none px-4 py-3 focus:outline-none focus:border-[#680007] focus:ring-1 focus:ring-[#680007]/30 transition-all font-sans text-[#3D0004] appearance-none">
                                                                <option value="">Select Country</option>
                                                                <option value="India">India</option>
                                                                <option value="USA">United States</option>
                                                                <option value="UK">United Kingdom</option>
                                                                <option value="UAE">United Arab Emirates</option>
                                                                <option value="Germany">Germany</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#680007]/70">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">State / Region <span className="text-[#680007]">*</span></label>
                                                        <input type="text" name="state" required value={formData.state} onChange={handleChange} className="w-full bg-white border border-[#3D0004]/20 rounded-none px-4 py-3 focus:outline-none focus:border-[#680007] focus:ring-1 focus:ring-[#680007]/30 transition-all font-sans text-[#3D0004]" />
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">Zip / Postal Code <span className="text-[#680007]">*</span></label>
                                                        <input type="text" name="zipCode" required value={formData.zipCode} onChange={handleChange} className="w-full bg-white border border-[#3D0004]/20 rounded-none px-4 py-3 focus:outline-none focus:border-[#680007] focus:ring-1 focus:ring-[#680007]/30 transition-all font-sans text-[#3D0004]" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 2 && (
                                            <motion.div
                                                key="step2"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.4 }}
                                                className="space-y-6"
                                            >
                                                <div className="grid grid-cols-1 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">Treatment Category of Interest</label>
                                                        <div className="relative">
                                                            <select name="treatmentInterest" value={formData.treatmentInterest} onChange={handleChange} className="w-full bg-white border border-[#3D0004]/20 rounded-none px-4 py-3 focus:outline-none focus:border-[#680007] focus:ring-1 focus:ring-[#680007]/30 transition-all font-sans text-[#3D0004] appearance-none">
                                                                <option value="">General Wellness / Unsure</option>
                                                                <option value="Neurological">Neurological Disorders</option>
                                                                <option value="BoneJoint">Bone & Joint Disorders</option>
                                                                <option value="Panchakarma">Panchakarma Detoxification</option>
                                                                <option value="Stress">Stress Management</option>
                                                                <option value="Skin">Skin Disorders</option>
                                                            </select>
                                                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#680007]/70">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">Preferred Consultation Date</label>
                                                        <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} className="w-full bg-white border border-[#3D0004]/20 rounded-none px-4 py-3 focus:outline-none focus:border-[#680007] focus:ring-1 focus:ring-[#680007]/30 transition-all font-sans text-[#3D0004]" />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">Upload Medical Reports (Optional)</label>
                                                        <div className="w-full flex items-center justify-center">
                                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-36 border border-[#680007]/15 border-dashed bg-white hover:bg-[#680007]/5 transition-colors cursor-pointer rounded-none">
                                                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                                                                    <svg className="w-8 h-8 mb-3 text-[#680007]/55 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                                    </svg>
                                                                    <p className="mb-1 font-sans text-sm text-[#3D0004]/80">
                                                                        <span className="font-semibold text-[#680007]">Click to upload</span> or drag and drop
                                                                    </p>
                                                                    <p className="font-sans text-xs text-[#3D0004]/50">
                                                                        PDF, JPG, PNG, or DOC (MAX. <span className="font-sans">10</span>MB)
                                                                    </p>
                                                                </div>
                                                                <input id="dropzone-file" type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={handleFileChange} multiple />
                                                            </label>
                                                        </div>
                                                        {formData.reports.length > 0 && (
                                                            <div className="mt-4 space-y-1.5">
                                                                <p className="font-sans text-xs font-semibold text-[#680007] uppercase tracking-wider">Uploaded files:</p>
                                                                {formData.reports.map((file, idx) => (
                                                                    <div key={idx} className="flex items-center space-x-2 text-sm text-[#3D0004]/80 font-sans">
                                                                        <span>📄</span>
                                                                        <span className="truncate">{file.name}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 3 && (
                                            <motion.div
                                                key="step3"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.4 }}
                                                className="space-y-6"
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2 md:col-span-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">Sex / Gender <span className="text-[#680007]">*</span></label>
                                                        <div className="flex space-x-6">
                                                            <label className="flex items-center space-x-3 cursor-pointer group">
                                                                <input type="radio" name="sex" value="male" checked={formData.sex === "male"} onChange={handleChange} className="w-4 h-4 accent-[#680007] text-[#680007] bg-white border-[#3D0004]/20 focus:ring-[#680007]" required />
                                                                <span className="font-sans text-sm text-[#3D0004] group-hover:text-[#680007]">Male</span>
                                                            </label>
                                                            <label className="flex items-center space-x-3 cursor-pointer group">
                                                                <input type="radio" name="sex" value="female" checked={formData.sex === "female"} onChange={handleChange} className="w-4 h-4 accent-[#680007] text-[#680007] bg-white border-[#3D0004]/20 focus:ring-[#680007]" />
                                                                <span className="font-sans text-sm text-[#3D0004] group-hover:text-[#680007]">Female</span>
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">Age <span className="text-[#680007]">*</span></label>
                                                        <input type="number" name="age" required value={formData.age} onChange={handleChange} className="w-full bg-white border border-[#3D0004]/20 rounded-none px-4 py-3 focus:outline-none focus:border-[#680007] focus:ring-1 focus:ring-[#680007]/30 transition-all font-sans text-[#3D0004]" />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">Blood Pressure (BP)</label>
                                                        <input type="text" name="bloodPressure" placeholder="e.g. 120/80" value={formData.bloodPressure} onChange={handleChange} className="w-full bg-white border border-[#3D0004]/20 rounded-none px-4 py-3 focus:outline-none focus:border-[#680007] focus:ring-1 focus:ring-[#680007]/30 transition-all font-sans text-[#3D0004]" />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">Weight (kg) <span className="text-[#680007]">*</span></label>
                                                        <input type="number" name="weight" step="0.1" required value={formData.weight} onChange={handleChange} className="w-full bg-white border border-[#3D0004]/20 rounded-none px-4 py-3 focus:outline-none focus:border-[#680007] focus:ring-1 focus:ring-[#680007]/30 transition-all font-sans text-[#3D0004]" />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">Height (cm) <span className="text-[#680007]">*</span></label>
                                                        <input type="number" name="height" required value={formData.height} onChange={handleChange} className="w-full bg-white border border-[#3D0004]/20 rounded-none px-4 py-3 focus:outline-none focus:border-[#680007] focus:ring-1 focus:ring-[#680007]/30 transition-all font-sans text-[#3D0004]" />
                                                    </div>

                                                    <div className="space-y-2 md:col-span-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">Marital Status <span className="text-[#680007]">*</span></label>
                                                        <div className="flex flex-wrap gap-4 mt-2">
                                                            {['Married', 'Single', 'Divorcee', 'Unmarried'].map((status) => (
                                                                <label key={status} className="flex items-center space-x-3 cursor-pointer group">
                                                                    <input type="radio" name="maritalStatus" value={status.toLowerCase()} checked={formData.maritalStatus === status.toLowerCase()} onChange={handleChange} className="w-4 h-4 accent-[#680007] text-[#680007] bg-white border-[#3D0004]/20 focus:ring-[#680007]" required />
                                                                    <span className="font-sans text-sm text-[#3D0004] group-hover:text-[#680007]">{status}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2 md:col-span-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">Are you Vegetarian?</label>
                                                        <div className="flex space-x-6 mt-2">
                                                            <label className="flex items-center space-x-3 cursor-pointer group">
                                                                <input type="radio" name="vegetarian" value="yes" checked={formData.vegetarian === "yes"} onChange={handleChange} className="w-4 h-4 accent-[#680007] text-[#680007] bg-white border-[#3D0004]/20 focus:ring-[#680007]" />
                                                                <span className="font-sans text-sm text-[#3D0004] group-hover:text-[#680007]">Yes</span>
                                                            </label>
                                                            <label className="flex items-center space-x-3 cursor-pointer group">
                                                                <input type="radio" name="vegetarian" value="no" checked={formData.vegetarian === "no"} onChange={handleChange} className="w-4 h-4 accent-[#680007] text-[#680007] bg-white border-[#3D0004]/20 focus:ring-[#680007]" />
                                                                <span className="font-sans text-sm text-[#3D0004] group-hover:text-[#680007]">No</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 4 && (
                                            <motion.div
                                                key="step4"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.4 }}
                                                className="space-y-6"
                                            >
                                                <div className="space-y-6">
                                                    <div className="space-y-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">Health Problems (Describe briefly)</label>
                                                        <textarea name="healthProblems" rows={3} value={formData.healthProblems} onChange={handleChange} className="w-full bg-white border border-[#3D0004]/20 rounded-none px-4 py-3 focus:outline-none focus:border-[#680007] focus:ring-1 focus:ring-[#680007]/30 transition-all font-sans text-[#3D0004] resize-y"></textarea>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">Personal History (Lifestyle, daily routines, habits)</label>
                                                        <textarea name="personalHistory" rows={3} value={formData.personalHistory} onChange={handleChange} className="w-full bg-white border border-[#3D0004]/20 rounded-none px-4 py-3 focus:outline-none focus:border-[#680007] focus:ring-1 focus:ring-[#680007]/30 transition-all font-sans text-[#3D0004] resize-y"></textarea>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">Previous Clinical Details (Treatments taken, medications)</label>
                                                        <textarea name="clinicalDetails" rows={3} value={formData.clinicalDetails} onChange={handleChange} className="w-full bg-white border border-[#3D0004]/20 rounded-none px-4 py-3 focus:outline-none focus:border-[#680007] focus:ring-1 focus:ring-[#680007]/30 transition-all font-sans text-[#3D0004] resize-y"></textarea>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="font-sans text-sm font-semibold tracking-wide text-[#3D0004]/90 block">Other Info / Comments</label>
                                                        <textarea name="otherInfo" rows={2} value={formData.otherInfo} onChange={handleChange} className="w-full bg-white border border-[#3D0004]/20 rounded-none px-4 py-3 focus:outline-none focus:border-[#680007] focus:ring-1 focus:ring-[#680007]/30 transition-all font-sans text-[#3D0004] resize-y"></textarea>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* CONTROL BUTTONS ROW */}
                                    <div className="pt-8 border-t border-[#680007]/10 flex justify-between items-center gap-4">
                                        <div>
                                            {step > 1 && (
                                                <StyledButton
                                                    type="button"
                                                    onClick={handleBack}
                                                    variant="secondary"
                                                >
                                                    Previous Step
                                                </StyledButton>
                                            )}
                                        </div>
                                        <StyledButton
                                            type="submit"
                                            variant="primary"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Submitting..." : step === totalSteps ? "Submit Request" : "Next Step"}
                                        </StyledButton>
                                    </div>
                                    {submitError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-6 flex items-start gap-3 rounded-md border border-red-300 bg-red-50 p-4"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-red-600 mt-0.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 9v2m0 4h.01M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"
                                                />
                                            </svg>

                                            <div>
                                                <p className="font-semibold text-red-700">
                                                    Submission Failed
                                                </p>
                                                <p className="text-sm text-red-600">
                                                    {submitError}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </form>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        );
    }