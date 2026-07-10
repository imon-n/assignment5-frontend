// src/components/home/hero/HeroSearch.tsx

import {
  Search,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

export default function HeroSearch() {
  return (
    <div className="bg-white rounded-full p-1 mt-8 flex items-center justify-between max-w-2xl shadow-2xl">

      {/* Input */}
      <div className="flex items-center gap-3 px-4 flex-1">

        <Search className="text-gray-500" size={22} />

        <input
          type="text"
          placeholder="Search mentor..."
          className="w-full outline-none text-gray-700 text-lg"
        />

      </div>

      {/* Divider */}
      <div className="h-10 w-[1px] bg-gray-300 hidden md:block" />

      {/* Category */}
      <div className="hidden md:flex items-center gap-2 px-6 text-gray-700 font-medium">

        All Categories

        <ChevronDown size={14} />

      </div>

      {/* Button */}
      <button className="w-9 h-9 rounded-full bg-[#056f5b] hover:bg-[#045746] transition flex items-center justify-center text-white">

        <ArrowRight size={22} />

      </button>

    </div>
  );
}