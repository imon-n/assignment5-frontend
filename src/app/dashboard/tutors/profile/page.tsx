"use client";

import { useEffect, useState } from "react";
import type {
  ChangeEvent,
  FormEvent,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  UserCircle2,
  GraduationCap,
  Loader2,
} from "lucide-react";

const API =
  process.env.NEXT_PUBLIC_API_URL;

type Category = {
  id: string;
  name: string;
};

type FormState = {
  bio: string;
  hourlyRate: string;
  categoryId: string;
};

export default function CreateTutorProfile() {
  const router = useRouter();

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [
    checkingProfile,
    setCheckingProfile,
  ] = useState(true);

  const [form, setForm] =
    useState<FormState>({
      bio: "",
      hourlyRate: "",
      categoryId: "",
    });

  // -------------------------
  // Load Tutor Profile
  // -------------------------

  useEffect(() => {
    const initialize = async () => {
      try {
        try {
          const profile =
            await axios.get(
              `${API}/api/tutor-profile`,
              {
                withCredentials: true,
              }
            );

          if (profile.data) {
            router.replace(
              "/dashboard/tutors/sessions"
            );
            return;
          }
        } catch {
          console.log(
            "Tutor profile not found"
          );
        }

        const res = await axios.get(
          `${API}/api/categories`
        );

        setCategories(
          Array.isArray(res.data)
            ? res.data
            : res.data.data || []
        );
      } catch (err) {
        console.log(err);
      } finally {
        setCheckingProfile(false);
      }
    };

    initialize();
  }, [router]);

  // -------------------------
  // Input Change
  // -------------------------

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

  // -------------------------
  // Submit
  // -------------------------

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !form.bio ||
      !form.hourlyRate ||
      !form.categoryId
    ) {
      alert(
        "All fields are required"
      );
      return;
    }

    try {
      setLoading(true);

      await axios.post(
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

      alert(
        "Tutor profile created successfully!"
      );

      router.push(
        "/dashboard/tutors/sessions"
      );
    } catch (err: any) {
      alert(
        err.response?.data
          ?.message ||
          "Failed to create tutor profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Loading Screen
  // -------------------------

  if (checkingProfile) {
    return (
      <div className="flex h-[75vh] items-center justify-center">

        <div className="flex flex-col items-center gap-4">

          <Loader2
            className="animate-spin text-[#169B87]"
            size={42}
          />

          <p className="text-slate-500 dark:text-slate-400">
            Preparing your profile...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#005C53] to-[#169B87] p-8 text-white shadow-xl">

        <div className="flex items-center gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xl">

            <GraduationCap size={34} />

          </div>

          <div>

            <h1 className="text-4xl font-bold">
              Become a Tutor
            </h1>

            <p className="mt-2 text-white/90">
              Create your tutor profile and
              start teaching students.
            </p>

          </div>

        </div>

      </div>
      <div className="grid gap-8 lg:grid-cols-3">

        {/* Form */}

        <div className="lg:col-span-2">

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">

            <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
              Tutor Information
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
                  name="bio"
                  rows={6}
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
                    transition-all
                    duration-300
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
                  placeholder="20"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-300
                    bg-white
                    p-4
                    outline-none
                    transition-all
                    duration-300
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
                  Teaching Category
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
                    transition-all
                    duration-300
                    focus:border-[#169B87]
                    focus:ring-4
                    focus:ring-[#169B87]/20
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-white
                  "
                >

                  <option value="">
                    Select Category
                  </option>

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

              {/* PART 3 HERE */}
                            {/* Submit Button */}

              <button
                type="submit"
                disabled={loading}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
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
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? (
                  <>

                    <Loader2
                      size={20}
                      className="mr-2 animate-spin"
                    />

                    Creating Profile...

                  </>
                ) : (
                  "Create Tutor Profile"
                )}
              </button>

            </form>

          </div>

        </div>

        {/* Right Side */}

        <div>

          <div
            className="
              rounded-3xl
              bg-gradient-to-br
              from-[#005C53]
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

            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">

              <UserCircle2 size={34} />

            </div>

            <h3 className="text-2xl font-bold">
              Tutor Profile
            </h3>

            <p className="mt-4 leading-7 text-white/90">
              Complete your tutor profile to start
              receiving booking requests from students.
            </p>

            <div className="mt-8 space-y-4">

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">

                <p className="text-sm text-white/80">
                  Bio
                </p>

                <p className="mt-1 font-semibold">
                  Introduce yourself professionally.
                </p>

              </div>

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">

                <p className="text-sm text-white/80">
                  Hourly Rate
                </p>

                <p className="mt-1 font-semibold">
                  Set your teaching price.
                </p>

              </div>

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">

                <p className="text-sm text-white/80">
                  Category
                </p>

                <p className="mt-1 font-semibold">
                  Choose your teaching subject.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

         
  