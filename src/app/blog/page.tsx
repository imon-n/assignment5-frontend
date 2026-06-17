import Link from "next/link";

export default function BlogPage() {
  return (
    <main className="min-h-screen px-6 py-14 bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-4xl font-bold">SkillBridge Blog</h1>

        <p className="text-lg text-slate-600">
          Explore educational insights, assignment guidance, study strategies,
          and tutoring resources designed to help students succeed academically.
        </p>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">
            Learn Smarter with SkillBridge
          </h2>

          <p className="mt-4 text-slate-600">
            Welcome to the SkillBridge Blog, your resource hub for academic
            success. Here you'll find practical study tips, assignment support
            guides, productivity strategies, and expert insights to help you
            overcome learning challenges and achieve your educational goals.
          </p>

          <p className="mt-4 text-slate-600">
            Whether you're searching for the right tutor, preparing for exams,
            improving your study habits, or looking for guidance on academic
            assignments, our content is created to support students at every
            stage of their learning journey.
          </p>

          <p className="mt-4 text-slate-600">
            New articles, learning resources, and student success stories will
            be published regularly to help you learn more effectively and build
            confidence in your academic path.
          </p>
        </div>

        <Link
          className="inline-flex rounded-full bg-emerald-600 px-6 py-3 text-white shadow hover:bg-emerald-700 transition-colors"
          href="/"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}