import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Lightbulb,
  ArrowLeft,
} from "lucide-react";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-20 transition-colors duration-300 dark:bg-zinc-950">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <div className="mx-auto mb-8 max-w-3xl text-center">

          <div className="mb-4 flex items-center justify-center gap-3">

            <span className="rounded-full bg-[#1f9d8b]/10 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-[#1f9d8b]">
              SkillBridge Blog
            </span>

            <div className="relative h-[2px] w-16 overflow-hidden rounded-full bg-[#1f9d8b]/20">
              <span className="absolute inset-y-0 left-0 w-8 animate-[slide_2s_linear_infinite] rounded-full bg-[#1f9d8b]" />
            </div>

          </div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Learn Smarter,
            <span className="text-[#1f9d8b]"> Grow Faster</span>
          </h1>
{/* 
          <p className="mt-2 text-lg leading-8 text-slate-600 dark:text-zinc-400">
            Explore educational insights, study strategies, assignment
            guidance, and expert tutoring resources designed to help students
            succeed academically.
          </p> */}

        </div>

        {/* Main Card */}

       <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">

  {/* Top Banner */}
  <div className="bg-gradient-to-r from-[#1f9d8b] to-[#056f5b] px-6 py-6 text-white">

    <div className="flex items-center gap-3">

      <div className="rounded-xl bg-white/15 p-2 backdrop-blur">
        <BookOpen className="h-7 w-7" />
      </div>

      <div>

        <h2 className="text-xl md:text-2xl font-bold">
          Learn Smarter with SkillBridge
        </h2>

        <p className="mt-1 text-sm text-white/90">
          Practical resources to help every learner succeed.
        </p>

      </div>

    </div>

  </div>

  {/* Content */}
  <div className="space-y-6 p-6">

    <div className="flex gap-4">

      <div className="mt-1 rounded-xl bg-[#1f9d8b]/10 p-2 h-fit">
        <GraduationCap className="h-5 w-5 text-[#1f9d8b]" />
      </div>

      <div>

        <h3 className="mb-2 text-lg md:text-xl font-bold text-slate-900 dark:text-white">
          Academic Success Starts Here
        </h3>

        <p className="text-sm leading-7 text-slate-600 dark:text-zinc-400">
          Welcome to the SkillBridge Blog, your trusted learning hub.
          Discover practical study techniques, assignment support,
          productivity tips, and expert educational insights to help
          students achieve academic success.
        </p>

      </div>

    </div>

    <div className="flex gap-4">

      <div className="mt-1 rounded-xl bg-[#1f9d8b]/10 p-2 h-fit">
        <Lightbulb className="h-5 w-5 text-[#1f9d8b]" />
      </div>

      <div>

        <h3 className="mb-2 text-lg md:text-xl font-bold text-slate-900 dark:text-white">
          What You'll Discover
        </h3>

        <p className="text-sm leading-7 text-slate-600 dark:text-zinc-400">
          Find expert tutoring advice, exam preparation strategies,
          assignment guidance, study techniques, educational news,
          and inspiring student success stories to help you reach
          your learning goals.
        </p>

      </div>

    </div>

  </div>

</div>

        {/* Back Button */}

        <div className="mt-12 text-center">

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#1f9d8b] px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#188576] hover:shadow-xl"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>

        </div>

      </div>

    </main>
  );
}