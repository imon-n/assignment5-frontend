"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { toast } from "sonner";

import {
  Calendar,
  Clock,
  User,
  Mail,
  Shield,
  CheckCircle,
  XCircle,
  BookOpen,
  Pencil,
  Plus,
  Settings,
  ArrowRight,
  DollarSign,
  Star,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ============================
// Interfaces
// ============================

interface Availability {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

interface Student {
  id: string;
  name: string;
  image?: string | null;
}

interface Session {
  id: string;
  date: string;
  time: string;
  status: string;

  student?: Student;
}

interface TutorProfile {
  id: string;

  bio: string;

  image?: string | null;

  hourlyRate: number;

  rating: number;

  isApproved: boolean;

  createdAt: string;

  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role: string;
  };

  category?: {
    id: string;
    name: string;
  };
}

// ============================

export default function TutorOverviewPage() {
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] =
    useState<TutorProfile | null>(null);

  const [sessions, setSessions] =
    useState<Session[]>([]);

  const [availability, setAvailability] =
    useState<Availability[]>([]);

  // ============================
  // Fetch Dashboard Data
  // ============================

  useEffect(() => {
    fetchOverview();
  }, []);

  async function fetchOverview() {
    try {
      setLoading(true);

      // Profile

      const profileRes = await fetch(
        `${API_URL}/api/profile/me`,
        {
          credentials: "include",
        }
      );

      const profileData = await profileRes.json();

      if (!profileData.success) {
        throw new Error(profileData.message);
      }

      const tutorProfile = profileData.data;

      setProfile(tutorProfile);

      // Sessions

      const sessionRes = await fetch(
        `${API_URL}/api/sessions`,
        {
          credentials: "include",
        }
      );

      const sessionData = await sessionRes.json();

      if (sessionData.success) {
        setSessions(sessionData.data);
      }

      // Availability

      const availabilityRes = await fetch(
        `${API_URL}/api/tutor/${tutorProfile.id}/availability`
      );

      const availabilityData =
        await availabilityRes.json();

      if (availabilityData.success) {
        setAvailability(availabilityData.data);
      }
    } catch (error: any) {
      console.error(error);

      toast.error(
        error.message || "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  }

  // ============================
  // Statistics
  // ============================

  const stats = useMemo(() => {
    return {
      total: sessions.length,

      completed: sessions.filter(
        (s) => s.status === "COMPLETED"
      ).length,

      upcoming: sessions.filter(
        (s) => s.status === "CONFIRMED"
      ).length,

      cancelled: sessions.filter(
        (s) => s.status === "CANCELLED"
      ).length,
    };
  }, [sessions]);

  // ============================
  // Loading
  // ============================

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-lg text-slate-500">
          Tutor profile not found.
        </p>
      </div>
    );
  }

  // ============================
  // Part 1B starts here
  // ============================

  return (
    <div className="space-y-8">
    {/* ================= HERO ================= */}

<motion.section
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white shadow-2xl"
>
  {/* Background Blur */}
  <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
  <div className="absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

  <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

    {/* Left */}

    <div className="max-w-2xl">

      <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-md">
        👋 Welcome Back
      </span>

      <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
        Tutor Dashboard
      </h1>

      <p className="mt-4 text-lg text-white/90">
        Manage your tutoring profile, sessions, availability,
        and grow your teaching career from one dashboard.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">

        <Link href="/dashboard/tutor/profile">
          <button className="rounded-xl bg-white px-6 py-3 font-semibold text-emerald-700 transition hover:scale-105">
            Edit Profile
          </button>
        </Link>

        <Link href="/dashboard/tutor/sessions">
          <button className="rounded-xl border border-white/40 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20">
            View Sessions
          </button>
        </Link>

      </div>

    </div>

    {/* Right */}

    <motion.div
      whileHover={{
        scale: 1.05,
        rotate: 2,
      }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center"
    >
      <div className="rounded-full border-4 border-white/30 p-2 backdrop-blur-md">

        <Image
          src={profile.user.image || "/avatar.png"}
          alt={profile.user.name}
          width={160}
          height={160}
          className="rounded-full object-cover"
        />

      </div>

      <h2 className="mt-5 text-3xl font-bold">
        {profile.user.name}
      </h2>

      <p className="mt-2 text-white/90">
        {profile.category?.name}
      </p>

      <span className="mt-4 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur">
        ⭐ {profile.rating.toFixed(1)} Rating
      </span>

    </motion.div>

  </div>

  {/* Bottom Stats */}

  <div className="relative z-10 mt-10 grid grid-cols-2 gap-5 border-t border-white/20 pt-8 md:grid-cols-4">

    <div>
      <p className="text-sm text-white/80">
        Hourly Rate
      </p>

      <h3 className="mt-2 text-2xl font-bold">
        ${profile.hourlyRate}
      </h3>
    </div>

    <div>
      <p className="text-sm text-white/80">
        Approval
      </p>

      <h3 className="mt-2 text-2xl font-bold">
        {profile.isApproved ? "Approved" : "Pending"}
      </h3>
    </div>

 

    <div>
      <p className="text-sm text-white/80">
        Joined
      </p>

      <h3 className="mt-2 text-xl font-bold">
        {new Date(profile.createdAt).toLocaleDateString()}
      </h3>
    </div>

  </div>

</motion.section>
{/* =========================================================
        PART 2
        Sticky Profile + Statistics Cards
========================================================= */}

<div className="mt-8 grid gap-8 lg:grid-cols-3">

  {/* =====================================================
                LEFT STICKY PROFILE
  ===================================================== */}

  <motion.aside
    initial={{ opacity: 0, x: -25 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: .5 }}
    className="sticky top-24 h-fit rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900"
  >
    <div className="flex flex-col items-center">

      <div className="relative">

        <Image
          src={profile.user.image || "/avatar.png"}
          alt={profile.user.name}
          width={130}
          height={130}
          className="rounded-full object-cover ring-4 ring-emerald-200"
        />

        <span
          className={`absolute bottom-2 right-2 h-5 w-5 rounded-full border-2 border-white ${
            profile.isApproved
              ? "bg-green-500"
              : "bg-yellow-500"
          }`}
        />

      </div>

      <h2 className="mt-5 text-3xl font-bold">
        {profile.user.name}
      </h2>

      <p className="mt-2 text-center text-slate-500 dark:text-slate-400">
        {profile.user.email}
      </p>

      <span className="mt-4 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
        {profile.category?.name}
      </span>

      <div className="mt-8 w-full space-y-4">

        <div className="flex items-center justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-800">

          <span className="text-slate-500">
            Hourly Rate
          </span>

          <span className="font-bold text-emerald-600">
            ${profile.hourlyRate}
          </span>

        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-800">

          <span className="text-slate-500">
            Rating
          </span>

          <span className="font-bold text-yellow-500">
            ⭐ {profile.rating}
          </span>

        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-800">

          <span className="text-slate-500">
            Status
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              profile.isApproved
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {profile.isApproved
              ? "Approved"
              : "Pending"}
          </span>

        </div>

      </div>

      <Link
        href="/dashboard/tutor/profile"
        className="mt-8 w-full"
      >
        <button className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3 font-semibold text-white transition hover:scale-[1.03]">
          Edit Profile
        </button>
      </Link>

    </div>
  </motion.aside>

  {/* =====================================================
                  RIGHT CONTENT
  ===================================================== */}

  <div className="space-y-8 lg:col-span-2">

    {/* =======================
            STATS GRID
    ======================== */}

    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {/* Sessions */}

      <motion.div
        whileHover={{
          y: -5,
          scale: 1.03,
        }}
        className="rounded-3xl bg-white p-6 shadow-xl transition dark:bg-slate-900"
      >
        <div className="flex items-center justify-between">

          <div>

            <p className="text-slate-500">
              Sessions
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {sessions.length}
            </h2>

          </div>

          <div className="rounded-2xl bg-blue-100 p-4 dark:bg-blue-900/40">

            <Calendar
              className="text-blue-600"
              size={30}
            />

          </div>

        </div>
      </motion.div>

     

      {/* Hourly */}

      <motion.div
        whileHover={{
          y: -5,
          scale: 1.03,
        }}
        className="rounded-3xl bg-white p-6 shadow-xl transition dark:bg-slate-900"
      >
        <div className="flex items-center justify-between">

          <div>

            <p className="text-slate-500">
              Hourly Rate
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              ${profile.hourlyRate}
            </h2>

          </div>

          <div className="rounded-2xl bg-yellow-100 p-4 dark:bg-yellow-900/40">

            <DollarSign
              className="text-yellow-600"
              size={30}
            />

          </div>

        </div>
      </motion.div>

      {/* Rating */}

      <motion.div
        whileHover={{
          y: -5,
          scale: 1.03,
        }}
        className="rounded-3xl bg-white p-6 shadow-xl transition dark:bg-slate-900"
      >
        <div className="flex items-center justify-between">

          <div>

            <p className="text-slate-500">
              Rating
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {profile.rating}
            </h2>

          </div>

          <div className="rounded-2xl bg-orange-100 p-4 dark:bg-orange-900/40">

            <Star
              className="text-orange-500"
              size={30}
              fill="currentColor"
            />

          </div>

        </div>
      </motion.div>

    </div>

    {/* =======================
        BIO CARD
    ======================== */}

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: .4 }}
      className="rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900"
    >

      <h2 className="mb-5 text-2xl font-bold">
        About Me
      </h2>

      <p className="leading-8 text-slate-600 dark:text-slate-300">

        {profile.bio ||
          "No biography added yet."}

      </p>

    </motion.div>

  </div>

</div>
{/* ======================================================
                RECENT SESSIONS
====================================================== */}

<motion.section
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: .4 }}
  className="rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900"
