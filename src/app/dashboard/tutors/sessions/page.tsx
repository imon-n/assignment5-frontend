// "use client";

// import { useEffect, useState } from "react";

// const API = process.env.NEXT_PUBLIC_API_URL;

// type Session = {
//   id: string;
//   date: string;
//   status: string;
//   student: {
//     name: string;
//     email: string;
//   };
// };

// export default function TutorSessionsPage() {
//   const [sessions, setSessions] = useState<Session[]>([]);
// console.log(sessions)
//   useEffect(() => {
//     fetch(`${API}/api/sessions`, {
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => setSessions(data.data || []));
//   }, []);

//   return (
//   <div className="p-6 mt-24">
//     <h1 className="text-2xl font-bold mb-6">
//       Teaching Sessions
//     </h1>

//     {sessions.length === 0 ? (
//       <div className="text-center text-gray-500 mt-10">
//         <p className="text-lg font-medium">
//           No sessions found
//         </p>
//         <p className="text-sm">
//           You don’t have any teaching sessions yet.
//         </p>
//       </div>
//     ) : (
//       <div className="space-y-4">
//         {sessions.map((s) => (
//           <div
//             key={s.id}
//             className="bg-white p-4 rounded-xl shadow"
//           >
//             <p className="font-semibold">
//               Student: {s.student?.name}
//             </p>

//             <p className="text-sm text-gray-500">
//               {s.student?.email}
//             </p>

//             <p className="mt-2">
//               Date: {s.date}
//             </p>

//             <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full">
//               {s.status}
//             </span>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// );
// }

"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  User,
  Mail,
  CheckCircle,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

type Session = {
  id: string;
  date: string;
  status: string;
  student: {
    name: string;
    email: string;
  };
};

export default function TutorSessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/sessions`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setSessions(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#169B87] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#005C53] to-[#169B87] p-8 text-white shadow-xl">

        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex items-center gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xl">
            <Calendar size={34} />
          </div>

          <div>

            <h1 className="text-4xl font-bold">
              Teaching Sessions
            </h1>

            <p className="mt-2 text-white/90">
              View all of your scheduled tutoring sessions.
            </p>

          </div>

        </div>

      </section>

      {/* Empty */}

      {sessions.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center shadow dark:border-slate-700 dark:bg-slate-900">

          <Calendar
            size={55}
            className="mx-auto text-slate-400"
          />

          <h2 className="mt-5 text-2xl font-bold dark:text-white">
            No Sessions Found
          </h2>

          <p className="mt-2 text-slate-500">
            You dont have any teaching sessions yet.
          </p>

        </div>
      ) : (
        <>
          {/* Desktop Table */}

          <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 lg:block">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-[#005C53] text-white">

                  <tr>

                    <th className="px-6 py-4 text-left">
                      Student
                    </th>

                    <th className="px-6 py-4 text-left">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left">
                      Date
                    </th>

                    <th className="px-6 py-4 text-center">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {sessions.map((session) => (

                    <tr
                      key={session.id}
                      className="border-b transition hover:bg-emerald-50 dark:border-slate-800 dark:hover:bg-slate-800"
                    >

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#169B87]/10">

                            <User
                              size={20}
                              className="text-[#169B87]"
                            />

                          </div>

                          <span className="font-semibold dark:text-white">
                            {session.student.name}
                          </span>

                        </div>

                      </td>

                      <td className="px-6 py-5 text-slate-600 dark:text-slate-300">
                        {session.student.email}
                      </td>

                      <td className="px-6 py-5">
                        {new Date(
                          session.date
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-5 text-center">

                        <span
                          className={`inline-flex rounded-full px-4 py-2 text-xs font-semibold ${
                            session.status === "CONFIRMED"
                              ? "bg-green-100 text-green-700"
                              : session.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {session.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* Mobile Cards */}

          <div className="space-y-5 lg:hidden">

            {sessions.map((session) => (

              <div
                key={session.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#169B87]/10">

                    <User
                      className="text-[#169B87]"
                    />

                  </div>

                  <div>

                    <h2 className="text-lg font-bold dark:text-white">
                      {session.student.name}
                    </h2>

                    <p className="text-sm text-slate-500">
                      {session.student.email}
                    </p>

                  </div>

                </div>

                <div className="mt-6 space-y-3">

                  <div className="flex items-center gap-3">

                    <Calendar
                      size={18}
                      className="text-[#169B87]"
                    />

                    <span>
                      {new Date(
                        session.date
                      ).toLocaleDateString()}
                    </span>

                  </div>

                  <div className="flex items-center gap-3">

                    <CheckCircle
                      size={18}
                      className="text-[#169B87]"
                    />

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        session.status === "CONFIRMED"
                          ? "bg-green-100 text-green-700"
                          : session.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {session.status}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>
        </>
      )}

    </div>
  );
}