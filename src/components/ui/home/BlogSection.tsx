"use client";

import Image from "next/image";

const blogs = [
  {
    id: 1,
    title: "It is a long established fact that a reader will be",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    author: "Charles Jacobs",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    day: "14",
    month: "Jul",
  },
  {
    id: 2,
    title: "To Generate Lorem Ipsum Which Looks Reasonable.",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    author: "Charles Jacobs",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    day: "14",
    month: "Jul",
  },
  {
    id: 3,
    title: "The Standard Chunk of Lorem Ipsum Used",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    author: "Charles Jacobs",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    day: "19",
    month: "Jan",
  },
];

export default function BlogSection() {
  return (
    <section className="bg-white py-16 transition-colors duration-300 dark:bg-zinc-950 sm:py-20 lg:py-24">

      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Heading */}
        <div className="mb-12 text-center lg:mb-16">

          <div className="mb-3 flex items-center justify-center gap-3">

            <span className="text-sm font-semibold uppercase tracking-[4px] text-[#1f9d8b] sm:text-base">
              Insights & Inspiration
            </span>

            <div className="relative h-[2px] w-16 overflow-hidden rounded-full bg-[#1f9d8b]/20">
              <span className="absolute inset-y-0 left-0 w-8 rounded-full bg-[#1f9d8b] animate-[slide_2s_linear_infinite]" />
            </div>

          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Updated Insights & Growth Stories
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-600 dark:text-zinc-400">
            Discover practical advice, inspiring success stories, and expert
            insights to help you grow personally and professionally.
          </p>

        </div>

        {/* Blog Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {blogs.map((blog) => (

            <article
              key={blog.id}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
            >

              {/* Image */}
              <div className="relative overflow-hidden">

                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={500}
                  height={350}
                  className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-72 lg:h-80"
                />

                {/* Date */}
                <div className="absolute right-5 top-5 flex h-20 w-16 flex-col items-center justify-center rounded-2xl bg-black text-white shadow-xl dark:bg-zinc-800">

                  <h3 className="text-3xl font-bold leading-none">
                    {blog.day}
                  </h3>

                  <span className="mt-1 text-sm">
                    {blog.month}
                  </span>

                </div>

                {/* Author */}
                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-white px-4 py-2 shadow-xl dark:bg-zinc-900">
                                  <Image
                    src={blog.avatar}
                    alt={blog.author}
                    width={42}
                    height={42}
                    className="rounded-full object-cover"
                  />

                  <span className="text-sm font-semibold text-gray-800 dark:text-white">
                    {blog.author}
                  </span>

                </div>
              </div>

              {/* Content */}
              <div className="p-6">

                <h3 className="text-center text-xl font-bold leading-8 text-gray-900 transition-colors duration-300 group-hover:text-[#1f9d8b] dark:text-white sm:text-2xl">
                  {blog.title}
                </h3>

                <div className="mt-6 flex justify-center">
                  <button className="rounded-full border border-[#1f9d8b] px-5 py-2 text-sm font-semibold text-[#1f9d8b] transition-all duration-300 hover:bg-[#1f9d8b] hover:text-white">
                    Read More
                  </button>
                </div>

              </div>

            </article>

          ))}

        </div>

      </div>
    </section>
  );
}