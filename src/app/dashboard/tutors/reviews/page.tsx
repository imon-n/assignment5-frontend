"use client";

import { useEffect, useState } from "react";
import { Star, MessageCircle } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

type Review = {
  id: string;
  rating: number;
  comment: string;
  user: {
    name: string;
    image?: string;
  };
};

export default function TutorReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  console.log(reviews);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/reviews`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setReviews(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
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
            <MessageCircle size={32} />
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              Ratings & Reviews
            </h1>

            <p className="mt-2 text-white/90">
              Read what your students say about your tutoring sessions.
            </p>
          </div>

        </div>

      </div>

      {/* Empty */}
      {reviews.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900">

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            No Reviews Yet
          </h2>

          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Student reviews will appear here after completed sessions.
          </p>

        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {reviews.map((review) => (

            <div
              key={review.id}
              className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
                dark:border-slate-800
                dark:bg-slate-900
              "
            >

              {/* User */}
              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#005C53] to-[#169B87] text-xl font-bold text-white">
                  {review.user?.name?.charAt(0).toUpperCase()}
                </div>

                <div>

                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {review.user?.name}
                  </h2>

                  <div className="mt-1 flex items-center gap-1">

                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={
                          star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-300"
                        }
                      />
                    ))}

                    <span className="ml-2 text-sm font-semibold text-slate-500">
                      {review.rating}/5
                    </span>

                  </div>

                </div>

              </div>

              {/* Comment */}
              <div className="mt-6 rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">

                <p className="leading-7 text-slate-600 dark:text-slate-300">
                  {review.comment}
                </p>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}