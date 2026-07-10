"use client";

import Image from "next/image";
import {
  BadgeCheck,
  CalendarDays,
  LayoutGrid,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Verified Experts",
    description:
      "Only the most trusted and qualified mentors make our platform, each one selected with care and precision.",
  },
  {
    icon: CalendarDays,
    title: "Flexible Sessions",
    description:
      "Connect anytime through video, audio, or chat and receive guidance whenever you need support.",
  },
  {
    icon: LayoutGrid,
    title: "Diverse Categories",
    description:
      "Expert guidance across every skill and interest to help you learn faster and grow smarter.",
  },
  {
    icon: Wallet,
    title: "Affordable Plans",
    description:
      "Experience premium mentoring at a budget-friendly price, making expert guidance accessible to everyone.",
  },
];

export default function Features() {
  return (
    <section className="bg-[#f7faf7] py-16 transition-colors duration-300 dark:bg-zinc-950 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Heading */}
        <div className="mb-12 text-center lg:mb-16">
          <div className="mb-3 flex items-center justify-center gap-3">

            <span className="text-sm font-semibold uppercase tracking-[4px] text-[#1f9d8b] sm:text-base">
              Benefits
            </span>

            <div className="relative h-[2px] w-16 overflow-hidden rounded-full bg-[#1f9d8b]/20">
              <span className="absolute inset-y-0 left-0 w-8 animate-[slide_2s_linear_infinite] rounded-full bg-[#1f9d8b]" />
            </div>

          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Why Choose Us
          </h2>
        </div>

        {/* Content */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Left Image */}
         {/* Left Image */}
<div className="relative">

  {/* Glow Effect (Dark Mode) */}
  <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-br from-teal-500/20 via-cyan-500/10 to-transparent blur-2xl dark:block hidden" />

  {/* Image Container */}
  <div className="relative h-[240px] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 sm:h-[400px] lg:h-[520px]">

    <Image
      src="https://images.unsplash.com/photo-1584697964358-3e14ca57658b?q=80&w=1200&auto=format&fit=crop"
      alt="Mentoring"
      fill
      priority
      className="object-cover transition-all duration-700 hover:scale-105 dark:brightness-110 dark:contrast-110"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent dark:from-black/30" />

  </div>

</div>
          {/* Right Cards */}
          <div className="grid gap-5 sm:grid-cols-2">

            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#1f9d8b]/30 hover:bg-[#f8fffd] hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-900"
                >
                  {/* Icon */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-black shadow-md transition duration-300 group-hover:rotate-12 dark:bg-zinc-800">

                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1f9d8b]">

                      <Icon className="h-4 w-4 text-[#1f9d8b]" />

                    </div>

                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#1f9d8b] dark:text-white sm:text-2xl">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="leading-7 text-gray-600 dark:text-zinc-400">
                    {item.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}