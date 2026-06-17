// src/components/tutor/TutorCard.tsx

import Image from "next/image";
import Link from "next/link";

import {
  Star,
  ArrowUpRight,
  BookOpen,
  DollarSign,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Tutor } from "@/types/tutor";

type Props = {
  tutor: Tutor;
};

export function TutorCard({ tutor }: Props) {
  return (
    <Card className="group overflow-hidden rounded-[28px]   bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 pt-0">

      {/* Image Section */}
      <div className="relative h-[230px] w-full overflow-hidden">

         <img
              src={tutor?.image}
              alt={tutor?.user?.name}
          className="w-full h-fullobject-cover object-top transition-transform duration-700 group-hover:scale-110"
            />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Rating Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 shadow-md">

          <Star
            size={15}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-sm font-semibold text-gray-800">
            {tutor.rating}
          </span>

        </div>

        {/* Tutor Name on Image */}
        <div className="absolute bottom-4 left-4">

          <h2 className="text-2xl font-bold text-white drop-shadow-lg">
            {tutor.user.name}
          </h2>

        </div>

      </div>

      {/* Content */}
      <CardContent className="p-2">

        {/* Two Column Layout */}
        <div className=" gap-4">

          {/* Subject */}
          <div className="rounded-2xl ">

          

            <h3 className="text-lg font-bold text-gray-900 leading-snug">
              {tutor.category.name}
            </h3>

          </div>

          {/* Price */}
          <div className="rounded-2xl">

            <div className="flex items-center gap-2 mb-2 text-gray-700">

              {/* <DollarSign size={18} />

              <p className="text-sm font-medium">
                Hourly Rate
              </p> */}

            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              ${tutor.hourlyRate}

              <span className="text-sm font-medium text-gray-400">
                /hr
              </span>
            </h3>

          </div>

        </div>
     <CardFooter className="w-full">

        <Link
          href={`/tutors/${tutor.id}`}
          className="w-full"
        >
          <Button className="h-11 w-full rounded-2xl bg-[#056f5b] text-sm font-semibold tracking-wide shadow-md transition-all duration-300 hover:bg-[#045746] hover:shadow-xl">

            View Profile

            <ArrowUpRight
              size={18}
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />

          </Button>
        </Link>

      </CardFooter>
      </CardContent>

      {/* Footer */}
 

    </Card>
  );
}