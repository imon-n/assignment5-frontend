// src/components/tutor/TutorCard.tsx

import Link from "next/link";
import { Bookmark, Star } from "lucide-react";

import { Tutor } from "@/types/tutor";

type Props = {
  tutor: Tutor;
};

export function TutorCard({ tutor }: Props) {
  return (
    <div
      className="
        group
        overflow-hidden
        rounded-[34px]
        bg-[#1d2433]
        shadow-xl
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >
      <div className="relative h-[420px]">

        {/* Image */}
        <img
          src={tutor.image}
          alt={tutor.user.name}
          className="
            h-full
            w-full
            object-cover
            object-top
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1d2433] via-[#1d2433]/30 to-transparent" />

        {/* Bookmark */}
        <button
          className="
            absolute
            top-5
            right-5
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white/20
            text-white
            backdrop-blur-xl
            transition
            hover:bg-white/30
          "
        >
          <Bookmark size={18} />
        </button>

        {/* Bottom Content */}
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">

          {/* Name & Price */}
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold truncate">
              {tutor.user.name}
            </h2>

            <div className="shrink-0 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold backdrop-blur-xl">
              ${tutor.hourlyRate}
            </div>
          </div>

          {/* Description (2 lines max) */}
          <p
            className="
              mt-2
              text-sm
              leading-5
              text-gray-200
              line-clamp-2
            "
          >
            {tutor.bio ||
              "Experienced tutor helping students achieve their academic goals with personalized learning sessions."}
          </p>

          {/* Chips */}
          <div className="mt-3 flex flex-wrap gap-2">

            <div className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium backdrop-blur-xl">
              <Star
                size={13}
                className="fill-white text-white"
              />
              {tutor.rating}
            </div>

            <div className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium backdrop-blur-xl">
              {tutor.category.name}
            </div>

           

          </div>

          {/* Button */}
          <Link href={`/tutors/${tutor.id}`}>
            <button
              className="
                mt-2
                h-8
                w-full
                rounded-full
                bg-white
                text-base
                font-semibold
                text-black
                transition-all
                hover:bg-gray-100
              "
            >
              Book Now
             
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
}