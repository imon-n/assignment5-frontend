// src/components/home/hero/HeroLeft.tsx

import HeroSearch from "./HeroSearch";

export default function HeroLeft() {
  return (
    <div className="text-white">

      {/* Badge */}
      <div className="inline-flex bg-[#0b7e68] px-6 py-1 rounded-full text-lg font-medium mb-4 mt-4 font-sans">
        Top Rated Mentors From Around the World
      </div>

      {/* Heading */}
      <h1 className="text-4xl leading-tight font-bold font-sans">
        Accelerate Your Success with
        <br />

        Expert{" "}
        <span className="text-lime-400">
          Mentorship
        </span>
      </h1>

      {/* Description */}
      <p className="text-2xl text-gray-200 mt-2 leading-relaxed max-w-2xl font-sans ">
        Get one on one guidance from verified mentors.
      </p>

      {/* Search */}
      <HeroSearch />

    </div>
  );
}