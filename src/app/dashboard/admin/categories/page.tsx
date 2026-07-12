"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FolderOpen, Plus } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

interface Category {
  id: string;
  name: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(`${API}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data.data || []));
  }, []);

  const addCategory = async () => {
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    const res = await fetch(`${API}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success(data.message);

      setCategories((prev) => [...prev, data.data]);

      setName("");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#005C53] to-[#169B87] p-8 text-white shadow-xl">

        <div className="flex items-center gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xl">
            <FolderOpen size={32} />
          </div>

          <div>

            <h1 className="text-4xl font-bold">
              Manage Categories
            </h1>

            <p className="mt-2 text-white/90">
              Create and manage tutor categories.
            </p>

          </div>

        </div>

      </div>

      {/* Add Category */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">

        <div className="flex flex-col gap-4 md:flex-row">

          <Input
            placeholder="Enter category name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12"
          />

          <Button
            onClick={addCategory}
            className="h-12 bg-[#005C53] hover:bg-[#169B87] md:w-44"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Category
          </Button>

        </div>

      </div>

      {/* Categories */}
      {categories.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900">

          <FolderOpen
            size={50}
            className="mx-auto mb-4 text-slate-400"
          />

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            No Categories Found
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Add your first category to get started.
          </p>

        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => (

            <div
              key={category.id}
              className="
                group
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-[#169B87]
                hover:shadow-2xl
                dark:border-slate-800
                dark:bg-slate-900
              "
            >

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#005C53] to-[#169B87] text-white shadow-lg">
                  <FolderOpen size={24} />
                </div>

                <div>

                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {category.name}
                  </h2>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Tutor Category
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}