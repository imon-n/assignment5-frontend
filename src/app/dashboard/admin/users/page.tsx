"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import {
  Users,
  Search,
  ShieldCheck,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

const USERS_PER_PAGE = 5;

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

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // -----------------------------
  // Fetch Users
  // -----------------------------
  useEffect(() => {
    fetch(`${API}/api/admin/users`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data || []);
      })
      .catch(() => {
        toast.error("Failed to load users");
      })
      .finally(() => setLoading(false));
  }, []);

  // -----------------------------
  // Ban / Unban
  // -----------------------------
  const toggleStatus = async (
    id: string,
    status: string
  ) => {
    const newStatus =
      status === "ACTIVE"
        ? "BANNED"
        : "ACTIVE";

    try {
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
              ? {
                  ...u,
                  status: newStatus,
                }
              : u
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  // -----------------------------
  // Search
  // -----------------------------
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      `${user.name} ${user.email} ${user.role}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  // -----------------------------
  // Pagination
  // -----------------------------
  const totalPages = Math.ceil(
    filteredUsers.length / USERS_PER_PAGE
  );

  const currentUsers = useMemo(() => {
    const start =
      (currentPage - 1) * USERS_PER_PAGE;

    return filteredUsers.slice(
      start,
      start + USERS_PER_PAGE
    );
  }, [filteredUsers, currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };



  // -----------------------------
  // Statistics
  // -----------------------------
  const activeUsers = users.filter(
    (u) => u.status === "ACTIVE"
  ).length;

  const bannedUsers = users.filter(
    (u) => u.status === "BANNED"
  ).length;

  // -----------------------------
  // Loading
  // -----------------------------
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

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

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

          <div className="rounded-2xl bg-white/15 px-6 py-4 backdrop-blur-xl">

            <p className="text-sm text-white/80">
              Total Users
            </p>

            <h2 className="text-4xl font-bold">
              {users.length}
            </h2>

          </div>

        </div>

      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500 dark:text-slate-400">
                Total Users
              </p>

              <h2 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
                {users.length}
              </h2>

            </div>

            <div className="rounded-2xl bg-[#169B87]/10 p-4 text-[#169B87]">
              <Users size={30} />
            </div>

          </div>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500 dark:text-slate-400">
                Active Users
              </p>

              <h2 className="mt-2 text-4xl font-bold text-green-600">
                {activeUsers}
              </h2>

            </div>

            <div className="rounded-2xl bg-green-100 p-4 text-green-600 dark:bg-green-900/30">
              <UserCheck size={30} />
            </div>

          </div>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500 dark:text-slate-400">
                Banned Users
              </p>

              <h2 className="mt-2 text-4xl font-bold text-red-600">
                {bannedUsers}
              </h2>

            </div>

            <div className="rounded-2xl bg-red-100 p-4 text-red-600 dark:bg-red-900/30">
              <UserX size={30} />
            </div>

          </div>

        </div>

      </div>

      {/* Search */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">

        <div className="relative">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <Input
            value={search}
  onChange={(e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  }}
            placeholder="Search by name, email or role..."
            className="h-12 pl-12"
          />

        </div>

      </div>

          {/* Users */}
      {filteredUsers.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900">

          <Users
            size={55}
            className="mx-auto mb-4 text-slate-400"
          />

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            No Users Found
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Try searching with another keyword.
          </p>

        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-slate-100 dark:bg-slate-800">

                  <tr>

                    <th className="px-6 py-4 text-left font-semibold">
                      User
                    </th>

                    <th className="px-6 py-4 text-left font-semibold">
                      Role
                    </th>

                    <th className="px-6 py-4 text-left font-semibold">
                      Status
                    </th>

                    <th className="px-6 py-4 text-center font-semibold">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {currentUsers.map((user) => (

                    <tr
                      key={user.id}
                      className="border-t transition-all duration-300 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                    >

                      {/* User */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-4">

                          <img
                            src={
                              user.image ||
                              "/avatar.png"
                            }
                            alt={user.name}
                            className="h-14 w-14 rounded-full object-cover ring-2 ring-[#169B87]/30"
                          />

                          <div>

                            <h3 className="font-bold text-slate-900 dark:text-white">
                              {user.name}
                            </h3>

                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {user.email}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Role */}
                      <td className="px-6 py-5">

                        <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                          {user.role}
                        </span>

                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">

                        <span
                          className={`rounded-full px-4 py-2 text-xs font-semibold ${
                            user.status === "ACTIVE"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {user.status}
                        </span>

                      </td>

                      {/* Action */}
                      <td className="px-6 py-5 text-center">

                        <Button
                          onClick={() =>
                            toggleStatus(
                              user.id,
                              user.status
                            )
                          }
                          className={`transition-all duration-300 ${
                            user.status === "ACTIVE"
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-[#005C53] hover:bg-[#169B87]"
                          }`}
                        >
                          {user.status === "ACTIVE"
                            ? "Ban"
                            : "Unban"}
                        </Button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3">

              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev - 1
                  )
                }
              >
                Previous
              </Button>

              {Array.from(
                { length: totalPages },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setCurrentPage(i + 1)
                    }
                    className={`h-10 w-10 rounded-xl font-semibold transition ${
                      currentPage === i + 1
                        ? "bg-[#169B87] text-white"
                        : "bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}

              <Button
                variant="outline"
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev + 1
                  )
                }
              >
                Next
              </Button>

            </div>
          )}
        </>
      )}

    </div>
  );
}