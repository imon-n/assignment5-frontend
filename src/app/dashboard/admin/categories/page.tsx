"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function CategoriesPage() {

  const [categories, setCategories] =
    useState<any[]>([]);

  const [name, setName] = useState("");

  // GET
  useEffect(() => {
    fetch(`${API}/api/categories`)
      .then((res) => res.json())
      .then((data) =>
        setCategories(data.data || [])
      );
  }, []);

  // ADD
  const addCategory = async () => {

    const res = await fetch(
      `${API}/api/categories`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          name,
        }),
      }
    );

    const data = await res.json();

    
if (data.success) {
toast(data.message, {
  style: {
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
  },
});




      setCategories([
        ...categories,
        data.data,
      ]);

      setName("");

    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="max-w-2xl">

      <h1 className="text-3xl font-bold mb-6">
        Manage Categories
      </h1>

      <div className="bg-white p-5 rounded-xl shadow mb-6 flex gap-3">

        <Input
          placeholder="Category name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <Button onClick={addCategory}>
          Add
        </Button>

      </div>

      <div className="space-y-3">

        {categories.map((cat) => (

          <div
            key={cat.id}
            className="bg-white p-4 rounded-xl shadow"
          >
            {cat.name}
          </div>

        ))}

      </div>
    </div>
  );
}