"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AvailabilityPage() {

  const [form, setForm] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ DAYS
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // ✅ SAVE
  const handleSubmit = async () => {

    if (
      !form.day ||
      !form.startTime ||
      !form.endTime
    ) {
      toast.error("All fields are required");
      return;
    }

    try {

      setLoading(true);

      const res = await fetch(
        `${API}/api/tutor/availability`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (data.success) {

        toast.success("Availability added");

        setForm({
          day: "",
          startTime: "",
          endTime: "",
        });

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      toast.error("Something went wrong");

    } finally {

      setLoading(false);

    }
  };


   return (
  <div className="mx-auto max-w-3xl space-y-8 animate-in fade-in duration-500">

    {/* Header */}
    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#005C53] to-[#169B87] p-8 text-white shadow-xl">

      <div className="flex items-center gap-5">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
          📅
        </div>

        <div>
          <h1 className="text-4xl font-bold">
            Set Availability
          </h1>

          <p className="mt-2 text-white/90">
            Let students know when you are available for tutoring sessions.
          </p>
        </div>

      </div>

    </div>

    {/* Form Card */}
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
        dark:border-slate-800
        dark:bg-slate-900
      "
    >

      <div className="space-y-6">

        {/* Day */}
        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Select Day
          </label>

          <select
            value={form.day}
            onChange={(e) =>
              setForm({
                ...form,
                day: e.target.value,
              })
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              outline-none
              transition
              focus:border-[#005C53]
              focus:ring-2
              focus:ring-[#005C53]/20
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
            "
          >
            <option value="">
              Choose Day
            </option>

            {days.map((day) => (
              <option
                key={day}
                value={day}
              >
                {day}
              </option>
            ))}
          </select>

        </div>

        {/* Time Fields */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Start Time */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Start Time
            </label>

            <input
              type="time"
              value={form.startTime}
              onChange={(e) =>
                setForm({
                  ...form,
                  startTime: e.target.value,
                })
              }
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
                outline-none
                transition
                focus:border-[#005C53]
                focus:ring-2
                focus:ring-[#005C53]/20
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            />

          </div>

          {/* End Time */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              End Time
            </label>

            <input
              type="time"
              value={form.endTime}
              onChange={(e) =>
                setForm({
                  ...form,
                  endTime: e.target.value,
                })
              }
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
                outline-none
                transition
                focus:border-[#005C53]
                focus:ring-2
                focus:ring-[#005C53]/20
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            />

          </div>

        </div>

        {/* Info Box */}
        <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">

          <p>
            • Choose the day you are available.
          </p>

          <p>
            • Students can only book within your selected time.
          </p>

          <p>
            • You can update your availability anytime.
          </p>

        </div>

        {/* Button */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="
            h-12
            w-full
            rounded-xl
            bg-[#005C53]
            text-base
            font-semibold
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:bg-[#169B87]
          "
        >
          {loading ? "Saving..." : "Save Availability"}
        </Button>

      </div>

    </div>

  </div>
);

}