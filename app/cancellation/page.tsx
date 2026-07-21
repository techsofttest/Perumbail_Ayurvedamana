"use client";

import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import BookingModal from "../components/ui/BookingModal";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CancellationRefundPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const refundPolicy = [
    { period: "45–60 days", refund: "75% Refund" },
    { period: "30–44 days", refund: "70% Refund" },
    { period: "15–29 days", refund: "50% Refund" },
    { period: "7–14 days", refund: "25% Refund" },
    { period: "2–6 days", refund: "15% Refund" },
    { period: "1 day", refund: "5% Refund" },
    {
      period: "No-show or cancellation on the arrival day or later",
      refund: "No Refund",
    },
  ];

  return (
    <div className="relative flex flex-col min-h-screen bg-[#faf8f5] text-[#3D0004] overflow-x-hidden">

      <Header
        onOpenBooking={() =>
          (window.location.href = "/medical-consultation")
        }
        forceSolid={true}
      />

      <main className="flex-grow pt-28 md:pt-36 pb-24">

        <section className="max-w-6xl mx-auto px-6 md:px-12">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .6 }}
            className="mb-14"
          >
            <span className="uppercase tracking-[0.3em] text-[#A84E32] text-sm">
              Policies
            </span>

            <h1 className="mt-3 text-4xl md:text-6xl font-serif text-[#680007]">
              Cancellation & Refund Policy
            </h1>

            <p className="mt-5 max-w-3xl text-[#3D0004]/70 leading-8">
              The following cancellation and refund policy applies to all
              confirmed bookings. Refunds are calculated based on the advance
              amount received at the time of booking.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .2 }}
            className="overflow-hidden rounded border border-[#680007]/10 bg-white"
          >

            <table className="w-full border-collapse">

              <thead className="bg-[#680007] text-white">

                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    Cancellation Before Arrival
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Refund
                  </th>
                </tr>

              </thead>

              <tbody>

                {refundPolicy.map((item, index) => (

                  <tr
                    key={index}
                    className="border-b border-[#680007]/10 even:bg-[#faf8f5]"
                  >
                    <td className="px-6 py-4">
                      {item.period}
                    </td>

                    <td className="px-6 py-4 font-medium text-[#680007]">
                      {item.refund}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .35 }}
            className="mt-14"
          >

            <h2 className="text-2xl font-serif text-[#680007] mb-6">
              Please Note
            </h2>

            <ul className="space-y-4 list-disc pl-6 text-[#3D0004]/80 leading-8">

              <li>
                Refunds are calculated on the advance amount paid at the time of booking.
              </li>

              <li>
                Any applicable bank charges or payment gateway charges may be deducted from the refund amount.
              </li>

              <li>
                Refunds will be processed within <strong>14 working days</strong> after receiving the cancellation request.
              </li>

            </ul>

          </motion.div>

        </section>

      </main>

      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

    </div>
  );
}