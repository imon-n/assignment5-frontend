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

  const [form, setForm] = useState<FormState>({
    bio: "",
    hourlyRate: "",
    categoryId: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get<Category[]>(
          "https://assignment5-backend-f7q4.onrender.com/api/categories"
        );

        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

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
        "https://assignment5-backend-f7q4.onrender.com/api/tutor",
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
        err?.response?.data?.message || "Failed to create tutor profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Tutor Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            name="bio"
            placeholder="Write your bio..."
            value={form.bio}
            onChange={handleChange}
            rows={5}
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

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}