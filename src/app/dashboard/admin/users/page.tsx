"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Users } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  status: "ACTIVE" | "BANNED";
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/admin/users`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleStatus = async (
    id: string,
    status: string
  ) => {
    const newStatus =
      status === "BANNED"
        ? "ACTIVE"
        : "BANNED";

    const res = await fetch(
      `${API}/api/admin/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      toast.success("User updated");

      setUsers((prev) =>
        prev.map((u) =>
          u.id === id
            ? { ...u, status: newStatus }
            : u
        )
      );
    } else {
      toast.error(data.message);
    }
  };

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
            <Users size={32} />
          </div>

          <div>

            <h1 className="text-4xl font-bold">
              Manage Users
            </h1>

            <p className="mt-2 text-white/90">
              View, manage and control all platform users.
            </p>

          </div>

        </div>

      </div>

      {/* Users */}
      {users.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900">

          <Users
            size={48}
            className="mx-auto mb-4 text-slate-400"
          />

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            No Users Found
          </h2>

        </div>
      ) : (
        <div className="space-y-5">

          {users.map((user) => (

            <div
              key={user.id}
              className="
                flex
                flex-col
                gap-5
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
                dark:border-slate-800
                dark:bg-slate-900

                md:flex-row
                md:items-center
                md:justify-between
              "
            >

              {/* Left */}
              <div className="flex items-center gap-5">

                <img
                  src={
                    user.image ||
                    "/avatar.png"
                  }
                  alt={user.name}
                  className="h-16 w-16 rounded-full object-cover ring-4 ring-emerald-100 dark:ring-emerald-900"
                />

                <div>

                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {user.name}
                  </h2>

                  <p className="mt-1 text-slate-500 dark:text-slate-400">
                    {user.email}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      {user.role}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.status === "ACTIVE"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {user.status}
                    </span>

                  </div>

                </div>

              </div>

              {/* Button */}
              <Button
                onClick={() =>
                  toggleStatus(
                    user.id,
                    user.status
                  )
                }
                className={
                  user.status === "ACTIVE"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-[#005C53] hover:bg-[#169B87]"
                }
              >
                {user.status === "ACTIVE"
                  ? "Ban User"
                  : "Unban User"}
              </Button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}