>

<div className="mb-6 flex items-center justify-between">

<h2 className="text-2xl font-bold">
Recent Sessions
</h2>

<Link href="/dashboard/tutor/sessions">

<button className="rounded-xl border px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800">
View All
</button>

</Link>

</div>

<div className="space-y-5">

{sessions.length > 0 ? (

sessions.slice(0,5).map((session:any)=>(

<motion.div

key={session.id}

whileHover={{scale:1.02}}

className="flex flex-col gap-5 rounded-2xl border p-5 md:flex-row md:items-center md:justify-between dark:border-slate-700"
>

<div>

<h3 className="text-lg font-bold">
{session.student?.name}
</h3>

<p className="text-slate-500">
{session.date}
</p>

<p className="text-sm text-slate-500">
{session.time}
</p>

</div>

<div className="text-right">

<span
className={`rounded-full px-4 py-2 text-sm font-semibold ${
session.status==="COMPLETED"
?"bg-green-100 text-green-700"
:session.status==="CONFIRMED"
?"bg-blue-100 text-blue-700"
:"bg-yellow-100 text-yellow-700"
}`}
>
{session.status}
</span>

</div>

</motion.div>

))

):( 

<div className="py-12 text-center text-slate-500">
No Sessions Yet
</div>

)}

</div>

