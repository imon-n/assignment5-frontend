"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";
import {
  useRouter,
  usePathname,
} from "next/navigation";

import {
  Menu,
  X,
  Moon,
  Sun,
  Bell,
  Search,
  Home,
  LogOut,
  LayoutDashboard,
  ChevronRight,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

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

  const { data: session, isPending } =
    authClient.useSession();

  /* ===========================
      States
  =========================== */

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(false);

  /* ===========================
      API URL
  =========================== */

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://assignment5-backend-f7q4.onrender.com";

  /* ===========================
      Toggle Functions
  =========================== */

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);

    document.documentElement.classList.toggle(
      "dark"
    );
  };
    /* ===========================
      Get Logged-in User
  =========================== */

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

        const currentUser =
          data.user ||
          data.data?.user ||
          data.data ||
          data;

        setUser(currentUser);
      } catch (error) {
        console.error("Session Error:", error);

        setUser(null);

        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, [API_URL, router]);

  /* ===========================
      Logout
  =========================== */

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      router.push("/");

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  /* ===========================
      Menu Configuration
  =========================== */

  const menu = {
    STUDENT: [
      {
        href: "/dashboard/students/overview",
        label: "Overview",
        icon: LayoutDashboard,
      },
      {
        href: "/dashboard/bookings",
        label: "My Bookings",
        icon: Home,
      },
      {
        href: "/dashboard/payments",
        label: "Payment History",
        icon: Bell,
      },
      {
        href: "/dashboard/students/profile",
        label: "Profile",
        icon: ChevronRight,
      },
    ],

    TUTOR: [
      {
        href: "/dashboard/tutors/overview",
        label: "Overview",
        icon: LayoutDashboard,
      },
      {
        href: "/dashboard/tutors/sessions",
        label: "Sessions",
        icon: Home,
      },
      {
        href: "/dashboard/tutors/availabilities",
        label: "Availability",
        icon: Bell,
      },
      {
        href: "/dashboard/tutors/reviews",
        label: "Reviews",
        icon: ChevronRight,
      },
      {
        href: "/dashboard/tutors/profile",
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
        icon: Home,
      },
      {
        href: "/dashboard/admin/bookings",
        label: "Bookings",
        icon: Bell,
      },
      {
        href: "/dashboard/admin/categories",
        label: "Categories",
        icon: ChevronRight,
      },
    ],
  };

  const links = user ? menu[user.role] ?? [] : [];

  /* ===========================
      Loading
  =========================== */

  if (loading || isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-slate-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  /* ===========================
      Authentication
  =========================== */

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 dark:bg-slate-950">
        <h2 className="text-3xl font-bold">
          Please login first
        </h2>

        <Link
          href="/login"
          className="rounded-xl bg-[#005C53] px-6 py-3 text-white transition hover:bg-[#169B87]"
        >
          Go to Login
        </Link>
      </div>
    );
  }return (
  <div
    className={`min-h-screen ${
      darkMode
        ? "dark bg-slate-950 text-white"
        : "bg-gray-100 text-gray-900"
    }`}
  >
    {/* Mobile Overlay */}
    {sidebarOpen && (
      <div
        onClick={() => setSidebarOpen(false)}
        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
      />
    )}

    <div className="flex">

      {/* =========================
            Sidebar
      ========================== */}

      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72
          overflow-y-auto
          transform transition-all duration-300
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
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-700 p-6">
          <Link
            href="/"
            className="text-2xl font-bold text-[#169B87]"
          >
            MENTORING
          </Link>

          <button
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <X />
          </button>
        </div>

        {/* User */}
        <div className="border-b border-gray-200 dark:border-slate-700 p-6">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#169B87] text-xl font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h3 className="font-semibold">
                {user.name}
              </h3>

              <p className="text-sm text-gray-500">
                {user.role}
              </p>
            </div>

          </div>

        </div>

        {/* Menu */}
        <nav className="mt-6 px-4">

          {links.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  mb-2 flex items-center gap-3 rounded-xl px-4 py-3
                  transition-all duration-300
                  ${
                    active
                      ? "bg-[#169B87] text-white shadow-lg"
                      : "hover:bg-[#169B87]/10"
                  }
                `}
              >
                <Icon size={20} />

                <span>
                  {item.label}
                </span>
              </Link>
            );
          })}

        </nav>

        {/* Bottom Buttons */}
        <div className="absolute bottom-6 left-4 right-4 space-y-3">

          <Link
            href="/"
            className="flex items-center justify-center rounded-xl bg-[#005C53] py-3 text-white hover:bg-[#169B87] transition"
          >
            Back to Home
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500 py-3 text-red-500 hover:bg-red-500 hover:text-white transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>

      {/* =========================
            Main Layout
      ========================== */}

      <div className="flex flex-1 flex-col lg:ml-72">       {/* ===========================
                Header
        =========================== */}

        <header
          className={`sticky top-0 z-30 flex h-20 items-center justify-between border-b px-6 backdrop-blur-xl ${
            darkMode
              ? "border-slate-800 bg-slate-950/90"
              : "border-gray-200 bg-white/90"
          }`}
        >
          {/* Left */}
          <div className="flex items-center gap-4">

            {/* Mobile Menu */}
            <button
              onClick={toggleSidebar}
              className="rounded-xl border p-2 lg:hidden"
            >
              <Menu size={22} />
            </button>

            {/* Search */}
            <div className="relative hidden md:block">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search..."
                className={`w-72 rounded-xl border py-2 pl-10 pr-4 outline-none transition ${
                  darkMode
                    ? "border-slate-700 bg-slate-900 text-white focus:border-emerald-500"
                    : "border-gray-300 bg-white focus:border-emerald-500"
                }`}
              />

            </div>

          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            {/* Notification */}
            <button
              className={`relative rounded-xl border p-2 transition ${
                darkMode
                  ? "border-slate-700 hover:bg-slate-800"
                  : "hover:bg-gray-100"
              }`}
            >
              <Bell size={20} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {/* Dark Mode */}
            <button
              onClick={toggleDarkMode}
              className={`rounded-xl border p-2 transition ${
                darkMode
                  ? "border-slate-700 hover:bg-slate-800"
                  : "hover:bg-gray-100"
              }`}
            >
              {darkMode ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </button>

            {/* User */}
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#169B87] text-white font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div className="hidden md:block">
                <h3 className="font-semibold">
                  {user.name}
                </h3>

                <p className="text-xs text-gray-500">
                  {user.role}
                </p>
              </div>

            </div>

          </div>
        </header>

        {/* ===========================
              Welcome Banner
        =========================== */}

        <main className="flex-1 p-6 lg:p-8">

        

          {/* Dashboard Content */}
          <div className="mt-6">
            {children}
          </div>          {/* Dashboard Page Content */}
         

        </main>

      </div>

    </div>
</div> 
 
);
}