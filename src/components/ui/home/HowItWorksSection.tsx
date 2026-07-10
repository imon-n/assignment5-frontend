"use client";

import { motion } from "framer-motion";
import {
  Search,
  Video,
  Mic,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover Mentors",
    description:
      "Browse experts across career, technology, business, and personal development to find the perfect mentor.",
    icon: Search,
    color: "bg-black dark:bg-zinc-800",
    hover: "group-hover:bg-[#0b6b5b]",
  },
  {
    number: "02",
    title: "Book Your Session",
    description:
      "Choose your preferred mentor, select an available schedule, and book your one-on-one session instantly.",
    icon: Video,
    color: "bg-[#0b6b5b]",
    hover: "group-hover:bg-black dark:group-hover:bg-zinc-800",
  },
  {
    number: "03",
    title: "Get Guidance",
    description:
      "Join your session through video or audio and receive practical advice that helps you grow confidently.",
    icon: Mic,
    color: "bg-black dark:bg-zinc-800",
    hover: "group-hover:bg-[#0b6b5b]",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="overflow-hidden bg-[#f5f7ef] py-16 transition-colors duration-300 dark:bg-zinc-950 sm:py-20 lg:py-24">

      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Heading */}
        <div className="text-center">

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-4 flex items-center justify-center gap-3"
          >

            <span className="text-sm font-semibold uppercase tracking-[4px] text-[#0b6b5b] sm:text-base">
              Booking Journey
            </span>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="h-[2px] rounded-full bg-[#0b6b5b]"
            />

          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl"
          >
            See How It Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto mt-5 max-w-2xl text-gray-600 dark:text-zinc-400"
          >
            Connect with experienced mentors in just a few simple steps and
            start your personalized learning journey.
          </motion.p>

        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
                    {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative overflow-visible rounded-[28px] border border-gray-200 bg-white px-6 pb-8 pt-16 shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 sm:px-8 sm:pb-10 sm:pt-20"
              >
                {/* Icon */}
                <div
                  className={`absolute left-1/2 top-0 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl shadow-xl transition-all duration-300 sm:h-20 sm:w-20 ${step.color} ${step.hover}`}
                >
                  <Icon className="h-7 w-7 text-white sm:h-9 sm:w-9" />
                </div>

                {/* Step Number */}
                <h1 className="absolute right-5 top-5 text-4xl font-extrabold text-transparent [-webkit-text-stroke:2px_#1dd1a1] sm:right-7 sm:top-7 sm:text-5xl">
                  {step.number}
                </h1>

                {/* Title */}
                <h3 className="mt-2 text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-center text-base leading-7 text-gray-600 dark:text-zinc-400 sm:text-lg sm:leading-8">
                  {step.description}
                </p>

                {/* Decorative Element */}
                <div className="absolute bottom-2 right-3 text-4xl opacity-50 sm:bottom-0 sm:right-0 sm:text-6xl">
                  🍃
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}