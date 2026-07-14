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

        <Link href="/dashboard/tutors/profile">
          <button className="rounded-xl bg-white px-6 py-3 font-semibold text-emerald-700 transition hover:scale-105">
            Edit Profile
          </button>
        </Link>

        <Link href="/dashboard/tutors/sessions">
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
          width={140}
          height={140}
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

{/* ======================================================
                RECENT SESSIONS
====================================================== */}

<motion.section
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900"
>
  {/* Header */}

  <div className="mb-8 flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
        Recent Sessions
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Your latest tutoring sessions
      </p>
    </div>

    <Link href="/dashboard/tutors/sessions">
      <button className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg">
        View All
      </button>
    </Link>
  </div>

  {/* Body */}

  <div className="space-y-5">
    {sessions.length > 0 ? (
      sessions.slice(0, 3).map((session: any) => (
        <motion.div
          key={session.id}
          whileHover={{
            scale: 1.02,
            y: -2,
          }}
          transition={{ duration: 0.2 }}
          className="group flex flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:border-emerald-500 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 md:flex-row md:items-center md:justify-between"
        >
          {/* Left */}

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-xl font-bold text-white">
              {session.student?.name?.charAt(0)}
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                {session.student?.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                📅 {session.date}
              </p>

              <p className="text-sm text-slate-500">
                🕒 {session.time}
              </p>
            </div>
          </div>

          {/* Right */}

          <div className="flex flex-col items-end gap-3">
            <span
              className={`rounded-full px-4 py-2 text-xs font-bold tracking-wide ${
                session.status === "COMPLETED"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : session.status === "CONFIRMED"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
              }`}
            >
              {session.status}
            </span>

            <ArrowRight
              size={20}
              className="text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-emerald-600"
            />
          </div>
        </motion.div>
      ))
    ) : (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 py-16 dark:border-slate-700">
        <Calendar
          size={55}
          className="mb-4 text-slate-400"
        />

        <h3 className="text-lg font-semibold text-slate-700 dark:text-white">
          No Sessions Yet
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Your upcoming tutoring sessions will appear here.
        </p>
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

<Link href="/dashboard/tutors/profile">

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

<Link href="/dashboard/tutors/availability">

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

<Link href="/dashboard/tutors/sessions">

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