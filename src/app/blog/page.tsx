import Link from "next/link";

export default function BlogPage() {
  return (
    <main className="min-h-screen px-6 py-14 bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-lg text-slate-600">
          This is a placeholder blog page. The blog route was missing, so the app returned a 404.
        </p>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Welcome to the blog</h2>
          <p className="mt-4 text-slate-600">
            Your application includes a navigation link to `/blog`, but there was no corresponding route.
            This page ensures the link works and prevents the 404 error.
          </p>
          <p className="mt-4 text-slate-600">
            Replace this placeholder with your real blog content when you are ready.
          </p>
        </div>
        <Link
          className="inline-flex rounded-full bg-emerald-600 px-6 py-3 text-white shadow hover:bg-emerald-700"
          href="/"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
