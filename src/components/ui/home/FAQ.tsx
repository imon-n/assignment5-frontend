"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How do I book a mentor session?",
    answer:
      "Browse our mentors, choose the expert that matches your needs, select an available time slot, and confirm your booking securely. Once confirmed, you'll receive all session details instantly.",
  },
  {
    question: "Can I reschedule or cancel my booking?",
    answer:
      "Yes. You can easily reschedule or cancel your session from your dashboard before the mentor's cancellation deadline.",
  },
  {
    question: "Are all mentors verified?",
    answer:
      "Absolutely. Every mentor on our platform is carefully verified based on experience, qualifications, and expertise before being approved.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We support secure online payments through Stripe, SSLCommerz, and other trusted payment gateways depending on your region.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="bg-[#f7faf7] py-16 transition-colors duration-300 dark:bg-zinc-950 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* LEFT IMAGES */}
          <div>

            <div className="relative w-full">

              <div className="grid h-[360px] grid-cols-2 gap-3 sm:h-[450px] sm:gap-5 lg:h-[500px]">

                {/* LEFT COLUMN */}
                <div className="flex flex-col gap-3 sm:gap-5">

                  <div className="relative flex-1 overflow-hidden rounded-2xl bg-zinc-200 shadow-xl dark:bg-zinc-800 lg:rounded-[30px]">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80"
                      alt="Mentor"
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="relative ml-auto h-28 w-[70%] overflow-hidden rounded-2xl bg-zinc-200 shadow-xl dark:bg-zinc-800 sm:h-36 lg:h-44 lg:rounded-[24px]">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                      alt="Teacher"
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>

                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col gap-3 sm:gap-5">

                  <div className="relative h-28 w-[70%] overflow-hidden rounded-2xl bg-zinc-200 shadow-xl dark:bg-zinc-800 sm:h-36 lg:h-44 lg:rounded-[24px]">
                    <Image
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
                      alt="Student"
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="relative flex-1 overflow-hidden rounded-2xl bg-zinc-200 shadow-xl dark:bg-zinc-800 lg:rounded-[30px]">
                    <Image
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80"
                      alt="Learning"
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT CONTENT */}
          <div>

            <div className="mb-8 text-center lg:text-left">

              <div className="flex items-center justify-center gap-3 lg:justify-start">

                <span className="text-sm font-semibold uppercase tracking-[4px] text-[#169b87]">
                  Your Questions are Answered
                </span>

                <div className="relative h-[2px] w-16 overflow-hidden rounded-full bg-[#169b87]/20">
                  <div className="absolute left-0 top-0 h-full w-6 rounded-full bg-[#169b87] animate-[slide_2s_linear_infinite]" />
                </div>

              </div>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                Frequently Asked Questions
              </h2>

            </div>

            <div className="space-y-4 sm:space-y-5">
                            {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? "border-[#169b87] bg-[#eefbf8] dark:bg-[#0f2925]"
                        : "border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between px-5 py-5 text-left sm:px-7 sm:py-6"
                    >
                      <h3 className="pr-4 text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
                        {faq.question}
                      </h3>

                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen
                            ? "bg-[#169b87] text-white"
                            : "bg-gray-100 text-[#169b87] dark:bg-zinc-800"
                        }`}
                      >
                        {isOpen ? (
                          <Minus size={18} />
                        ) : (
                          <Plus size={18} />
                        )}
                      </div>
                    </button>

                    <div
                      className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-6 leading-7 text-gray-600 dark:text-zinc-400 sm:px-7 sm:pb-7 sm:leading-8">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}