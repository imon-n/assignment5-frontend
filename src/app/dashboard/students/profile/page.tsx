"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Calendar,
  BookOpen,
  CreditCard,
  CheckCircle,
  User,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Booking {
  id: string;
  date: string;
  time: string;
  status: string;
  amount: number;

  tutor: {
    id: string;
    category: {
      name: string;
    };

    user: {
      name: string;
      image?: string;
    };
  };
}

interface Payment {
  id: string;
  amount: number;
  status: string;
  method: string;
  createdAt: string;
}

interface DashboardData {
  profile: {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: string;
  };

  stats: {
    totalBookings: number;
    upcomingBookings: number;
    completedBookings: number;
    cancelledBookings: number;
    totalPaid: number;
  
  };

  nextSession: Booking | null;

  recentBookings: Booking[];

  recentPayments: Payment[];
}

export default function ProfilePage() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState("");

  const [image, setImage] = useState("");

  // -----------------------------
  // Fetch Dashboard
  // -----------------------------
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/me`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success) {
          setDashboard(data.data);

          setName(data.data.profile.name);

          setImage(data.data.profile.image || "");
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // -----------------------------
  // Update Profile
  // -----------------------------
  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_URL}/api/me`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          image,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        return toast.error(data.message);
      }

      toast.success("Profile Updated");

      setDashboard((prev) =>
        prev
          ? {
              ...prev,
              profile: {
                ...prev.profile,
                name,
                image,
              },
            }
          : prev
      );

      setEditMode(false);
    } catch (err) {
      console.log(err);
      toast.error("Update Failed");
    }
  };

  // -----------------------------
  // Loading
  // -----------------------------
  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (!dashboard) return null;

  const { profile, stats } = dashboard;

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#005C53] to-[#169B87] p-8 text-white shadow-xl">

  {/* Background Blur */}
  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
  <div className="absolute -bottom-12 left-0 h-44 w-44 rounded-full bg-white/10 blur-3xl" />

 

    {/* Left */}
    <div>

      <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur">
        👋 Welcome Back
      </span>

      <h1 className="mt-4 text-4xl font-bold md:text-5xl">
        Student Profile
      </h1>

      <p className="mt-3 max-w-2xl text-base text-white/90">
        Manage your personal information, monitor your tutoring
        sessions, payments and learning progress from one place.
      </p>

   

   

  </div>

</div>

      <div className="grid gap-8 xl:grid-cols-3">

        {/* LEFT PROFILE CARD */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">

          <div className="flex flex-col items-center">

            <Image
              src={profile.image || "/avatar.png"}
              alt={profile.name}
              width={120}
              height={120}
              className="rounded-full object-cover ring-4 ring-emerald-100 dark:ring-emerald-900"
            />

            {!editMode ? (
              <>
                <h2 className="mt-5 text-3xl font-bold dark:text-white">
                  {profile.name}
                </h2>

                <p className="mt-2 text-slate-500">
                  {profile.email}
                </p>

                <span className="mt-3 rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  {profile.role}
                </span>

                <button
                  onClick={() => setEditMode(true)}
                  className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 text-white transition hover:bg-emerald-700"
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <div className="mt-6 w-full space-y-4">

                <input
                  className="w-full rounded-xl border p-3 dark:bg-slate-800"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />

                <input
                  className="w-full rounded-xl border p-3 dark:bg-slate-800"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Image URL"
                />

                <div className="flex gap-3">

                  <button
                    onClick={handleUpdate}
                    className="flex-1 rounded-xl bg-emerald-600 py-3 text-white"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditMode(false)}
                    className="flex-1 rounded-xl border py-3"
                  >
                    Cancel
                  </button>

                </div>

              </div>
            )}

            {/* Profile Completion */}

            <div className="mt-8 w-full rounded-2xl bg-slate-100 p-5 dark:bg-slate-800">

              <div className="mb-2 flex justify-between">

                <span className="font-medium">
                  Profile Completion
                </span>

                <span className="font-bold text-emerald-600">
                  {stats.profileCompletion}%
                </span>

              </div>

              <div className="h-3 rounded-full bg-slate-300 dark:bg-slate-700">

                <div
                  style={{
                    width: `${stats.profileCompletion}%`,
                  }}
                  className="h-3 rounded-full bg-emerald-500 transition-all duration-700"
                />

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="space-y-6 xl:col-span-2">

          {/* Stats */}

          <div className="grid gap-5 sm:grid-cols-2">

            <div className="rounded-3xl border bg-white p-6 shadow dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500">
                    Total Bookings
                  </p>

                  <h2 className="mt-2 text-4xl font-bold">
                    {stats.totalBookings}
                  </h2>
                </div>

                <BookOpen className="text-emerald-600" size={40} />
              </div>
            </div>

            <div className="rounded-3xl border bg-white p-6 shadow dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500">
                    Upcoming
                  </p>

                  <h2 className="mt-2 text-4xl font-bold">
                    {stats.upcomingBookings}
                  </h2>
                </div>

                <Calendar className="text-blue-500" size={40} />
              </div>
            </div>

            <div className="rounded-3xl border bg-white p-6 shadow dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500">
                    Completed
                  </p>

                  <h2 className="mt-2 text-4xl font-bold">
                    {stats.completedBookings}
                  </h2>
                </div>

                <CheckCircle
                  className="text-green-500"
                  size={40}
                />
              </div>
            </div>

            <div className="rounded-3xl border bg-white p-6 shadow dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500">
                    Total Paid
                  </p>

                  <h2 className="mt-2 text-4xl font-bold">
                    ${stats.totalPaid}
                  </h2>
                </div>

                <CreditCard
                  className="text-purple-500"
                  size={40}
                />
              </div>
            </div>

          </div>

          {/* Next Session */}

          <div className="rounded-3xl border bg-white p-6 shadow dark:border-slate-800 dark:bg-slate-900">

            <h2 className="mb-5 text-2xl font-bold">
              Next Session
            </h2>

            {dashboard.nextSession ? (

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <Image
                    src={
                      dashboard.nextSession.tutor.user.image ||
                      "/avatar.png"
                    }
                    alt=""
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />

                  <div>

                    <h3 className="text-lg font-bold">
                      {dashboard.nextSession.tutor.user.name}
                    </h3>

                    <p className="text-slate-500">
                      {dashboard.nextSession.tutor.category.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {dashboard.nextSession.date} •{" "}
                      {dashboard.nextSession.time}
                    </p>

                  </div>

                </div>

                <Link href="/student/bookings">

                  <button className="rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700">
                    View
                  </button>

                </Link>

              </div>

            ) : (

              <div className="py-10 text-center text-slate-500">
                No upcoming session
              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}
