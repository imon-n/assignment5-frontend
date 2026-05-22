"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 px-6 lg:grid-cols-2">

        {/* LEFT VISUAL */}
        <div className="relative mx-auto w-full max-w-[560px]">

          <div className="grid grid-cols-2 gap-5">

            <div className="h-[240px] overflow-hidden rounded-[30px] bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
                alt="learning"
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-10 h-[240px] overflow-hidden rounded-[30px] rounded-tl-[70px] bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?q=80&w=1200&auto=format&fit=crop"
                alt="students"
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="-mt-6 h-[240px] overflow-hidden rounded-[30px] rounded-br-[70px] bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                alt="study"
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="h-[240px] overflow-hidden rounded-[30px] bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop"
                alt="mentor"
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>

          </div>

          {/* CENTER BADGE */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 14,
              ease: "linear",
            }}
            className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-teal-600 shadow-2xl"
          >
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-dashed border-white text-xs font-semibold tracking-[0.3em] text-white">
              LEARNING
            </div>
          </motion.div>

        </div>

        {/* RIGHT CONTENT */}
        <div>

          <p className="text-lg font-semibold uppercase tracking-[0.3em] text-teal-600">
            About Us
          </p>

          <h2 className="mt-4 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
            Building Future Through Mentorship
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            We connect students with real industry mentors to help them grow, learn, and build practical skills for the future.
          </p>

          {/* CARDS */}
          <div className="mt-10 grid gap-8 md:grid-cols-2">

            <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-black shadow-md"> <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1f9d8b] text-[#1f9d8b]"> ✦ </div> </div>
              <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
              <p className="mt-2 text-gray-600">
                To empower learners with expert guidance and real-world experience.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
             <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-black shadow-md"> <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1f9d8b] text-[#1f9d8b]"> ✦ </div> </div>
              <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
              <p className="mt-2 text-gray-600">
                To create a global learning ecosystem driven by mentorship.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}