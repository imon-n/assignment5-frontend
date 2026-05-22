"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AdminUsersPage() {

  const [users, setUsers] = useState<any[]>([]);
console.log(users)
  useEffect(() => {
    fetch(`${API}/api/admin/users`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setUsers(data.data || []);
      });
  }, []);

  // ✅ BAN / UNBAN
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

  return (
    <div className="mt-28">

      <h1 className="text-3xl font-bold mb-6">
        Manage Users
      </h1>

      <div className="space-y-4">

        {users.map((user) => (

          <div
            key={user.id}
            className="bg-white p-5 rounded-xl shadow flex items-center justify-between"
          >

            <div className="flex items-center gap-4">

              <img
                src={
                  user.image ||
                  "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                className="w-14 h-14 rounded-full object-cover"
                alt=""
              />

              <div>
                <h2 className="font-bold text-lg">
                  {user.name}
                </h2>

                <p className="text-gray-500">
                  {user.email}
                </p>

                <div className="flex gap-2 mt-1">

                  <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {user.role}
                  </span>

                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      user.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>

                </div>
              </div>

            </div>

            <Button
              variant={
                user.status === "ACTIVE"
                  ? "destructive"
                  : "default"
              }
              onClick={() =>
                toggleStatus(
                  user.id,
                  user.status
                )
              }
            >
              {user.status === "ACTIVE"
                ? "Ban"
                : "Unban"}
            </Button>

          </div>

        ))}

      </div>
    </div>
  );
}