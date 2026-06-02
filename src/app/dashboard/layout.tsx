// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// type Role = "STUDENT" | "TUTOR" | "ADMIN";

// type User = {
//   name: string;
//   role: Role;
// };
// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {

//   const [user, setUser] = useState<User | null>(null);
// const [loading, setLoading] = useState(true);

// useEffect(() => {
//   const getMe = async () => {
//     try {
//       const res = await fetch(
//         "https://skillbridge-backend-6mpi.onrender.com/api/me",
//         {
//           credentials: "include",
//         }
//       );

//       if (!res.ok) {
//         throw new Error("Unauthorized");
//       }

//       const data = await res.json();

//       console.log(data);

//       setUser(data.data || data);
//     } catch (error) {
//       console.error(error);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   getMe();
// }, []);

// if (loading) {
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       Loading...
//     </div>
//   );
// }

// if (!user) {
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       Please login first
//     </div>
//   );
// }
//   }

//   const menu = {
//     STUDENT: [
//       { href: "/dashboard", label: "Overview" },
//       { href: "/dashboard/bookings", label: "My Bookings" },
//       { href: "/dashboard/reviews", label: "My Reviews" },
//       { href: "/dashboard/me", label: "Profile" },
//     ],
//     TUTOR: [
//       { href: "/dashboard", label: "Overview" },
//       { href: "/dashboard/tutor/sessions", label: "Sessions" },
//       { href: "/dashboard/tutor/availabilities", label: "Availability" },
//       { href: "/dashboard/tutor/reviews", label: "Reviews" },
//         { href: "/dashboard/me", label: "Profile" },
//     ],
//     ADMIN: [
//       { href: "/dashboard", label: "Overview" },
//       { href: "/dashboard/admin/users", label: "Users" },
//       { href: "/dashboard/admin/bookings", label: "All Bookings" },
//       { href: "/dashboard/admin/categories", label: "Categories" },
//     ],
//   };

//   const links = menu[user.role] || [];

//   return (
//     <div className="min-h-screen flex bg-gray-100">

//       {/* Sidebar */}
//       <aside className="w-72 bg-white shadow-md p-6">
//         <h2 className="text-2xl font-bold mb-2 text-green-700">
//           {user.role} Panel
//         </h2>

//         <p className="text-sm text-gray-500 mb-6">
//           {user.name}
//         </p>

//         <nav className="flex flex-col gap-3">
//           {links.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className="px-3 py-2 rounded-lg hover:bg-green-100 hover:text-green-700 transition"
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         {children}
//       </main>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Role = "STUDENT" | "TUTOR" | "ADMIN";

type User = {
  name: string;
  role: Role;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMe = async () => {
      try {
     const res = await fetch(
  "https://skillbridge-backend-6mpi.onrender.com/api/me",
  {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }
);
        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();

        console.log(data);

        setUser(data.data || data);
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Please login first
      </div>
    );
  }

  const menu = {
    STUDENT: [
      { href: "/dashboard", label: "Overview" },
      { href: "/dashboard/bookings", label: "My Bookings" },
      { href: "/dashboard/reviews", label: "My Reviews" },
      { href: "/dashboard/me", label: "Profile" },
    ],
    TUTOR: [
      { href: "/dashboard", label: "Overview" },
      { href: "/dashboard/tutor/sessions", label: "Sessions" },
      { href: "/dashboard/tutor/availabilities", label: "Availability" },
      { href: "/dashboard/tutor/reviews", label: "Reviews" },
      { href: "/dashboard/me", label: "Profile" },
    ],
    ADMIN: [
      { href: "/dashboard", label: "Overview" },
      { href: "/dashboard/admin/users", label: "Users" },
      { href: "/dashboard/admin/bookings", label: "All Bookings" },
      { href: "/dashboard/admin/categories", label: "Categories" },
    ],
  };

  const links = menu[user.role] || [];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-2 text-green-700">
          {user.role} Panel
        </h2>

        <p className="text-sm text-gray-500 mb-6">{user.name}</p>

        <nav className="flex flex-col gap-3">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 rounded-lg hover:bg-green-100 hover:text-green-700 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}