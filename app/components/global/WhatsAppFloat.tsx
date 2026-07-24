"use client";

import StyledButton from "../ui/StyledButton";

export default function WhatsAppFloat() {
  const whatsappUrl = "https://wa.me/919645095696?text=Hello%20Ayurvedamana,%20I%20would%20like%20to%20enquire%20about%20your%20Ayurvedic%20treatments.";

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <StyledButton
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact on WhatsApp"
        variant="secondary"
        className="bg-white/80 backdrop-blur-md"
      >
        Whatsapp Us
      </StyledButton>
    </div>
  );
}
