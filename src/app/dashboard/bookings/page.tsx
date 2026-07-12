"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Calendar,
  Clock3,
  BookOpen,
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

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_URL}/api/bookings`, {
          credentials: "include",
        });

        const data = await res.json();

        setBookings(data.data || []);
      } catch {
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            My Bookings
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your tutoring sessions
          </p>
        </div>

        <button className="text-emerald-600 font-semibold hover:underline">
          View all →
        </button>
      </div>

      {/* Cards */}

      {bookings.length === 0 ? (
        <div className="rounded-3xl bg-white p-20 text-center shadow">
          No bookings found
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {bookings.map((booking) => (

            <div
              key={booking.id}
              className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image */}

              <div className="relative h-60 w-full">

                <Image
                  src={
                    booking.tutor.user.image ||
                    "/avatar.png"
                  }
                  alt={booking.tutor.user.name}
                  fill
                  className="object-cover"
                />

              </div>

              {/* Body */}

              <div className="p-6">

                <div className="flex items-start justify-between">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {booking.tutor.category.name}
                    </h2>

                    <p className="mt-2 text-gray-500">
                      {booking.tutor.user.name}
                    </p>

                  </div>

                  <h3 className="text-3xl font-bold text-emerald-500">
                    ${booking.amount}
                  </h3>

                </div>

                {/* Date */}

                <div className="mt-6 flex items-center gap-2 text-gray-500">

                  <Calendar size={18} />

                  <span>{booking.date}</span>

                </div>

                {/* Time */}

                <div className="mt-3 flex items-center gap-2 text-gray-500">

                  <Clock3 size={18} />

                  <span>{booking.time}</span>

                </div>

                {/* Tutor */}

                <div className="mt-3 flex items-center gap-2 text-gray-500">

                  <BookOpen size={18} />

                  <span>
                    {booking.tutor.category.name}
                  </span>

                </div>

                {/* Bottom */}

                <div className="mt-8 flex items-center justify-between">

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold
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

                  <button className="font-semibold text-emerald-600 hover:underline">
                    View Details
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

      {/* Pagination */}

      <div className="flex items-center justify-center gap-4 pt-4">

        <button className="rounded-lg p-2 hover:bg-gray-100">
          <ChevronLeft size={20} />
        </button>

        <button className="h-11 w-11 rounded-xl bg-gray-100 font-semibold">
          1
        </button>

        <button className="h-11 w-11 rounded-xl bg-emerald-500 font-semibold text-white">
          2
        </button>

        <button className="h-11 w-11 rounded-xl bg-gray-100 font-semibold">
          3
        </button>

        <button className="rounded-lg p-2 hover:bg-gray-100">
          <ChevronRight size={20} />
        </button>

      </div>

    </div>
  );
}