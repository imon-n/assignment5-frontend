"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import FloatingButtons from "./FloatingButtons";

export default function HeroRight() {
  return (
    <div className="relative flex justify-center mt-16">
      {/* Background */}
      <motion.div
        initial={{ opacity: 0, rotate: 25, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 12, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="absolute w-[350px] h-[400px] bg-[#045746] rounded-[40px] top-8"
      />

      {/* Image */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 80, scale: 0.9 }}
        animate={{
          opacity: 1,
          y: [0, -8, 0], // floating animation
          scale: 1,
        }}
        transition={{
          opacity: { duration: 0.8 },
          scale: { duration: 0.8 },
          y: {
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          },
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
          alt="Mentor"
          width={280}
          height={490}
          className="object-cover rounded-3xl"
        />
      </motion.div>
 <FloatingButtons />
    </div>
  );
}