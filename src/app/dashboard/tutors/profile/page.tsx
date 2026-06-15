import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [form, setForm] = useState<FormState>({
    bio: "",
    hourlyRate: "",
    categoryId: "",
  });

  // 🔹 Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get<Category[]>(
          "https://assignment5-backend-f7q4.onrender.com/api/categories"
        );
        setCategories(res.data);
      } catch (err) {
        console.log("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  // 🔹 Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Submit form
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

      navigate("/dashboard/tutors/sessions");
    } catch (err: any) {
      console.log(err);
      alert(err?.response?.data?.message || "Failed to create profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-xl bg-white p-6 rounded shadow">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Tutor Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* BIO */}
          <textarea
            name="bio"
            placeholder="Write your bio..."
            value={form.bio}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* HOURLY RATE */}
          <input
            type="number"
            name="hourlyRate"
            placeholder="Hourly Rate"
            value={form.hourlyRate}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* CATEGORY */}
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

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Creating..." : "Create Profile"}
          </button>

        </form>
      </div>
    </div>
  );
}