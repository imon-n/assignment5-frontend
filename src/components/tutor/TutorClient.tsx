"use client";
type Tutor = {
  id: string;
  image?: string;
  hourlyRate: number;
  user?: {
    name: string;
  };
  category?: {
    name: string;
  };
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
import { m } from "framer-motion";
// import router from "next/dist/shared/lib/router/router";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function TutorClient({ tutor, id }: 
  { tutor: Tutor;
  id: string;
}) {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [showReview, setShowReview] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const [reviews, setReviews] = useState<Review[]>([]);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const router = useRouter();
  const [bookingForm, setBookingForm] = useState({
    tutorId: id,
    day: "",
    date: "",
    time: "",
  });

  // ================= GET REVIEWS (LOAD ON PAGE) =================
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

  // 🔥 IMPORTANT: load existing reviews when page opens
  // useEffect(() => {
  //   // fetchReviews();

    useEffect(() => {
  const loadReviews = async () => {
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

  loadReviews();
}, [id]);
  

  // ================= REVIEW =================
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

      if (!res.ok) {
        throw new Error(data.message);
      }

      // 🔥 refresh from backend (so old + new all come)
      await fetchReviews();

      setComment("");
      setRating(5);
      setShowReview(false);
    } catch (err: unknown) {
  if (err instanceof Error) {
    alert(err.message);
  } else {
    alert("Something went wrong");
  }
}
  };

  // ================= BOOKING =================
//   const handleBookingSubmit = async () => {
//     try {
//       const res = await fetch(`${API}/api/bookings`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(bookingForm),
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message);

//       alert("Booking Successful");

//       setShowBooking(false);

//       setBookingForm({
//         tutorId: id,
//         day: "",
//         date: "",
//         time: "",
//       });
//     } catch (err: unknown) {
//   if (err instanceof Error) {
//     alert(err.message);
//   } else {
//     alert("Something went wrong");
//   }
// }
//   };
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

    if (!res.ok) {
      throw new Error(data.message || "Booking failed");
    }

    const booking = data.data;

    if (!booking?.id) {
      throw new Error("Booking ID not found");
    }

    setShowBooking(false);

    router.push(
      `/checkout?bookingId=${booking.id}&amount=${tutor.hourlyRate}`
    );
  } catch (err) {
    if (err instanceof Error) {
      alert(err.message);
    } else {
      alert("Something went wrong");
    }
  }
};

  return (
    <div className="bg-[#f5f5f5] min-h-screen p-6 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* HEADER */}
          <div className="bg-white border rounded-md p-6 flex gap-6 items-center">
            <img
              src={tutor?.image}
              className="w-40 h-40 object-cover rounded-lg"
            />

            <div>
              <h1 className="text-4xl font-bold">{tutor?.user?.name}</h1>

              <p className="text-gray-500">{tutor?.category?.name}</p>

              <p className="text-green-700 font-semibold mt-2">
                ${tutor?.hourlyRate}/hr
              </p>
            </div>
          </div>

          {/* ABOUT */}
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-2xl font-bold mb-3">About Me</h2>

            <p className="text-gray-600">
              Passionate educator dedicated to making learning simple, clear,
              and engaging for every student. Focuses on building strong
              conceptual understanding rather than memorization.
            </p>
          </div>

          {/* REVIEWS (NOW ALWAYS SHOWS FROM DB) */}
        
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <button
            onClick={() => setShowReview(true)}
            className="w-full bg-green-700 text-white py-3 rounded-md"
          >
            Add Feedback
          </button>

          <button
            onClick={() => setShowBooking(true)}
            className="w-full border border-green-700 text-green-700 py-3 rounded-md"
          >
            Book Appointment
          </button>
            <div className="space-y-3">
            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet</p>
            ) : (
              reviews.map((r, i) => (
                <div
                  key={i}
                  className="bg-white border rounded-md p-4 flex gap-3"
                >
                  <img
                    src={r.user?.image || "/avatar.png"}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-semibold">{r.user?.name}</p>

                    <p className="text-yellow-500 text-sm">
                      {"⭐".repeat(r.rating)}
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      {r.comment}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

        {/* ================= REVIEW MODAL ================= */}
      {showReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-md w-[90%] max-w-md space-y-3">

            <select
              className="w-full border p-2 rounded"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value={5}>⭐⭐⭐⭐⭐</option>
              <option value={4}>⭐⭐⭐⭐</option>
              <option value={3}>⭐⭐⭐</option>
              <option value={2}>⭐⭐</option>
              <option value={1}>⭐</option>
            </select>

            <textarea
              className="w-full border p-2 rounded"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write review"
            />

            <button
              onClick={handleReviewSubmit}
              className="w-full bg-green-700 text-white py-2 rounded"
            >
              Submit Review
            </button>

          </div>
        </div>
      )}

      {/* ================= BOOKING MODAL ================= */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-md w-[90%] max-w-md space-y-4">

            <select
              className="w-full border p-2 rounded"
              value={bookingForm.day}
              onChange={(e) =>
                setBookingForm({ ...bookingForm, day: e.target.value })
              }
            >
              <option value="">Select Day</option>
              <option>Sunday</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
            </select>

            <input
              type="date"
              className="w-full border p-2 rounded"
              value={bookingForm.date}
              onChange={(e) =>
                setBookingForm({ ...bookingForm, date: e.target.value })
              }
            />

            <select
              className="w-full border p-2 rounded"
              value={bookingForm.time}
              onChange={(e) =>
                setBookingForm({ ...bookingForm, time: e.target.value })
              }
            >
              <option value="">Select Time</option>
              <option>09:00 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
              <option>01:00 PM</option>
              <option>02:00 PM</option>
              <option>03:00 PM</option>
              <option>04:00 PM</option>
              <option>05:00 PM</option>
            </select>

            <button
              onClick={handleBookingSubmit}
              className="w-full bg-green-700 text-white py-2 rounded"
            >
              Confirm Booking
            </button>

          </div>
        </div>
      )}
  </div>
        </div>
      </div>

   
  );
}