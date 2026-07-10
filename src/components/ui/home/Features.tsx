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

          <div className="grid gap-5 sm:grid-cols-2">

  {features.map((item, index) => {
    const Icon = item.icon;

    return (
      <div
        key={index}
        data-aos="zoom-in-up"
        data-aos-delay={index * 120}
        className="
          group
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-5
          shadow-sm
          transition-all
          duration-500
          hover:-translate-y-3
          hover:scale-[1.03]
          hover:border-[#1f9d8b]/30
          hover:bg-[#f8fffd]
          hover:shadow-2xl
          dark:border-zinc-800
          dark:bg-zinc-900
          dark:hover:bg-zinc-800
        "
      >
        {/* Icon */}
        <div
          className="
            mb-5
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-black
            shadow-md
            transition-all
            duration-500
            group-hover:rotate-12
            group-hover:scale-110
            dark:bg-zinc-800
          "
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#1f9d8b]">

            <Icon className="h-4 w-4 text-[#1f9d8b] transition-transform duration-500 group-hover:rotate-180" />

          </div>
        </div>

        {/* Title */}
        <h3
          className="
            mb-3
            text-lg
            font-bold
            text-gray-900
            transition-colors
            duration-300
            group-hover:text-[#1f9d8b]
            dark:text-white
            sm:text-xl
          "
        >
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-7 text-gray-600 dark:text-zinc-400">
          {item.description}
        </p>
      </div>
    );
  })}

</div>
{/* Left Image */}
<div
  className="relative mx-auto w-full max-w-[500px]"
  data-aos="fade-right"
>
  {/* Glow Effect */}
  <div className="absolute -inset-3 hidden rounded-[32px] bg-gradient-to-br from-teal-500/20 via-cyan-500/10 to-transparent blur-2xl dark:block" />

  {/* Image Card */}
  <div
    className="
      relative
      overflow-hidden
      rounded-[28px]
      border
      border-gray-200
      bg-white
      shadow-2xl
      transition-all
      duration-500
      hover:-translate-y-2
      hover:shadow-[0_20px_60px_rgba(0,0,0,.18)]
      dark:border-zinc-800
      dark:bg-zinc-900
    "
  >
    <Image
      src="https://images.unsplash.com/photo-1584697964358-3e14ca57658b?q=80&w=1400&auto=format&fit=crop"
      alt="Mentoring Session"
      width={900}
      height={600}
      priority
      className="
        h-[260px]
        w-full
        object-cover
        object-center
        brightness-105
        contrast-110
        saturate-110
        transition-all
        duration-700
        group-hover:scale-105
        hover:scale-110
        sm:h-[340px]
        lg:h-[480px]
      "
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

    {/* Floating Badge */}
    <div
      className="
        absolute
        bottom-5
        left-5
        rounded-2xl
        bg-white/90
        px-5
        py-4
        shadow-xl
        backdrop-blur-md
        transition-all
        duration-500
        hover:scale-105
        dark:bg-zinc-900/90
      "
    >
      <h4 className="text-2xl font-bold text-[#1f9d8b]">
        5K+
      </h4>

      <p className="text-sm text-gray-700 dark:text-zinc-300">
        Successful Mentor Sessions
      </p>
    </div>
  </div>
</div>
         

        </div>

      </div>
    </section>
  );
}
