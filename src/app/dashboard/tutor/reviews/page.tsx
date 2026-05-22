"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

type Review = {
  id: string;
  rating: number;
  comment: string;
  student: {
    name: string;
  };
};

export default function TutorReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
 console.log(reviews)
  useEffect(() => {
    fetch(`${API}/api/reviews`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setReviews(data.data || []));
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Ratings & Reviews
      </h1>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-white p-4 rounded-xl shadow"
          >

            <div className="flex justify-between">
              <p className="font-semibold">
                {r.user?.name}
              </p>

              <p className="text-yellow-500 font-bold">
                ⭐ {r.rating}/5
              </p>
            </div>

            <p className="text-gray-600 mt-2">
              {r.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}