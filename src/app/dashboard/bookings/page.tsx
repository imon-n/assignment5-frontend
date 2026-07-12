"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  Calendar,
  Clock3,
  Bookmark,
  Star,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ITEMS_PER_PAGE = 3;

interface Booking {
  id: string;
  date: string;
  time: string;
  amount: number;
  status: string;

  tutor: {
    id: string;
    image?: string;
    bio?: string;
    hourlyRate: number;
    rating: number;

    category: {
      name: string;
    };

    user: {
      name: string;
      image?: string;
    };
  };
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  // ----------------------------
  // Fetch Bookings
  // ----------------------------
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_URL}/api/bookings`, {
          credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
          setBookings(data.data || []);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // ----------------------------
  // Pagination
  // ----------------------------
  const totalPages = Math.ceil(
    bookings.length / ITEMS_PER_PAGE
  );

  const currentBookings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return bookings.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [bookings, currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // ----------------------------
  // Loading
  // ----------------------------
  if (loading) {
    return (
      <div className="flex h-[65vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  // ----------------------------
  // Empty State
  // ----------------------------
  if (bookings.length === 0) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            No Bookings Yet
          </h2>

          <p className="mt-4 text-slate-500 dark:text-slate-400">
            Your booked tutoring sessions will appear here.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">


      <div>

      

<div className="rounded-3xl bg-gradient-to-r from-[#005C53] to-[#169B87] p-8 text-white shadow-xl">
  <div className="flex items-center gap-5">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xl">
      <BookOpen size={34} />
    </div>

    <div>
      <h1 className="text-4xl font-bold">
        My Bookings
      </h1>

      <p className="mt-2 text-white/90">
        Manage and track all your booked tutoring sessions in one place.
      </p>
    </div>
  </div>
</div>

      </div>

      {/* Responsive Cards Grid */}

      <div
        className="
        grid
        gap-8

        sm:grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
      "
      >

        {/* PART-2 START HERE */}

     {currentBookings.map((booking) => (
  <div
    key={booking.id}
    className="
      group
      overflow-hidden
      rounded-[30px]
      bg-[#1d2433]
      shadow-xl
      transition-all
      duration-500
      hover:-translate-y-2
      hover:shadow-2xl
      animate-in
      fade-in
      slide-in-from-bottom-4
    "
  >
    <div className="relative h-[380px]">

      {/* Tutor Image */}
      <Image
        src={
          booking.tutor.image ||
          booking.tutor.user.image ||
          "/avatar.png"
        }
        alt={booking.tutor.user.name}
        fill
        className="
          object-cover
          object-top
          transition-transform
          duration-700
          group-hover:scale-105
        "
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1d2433] via-[#1d2433]/40 to-transparent" />

      {/* Bookmark */}
      <button
        className="
          absolute
          right-5
          top-5
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

          <h2 className="truncate text-2xl font-bold">
            {booking.tutor.user.name}
          </h2>

          <div className="shrink-0 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold backdrop-blur-xl">
            ${booking.amount}
          </div>

        </div>

        {/* Bio */}
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-200">
          {booking.tutor.bio ||
            "Experienced tutor helping students achieve academic success with personalized mentoring sessions."}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">

          {/* <div className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 text-xs backdrop-blur-xl">
            <Star
              size={13}
              className="fill-yellow-300 text-yellow-300"
            />
            {booking.tutor.rating.toFixed(1)}
          </div> */}

          <div className="rounded-full bg-white/20 px-3 py-1.5 text-xs backdrop-blur-xl">
            {booking.tutor.category.name}
          </div>

          <div
            className={`rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-xl ${
              booking.status === "CONFIRMED"
                ? "bg-emerald-500/30 text-emerald-200"
                : booking.status === "PENDING"
                ? "bg-yellow-500/30 text-yellow-200"
                : "bg-red-500/30 text-red-200"
            }`}
          >
            {booking.status}
          </div>

        </div>

        {/* Session Info */}
        {/* <div className="mt-4 space-y-2 text-sm">

          <div className="flex items-center gap-2">

            <Calendar
              size={16}
              className="text-emerald-300"
            />

            <span>{booking.date}</span>

          </div>

          <div className="flex items-center gap-2">

            <Clock3
              size={16}
              className="text-emerald-300"
            />

            <span>{booking.time}</span>

          </div>

        </div> */}

        {/* Button */}
        {/* <Link href={`/student/bookings/${booking.id}`}>
          <button
            className="
              mt-5
              h-11
              w-full
              rounded-full
              bg-white
              text-base
              font-semibold
              text-black
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:bg-gray-100
              active:scale-95
            "
          >
            View Booking
          </button>
        </Link> */}

      </div>

    </div>
  </div>
))}

      </div>

         {/* Pagination */}

      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-5 pt-2">

          {/* Prev + Numbers + Next */}

          <div className="flex items-center gap-2">

            <button
              onClick={previousPage}
              disabled={currentPage === 1}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-slate-300
                bg-white
                text-slate-700
                shadow-sm
                transition-all
                hover:scale-105
                hover:bg-emerald-500
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-40
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-white
              "
            >
              <ChevronLeft size={20} />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    onClick={() =>
                      setCurrentPage(page)
                    }
                    className={`
                      h-11
                      w-11
                      rounded-full
                      text-sm
                      font-semibold
                      transition-all
                      duration-300

                      ${
                        currentPage === page
                          ? "bg-emerald-500 text-white shadow-lg scale-110"
                          : "border border-slate-300 bg-white text-slate-700 hover:bg-emerald-500 hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      }
                    `}
                  >
                    {page}
                  </button>
                );
              }
            )}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-slate-300
                bg-white
                text-slate-700
                shadow-sm
                transition-all
                hover:scale-105
                hover:bg-emerald-500
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-40
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-white
              "
            >
              <ChevronRight size={20} />
            </button>

          </div>

          {/* Page Info */}

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Page{" "}
            <span className="font-semibold text-emerald-600">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="font-semibold">
              {totalPages}
            </span>
          </p>

        </div>
      )}

    </div>
  );
}
