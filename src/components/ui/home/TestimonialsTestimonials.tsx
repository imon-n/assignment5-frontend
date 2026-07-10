"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Quote,
  Star,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "UI/UX Designer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    review:
      "Finding the right mentor completely changed my career. The sessions were practical, inspiring, and helped me land my dream job.",
  },
  {
    name: "David Miller",
    role: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    review:
      "The platform made learning enjoyable. My mentor guided me step by step and answered every question with patience.",
  },
  {
    name: "Emily Davis",
    role: "Marketing Specialist",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    review:
      "Professional mentors with practical advice. Every session added real value to my career.",
  },
  {
    name: "Michael Brown",
    role: "Data Analyst",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1?auto=format&fit=crop&w=300&q=80",
    review:
      "Highly recommended. The platform is easy to use and the mentors are very supportive.",
  },
  {
    name: "Olivia Wilson",
    role: "Graphic Designer",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    review:
      "Excellent mentoring experience. My confidence and skills improved after every session.",
  },
  {
    name: "James Lee",
    role: "Full Stack Developer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    review:
      "The best mentoring platform I've used. Booking sessions was easy and learning was enjoyable.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1280) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateCards();

    window.addEventListener("resize", updateCards);

    return () => window.removeEventListener("resize", updateCards);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + visibleCards >= testimonials.length
        ? 0
        : prev + visibleCards
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - visibleCards < 0
        ? Math.max(testimonials.length - visibleCards, 0)
        : prev - visibleCards
    );
  };

  return (
    <section className="bg-[#f7faf7] py-16 transition-colors duration-300 dark:bg-zinc-950 sm:py-20 lg:py-24">

      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Heading */}
        <div className="mb-10 text-center">

          <div className="mb-3 flex items-center justify-center gap-3">

            <span className="text-sm font-semibold uppercase tracking-[4px] text-[#169b87] sm:text-base">
              Reviews & Testimonials
            </span>

            <div className="relative h-[2px] w-16 overflow-hidden rounded-full bg-[#169b87]/20">
              <span className="absolute inset-y-0 left-0 w-8 rounded-full bg-[#169b87] animate-[slide_2s_linear_infinite]" />
            </div>

          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Our Students Are Feeling Good
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-600 dark:text-zinc-400">
            Hear from learners who transformed their careers with guidance
            from experienced mentors and practical one-on-one sessions.
          </p>

        </div>

        {/* Navigation */}
        <div className="mb-8 flex justify-center gap-3 lg:justify-end">

          <button
            onClick={prevSlide}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 transition hover:bg-[#169b87] hover:text-white dark:border-zinc-700 dark:text-white"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#169b87] text-white transition hover:scale-105"
          >
            <ArrowRight size={20} />
          </button>

        </div>

        {/* Slider */}
        <div className="overflow-hidden pt-6">

          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / visibleCards)
              }%)`,
            }}
          >
                        {testimonials.map((item, index) => (
              <div
                key={index}
                className={`flex-shrink-0 px-3 ${
                  visibleCards === 1
                    ? "w-full"
                    : visibleCards === 2
                    ? "w-1/2"
                    : "w-1/3"
                }`}
              >
                <div className="group relative h-full rounded-[28px] border border-gray-200 bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">

                  {/* Quote Icon */}
                  <div className="absolute -top-5 right-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#169b87] shadow-lg sm:h-14 sm:w-14">
                      <Quote className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-5 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill="#FACC15"
                        className="text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="mb-8 text-base leading-7 text-gray-600 dark:text-zinc-400 sm:text-lg sm:leading-8">
                    {item.review}
                  </p>

                  {/* User */}
                  <div className="flex items-center gap-4">

                    <div className="relative h-14 w-14 overflow-hidden rounded-full ring-4 ring-[#169b87]/20 sm:h-16 sm:w-16">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-zinc-400">
                        {item.role}
                      </p>
                    </div>

                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}