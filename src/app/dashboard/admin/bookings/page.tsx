"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Search,
  Users,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

const ITEMS_PER_PAGE = 8;

type Booking = {
  id: string;
  date: string;
  time: string;
  status: string;

  student: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };

  tutor: {
    id: string;
    image?: string;

    user: {
      name: string;
      image?: string;
    };

    category: {
      name: string;
    };
  };
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [currentPage, setCurrentPage] =
    useState(1);

  useEffect(() => {
    fetch(`${API}/api/admin/bookings`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  // Statistics

  const totalBookings = bookings.length;

  const confirmedBookings = bookings.filter(
    (b) => b.status === "CONFIRMED"
  ).length;

  const pendingBookings = bookings.filter(
    (b) => b.status === "PENDING"
  ).length;

  const cancelledBookings = bookings.filter(
    (b) => b.status === "CANCELLED"
  ).length;

  // Search + Filter

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchSearch =
        booking.student.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        booking.tutor.user.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "ALL"
          ? true
          : booking.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [bookings, search, statusFilter]);

  const totalPages = Math.ceil(
    filteredBookings.length / ITEMS_PER_PAGE
  );

  const currentBookings = useMemo(() => {
    const start =
      (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredBookings.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [filteredBookings, currentPage]);

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

            <CalendarDays size={32} />

          </div>

          <div>

            <h1 className="text-4xl font-bold">
              All Bookings
            </h1>

            <p className="mt-2 text-white/90">
              Manage and monitor all tutoring bookings.
            </p>

          </div>

        </div>

      </div>

      {/* Stats */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 dark:bg-slate-900">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">
                Total
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                {totalBookings}
              </h2>

            </div>

            <Users className="text-[#169B87]" size={36} />

          </div>

        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 dark:bg-slate-900">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">
                Confirmed
              </p>

              <h2 className="mt-2 text-4xl font-bold text-green-600">
                {confirmedBookings}
              </h2>

            </div>

            <CheckCircle2
              className="text-green-600"
              size={36}
            />

          </div>

        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 dark:bg-slate-900">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">
                Pending
              </p>

              <h2 className="mt-2 text-4xl font-bold text-yellow-600">
                {pendingBookings}
              </h2>

            </div>

            <Clock3
              className="text-yellow-600"
              size={36}
            />

          </div>

        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 dark:bg-slate-900">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">
                Cancelled
              </p>

              <h2 className="mt-2 text-4xl font-bold text-red-600">
                {cancelledBookings}
              </h2>

            </div>

            <XCircle
              className="text-red-600"
              size={36}
            />

          </div>

        </div>

      </div>

      {/* Search & Filter */}

      <div className="flex flex-col gap-4 md:flex-row">

        <div className="relative flex-1">

          <Search
            className="absolute left-4 top-3.5 text-slate-400"
            size={18}
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search student or tutor..."
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-[#169B87] dark:border-slate-700 dark:bg-slate-900"
          />

        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="rounded-xl border border-slate-300 bg-white px-5 py-3 outline-none dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="ALL">All Status</option>
          <option value="CONFIRMED">
            Confirmed
          </option>
          <option value="PENDING">
            Pending
          </option>
          <option value="CANCELLED">
            Cancelled
          </option>
        </select>

      </div>

      {/* PART 2 HERE */}      {/* Desktop Table */}

      <div className="hidden overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 lg:block">

        <table className="min-w-full">

          <thead className="bg-slate-100 dark:bg-slate-800">

            <tr>

              <th className="px-6 py-4 text-left">#</th>

              <th className="px-6 py-4 text-left">
                Student
              </th>

              <th className="px-6 py-4 text-left">
                Tutor
              </th>

              <th className="px-6 py-4 text-left">
                Subject
              </th>

              <th className="px-6 py-4 text-left">
                Date
              </th>

              <th className="px-6 py-4 text-left">
                Time
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {currentBookings.map((booking, index) => (

              <tr
                key={booking.id}
                className="
                  border-t
                  transition-all
                  duration-300
                  hover:bg-emerald-50
                  dark:border-slate-800
                  dark:hover:bg-slate-800
                "
              >

                <td className="px-6 py-5 font-semibold">

                  {(currentPage - 1) *
                    ITEMS_PER_PAGE +
                    index +
                    1}

                </td>

                {/* Student */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <img
                      src={
                        booking.student.image ||
                        "/avatar.png"
                      }
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-emerald-500/20"
                    />

                    <div>

                      <p className="font-semibold dark:text-white">
                        {booking.student.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {booking.student.email}
                      </p>

                    </div>

                  </div>

                </td>

                {/* Tutor */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <img
                      src={
                        booking.tutor.user.image ||
                        booking.tutor.image ||
                        "/avatar.png"
                      }
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-emerald-500/20"
                    />

                    <span className="font-semibold dark:text-white">

                      {booking.tutor.user.name}

                    </span>

                  </div>

                </td>

                {/* Subject */}

                <td className="px-6 py-5">

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">

                    {booking.tutor.category.name}

                  </span>

                </td>

                {/* Date */}

                <td className="px-6 py-5">

                  {new Date(
                    booking.date
                  ).toLocaleDateString()}

                </td>

                {/* Time */}

                <td className="px-6 py-5">

                  {booking.time}

                </td>

                {/* Status */}

                <td className="px-6 py-5">

                  <span
                    className={`rounded-full px-4 py-1 text-sm font-semibold ${
                      booking.status === "CONFIRMED"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : booking.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {booking.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}

      <div className="space-y-5 lg:hidden">

        {currentBookings.map((booking) => (

          <div
            key={booking.id}
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
              dark:border-slate-800
              dark:bg-slate-900
            "
          >

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <img
                  src={
                    booking.student.image ||
                    "/avatar.png"
                  }
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>

                  <h3 className="font-bold dark:text-white">

                    {booking.student.name}

                  </h3>

                  <p className="text-sm text-slate-500">

                    {booking.student.email}

                  </p>

                </div>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  booking.status === "CONFIRMED"
                    ? "bg-green-100 text-green-700"
                    : booking.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {booking.status}
              </span>

            </div>

            <div className="mt-5 space-y-2 text-sm">

              <div className="flex justify-between">

                <span className="text-slate-500">
                  Tutor
                </span>

                <span className="font-medium dark:text-white">
                  {booking.tutor.user.name}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">
                  Subject
                </span>

                <span className="font-medium dark:text-white">
                  {booking.tutor.category.name}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">
                  Date
                </span>

                <span className="dark:text-white">
                  {new Date(
                    booking.date
                  ).toLocaleDateString()}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">
                  Time
                </span>

                <span className="dark:text-white">
                  {booking.time}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

         {/* Pagination */}

      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1}
            className="
              rounded-xl
              border
              border-slate-300
              px-4
              py-2
              transition-all
              duration-300
              hover:bg-[#169B87]
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:border-slate-700
              dark:hover:bg-[#169B87]
            "
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentPage(index + 1)
                }
                className={`h-11 w-11 rounded-xl font-semibold transition-all duration-300 ${
                  currentPage === index + 1
                    ? "bg-[#169B87] text-white shadow-lg"
                    : "border border-slate-300 hover:bg-[#169B87] hover:text-white dark:border-slate-700"
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
            className="
              rounded-xl
              border
              border-slate-300
              px-4
              py-2
              transition-all
              duration-300
              hover:bg-[#169B87]
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:border-slate-700
              dark:hover:bg-[#169B87]
            "
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
}