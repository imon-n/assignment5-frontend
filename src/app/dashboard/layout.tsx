// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { authClient } from "@/lib/auth-client";

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
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//     const { data: session, isPending } = authClient.useSession(); // 👈 use this

//   const API_URL =
//     process.env.NEXT_PUBLIC_API_URL ||
//     "https://assignment5-backend-f7q4.onrender.com";

//   // useEffect(() => {
//   //   const getMe = async () => {

//   //     try {
//   //        await new Promise((resolve) => setTimeout(resolve, 1000));

//   //       const res = await fetch(`${API_URL}/api/me`, {
//   //         method: "GET",
//   //         credentials: "include", // 🔥 MUST
//   //       });

//   //       console.log("STATUS:", res.status);

//   //       if (!res.ok) {
//   //         throw new Error("Unauthorized");
//   //       }

//   //       const data = await res.json();
//   //       console.log("USER:", data);

//   //       setUser(data.user || data.data || data);
//   //     } catch (error) {
//   //       console.error("Session error:", error);
//   //       setUser(null);
//   //       router.replace("/login");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   getMe();
//   // }, [API_URL, router]);

//  useEffect(() => {
 
//     const getMe = async () => {

//       try {
        
// const res = await fetch(
//   `${API_URL}/api/auth/get-session`,
//   {
//     credentials: "include",
//   }
// );

//         console.log("STATUS:", res.status);

//         if (!res.ok) {
//           throw new Error("Unauthorized");
//         }

//         const data = await res.json();
//         console.log("USER:", data);

//         setUser(data.user || data.data || data);
//       } catch (error) {
//         console.error("Session error:", error);
//         setUser(null);
//         router.replace("/login");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getMe();
//   }, [API_URL, router]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         Loading...
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         Please login first
//       </div>
//     );
//   }

//   const menu = {
//     STUDENT: [
//       { href: "/dashboard", label: "Overview" },
//       { href: "/dashboard/bookings", label: "My Bookings" },
//        { href: "/dashboard/payments", label: "Payment History 💳" },
//       { href: "/dashboard/me", label: "Profile" },
//     ],
//     TUTOR: [
//       { href: "/dashboard", label: "Overview" },
//       { href: "/dashboard/tutors/sessions", label: "Sessions" },
//       { href: "/dashboard/tutors/availabilities", label: "Availability" },
//       { href: "/dashboard/tutors/reviews", label: "Reviews" },
//       { href: "/dashboard/me", label: "Profile" },
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
//       <aside className="w-72 bg-white shadow-md p-6">
//         <Link
//   href="/"
//   className="inline-flex items-center gap-2 mb-6 px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
// >
//   ← Back to Home
// </Link>
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

//       <main className="flex-1 p-8">{children}</main>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
  Menu,
  X,
  Bell,
  Search,
  Moon,
  Sun,
  LayoutDashboard,
  LogOut,
  House,
} from "lucide-react";

type Role = "STUDENT" | "TUTOR" | "ADMIN";

