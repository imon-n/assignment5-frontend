
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Tutor = {
  id: string;
  image?: string;
  hourlyRate: number;
  user?: { name: string };
  category?: { name: string };
};

type Review = {
  id: string;
  comment: string;
  rating: number;
  user?: {
    name: string;
    image?: string;
  };
};

type Availability = {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
};

export default function TutorClient({
  tutor,
  id,
}: {
  tutor: Tutor;
  id: string;
}) {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  const [showReview, setShowReview] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [availability, setAvailability] = useState<Availability[]>([]);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const [bookingForm, setBookingForm] = useState({
    tutorId: id,
    day: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const reviewRes = await fetch(`${API}/api/reviews/${id}`, {
          credentials: "include",
        });

        const reviewData = await reviewRes.json();
        setReviews(reviewData.data || []);

        const availRes = await fetch(
          `${API}/api/tutor/${id}/availability`,
          {
            credentials: "include",
          }
        );

        const availData = await availRes.json();
        setAvailability(availData.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, [id]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API}/api/reviews/${id}`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setReviews(data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const res = await fetch(`${API}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          tutorId: id,
          comment,
          rating,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      await fetchReviews();

      setComment("");
      setRating(5);
      setShowReview(false);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  const handleBookingSubmit = async () => {
    try {
      const res = await fetch(`${API}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bookingForm),
      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message || "Booking Failed");

      const booking = data.data;

      router.push(
        `/checkout?bookingId=${booking.id}&amount=${tutor.hourlyRate}`
      );
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 transition-colors duration-300 mt-20 py-8 px-4 sm:px-6">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6 animate-fadeUp">

          {/* Header */}
          <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-xl p-6">

            <div className="flex flex-col sm:flex-row gap-6 items-center">

              <img
                src={tutor.image}
                alt={tutor.user?.name}
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl object-cover shadow-xl transition duration-500 hover:scale-105"
              />

              <div className="flex-1">

                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                  {tutor.user?.name}
                </h1>

                <p className="mt-2 text-lg text-emerald-600 font-semibold">
                  {tutor.category?.name}
                </p>

                <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
                  ${tutor.hourlyRate}
                  <span className="text-base text-gray-500">
                    /hr
                  </span>
                </p>

                <h3 className="mt-6 mb-2 font-semibold text-gray-900 dark:text-white">
                  Available Slots
                </h3>

                <div className="flex flex-wrap gap-2">

                  {availability.length === 0 ? (
                    <span className="text-gray-400">
                      No availability
                    </span>
                  ) : (
                    availability.map((slot) => (
                      <span
                        key={slot.id}
                        className="rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-3 py-1 text-sm text-emerald-700 dark:text-emerald-300"
                      >
                        {slot.day} • {slot.startTime} - {slot.endTime}
                      </span>
                    ))
                  )}

                </div>

              </div>

            </div>

          </div>

          {/* About */}

          <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-xl p-6">

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h2>

            <p className="leading-8 text-gray-600 dark:text-zinc-400">
              Passionate educator dedicated to helping students
              achieve their learning goals through personalized
              mentoring and practical guidance.
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="space-y-5 animate-fadeUp">

          <button
            onClick={() => setShowReview(true)}
            className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white py-3 font-semibold transition-all duration-300 hover:scale-[1.02]"
          >
            Add Feedback
          </button>

          <button
            onClick={() => {
              if (availability.length === 0) {
                alert("Tutor has no available slots");
                return;
              }

              setShowBooking(true);
            }}
            className="w-full rounded-xl border-2 border-emerald-600 text-emerald-600 dark:text-emerald-400 py-3 font-semibold transition-all duration-300 hover:bg-emerald-50 dark:hover:bg-zinc-800"
          >
            Book Appointment
          </button>

          <div className="space-y-4">

            {reviews.length === 0 ? (
              <p className="text-gray-500 dark:text-zinc-400">
                No Reviews Yet
              </p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg p-4 flex gap-4 transition duration-300 hover:-translate-y-1"
                >
                  <img
                    src={review.user?.image || "/avatar.png"}
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <div>

                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {review.user?.name}
                    </h3>

                    <p className="text-yellow-500">
                      {"⭐".repeat(review.rating)}
                    </p>

                    <p className="mt-2 text-gray-600 dark:text-zinc-400">
                      {review.comment}
                    </p>

                  </div>

                </div>
              ))
            )}

          </div>

        </div>

      </div>
            {/* ================= Review Modal ================= */}
      {showReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl dark:bg-zinc-900 animate-in fade-in zoom-in-95 duration-300">

            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Leave Your Feedback
            </h2>

            <textarea
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="mb-4 w-full rounded-xl border border-gray-300 bg-white p-4 outline-none transition focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />

            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="mb-6 w-full rounded-xl border border-gray-300 bg-white p-3 outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? "s" : ""}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowReview(false)}
                className="rounded-xl border px-5 py-2 font-medium dark:border-zinc-700 dark:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleReviewSubmit}
                className="rounded-xl bg-emerald-600 px-6 py-2 font-semibold text-white transition hover:bg-emerald-700"
              >
                Submit
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= Booking Modal ================= */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-zinc-900 animate-in fade-in zoom-in-95 duration-300">

            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Book Appointment
            </h2>

            <div className="space-y-4">

              <select
                value={bookingForm.day}
                onChange={(e) =>
                  setBookingForm({
                    ...bookingForm,
                    day: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-gray-300 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              >
                <option value="">Select Day</option>

                {availability.map((slot) => (
                  <option key={slot.id} value={slot.day}>
                    {slot.day}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={bookingForm.date}
                onChange={(e) =>
                  setBookingForm({
                    ...bookingForm,
                    date: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-gray-300 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />

              <input
                type="time"
                value={bookingForm.time}
                onChange={(e) =>
                  setBookingForm({
                    ...bookingForm,
                    time: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-gray-300 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />

            </div>

            <div className="mt-8 flex justify-end gap-3">

              <button
                onClick={() => setShowBooking(false)}
                className="rounded-xl border px-5 py-2 font-medium dark:border-zinc-700 dark:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleBookingSubmit}
                className="rounded-xl bg-emerald-600 px-6 py-2 font-semibold text-white transition hover:bg-emerald-700"
              >
                Continue Payment
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}