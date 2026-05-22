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
    <div className="max-w-2xl">

      <h1 className="text-3xl font-bold mb-6">
        Set Availability
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow space-y-6">

        {/* DAY */}
        <div>

          <label className="block mb-2 font-medium">
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
            className="w-full border rounded-lg px-4 py-3"
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

        {/* START TIME */}
        <div>

          <label className="block mb-2 font-medium">
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
            className="w-full border rounded-lg px-4 py-3"
          />

          <p className="text-sm text-gray-500 mt-1">
            Example: 10:00 AM
          </p>

        </div>

        {/* END TIME */}
        <div>

          <label className="block mb-2 font-medium">
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
            className="w-full border rounded-lg px-4 py-3"
          />

          <p className="text-sm text-gray-500 mt-1">
            Example: 02:00 PM
          </p>

        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full"
        >
          {loading
            ? "Saving..."
            : "Save Availability"}
        </Button>

      </div>
    </div>
  );
}