</motion.section>

{/* ======================================================
                  QUICK ACTIONS
====================================================== */}

<motion.section

initial={{opacity:0}}

animate={{opacity:1}}

transition={{delay:.6}}

className="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white shadow-2xl"
>

<h2 className="mb-8 text-3xl font-bold">
Quick Actions
</h2>

<div className="grid gap-6 md:grid-cols-3">

<Link href="/dashboard/tutor/profile">

<div className="cursor-pointer rounded-2xl bg-white/10 p-6 backdrop-blur transition hover:scale-105">

<User size={38}/>

<h3 className="mt-5 text-xl font-bold">
Update Profile
</h3>

<p className="mt-2 text-white/80">
Edit tutor information.
</p>

</div>

</Link>

<Link href="/dashboard/tutor/availability">

<div className="cursor-pointer rounded-2xl bg-white/10 p-6 backdrop-blur transition hover:scale-105">

<Clock size={38}/>

<h3 className="mt-5 text-xl font-bold">
Availability
</h3>

<p className="mt-2 text-white/80">
Manage available schedule.
</p>

</div>

</Link>

<Link href="/dashboard/tutor/sessions">

<div className="cursor-pointer rounded-2xl bg-white/10 p-6 backdrop-blur transition hover:scale-105">

<Calendar size={38}/>

<h3 className="mt-5 text-xl font-bold">
Sessions
</h3>

<p className="mt-2 text-white/80">
View upcoming classes.
</p>

</div>

</Link>

</div>

</motion.section>

<div className="py-10 text-center text-sm text-slate-500">
© 2026 Tutor Management System
</div>
    </div>
  );
}