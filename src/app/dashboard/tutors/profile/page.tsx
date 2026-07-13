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

              {!editMode && (

                <button
                  onClick={() =>
                    setEditMode(true)
                  }
                  className="
                    mt-8
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-gradient-to-r
                    from-[#005C53]
                    to-[#169B87]
                    py-4
                    text-lg
                    font-semibold
                    text-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-2xl
                  "
                >

                  <Pencil size={18} />

                  Edit Profile

                </button>

              )}

            </div>

          </div>

        </div>

        {/* =======================
            Right Side
        ======================= */}

        <div className="xl:col-span-2">

                  {editMode ? (
            <div
              className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-8
                shadow-xl
                transition-all
                duration-300
                animate-in
                fade-in
                slide-in-from-right-5
                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
                Edit Tutor Profile
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Bio */}

                <div>
                  <label className="mb-2 block font-semibold text-slate-700 dark:text-slate-300">
                    Bio
                  </label>

                  <textarea
                    rows={6}
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Tell students about yourself..."
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-slate-300
                      bg-white
                      p-4
                      outline-none
                      transition
                      focus:border-[#169B87]
                      focus:ring-4
                      focus:ring-[#169B87]/20
                      dark:border-slate-700
                      dark:bg-slate-800
                      dark:text-white
                    "
                  />
                </div>

                {/* Hourly Rate */}

                <div>
                  <label className="mb-2 block font-semibold text-slate-700 dark:text-slate-300">
                    Hourly Rate ($)
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
                      bg-white
                      p-4
                      outline-none
                      transition
                      focus:border-[#169B87]
                      focus:ring-4
                      focus:ring-[#169B87]/20
                      dark:border-slate-700
                      dark:bg-slate-800
                      dark:text-white
                    "
                  />
                </div>

                {/* Category */}

                <div>
                  <label className="mb-2 block font-semibold text-slate-700 dark:text-slate-300">
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
                      bg-white
                      p-4
                      outline-none
                      transition
                      focus:border-[#169B87]
                      focus:ring-4
                      focus:ring-[#169B87]/20
                      dark:border-slate-700
                      dark:bg-slate-800
                      dark:text-white
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

                {/* Buttons */}

                <div className="flex flex-col gap-4 sm:flex-row">

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
                      font-semibold
                      text-white
                      shadow-lg
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-2xl
                      disabled:opacity-60
                    "
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <Loader2
                          size={20}
                          className="mr-2 animate-spin"
                        />
                        Saving...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);

                      setForm({
                        bio: profile.bio,
                        hourlyRate: String(
                          profile.hourlyRate
                        ),
                        categoryId:
                          profile.category.id,
                      });
                    }}
                    className="
                      rounded-2xl
                      border
                      border-slate-300
                      px-8
                      py-4
                      font-semibold
                      transition
                      hover:bg-slate-100
                      dark:border-slate-700
                      dark:hover:bg-slate-800
                    "
                  >
                    Cancel
                  </button>

                </div>
              </form>
            </div>
          ) : (
            <div
              className="
                flex
                h-full
                items-center
                justify-center
                rounded-3xl
                border
                border-dashed
                border-slate-300
                bg-gradient-to-br
                from-slate-50
                to-white
                p-16
                text-center
                dark:border-slate-700
                dark:from-slate-900
                dark:to-slate-950
              "
            >
              <div>
                <Pencil
                  size={56}
                  className="mx-auto mb-6 text-[#169B87]"
                />

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Tutor Profile
                </h2>

                <p className="mt-4 max-w-md text-slate-500 dark:text-slate-400">
                  Your tutor profile is visible to students.
                  Click the <strong>Edit Profile</strong> button
                  to update your bio, hourly rate and teaching
                  category.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}