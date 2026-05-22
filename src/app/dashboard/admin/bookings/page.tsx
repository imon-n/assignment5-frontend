"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

type Booking = {
  id: string;
  date: string;
  time: string;
  status: string;
  student: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  tutor: {
    id: string;
    image?: string;
    user: {
      name: string;
      image?: string;
    };
    category: {
      name: string;
    };
  };
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/admin/bookings`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setBookings(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Admin Bookings
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            
            {/* HEAD */}
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Tutor</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b.id}
                  className="border-t hover:bg-gray-50"
                >
                  {/* STUDENT */}
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={b.student.image || "/avatar.png"}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">
                          {b.student.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {b.student.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* TUTOR */}
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          b.tutor.user.image ||
                          b.tutor.image ||
                          "/avatar.png"
                        }
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">
                          {b.tutor.user.name}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td className="p-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {b.tutor.category.name}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="p-3">{b.date}</td>

                  {/* TIME */}
                  <td className="p-3">{b.time}</td>

                  {/* STATUS */}
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        b.status === "CONFIRMED"
                          ? "bg-green-100 text-green-700"
                          : b.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}