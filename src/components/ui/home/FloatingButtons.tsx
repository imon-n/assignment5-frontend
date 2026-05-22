// src/components/home/hero/FloatingButtons.tsx

import {
  Mic,
  Phone,
  Video,
} from "lucide-react";

export default function FloatingButtons() {
  return (
    <div className="absolute left-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 bg-white rounded-4xl p-2 pt-4 pb-4">

      <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
        <Mic size={22} />
      </button>

      <button className="w-12 h-12 bg-red-500 rounded-full shadow-lg flex items-center justify-center text-white">
        <Phone size={28} />
      </button>

      <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
        <Video size={28} />
      </button>

    </div>
  );
}