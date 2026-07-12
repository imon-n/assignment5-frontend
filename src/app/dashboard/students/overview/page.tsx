"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  BookOpen,
  CreditCard,
  XCircle,
  ArrowUpRight,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Profile {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
}

interface DashboardStats {
  totalBookings: number;
  upcomingBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalPaid: number;
  profileCompletion: number;
}

interface Tutor {
  id: string;
  hourlyRate: number;

  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };

  category: {
    id: string;
    name: string;
  };
}

interface Booking {
  id: string;
  studentId: string;
  tutorId: string;
  date: string;
  time: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;

  tutor: Tutor;
}

interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
  method: string;
  description: string | null;
  createdAt: string;
}

interface WeeklyProgress {
  day: string;
  progress: number;
}

interface DashboardData {
  profile: Profile;

  stats: DashboardStats;

  nextSession: Booking | null;

  recentBookings: Booking[];

  recentPayments: Payment[];

  weeklyProgress: WeeklyProgress[];
}

export default function DashboardPage() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/overview`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success) {
          setDashboard(data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadDashboard();
  }, []);

  if (!dashboard) {
    return (
      <div className="p-10 text-center text-lg">
        Loading Dashboard...
      </div>
    );
  }

  const stats = [
    {
      title: "Total Bookings",
      value: dashboard.stats.totalBookings,
      icon: BookOpen,
      color: "bg-emerald-500",
    },
    {
      title: "Upcoming Sessions",
      value: dashboard.stats.upcomingBookings,
      icon: Calendar,
      color: "bg-blue-500",
    },
    {
      title: "Cancelled",
      value: dashboard.stats.cancelledBookings,
      icon: XCircle,
      color: "bg-red-500",
    },
    {
      title: "Total Paid",
      value: `$${dashboard.stats.totalPaid}`,
      icon: CreditCard,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#005C53] to-[#169B87] p-8 text-white">
        <div className="relative z-10">
          <p className="text-white/80 text-sm">
            Welcome Back 👋
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            {dashboard.profile.name}
          </h1>

          <p className="mt-3 max-w-xl text-white/90">
            Track your tutoring activities, bookings and
            payments in one place.
          </p>
        </div>

        <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
      </section>

      {/* Statistics */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group rounded-3xl bg-white dark:bg-slate-900 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-4xl font-bold">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`${item.color} h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <Icon
                    className="text-white"
                    size={30}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-emerald-600 font-medium">
                <ArrowUpRight size={18} />
                Dashboard
              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            Recent Bookings
          </h2>

          <div className="space-y-4">
            {dashboard.recentBookings.length === 0 ? (
              <p className="text-gray-500">
                No recent bookings.
              </p>
            ) : (
              dashboard.recentBookings.map((booking: Booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between rounded-2xl border border-gray-200 dark:border-slate-700 p-4"
                >
                  <div>
                    <h3 className="font-semibold">
                      {booking.tutor.user.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {booking.tutor.category.name}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      {booking.date}
                    </p>

                    <p className="text-sm text-gray-500">
                      {booking.time}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Next Session */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            Next Session
          </h2>

          {dashboard.nextSession ? (
            <div className="space-y-4">
              <div>
                <p className="text-gray-500">
                  Tutor
                </p>

                <h3 className="text-xl font-bold">
                  {
                    dashboard.nextSession.tutor.user
                      .name
                  }
                </h3>
              </div>

              <div>
                <p className="text-gray-500">
                  Subject
                </p>

                <h3 className="font-semibold">
                  {
                    dashboard.nextSession.tutor
                      .category.name
                  }
                </h3>
              </div>

              <div>
                <p className="text-gray-500">
                  Date
                </p>

                <h3>
                  {dashboard.nextSession.date}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">
                  Time
                </p>

                <h3>
                  {dashboard.nextSession.time}
                </h3>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              No upcoming session.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}