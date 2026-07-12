// "use client";

// import { useEffect, useState } from "react";

// const API = process.env.NEXT_PUBLIC_API_URL;

// type Booking = {
//   id: string;
//   date: string;
//   time: string;
//   status: string;
//   student: {
//     id: string;
//     name: string;
//     email: string;
//     image?: string;
//   };
//   tutor: {
//     id: string;
//     image?: string;
//     user: {
//       name: string;
//       image?: string;
//     };
//     category: {
//       name: string;
//     };
//   };
// };

// export default function AdminBookingsPage() {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${API}/api/admin/bookings`, {
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data)
//         setBookings(data.data || []);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">
//         Admin Bookings
//       </h1>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            
//             {/* HEAD */}
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left">Student</th>
//                 <th className="p-3 text-left">Tutor</th>
//                 <th className="p-3 text-left">Category</th>
//                 <th className="p-3 text-left">Date</th>
//                 <th className="p-3 text-left">Time</th>
//                 <th className="p-3 text-left">Status</th>
//               </tr>
//             </thead>

//             {/* BODY */}
//             <tbody>
//               {bookings.map((b) => (
//                 <tr
//                   key={b.id}
//                   className="border-t hover:bg-gray-50"
//                 >
//                   {/* STUDENT */}
//                   <td className="p-3">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={b.student.image || "/avatar.png"}
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                       <div>
//                         <p className="font-medium">
//                           {b.student.name}
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           {b.student.email}
//                         </p>
//                       </div>
//                     </div>
//                   </td>

//                   {/* TUTOR */}
//                   <td className="p-3">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={
//                           b.tutor.user.image ||
//                           b.tutor.image ||
//                           "/avatar.png"
//                         }
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                       <div>
//                         <p className="font-medium">
//                           {b.tutor.user.name}
//                         </p>
//                       </div>
//                     </div>
//                   </td>

//                   {/* CATEGORY */}
//                   <td className="p-3">
//                     <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
//                       {b.tutor.category.name}
//                     </span>
//                   </td>

//                   {/* DATE */}
//                   <td className="p-3">{b.date}</td>

//                   {/* TIME */}
//                   <td className="p-3">{b.time}</td>

//                   {/* STATUS */}
//                   <td className="p-3">
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm ${
//                         b.status === "CONFIRMED"
//                           ? "bg-green-100 text-green-700"
//                           : b.status === "PENDING"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {b.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>

//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

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
        setBookings(data.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#169B87] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#005C53] to-[#169B87] p-8 text-white shadow-xl">

        <div className="flex items-center gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xl">
            <CalendarDays size={32} />
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              All Bookings
            </h1>

            <p className="mt-2 text-white/90">
              Manage and monitor all student tutoring bookings.
            </p>
          </div>

        </div>

      </div>

      {/* Empty State */}
      {bookings.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900">

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            No Bookings Found
          </h2>

          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Booking records will appear here.
          </p>

        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">

          <table className="min-w-full">

            {/* Table Head */}
            <thead className="bg-slate-100 dark:bg-slate-800">

              <tr className="text-left">

                <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                  Student
                </th>

                <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                  Tutor
                </th>

                <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                  Category
                </th>

                <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                  Date
                </th>

                <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                  Time
                </th>

                <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                  Status
                </th>

              </tr>

            </thead>

            {/* Body */}
            <tbody>

              {bookings.map((booking) => (

                <tr
                  key={booking.id}
                  className="
                    border-t
                    border-slate-200
                    transition-all
                    duration-300
                    hover:bg-emerald-50
                    dark:border-slate-800
                    dark:hover:bg-slate-800
                  "
                >

                  {/* Student */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={booking.student?.image || "/avatar.png"}
                        alt=""
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-emerald-500/20"
                      />

                      <div>

                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {booking.student?.name}
                        </h3>

                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {booking.student?.email}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Tutor */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={
                          booking.tutor?.user?.image ||
                          booking.tutor?.image ||
                          "/avatar.png"
                        }
                        alt=""
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-emerald-500/20"
                      />

                      <span className="font-semibold text-slate-900 dark:text-white">
                        {booking.tutor?.user?.name}
                      </span>

                    </div>

                  </td>

                  {/* Category */}
                  <td className="px-6 py-5">

                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                      {booking.tutor?.category?.name}
                    </span>

                  </td>

                  {/* Date */}
                  <td className="px-6 py-5 text-slate-700 dark:text-slate-300">
                    {booking.date}
                  </td>

                  {/* Time */}
                  <td className="px-6 py-5 text-slate-700 dark:text-slate-300">
                    {booking.time}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-4 py-1 text-sm font-semibold ${
                        booking.status === "CONFIRMED"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : booking.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {booking.status}
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