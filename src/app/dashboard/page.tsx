
"use client";

import {
  Calendar,
  BookOpen,
  Star,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Bookings",
    value: "10",
    icon: BookOpen,
    color: "bg-emerald-500",
  },
  {
    title: "Upcoming Sessions",
    value: "3",
    icon: Calendar,
    color: "bg-blue-500",
  },
  {
    title: "Reviews",
    value: "5",
    icon: Star,
    color: "bg-yellow-500",
  },
  {
    title: "Payments",
    value: "$240",
    icon: CreditCard,
    color: "bg-purple-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#005C53] to-[#169B87] p-8 text-white">

        <div className="relative z-10">

          <p className="text-white/80 text-sm">
            Welcome Back 👋
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Dashboard Overview
          </h1>

          <p className="mt-3 max-w-xl text-white/90">
            Track your tutoring activities, bookings,
            reviews and payments in one place.
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
                  <Icon className="text-white" size={30} />
                </div>

              </div>

              <div className="mt-6 flex items-center gap-2 text-emerald-600 font-medium">
                <ArrowUpRight size={18} />
                +12% this month
              </div>

            </div>
          );
        })}

      </section>

      {/* Bottom Section */}
      <section className="grid gap-6 lg:grid-cols-3">

        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-lg">

          <h2 className="text-2xl font-bold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-5">

            {[
              "Booked JavaScript mentoring session",
              "Completed React Course",
              "Received 5 Star Review",
              "Payment Successful",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-2xl border border-gray-200 dark:border-slate-700 p-4 hover:bg-emerald-50 dark:hover:bg-slate-800 transition"
              >
                <span>{item}</span>

                <span className="text-sm text-gray-500">
                  Today
                </span>
              </div>
            ))}

          </div>

        </div>

        {/* Quick Actions */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-lg">

          <h2 className="text-2xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="space-y-4">

            <button className="w-full rounded-xl bg-[#005C53] py-3 text-white hover:bg-[#169B87] transition">
              Book New Session
            </button>

            <button className="w-full rounded-xl border border-[#005C53] py-3 text-[#005C53] hover:bg-[#005C53] hover:text-white transition">
              View Bookings
            </button>

            <button className="w-full rounded-xl border border-[#169B87] py-3 text-[#169B87] hover:bg-[#169B87] hover:text-white transition">
              Edit Profile
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}