"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);

  const [form, setForm] = useState<FormState>({
    bio: "",
    hourlyRate: "",
    categoryId: "",
  });

  useEffect(() => {
    const initialize = async () => {
      try {
        // Check if tutor profile already exists
        try {
          const profileRes = await axios.get(
            "https://assignment5-backend-f7q4.onrender.com/api/tutor-profile",
            {
              withCredentials: true,
            }
          );

          if (profileRes.data) {
            router.replace("/dashboard/tutors/sessions");
            return;
          }
        } catch (err) {
          console.log("No tutor profile found");
        }

        // Fetch categories
        const catRes = await axios.get(
          "https://assignment5-backend-f7q4.onrender.com/api/categories"
        );

        const categoryData = Array.isArray(catRes.data)
          ? catRes.data
          : catRes.data?.data || [];

        setCategories(categoryData);
      } catch (err) {
        console.error(err);
      } finally {
        setCheckingProfile(false);
      }
    };

    initialize();
  }, [router]);

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.bio || !form.hourlyRate || !form.categoryId) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "https://assignment5-backend-f7q4.onrender.com/api/tutor-profile",
        {
          bio: form.bio,
          hourlyRate: Number(form.hourlyRate),
          categoryId: form.categoryId,
        },
        {
          withCredentials: true,
        }
      );

      alert("Tutor profile created successfully");

      router.push("/dashboard/tutors/sessions");
    } catch (err: any) {
      console.error(err);

      alert(
        err?.response?.data?.message ||
          "Failed to create tutor profile"
      );
    } finally {
      setLoading(false);
    }
  };

  if (checkingProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create Tutor Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          name="bio"
          placeholder="Write your bio..."
          value={form.bio}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="hourlyRate"
          placeholder="Hourly Rate"
          value={form.hourlyRate}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Select Category</option>

          {Array.isArray(categories) &&
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Creating..." : "Create Profile"}
        </button>
      </form>
    </div>
  );
}