"use client";

import { motion } from "framer-motion";
import { Search, Video, Mic } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section className="bg-[#f5f7ef] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center">

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <span className="text-[#0b6b5b] font-semibold text-xl">
              Booking Journey
            </span>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="h-[2px] bg-[#0b6b5b]"
            />
          </motion.div>

          <h2 className="text-4xl font-extrabold text-[#15151d]">
            See How It Works
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-24">

          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#f7f4f4] rounded-[30px] px-10 pt-24 pb-14 text-center overflow-visible group"
          >
            <div className="absolute left-1/2 -top-8 -translate-x-1/2 w-22 h-22 rounded-[28px] bg-black flex items-center justify-center shadow-2xl z-20 transition-colors duration-300 group-hover:bg-[#0b6b5b]">
              <Search
                size={38}
                className="text-white transition-colors duration-300 "
              />
            </div>

            <h1 className="absolute right-7 top-7 text-5xl font-extrabold text-transparent [-webkit-text-stroke:2px_#1dd1a1]">
              01
            </h1>

            <h3 className="text-3xl font-bold text-[#1a1a22] mt-2">
              Discover Mentors
            </h3>

            <p className="text-gray-500 text-lg leading-9 mt-5">
              Browse experts across career, tech, and personal development.
            </p>

            <div className="absolute bottom-0 right-0 text-6xl opacity-70">
              🍃
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#f7f4f4] rounded-[30px] px-10 pt-24 pb-14 text-center overflow-visible group"
          >
            <div className="absolute left-1/2 -top-8 -translate-x-1/2 w-22 h-22 rounded-[28px] bg-[#0b6b5b] flex items-center justify-center shadow-2xl z-20 transition-colors duration-300 group-hover:bg-black">
              <Video
                size={38}
                className="text-white transition-colors duration-300 "
              />
            </div>

            <h1 className="absolute right-7 top-7 text-5xl font-extrabold text-transparent [-webkit-text-stroke:2px_#1dd1a1]">
              02
            </h1>

            <h3 className="text-3xl font-bold text-[#1a1a22] mt-2">
              Book Your Session
            </h3>

            <p className="text-gray-500 text-lg leading-9 mt-5">
              Schedule one-on-one mentoring sessions with your preferred experts.
            </p>

            <div className="absolute bottom-0 right-0 text-6xl opacity-70">
              🍃
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#f7f4f4] rounded-[30px] px-10 pt-24 pb-14 text-center overflow-visible group"
          >
            <div className="absolute left-1/2 -top-8 -translate-x-1/2 w-22 h-22 rounded-[28px] bg-black flex items-center justify-center shadow-2xl z-20 transition-colors duration-300 group-hover:bg-[#0b6b5b]">
              <Mic
                size={38}
                className="text-white transition-colors duration-300 "
              />
            </div>

            <h1 className="absolute right-7 top-7 text-5xl font-extrabold text-transparent [-webkit-text-stroke:2px_#1dd1a1]">
              03
            </h1>

            <h3 className="text-3xl font-bold text-[#1a1a22] mt-2">
              Get Guidance
            </h3>

            <p className="text-gray-500 text-lg leading-9 mt-5">
              Receive valuable insights, mentorship, and career guidance.
            </p>

            <div className="absolute bottom-0 right-0 text-6xl opacity-70">
              🍃
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}