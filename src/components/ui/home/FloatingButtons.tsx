// src/components/home/hero/FloatingButtons.tsx

import {
  Mic,
  Phone,
  Video,
} from "lucide-react";

export default function FloatingButtons() {
  return (
    <div
      className="
        absolute
        left-3
        top-1/2
        z-20
        hidden
        -translate-y-1/2
        flex-col
        gap-3
        rounded-3xl
        bg-white/95
        p-2
        shadow-2xl
        backdrop-blur-md
        dark:bg-zinc-900/90
        sm:flex
        lg:left-8
        xl:left-12
      "
    >
      {/* Mic */}
      <button
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-gray-100
          text-gray-700
          shadow-md
          transition-all
          duration-300
          hover:scale-110
          hover:bg-[#0b7e68]
          hover:text-white
          dark:bg-zinc-800
          dark:text-zinc-200
        "
      >
        <Mic size={18} />
      </button>

      {/* Phone */}
      <button
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-red-500
          text-white
          shadow-md
          transition-all
          duration-300
          hover:scale-110
          hover:bg-red-600
        "
      >
        <Phone size={18} />
      </button>

      {/* Video */}
      <button
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-gray-100
          text-gray-700
          shadow-md
          transition-all
          duration-300
          hover:scale-110
          hover:bg-[#0b7e68]
          hover:text-white
          dark:bg-zinc-800
          dark:text-zinc-200
        "
      >
        <Video size={18} />
      </button>
    </div>
  );
}