type User = {
  id?: string;
  name: string;
  email?: string;
  image?: string;
  role: Role;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // =========================
  // States
  // =========================
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  const [search, setSearch] = useState("");

  // =========================
  // Better Auth Session
  // =========================
  const { data: session } = authClient.useSession();

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://assignment5-backend-f7q4.onrender.com";

  // =========================
  // Fetch Logged User
  // =========================
  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/auth/get-session`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();

        setUser(data.user || data.data || data);
      } catch (error) {
        console.error(error);
        setUser(null);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, [API_URL, router]);

  // =========================
  // Loading Screen
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">
        <div className="space-y-4 text-center">
          <div className="w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // Unauthorized
  // =========================
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-4">
            Please Login First
          </h2>

          <Link
            href="/login"
            className="inline-flex mt-3 rounded-xl bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // =========================
  // Menu
  // =========================
  const menu = {
    STUDENT: [
      {
        href: "/dashboard",
        label: "Overview",
        icon: LayoutDashboard,
      },
      {
        href: "/dashboard/bookings",
        label: "My Bookings",
        icon: House,
      },
      {
        href: "/dashboard/payments",
        label: "Payments",
        icon: Bell,
      },
      {
        href: "/dashboard/me",
        label: "Profile",
        icon: LayoutDashboard,
      },
    ],

    TUTOR: [
      {
        href: "/dashboard",
        label: "Overview",
        icon: LayoutDashboard,
      },
      {
        href: "/dashboard/tutors/sessions",
        label: "Sessions",
        icon: Bell,
      },
      {
        href: "/dashboard/tutors/availabilities",
        label: "Availability",
        icon: House,
      },
      {
        href: "/dashboard/tutors/reviews",
        label: "Reviews",
        icon: LayoutDashboard,
      },
      {
        href: "/dashboard/me",
        label: "Profile",
        icon: LayoutDashboard,
      },
    ],

    ADMIN: [
      {
        href: "/dashboard",
        label: "Overview",
        icon: LayoutDashboard,
      },
      {
        href: "/dashboard/admin/users",
        label: "Users",
        icon: House,
      },
      {
        href: "/dashboard/admin/bookings",
        label: "Bookings",
        icon: Bell,
      },
      {
        href: "/dashboard/admin/categories",
        label: "Categories",
        icon: LayoutDashboard,
      },
    ],
  };

  const links = menu[user.role] || [];
    // ===========================
  // Logout
  // ===========================
  const handleLogout = async () => {
    try {
      await authClient.signOut();

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`min-h-screen flex transition-all duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      {/* ================= Mobile Overlay ================= */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* ================= Sidebar ================= */}
      <aside
        className={`
        fixed lg:static
        top-0 left-0
        z-50
        h-screen
        w-72
        transform
        transition-transform
        duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
        ${
          darkMode
            ? "bg-slate-900 border-r border-slate-800"
            : "bg-white border-r border-slate-200"
        }
      `}
      >
        <div className="p-6">

          {/* Logo */}
          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-3xl font-bold text-emerald-600">
                Mentor
              </h2>

              <p className="text-sm text-slate-500">
                Dashboard
              </p>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X size={26} />
            </button>

          </div>

          {/* User */}
          <div className="mt-10 flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xl font-bold">
              {user.name.charAt(0)}
            </div>

            <div>
              <h3 className="font-semibold">
                {user.name}
              </h3>

              <p className="text-sm text-emerald-500">
                {user.role}
              </p>
            </div>

          </div>

          {/* Menu */}
          <nav className="mt-10 space-y-2">

            {links.map((item) => {
              const Icon = item.icon;

              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300
                  ${
                    active
                      ? "bg-emerald-600 text-white shadow-lg"
                      : darkMode
                      ? "hover:bg-slate-800"
                      : "hover:bg-emerald-50"
                  }`}
                >
                  <Icon size={20} />

                  <span>{item.label}</span>
                </Link>
              );
            })}

          </nav>

          {/* Bottom Buttons */}
          <div className="absolute bottom-8 left-6 right-6 space-y-3">

            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500 py-3 text-emerald-600 hover:bg-emerald-600 hover:text-white transition"
            >
              <House size={18} />

              Back Home
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500 py-3 text-white hover:bg-red-600 transition"
            >
              <LogOut size={18} />

              Logout
            </button>

          </div>

        </div>
      </aside>

      {/* ================= Main ================= */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header
          className={`sticky top-0 z-30 flex h-20 items-center justify-between px-6 backdrop-blur-xl border-b
          ${
            darkMode
              ? "bg-slate-950/70 border-slate-800"
              : "bg-white/80 border-slate-200"
          }`}
        >

          {/* Left */}
          <div className="flex items-center gap-4">

            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu size={28} />
            </button>

            <h1 className="text-2xl font-bold">
              Dashboard
            </h1>

          </div>

          {/* Search */}
          <div className="hidden md:flex relative w-[380px]">

            <Search
              className="absolute left-4 top-3 text-slate-400"
              size={18}
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search..."
              className={`w-full rounded-full pl-11 pr-5 py-3 outline-none
              ${
                darkMode
                  ? "bg-slate-900 border border-slate-700"
                  : "bg-slate-100 border border-slate-200"
              }`}
            />

          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:scale-105 transition"
            >
              {darkMode ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </button>

            <button className="relative">

              <Bell size={24} />

              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>

            </button>

          </div>

        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8">          {/* Welcome Banner */}
          <div
            className={`mb-8 overflow-hidden rounded-3xl p-8 relative ${
              darkMode
                ? "bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900"
                : "bg-gradient-to-r from-[#005C53] via-[#169B87] to-[#0F766E]"
            }`}
          >
            <div className="relative z-10">
              <p className="text-white/80 text-sm">
                Welcome Back 👋
              </p>

              <h2 className="mt-2 text-4xl font-bold text-white">
                Hello, {user.name}
              </h2>

              <p className="mt-3 max-w-2xl text-white/90">
                Manage your mentoring sessions, bookings,
                payments and profile from one place.
              </p>
            </div>

            {/* Decorative Circles */}
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute right-32 bottom-0 h-32 w-32 rounded-full bg-white/10 blur-xl" />
          </div>

          {/* Main Content */}
          <div className="rounded-3xl bg-transparent">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}