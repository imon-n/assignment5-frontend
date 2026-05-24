"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface Profile {
  name: string;
  email: string;
  image?: string;
  role: string;
}
export default function MePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editMode, setEditMode] = useState(false);

  // ✅ GET PROFILE
  useEffect(() => {
    fetch(`${API_URL}/api/me`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // if backend returns {data:{}}
        setProfile(data.data || data);
      });
  }, []);

  // ✅ UPDATE PROFILE


const handleUpdate = async () => {
    if (!profile) return;
  const res = await fetch(`${API_URL}/api/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name: profile.name,
      image: profile.image,
    }),
  });

  const data = await res.json();

  if (data.success) {
    toast.success("Profile updated successfully!");
    setEditMode(false);
  } else {
    toast.error(data.message || "Update failed");
  }
};

  if (!profile) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-28">

      {/* PROFILE CARD */}
      <div className="bg-white rounded-2xl shadow p-8">

        {/* TOP */}
        <div className="flex flex-col md:flex-row items-center gap-6">

          <img
            src={
              profile.image ||
              "https://i.ibb.co/4pDNDk1/avatar.png"
            }
            alt="profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-green-100"
          />

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold">
              {profile.name}
            </h1>

            <p className="text-gray-500 mt-2">
              {profile.email}
            </p>

            <p className="mt-2 inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
              {profile.role}
            </p>
          </div>

          <div>
            {!editMode ? (
              <Button
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </Button>
            ) : (
              <Button
                variant="destructive"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>

        {/* EDIT FORM */}
        {editMode && (
          <div className="mt-10 space-y-5 border-t pt-8">

            <div>
              <label className="font-medium block mb-2">
                Name
              </label>

              <Input
                value={profile.name}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="font-medium block mb-2">
                Email
              </label>

              <Input
                value={profile.email}
                disabled
              />
            </div>

            <div>
              <label className="font-medium block mb-2">
                Image URL
              </label>

              <Input
                value={profile.image || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    image: e.target.value,
                  })
                }
              />
            </div>

            <Button onClick={handleUpdate}>
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}