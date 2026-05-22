// src/components/home/hero/HeroRight.tsx

import Image from "next/image";

import FloatingButtons from "./FloatingButtons";

export default function HeroRight() {
  return (
    <div className="relative flex justify-center mt-16">

      {/* Background */}
      <div className="absolute w-[350px] h-[400px] bg-[#045746] rounded-[40px] rotate-12 top-8 " />

      {/* Image */}
      <div className="relative z-10">

        <Image
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
          alt="Mentor"
          width={280}
          height={490}
          className="object-cover rounded-3xl"
        />

      </div>

      {/* Floating Buttons */}
      <FloatingButtons />

    </div>
  );
}