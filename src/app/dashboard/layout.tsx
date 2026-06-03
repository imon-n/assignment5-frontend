"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  role: "STUDENT" | "TUTOR" | "ADMIN";
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://assignment5-backend-f7q4.onrender.com";

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${API_URL}/api/me`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();

        console.log("USER:", data);

        setUser(data.data);
      } catch (err) {
        console.error(err);
        setUser(null);
        router.replace("/login"); // 🔥 redirect
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [router]);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2 className="p-4 text-lg font-bold">
        Welcome {user.name} ({user.role})
      </h2>

      {children}
    </div>
  );
}