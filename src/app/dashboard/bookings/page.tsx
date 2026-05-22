"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ GET MY BOOKINGS
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_URL}/api/bookings`, {
          credentials: "include",
        });

        const data = await res.json();

        console.log(data);

        // ✅ backend response fix
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

  if (loading) {
    return (
      <div className="p-10 text-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6
     mt-28">
      <div>
        <h1 className="text-3xl font-bold">
          My Bookings
        </h1>

        <p className="text-gray-500 mt-1">
          View your tutoring sessions
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          No bookings found
        </div>
      ) : (
        <div className="grid gap-5">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl shadow p-6 border"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                {/* LEFT */}
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">
                    {booking?.tutor?.user?.name}
                  </h2>

                  <p className="text-gray-600">
                    Subject:{" "}
                    {booking?.tutor?.category?.name}
                  </p>

                  <p className="text-gray-600">
                    Date: {booking?.date}
                  </p>

                  <p className="text-gray-600">
                    Time: {booking?.time}
                  </p>
                </div>

                {/* RIGHT */}
                <div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      booking?.status === "CONFIRMED"
                        ? "bg-green-100 text-green-700"
                        : booking?.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking?.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}