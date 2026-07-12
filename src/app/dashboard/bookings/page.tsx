"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Calendar,
  Clock3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Booking {
  id: string;
  date: string;
  time: string;
  amount: number;
  status: string;
  tutor: {
    user: {
      name: string;
      image?: string;
    };
    category: {
      name: string;
    };
  };
}

const ITEMS_PER_PAGE = 3;

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_URL}/api/bookings`, {
          credentials: "include",
        });

        const data = await res.json();

        setBookings(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);

  const currentBookings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return bookings.slice(start, start + ITEMS_PER_PAGE);
  }, [bookings, currentPage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          My Bookings
        </h1>

        <p className="text-slate-500 mt-2">
          View all your tutoring sessions.
        </p>
      </div>

      {/* Cards */}
      {bookings.length === 0 ? (
        <div className="rounded-3xl bg-white shadow-lg p-16 text-center">
          <h2 className="text-2xl font-semibold">
            No Bookings Found
          </h2>

          <p className="text-gray-500 mt-3">
            Your booked sessions will appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {currentBookings.map((booking) => (
              <div
                key={booking.id}
                className="overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 w-full">
                  <Image
                    src={
                      booking.tutor.user.image || "/avatar.png"
                    }
                    alt={booking.tutor.user.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-5">

                  <div className="flex justify-between items-start">

                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {booking.tutor.category.name}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        {booking.tutor.user.name}
                      </p>
                    </div>

                    <span className="text-2xl font-bold text-emerald-600">
                      ${booking.amount}
                    </span>

                  </div>

                  <div className="mt-5 space-y-3 text-gray-600">

                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      {booking.date}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock3 size={18} />
                      {booking.time}
                    </div>

                  </div>

                  <div className="mt-6 flex items-center justify-between">

                    <span
                      className={`px-4 py-2 rounded-full text-xs font-semibold
                      ${
                        booking.status === "CONFIRMED"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>

                    <button className="text-emerald-600 font-semibold hover:underline">
                      View Details
                    </button>

                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 pt-6">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((prev) => prev - 1)
                }
                className="h-10 w-10 rounded-xl border flex items-center justify-center hover:bg-gray-100 disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: totalPages }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                    className={`h-11 w-11 rounded-xl font-semibold transition
                    ${
                      currentPage === index + 1
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => prev + 1)
                }
                className="h-10 w-10 rounded-xl border flex items-center justify-center hover:bg-gray-100 disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>

            </div>
          )}
        </>
      )}
    </div>
  );
}