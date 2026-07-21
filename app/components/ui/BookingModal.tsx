"use client";

import { useState } from "react";
import StyledButton from "./StyledButton";
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    treatment: "Neurological Disorders",
    message: "",
  });
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
     const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    const result = await response.json();
    if (response.ok && result.success) {
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setForm({
          name: "",
          email: "",
          phone: "",
          treatment: "Neurological Disorders",
          message: "",
        });

        onClose();
      }, 2000);
    } else {
      setError(result.message || "Something went wrong.");
    }
  } catch (err: any) {
    if (err.response?.data?.message) {
      setError(err.response.data.message);
    } else {
      setError("Something went wrong. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-xl bg-[#faf8f5] text-[#3D0004] border border-[#680007]/15 shadow-xl p-8 md:p-10 font-serif animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#3D0004]/60 hover:text-[#3D0004] font-serif text-2xl transition-colors duration-200"
          aria-label="Close modal"
        >
          ✕
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full border border-[#680007] flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[#680007]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl mb-2 text-[#3D0004]">Consultation Scheduled</h3>
            <p className="text-sm text-[#3D0004]/75 max-w-sm">
              Thank you. Our senior physician's desk will contact you within 24 hours to confirm your schedule.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-8 border-b border-[#680007]/10 pb-4">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#a84e32]">
                NABH ACCREDITED CARE
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#3D0004] mt-1">
                Consultation Enquiry
              </h2>
              <p className="text-xs text-[#3D0004]/65 mt-2">
                100+ years of ancestral trust. Share your clinical requirements below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[#3D0004]">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Carmel Cessna"
                  className="w-full bg-[#f7f4f0] border border-[#680007]/15 px-4 py-3 text-sm focus:outline-none focus:border-[#680007] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[#3D0004]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-[#f7f4f0] border border-[#680007]/15 px-4 py-3 text-sm focus:outline-none focus:border-[#680007] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[#3D0004]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#f7f4f0] border border-[#680007]/15 px-4 py-3 text-sm focus:outline-none focus:border-[#680007] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[#3D0004]">
                  Treatment or Wellness Goal
                </label>
                <select
                  value={form.treatment}
                  onChange={(e) => setForm({ ...form, treatment: e.target.value })}
                  className="w-full bg-[#f7f4f0] border border-[#680007]/15 px-4 py-3 text-sm focus:outline-none focus:border-[#680007] transition-colors appearance-none"
                >
                  <option value="Neurological Disorders">Neurological Disorders</option>
                  <option value="Bone, Joint & Spine Related">Bone, Joint & Spine Problems</option>
                  <option value="Muscular Diseases">Muscular Problems & Diseases</option>
                  <option value="Headache Related Care">Headache & Related Problems</option>
                  <option value="Rejuvenation (Rasayana)">Rejuvenation (Rasayana Chikithsa)</option>
                  <option value="Stress & Strain Management">Stress & Strain Management</option>
                  <option value="Womens Care Programme">Women's Care Programme</option>
                  <option value="Beauty Care Treatment">Beauty Care Treatment</option>
                  <option value="Other Packages">Other Special Packages</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[#3D0004]">
                  Medical History Summary
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your symptoms or health goals..."
                  className="w-full bg-[#f7f4f0] border border-[#680007]/15 px-4 py-3 text-sm focus:outline-none focus:border-[#680007] transition-colors resize-none"
                />
              </div>
          {error && (
            <div className="rounded bg-red-100 border border-red-300 text-red-700 px-4 py-2 text-sm">
              {error}
            </div>
          )}
              <div className="pt-2">
                <StyledButton
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Request Consultation"}
            </StyledButton>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
