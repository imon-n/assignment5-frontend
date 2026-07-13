"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  BookOpen,
  CreditCard,
  CheckCircle,
  User,
  Mail,
  Shield,
  Pencil,
  Clock,
  DollarSign,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const API_URL =
  "https://assignment5-backend-f7q4.onrender.com";

interface Booking {
  id: string;
  date: string;
  time: string;
  status: string;
  amount: number;

  tutor: {
    id: string;
    image?: string;

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
    image?: string | null;
    role: string;
    createdAt: string;
  };

  stats: {
    totalBookings: number;
    upcomingBookings: number;
    completedBookings: number;
    cancelledBookings: number;
    totalPaid: number;
    profileCompletion: number;
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


  // async function fetchDashboard() {
  //   try {
  //     const res = await fetch(`${API_URL}/api/overview`, {
  //       credentials: "include",
  //     });

  //     const data = await res.json();

  //     if (!data.success) {
  //       toast.error(data.message);
  //       return;
  //     }

  //     setDashboard(data.data);

  //     setName(data.data.profile.name);

  //     setImage(data.data.profile.image || "");
  //   } catch (err) {
  //     console.log(err);
  //     toast.error("Failed to load dashboard");
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  
  // useEffect(() => {
  //   fetchDashboard();
  // }, []);
useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API_URL}/api/overview`, {
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setDashboard(data.data);
        setName(data.data.profile.name);
        setImage(data.data.profile.image || "");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  fetchDashboard();
}, []);
  async function handleUpdate() {
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
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!dashboard) return null;

  const {
    profile,
    stats,
    nextSession,
    recentBookings,
    recentPayments,
  } = dashboard;

  return (
  <div className="space-y-8">

    {/* Hero */}

    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-600 p-8 text-white shadow-2xl"
    >
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 left-0 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <span className="rounded-full bg-white/20 px-4 py-1 text-sm backdrop-blur">
            👋 Welcome Back
          </span>

          <h1 className="mt-5 text-5xl font-bold">
            Student Dashboard
          </h1>

          <p className="mt-3 max-w-xl text-white/90">
            Manage bookings, monitor your progress,
            payments and profile from one dashboard.
          </p>

        </div>

        <Image
          src={profile.image || "/avatar.png"}
          alt={profile.name}
          width={140}
          height={140}
          className="rounded-full border-4 border-white object-cover shadow-xl"
        />

      </div>

    </motion.div>

    <div className="grid gap-8 lg:grid-cols-3">

      {/* LEFT */}

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        className="rounded-3xl border bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900"
      >

        <div className="flex flex-col items-center">

          <Image
            src={profile.image || "/avatar.png"}
            alt={profile.name}
            width={120}
            height={120}
            className="rounded-full object-cover ring-4 ring-emerald-200"
          />

          {!editMode ? (

            <>

              <h2 className="mt-5 text-3xl font-bold">
                {profile.name}
              </h2>

              <p className="mt-2 flex items-center gap-2 text-slate-500">
                <Mail size={18} />
                {profile.email}
              </p>

              <span className="mt-4 flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

                <Shield size={16} />

                {profile.role}

              </span>

              <button
                onClick={() => setEditMode(true)}
                className="mt-8 flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-white transition hover:scale-105 hover:bg-emerald-700"
              >

                <Pencil size={18} />

                Edit Profile

              </button>

            </>

          ) : (

            <div className="mt-8 w-full space-y-4">

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

        </div>

      </motion.div>

      {/* RIGHT */}

      <div className="space-y-6 lg:col-span-2">

        <div className="grid gap-6 sm:grid-cols-2">

          <motion.div
            whileHover={{ scale: 1.04 }}
            className="rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500">
                  Total Bookings
                </p>

                <h2 className="mt-2 text-4xl font-bold">
                  {stats.totalBookings}
                </h2>

              </div>

              <BookOpen
                className="text-emerald-600"
                size={42}
              />

            </div>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            className="rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500">
                  Upcoming
                </p>

                <h2 className="mt-2 text-4xl font-bold">
                  {stats.upcomingBookings}
                </h2>

              </div>

              <Calendar
                className="text-blue-500"
                size={42}
              />

            </div>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            className="rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900"
          >

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
                className="text-green-600"
                size={42}
              />

            </div>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            className="rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900"
          >

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
                className="text-purple-600"
                size={42}
              />

            </div>

          </motion.div>

        </div>
        {/* ================= NEXT SESSION ================= */}

<motion.div
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="rounded-3xl bg-white p-7 shadow-xl dark:bg-slate-900"
>
  <div className="mb-6 flex items-center justify-between">

    <h2 className="text-2xl font-bold">
      Next Session
    </h2>

    <Link href="/student/bookings">
      <button className="rounded-xl bg-emerald-600 px-5 py-2 text-white transition hover:bg-emerald-700">
        View All
      </button>
    </Link>

  </div>

  {nextSession ? (

    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

      <div className="flex items-center gap-5">

        <Image
          src={
            nextSession.tutor?.user?.image ||
            nextSession.tutor?.image ||
            "/avatar.png"
          }
          alt={nextSession.tutor?.user?.name || "Tutor"}
          width={80}
          height={80}
          className="rounded-full object-cover ring-4 ring-emerald-100"
        />

        <div>

          <h3 className="text-xl font-bold">
            {nextSession.tutor?.user?.name}
          </h3>

          <p className="text-slate-500">
            {nextSession.tutor?.category?.name}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            📅 {nextSession.date}
          </p>

          <p className="text-sm text-slate-500">
            🕒 {nextSession.time}
          </p>

          <span className="mt-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
            {nextSession.status}
          </span>

        </div>

      </div>

      <div className="text-right">

        <h3 className="text-3xl font-bold text-emerald-600">
          ${nextSession.amount}
        </h3>

      </div>

    </div>

  ) : (

    <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center dark:border-slate-700">

      <Calendar
        className="mx-auto mb-4 text-slate-400"
        size={50}
      />

      <h3 className="text-xl font-semibold">
        No Upcoming Session
      </h3>

      <p className="mt-2 text-slate-500">
        You do not have any scheduled tutoring session.
      </p>

    </div>

  )}

</motion.div>

{/* ================= RECENT BOOKINGS ================= */}

<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="rounded-3xl bg-white p-7 shadow-xl dark:bg-slate-900"
>

  <div className="mb-6 flex items-center justify-between">

    <h2 className="text-2xl font-bold">
      Recent Bookings
    </h2>

    <Link href="/student/bookings">
      <button className="rounded-lg border px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800">
        View All
      </button>
    </Link>

  </div>

  <div className="space-y-5">

    {recentBookings.length > 0 ? (

      recentBookings.slice(0, 5).map((booking) => (

        <motion.div
          key={booking.id}
          whileHover={{ scale: 1.02 }}
          className="flex flex-col gap-5 rounded-2xl border p-5 transition md:flex-row md:items-center md:justify-between dark:border-slate-700"
        >

          <div className="flex items-center gap-4">

            <Image
              src={
                booking.tutor?.user?.image ||
                booking.tutor?.image ||
                "/avatar.png"
              }
              alt={booking.tutor?.user?.name || "Tutor"}
              width={65}
              height={65}
              className="rounded-full object-cover"
            />

            <div>

              <h3 className="font-bold">
                {booking.tutor?.user?.name}
              </h3>

              <p className="text-sm text-slate-500">
                {booking.tutor?.category?.name}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                {booking.date} • {booking.time}
              </p>

            </div>

          </div>

          <div className="text-right">

            <h3 className="text-xl font-bold text-emerald-600">
              ${booking.amount}
            </h3>

            <span
              className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                booking.status === "CONFIRMED"
                  ? "bg-green-100 text-green-700"
                  : booking.status === "COMPLETED"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {booking.status}
            </span>

          </div>

        </motion.div>

      ))

    ) : (

      <div className="py-10 text-center text-slate-500">
        No bookings found.
      </div>

    )}

  </div>

</motion.div>
{/* ================= RECENT PAYMENTS ================= */}

<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="rounded-3xl bg-white p-7 shadow-xl dark:bg-slate-900"
>
  <div className="mb-6 flex items-center justify-between">

    <h2 className="text-2xl font-bold">
      Recent Payments
    </h2>

    <CreditCard className="text-emerald-600" />

  </div>

  <div className="space-y-4">

    {recentPayments.length > 0 ? (

      recentPayments.slice(0, 5).map((payment) => (

        <motion.div
          key={payment.id}
          whileHover={{ scale: 1.01 }}
          className="flex flex-col gap-4 rounded-2xl border p-5 transition md:flex-row md:items-center md:justify-between dark:border-slate-700"
        >
          <div>

            <h3 className="font-semibold">
              {payment.method}
            </h3>

            <p className="text-sm text-slate-500">
              {new Date(payment.createdAt).toLocaleDateString()}
            </p>

          </div>

          <div className="text-right">

            <h2 className="text-2xl font-bold text-emerald-600">
              ${payment.amount}
            </h2>

            <span
              className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                payment.status === "COMPLETED"
                  ? "bg-green-100 text-green-700"
                  : payment.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {payment.status}
            </span>

          </div>

        </motion.div>

      ))

    ) : (

      <div className="py-10 text-center text-slate-500">
        No payment history available.
      </div>

    )}

  </div>

</motion.div>



</div>

</div>

{/* Footer */}

<div className="pb-10 pt-4 text-center text-sm text-slate-500">
  © 2026 Tutor Management System
</div>

</div>
);
}