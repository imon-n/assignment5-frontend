"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

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
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
    const { data: session, isPending } = authClient.useSession(); // 👈 use this

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://assignment5-backend-f7q4.onrender.com";

  // useEffect(() => {
  //   const getMe = async () => {

  //     try {
  //        await new Promise((resolve) => setTimeout(resolve, 1000));

  //       const res = await fetch(`${API_URL}/api/me`, {
  //         method: "GET",
  //         credentials: "include", // 🔥 MUST
  //       });

  //       console.log("STATUS:", res.status);

  //       if (!res.ok) {
  //         throw new Error("Unauthorized");
  //       }

  //       const data = await res.json();
  //       console.log("USER:", data);

  //       setUser(data.user || data.data || data);
  //     } catch (error) {
  //       console.error("Session error:", error);
  //       setUser(null);
  //       router.replace("/login");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getMe();
  // }, [API_URL, router]);

 useEffect(() => {
 
    const getMe = async () => {

      try {
        
const res = await fetch(
  `${API_URL}/api/auth/get-session`,
  {
    credentials: "include",
  }
);

        console.log("STATUS:", res.status);

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        console.log("USER:", data);

        setUser(data.user || data.data || data);
      } catch (error) {
        console.error("Session error:", error);
        setUser(null);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, [API_URL, router]);

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
       { href: "/dashboard/payments", label: "Payment History 💳" },
      { href: "/dashboard/me", label: "Profile" },
    ],
    TUTOR: [
      { href: "/dashboard", label: "Overview" },
      { href: "/dashboard/tutors/sessions", label: "Sessions" },
      { href: "/dashboard/tutors/availabilities", label: "Availability" },
      { href: "/dashboard/tutors/reviews", label: "Reviews" },
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
      <aside className="w-72 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-2 text-green-700">
          {user.role} Panel
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          {user.name}
        </p>

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

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}