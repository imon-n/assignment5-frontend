"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Tutor } from "@/types/tutor";
import {
  Search,
  Filter,
  Star,
  DollarSign,
} from "lucide-react";

export default function TutorsPage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchTutors = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams();

      if (search) query.append("search", search);
      if (category) query.append("category", category);
      if (minRating) query.append("minRating", minRating);
      if (maxPrice) query.append("maxPrice", maxPrice);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tutors?${query.toString()}`
      );

      const data = await res.json();

      setTutors(data.data || []);
      setPage(1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const totalPages = Math.ceil(tutors.length / itemsPerPage);

  const start = (page - 1) * itemsPerPage;

  const paginatedData = tutors.slice(
    start,
    start + itemsPerPage
  );

  if (loading) {
    return (
      <div className="mt-32 flex justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#005C53] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-zinc-950">

      <div className="mx-auto mt-24 max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="flex flex-col gap-8 lg:flex-row">

          {/* ================= FILTER ================= */}

          <aside
            className="
              animate-[fadeIn_.6s_ease]
              w-full
              lg:w-[320px]
            "
          >
            <div
              className="
                sticky
                top-28
                rounded-3xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-lg
                transition-all
                duration-300
                dark:border-zinc-800
                dark:bg-zinc-900
              "
            >
              <div className="mb-6 flex items-center gap-3">

                <div className="rounded-xl bg-[#005C53]/10 p-3">
                  <Filter className="h-5 w-5 text-[#005C53]" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Search Filters
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    Find your perfect tutor
                  </p>
                </div>

              </div>

              {/* Search */}

              <div className="relative mb-4">

                <Search
                  className="
                    absolute
                    left-4
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search tutor..."
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    py-3
                    pl-11
                    pr-4
                    text-sm
                    outline-none
                    transition
                    focus:border-[#005C53]
                    dark:border-zinc-700
                    dark:bg-zinc-800
                    dark:text-white
                  "
                />

              </div>

              {/* Category */}

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="
                  mb-4
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  p-3
                  text-sm
                  outline-none
                  transition
                  focus:border-[#005C53]
                  dark:border-zinc-700
                  dark:bg-zinc-800
                  dark:text-white
                "
              >
                <option value="">
                  All Categories
                </option>

                <option value="Web Development">
                  Web Development
                </option>

                <option value="Full Stack">
                  Full Stack
                </option>

                <option value="UI/UX Design">
                  UI/UX Design
                </option>

              </select>

              {/* Rating */}

              <div className="relative mb-4">

                <Star
                  className="
                    absolute
                    left-4
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-yellow-500
                  "
                />

                <select
                  value={minRating}
                  onChange={(e) =>
                    setMinRating(e.target.value)
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    py-3
                    pl-11
                    pr-4
                    text-sm
                    outline-none
                    transition
                    focus:border-[#005C53]
                    dark:border-zinc-700
                    dark:bg-zinc-800
                    dark:text-white
                  "
                >
                  <option value="">
                    Any Rating
                  </option>

                  <option value="4">
                    4★ & Above
                  </option>

                  <option value="3">
                    3★ & Above
                  </option>

                </select>

              </div>

              {/* Price */}

              <div className="relative mb-6">

                <DollarSign
                  className="
                    absolute
                    left-4
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-green-600
                  "
                />

                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(e.target.value)
                  }
                  placeholder="Maximum Price"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    py-3
                    pl-11
                    pr-4
                    text-sm
                    outline-none
                    transition
                    focus:border-[#005C53]
                    dark:border-zinc-700
                    dark:bg-zinc-800
                    dark:text-white
                  "
                />

              </div>

              <button
                onClick={fetchTutors}
                className="
                  w-full
                  rounded-xl
                  bg-[#005C53]
                  py-3
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:bg-[#004840]
                "
              >
                Search Tutors
              </button>
            </div>
          </aside>

          {/* ================= RIGHT CONTENT STARTS HERE ================= */}

          <div className="flex-1 space-y-6 animate-[fadeIn_.8s_ease]">
                        {paginatedData.map((tutor, index) => (
              <div
                key={tutor.id}
                className="
                  group
                  animate-[fadeIn_.6s_ease]
                  rounded-3xl
                  border
                  border-gray-200
                  bg-white
                  p-5
                  shadow-md
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:shadow-2xl
                  dark:border-zinc-800
                  dark:bg-zinc-900
                "
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div className="flex flex-col gap-6 md:flex-row">

                  {/* Image */}

                  <div className="overflow-hidden rounded-2xl">

                    <img
                      src={tutor.image}
                      alt={tutor.user.name}
                      className="
                        h-44
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-110
                        md:h-40
                        md:w-40
                      "
                    />

                  </div>

                  {/* Info */}

                  <div className="flex flex-1 flex-col justify-between">

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {tutor.user.name}
                        </h2>

                        <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                          Verified
                        </span>

                      </div>

                      <p className="mt-2 text-[#005C53] dark:text-emerald-400">
                        {tutor.category.name}
                      </p>

                      <div className="mt-3 flex items-center gap-2">

                        <span className="text-yellow-500">
                          ⭐⭐⭐⭐⭐
                        </span>

                        <span className="text-sm text-gray-500 dark:text-zinc-400">
                          {tutor.rating} Rating
                        </span>

                      </div>

                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-gray-600 dark:text-zinc-400">
                        {tutor.bio}
                      </p>

                    </div>

                    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      <div>

                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          ${tutor.hourlyRate}

                          <span className="text-base font-medium text-gray-500">
                            /hr
                          </span>

                        </p>

                      </div>

                      <Link
                        href={`/tutors/${tutor.id}`}
                        className="
                          inline-flex
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#005C53]
                          px-6
                          py-3
                          font-semibold
                          text-white
                          transition-all
                          duration-300
                          hover:scale-105
                          hover:bg-[#004840]
                        "
                      >
                        View Profile
                      </Link>

                    </div>

                  </div>

                </div>

              </div>
            ))}

            {/* Pagination */}

            <div className="flex flex-wrap items-center justify-center gap-3 pt-6">

              <button
                onClick={() =>
                  setPage((p) => Math.max(1, p - 1))
                }
                className="
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-5
                  py-2
                  transition
                  hover:bg-gray-100
                  dark:border-zinc-700
                  dark:bg-zinc-900
                  dark:text-white
                  dark:hover:bg-zinc-800
                "
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`
                    h-11
                    w-11
                    rounded-xl
                    transition-all
                    duration-300
                    ${
                      page === i + 1
                        ? "bg-[#005C53] text-white shadow-lg"
                        : "border border-gray-300 bg-white hover:bg-gray-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                    }
                  `}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setPage((p) =>
                    Math.min(totalPages, p + 1)
                  )
                }
                className="
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-5
                  py-2
                  transition
                  hover:bg-gray-100
                  dark:border-zinc-700
                  dark:bg-zinc-900
                  dark:text-white
                  dark:hover:bg-zinc-800
                "
              >
                Next
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}