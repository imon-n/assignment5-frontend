"use client";

import { useEffect, useState } from "react";
import type {
  ChangeEvent,
  FormEvent,
} from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "sonner";

import {
  GraduationCap,
  Loader2,
  Mail,
  BookOpen,
  DollarSign,
  FileText,
  Pencil,
} from "lucide-react";

const API =
  process.env.NEXT_PUBLIC_API_URL;

// =======================
// Types
// =======================

type Category = {
  id: string;
  name: string;
};

type TutorProfile = {
  id: string;
  bio: string;
  hourlyRate: number;

  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: string;
  };

  category: {
    id: string;
    name: string;
  };
};

type FormState = {
  bio: string;
  hourlyRate: string;
  categoryId: string;
};

// =======================
// Component
// =======================

export default function TutorProfilePage() {
  const [profile, setProfile] =
    useState<TutorProfile | null>(null);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [form, setForm] =
    useState<FormState>({
      bio: "",
      hourlyRate: "",
      categoryId: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [editMode, setEditMode] =
    useState(false);

  // =======================
  // Load Tutor Profile
  // =======================

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          profileRes,
          categoryRes,
        ] = await Promise.all([
          axios.get(
            `${API}/api/profile/me`,
            {
              withCredentials: true,
            }
          ),

          axios.get(
            `${API}/api/categories`
          ),
        ]);

        const tutor =
          profileRes.data.data;

        setProfile(tutor);

        setForm({
          bio: tutor.bio,
          hourlyRate: String(
            tutor.hourlyRate
          ),
          categoryId:
            tutor.category.id,
        });

        setCategories(
          categoryRes.data.data || []
        );
      } catch (err) {
        console.log(err);

        toast.error(
          "Failed to load tutor profile."
        );
      } finally {
        setPageLoading(false);
      }
    };

    loadData();
  }, []);

  // =======================
  // Handle Change
  // =======================

  const handleChange = (
    e: ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  // =======================
  // Update Tutor Profile
  // =======================

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.patch(
        `${API}/api/tutor-profile`,
        {
          bio: form.bio,
          hourlyRate: Number(
            form.hourlyRate
          ),
          categoryId:
            form.categoryId,
        },
        {
          withCredentials: true,
        }
      );

      setProfile(res.data.data);

      toast.success(
        "Profile updated successfully!"
      );

      setEditMode(false);
    } catch (err: any) {
      toast.error(
        err.response?.data
          ?.message ||
          "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // Loading Screen
  // =======================

  if (pageLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2
            size={42}
            className="animate-spin text-[#169B87]"
          />

          <p className="text-slate-500 dark:text-slate-400">
            Loading Tutor Profile...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold">
          Tutor profile not found
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div
        className="
          overflow-hidden
          rounded-3xl
          bg-gradient-to-r
          from-[#005C53]
          to-[#169B87]
          p-8
          text-white
          shadow-xl
        "
      >
        <div className="flex items-center gap-5">

          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-white/20
              backdrop-blur-xl
            "
          >
            <GraduationCap size={34} />
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              Tutor Profile
            </h1>

            <p className="mt-2 text-white/90">
              View and manage your
              tutor profile.
            </p>
          </div>

        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-3">

        {/* =======================
            Left Profile Card
        ======================= */}

        <div className="xl:col-span-1">

          <div
            className="
              sticky top-24
              overflow-hidden
              rounded-3xl
              border border-slate-200
              bg-white
              shadow-xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-2xl
              dark:border-slate-800
              dark:bg-slate-900
            "
          >

            {/* Cover */}

            <div className="h-32 bg-gradient-to-r from-[#005C53] via-[#0B7A6D] to-[#169B87]" />

            {/* Avatar */}

            <div className="px-8 pb-8">

              <div className="-mt-16 flex flex-col items-center">

                <Image
                  src={
                    profile.user.image ||
                    "/avatar.png"
                  }
                  alt={profile.user.name}
                  width={120}
                  height={120}
                  className="
                    rounded-full
                    border-4
                    border-white
                    dark:border-slate-900
                    object-cover
                    shadow-2xl
                    transition-all
                    duration-300
                    hover:scale-105
                  "
                />

                <h2 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
                  {profile.user.name}
                </h2>

                <p className="mt-2 flex items-center gap-2 text-slate-500 dark:text-slate-400">

                  <Mail size={16} />

                  {profile.user.email}

                </p>

                <span
                  className="
                    mt-5
                    rounded-full
                    bg-emerald-100
                    px-5
                    py-2
                    text-sm
                    font-semibold
                    text-emerald-700
                    dark:bg-emerald-900/30
                    dark:text-emerald-400
                  "
                >
                  {profile.user.role}
                </span>

              </div>

              {/* Tutor Info */}

              <div className="mt-10 space-y-5">

                {/* Category */}

                <div
                  className="
                    flex
                    items-start
                    gap-4
                    rounded-2xl
                    bg-slate-50
                    p-4
                    transition
                    hover:bg-slate-100
                    dark:bg-slate-800
                    dark:hover:bg-slate-700
                  "
                >

                  <BookOpen className="mt-1 text-[#169B87]" />

                  <div>

                    <p className="text-xs uppercase tracking-widest text-slate-500">
                      Category
                    </p>

                    <h4 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                      {profile.category.name}
                    </h4>

                  </div>

                </div>

                {/* Hourly Rate */}

                <div
                  className="
                    flex
                    items-start
                    gap-4
                    rounded-2xl
                    bg-slate-50
                    p-4
                    transition
                    hover:bg-slate-100
                    dark:bg-slate-800
                    dark:hover:bg-slate-700
                  "
                >

                  <DollarSign className="mt-1 text-[#169B87]" />

                  <div>

                    <p className="text-xs uppercase tracking-widest text-slate-500">
                      Hourly Rate
                    </p>

                    <h4 className="mt-1 text-2xl font-bold text-[#169B87]">
                      ${profile.hourlyRate}
                      <span className="ml-1 text-base font-medium text-slate-500">
                        /hour
                      </span>
                    </h4>

                  </div>

                </div>

                {/* Bio */}

                <div
                  className="
                    rounded-2xl
                    bg-slate-50
                    p-5
                    transition
                    hover:bg-slate-100
                    dark:bg-slate-800
                    dark:hover:bg-slate-700
                  "
                >

                  <div className="mb-3 flex items-center gap-3">

                    <FileText
                      size={18}
                      className="text-[#169B87]"
                    />

                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      Bio
                    </h4>

                  </div>

                  <p className="leading-7 text-slate-600 dark:text-slate-300">
                    {profile.bio}
                  </p>

                </div>

              </div>

              {/* Edit Button */}

           {/* =========================
    Edit Profile Modal
========================= */}

{editMode && (
  <div
    className="
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/50
      backdrop-blur-sm
      px-4
      animate-in fade-in duration-300
    "
  >
    <div
      className="
        relative
        w-full
        max-w-3xl
        rounded-3xl
        bg-white
        dark:bg-slate-900
        border
        border-slate-200
        dark:border-slate-700
        shadow-2xl
        p-8
        animate-in zoom-in-95 duration-300
      "
    >
      {/* Close */}
      <button
        onClick={() => setEditMode(false)}
        className="
          absolute
          right-5
          top-5
          h-10
          w-10
          rounded-full
          bg-slate-100
          dark:bg-slate-800
          hover:bg-red-500
          hover:text-white
          transition
        "
      >
        ✕
      </button>

      <h2 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">
        Edit Tutor Profile
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Bio */}
        <div>
          <label className="mb-2 block font-semibold">
            Bio
          </label>

          <textarea
            rows={6}
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="
              w-full
              rounded-2xl
              border
              border-slate-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              p-4
              outline-none
              focus:ring-4
              focus:ring-[#169B87]/20
              focus:border-[#169B87]
            "
          />
        </div>

        {/* Hourly Rate */}
        <div>
          <label className="mb-2 block font-semibold">
            Hourly Rate
          </label>

          <input
            type="number"
            name="hourlyRate"
            value={form.hourlyRate}
            onChange={handleChange}
            className="
              w-full
              rounded-2xl
              border
              border-slate-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              p-4
              outline-none
              focus:ring-4
              focus:ring-[#169B87]/20
              focus:border-[#169B87]
            "
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block font-semibold">
            Category
          </label>

          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="
              w-full
              rounded-2xl
              border
              border-slate-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              p-4
              outline-none
              focus:ring-4
              focus:ring-[#169B87]/20
              focus:border-[#169B87]
            "
          >
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="
              flex-1
              rounded-2xl
              bg-gradient-to-r
              from-[#005C53]
              to-[#169B87]
              py-4
              text-white
              font-semibold
              hover:scale-[1.02]
              transition
            "
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => setEditMode(false)}
            className="
              rounded-2xl
              border
              px-8
              py-4
              font-semibold
              hover:bg-slate-100
              dark:hover:bg-slate-800
            "
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

            </div>

          </div>

        </div>

        {/* =======================
            Right Side
        ======================= */}
{/* Right Side */}
<div className="space-y-6">

  {/* Tutor Summary */}
  <div
    className="
      overflow-hidden
      rounded-3xl
      bg-gradient-to-br
      from-[#005C53]
      via-[#0B766A]
      to-[#169B87]
      p-8
      text-white
      shadow-xl
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-2xl
    "
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white/80 text-sm">
          Tutor Dashboard
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Welcome,
        </h2>

        <h3 className="text-2xl font-semibold">
          {profile.user.name}
        </h3>
      </div>

      <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-md">
        <GraduationCap size={38} />
      </div>
    </div>

    <div className="mt-8 grid grid-cols-2 gap-4">

      <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
        <p className="text-sm text-white/70">
          Hourly Rate
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          ${profile.hourlyRate}
        </h3>
      </div>

     

    </div>
  </div>

  {/* Information */}
  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">

    <h3 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
      Tutor Information
    </h3>

    <div className="space-y-5">

      <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Category
        </p>

        <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
          {profile.category.name}
        </p>
      </div>

      <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Email
        </p>

        <p className="mt-2 break-all text-slate-700 dark:text-slate-300">
          {profile.user.email}
        </p>
      </div>

      <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Bio
        </p>

        <p className="mt-2 leading-7 text-slate-700 dark:text-slate-300">
          {profile.bio}
        </p>
      </div>

    </div>

  </div>

  {/* Statistics */}
  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">

    <h3 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
      Statistics
    </h3>

  

  </div>

  {/* Tips */}
  <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950/30">

    <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
      💡 Profile Tips
    </h3>

    <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
      <li>✔ Keep your bio professional and engaging.</li>
      <li>✔ Update your hourly rate based on experience.</li>
      <li>✔ Choose the correct teaching category.</li>
      <li>✔ A complete profile attracts more students.</li>
    </ul>

  </div>

</div>

      </div>

    </div>
  );
}