// "use client";

// import { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// const API_URL = process.env.NEXT_PUBLIC_API_URL;
// interface Profile {
//   name: string;
//   email: string;
//   image?: string;
//   role: string;
// }
// export default function MePage() {
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [editMode, setEditMode] = useState(false);

//   // ✅ GET PROFILE
//   useEffect(() => {
//     fetch(`${API_URL}/api/me`, {
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);

//         // if backend returns {data:{}}
//         setProfile(data.data || data);
//       });
//   }, []);

//   // ✅ UPDATE PROFILE


// const handleUpdate = async () => {
//     if (!profile) return;
//   const res = await fetch(`${API_URL}/api/me`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//     body: JSON.stringify({
//       name: profile.name,
//       image: profile.image,
//     }),
//   });

//   const data = await res.json();

//   if (data.success) {
//     toast.success("Profile updated successfully!");
//     setEditMode(false);
//   } else {
//     toast.error(data.message || "Update failed");
//   }
// };

//   if (!profile) {
//     return (
//       <div className="p-10">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto mt-28">

//       {/* PROFILE CARD */}
//       <div className="bg-white rounded-2xl shadow p-8">

//         {/* TOP */}
//         <div className="flex flex-col md:flex-row items-center gap-6">

//           <img
//             src={
//               profile.image ||
//               "https://i.ibb.co/4pDNDk1/avatar.png"
//             }
//             alt="profile"
//             className="w-32 h-32 rounded-full object-cover border-4 border-green-100"
//           />

//           <div className="flex-1 text-center md:text-left">
//             <h1 className="text-4xl font-bold">
//               {profile.name}
//             </h1>

//             <p className="text-gray-500 mt-2">
//               {profile.email}
//             </p>

//             <p className="mt-2 inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
//               {profile.role}
//             </p>
//           </div>

//           <div>
//             {!editMode ? (
//               <Button
//                 onClick={() => setEditMode(true)}
//               >
//                 Edit Profile
//               </Button>
//             ) : (
//               <Button
//                 variant="destructive"
//                 onClick={() => setEditMode(false)}
//               >
//                 Cancel
//               </Button>
//             )}
//           </div>
//         </div>

//         {/* EDIT FORM */}
//         {editMode && (
//           <div className="mt-10 space-y-5 border-t pt-8">

//             <div>
//               <label className="font-medium block mb-2">
//                 Name
//               </label>

//               <Input
//                 value={profile.name}
//                 onChange={(e) =>
//                   setProfile({
//                     ...profile,
//                     name: e.target.value,
//                   })
//                 }
//               />
//             </div>

//             <div>
//               <label className="font-medium block mb-2">
//                 Email
//               </label>

//               <Input
//                 value={profile.email}
//                 disabled
//               />
//             </div>

//             <div>
//               <label className="font-medium block mb-2">
//                 Image URL
//               </label>

//               <Input
//                 value={profile.image || ""}
//                 onChange={(e) =>
//                   setProfile({
//                     ...profile,
//                     image: e.target.value,
//                   })
//                 }
//               />
//             </div>

//             <Button onClick={handleUpdate}>
//               Save Changes
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import Image from "next/image";
// import {
//   Trophy,
//   Puzzle,
//   Atom,
//   Brain,
//   BookOpen,
//   Award,
// } from "lucide-react";

// export default function ProfilePage() {
//   return (
//     <div className="space-y-8">

//       {/* Header */}
//       <div>
//         <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
//           Profile
//         </h1>

//         <p className="mt-2 text-slate-500 dark:text-slate-400">
//           Manage your account information and learning progress.
//         </p>
//       </div>

//       <div className="grid xl:grid-cols-3 gap-8">

//         {/* LEFT COLUMN */}
//         <div className="space-y-6">

//           {/* Profile Card */}
//           <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

//             <div className="flex flex-col items-center">

//               <Image
//                 src="/avatar.png"
//                 alt="Profile"
//                 width={110}
//                 height={110}
//                 className="rounded-3xl object-cover"
//               />

//               <h2 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
//                 Nur Mohammad Imon
//               </h2>

//               <p className="mt-2 text-slate-500 dark:text-slate-400">
//                 Member Since 2026
//               </p>

//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-2 gap-4 mt-8">

//               <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-5">

//                 <p className="text-slate-500 dark:text-slate-400">
//                   Points
//                 </p>

//                 <h3 className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">
//                   2300
//                 </h3>

//               </div>

//               <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-5">

//                 <p className="text-slate-500 dark:text-slate-400">
//                   Certificate
//                 </p>

//                 <h3 className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">
//                   50
//                 </h3>

//               </div>

//             </div>

//             {/* Achievement */}
//             <div className="mt-8">

//               <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
//                 Achievements
//               </h3>

//               <div className="grid grid-cols-5 gap-4 mt-5">

//                 <div className="h-14 w-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
//                   <Trophy className="text-[#1f9d8b]" />
//                 </div>

//                 <div className="h-14 w-14 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
//                   <Puzzle className="text-purple-600" />
//                 </div>

//                 <div className="h-14 w-14 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
//                   <Atom className="text-orange-500" />
//                 </div>

//                 <div className="h-14 w-14 rounded-2xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
//                   <Brain className="text-pink-500" />
//                 </div>

//                 <div className="h-14 w-14 rounded-2xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
//                   <Award className="text-yellow-600" />
//                 </div>

//               </div>

//             </div>
//             <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
//   <div className="grid xl:grid-cols-3 gap-6">

//     {/* LEFT PROFILE CARD */}
//     <div className="xl:col-span-1">
//       <div className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-lg p-6 transition-all duration-300">

//         {/* Avatar */}
//         <div className="flex flex-col items-center">
//           <img
//             src={session?.user?.image || "/avatar.png"}
//             alt="profile"
//             className="w-28 h-28 rounded-3xl object-cover ring-4 ring-emerald-100 dark:ring-emerald-900"
//           />

//           <h2 className="mt-5 text-3xl font-bold text-slate-800 dark:text-white">
//             {session?.user?.name || user.name}
//           </h2>

//           <p className="text-gray-500 dark:text-gray-400 mt-2">
//             {user.role}
//           </p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 gap-4 mt-8">

//           <div className="rounded-2xl bg-gray-50 dark:bg-slate-800 p-5">
//             <p className="text-gray-500 text-sm">
//               Total Sessions
//             </p>

//             <h3 className="text-3xl font-bold mt-2 text-emerald-600">
//               24
//             </h3>
//           </div>

//           <div className="rounded-2xl bg-gray-50 dark:bg-slate-800 p-5">
//             <p className="text-gray-500 text-sm">
//               Reviews
//             </p>

//             <h3 className="text-3xl font-bold mt-2 text-emerald-600">
//               18
//             </h3>
//           </div>

//         </div>

//         {/* Achievements */}
//         <div className="mt-8">

//           <h3 className="font-bold text-xl dark:text-white mb-4">
//             Achievements
//           </h3>

//           <div className="flex flex-wrap gap-3">

//             {["🏆", "⭐", "🚀", "🎯", "💎"].map((item) => (
//               <div
//                 key={item}
//                 className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-2xl hover:scale-110 transition"
//               >
//                 {item}
//               </div>
//             ))}

//           </div>

//         </div>

//         {/* Bio */}
//         <div className="mt-8">

//           <h3 className="font-bold text-xl dark:text-white">
//             Bio
//           </h3>

//           <p className="mt-4 text-gray-600 dark:text-gray-400 leading-8">
//             Passionate learner focused on technology, programming,
//             mentoring and continuous self-development. Always
//             interested in learning modern software engineering and
//             building impactful products.
//           </p>

//         </div>

//       </div>
//     </div>

//     {/* RIGHT CONTENT STARTS HERE */}
//       {/* Top Statistics */}
//       <div className="grid md:grid-cols-2 gap-6">

//         <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-slate-800 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-gray-500 dark:text-gray-400">
//                 Total Bookings
//               </p>

//               <h2 className="text-5xl font-bold text-emerald-600 mt-2">
//                 100
//               </h2>

//               <p className="mt-3 text-gray-500">
//                 Sessions Completed
//               </p>
//             </div>

//             <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-4xl">
//               📚
//             </div>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-slate-800 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-gray-500 dark:text-gray-400">
//                 Upcoming Sessions
//               </p>

//               <h2 className="text-5xl font-bold text-emerald-600 mt-2">
//                 12
//               </h2>

//               <p className="mt-3 text-gray-500">
//                 Scheduled
//               </p>
//             </div>

//             <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-4xl">
//               📅
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* Progress Cards */}
//       <div className="grid lg:grid-cols-2 gap-6">

//         <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-gray-200 dark:border-slate-800 p-6 hover:shadow-2xl transition">

//           <h2 className="text-2xl font-bold dark:text-white mb-6">
//             Learning Progress
//           </h2>

//           <div className="flex items-center gap-8">

//             <div className="relative w-36 h-36 rounded-full border-[12px] border-emerald-500 flex items-center justify-center">

//               <span className="text-4xl font-bold text-emerald-600">
//                 80%
//               </span>

//             </div>

//             <div>

//               <h3 className="text-xl font-bold dark:text-white">
//                 MERN Stack
//               </h3>

//               <p className="text-gray-500 mt-2">
//                 Completed Lessons
//               </p>

//               <h4 className="text-3xl font-bold mt-3 text-emerald-600">
//                 90 / 110
//               </h4>

//             </div>

//           </div>

//         </div>

//         <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-gray-200 dark:border-slate-800 p-6 hover:shadow-2xl transition">

//           <h2 className="text-2xl font-bold dark:text-white mb-6">
//             Performance
//           </h2>

//           <div className="flex items-center gap-8">

//             <div className="relative w-36 h-36 rounded-full border-[12px] border-amber-400 flex items-center justify-center">

//               <span className="text-4xl font-bold text-amber-500">
//                 92%
//               </span>

//             </div>

//             <div>

//               <h3 className="text-xl font-bold dark:text-white">
//                 Success Rate
//               </h3>

//               <p className="text-gray-500 mt-2">
//                 Overall Performance
//               </p>

//               <h4 className="text-3xl font-bold mt-3 text-amber-500">
//                 Excellent
//               </h4>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* Progress Chart */}
//       <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-gray-200 dark:border-slate-800 p-8">

//         <div className="flex items-center justify-between mb-8">

//           <h2 className="text-3xl font-bold dark:text-white">
//             Weekly Progress
//           </h2>

//           <span className="px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 font-semibold">
//             +32%
//           </span>

//         </div>

//         <div className="space-y-6">

//           {[
//             ["Monday", 80],
//             ["Tuesday", 65],
//             ["Wednesday", 90],
//             ["Thursday", 70],
//             ["Friday", 95],
//             ["Saturday", 75],
//             ["Sunday", 88],
//           ].map(([day, value]) => (

//             <div key={day as string}>

//               <div className="flex justify-between mb-2">

//                 <span className="font-medium dark:text-white">
//                   {day}
//                 </span>

//                 <span className="text-emerald-600 font-bold">
//                   {value}%
//                 </span>

//               </div>

//               <div className="h-3 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">

//                 <div
//                   className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000"
//                   style={{ width: `${value}%` }}
//                 />

//               </div>

//             </div>

//           ))}

//         </div>

//       </div>

//     </div>
//   </div>
// </main>
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Trophy,
  Puzzle,
  Atom,
  Brain,
  Award,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Profile {
  name: string;
  email: string;
  image?: string;
  role: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editMode, setEditMode] = useState(false);

  // ✅ GET PROFILE
  useEffect(() => {
    fetch(`${API_URL}/api/me`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
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
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Profile
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage your account information and learning progress.
          </p>
        </div>
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg p-8">
          <p className="text-slate-500 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Profile
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Manage your account information and learning progress.
        </p>
      </div>

      <div className="grid xl:grid-cols-3 gap-8">
        {/* LEFT COLUMN - Profile Card */}
        <div className="xl:col-span-1">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            {/* Avatar + Edit toggle */}
            <div className="flex flex-col items-center">
              <Image
                src={profile.image || "/avatar.png"}
                alt="Profile"
                width={110}
                height={110}
                className="rounded-3xl object-cover ring-4 ring-emerald-100 dark:ring-emerald-900"
              />
              <h2 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
                {profile.name}
              </h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                {profile.email}
              </p>
              <p className="mt-3 inline-block bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-1 rounded-full text-sm font-semibold">
                {profile.role}
              </p>

              <div className="mt-5">
                {!editMode ? (
                  <Button onClick={() => setEditMode(true)}>
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
              <div className="mt-8 space-y-5 border-t border-slate-200 dark:border-slate-800 pt-8">
                <div>
                  <label className="font-medium block mb-2 text-slate-900 dark:text-white">
                    Name
                  </label>
                  <Input
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="font-medium block mb-2 text-slate-900 dark:text-white">
                    Email
                  </label>
                  <Input value={profile.email} disabled />
                </div>

                <div>
                  <label className="font-medium block mb-2 text-slate-900 dark:text-white">
                    Image URL
                  </label>
                  <Input
                    value={profile.image || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, image: e.target.value })
                    }
                  />
                </div>

                <Button onClick={handleUpdate} className="w-full">
                  Save Changes
                </Button>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-5">
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Points
                </p>
                <h3 className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">
                  2300
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-5">
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Certificates
                </p>
                <h3 className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">
                  50
                </h3>
              </div>
            </div>

            {/* Achievements */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Achievements
              </h3>
              <div className="flex flex-wrap gap-3">
                <div className="h-14 w-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Trophy className="text-emerald-600" />
                </div>
                <div className="h-14 w-14 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Puzzle className="text-purple-600" />
                </div>
                <div className="h-14 w-14 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <Atom className="text-orange-500" />
                </div>
                <div className="h-14 w-14 rounded-2xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                  <Brain className="text-pink-500" />
                </div>
                <div className="h-14 w-14 rounded-2xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                  <Award className="text-yellow-600" />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Bio
              </h3>
              <p className="mt-4 text-slate-600 dark:text-slate-400 leading-8">
                Passionate learner focused on technology, programming,
                mentoring and continuous self-development. Always interested
                in learning modern software engineering and building
                impactful products.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="xl:col-span-2 space-y-6">
          {/* Top Statistics */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-500 dark:text-slate-400">
                    Total Bookings
                  </p>
                  <h2 className="text-5xl font-bold text-emerald-600 mt-2">
                    100
                  </h2>
                  <p className="mt-3 text-slate-500">Sessions Completed</p>
                </div>
                <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-4xl">
                  📚
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-500 dark:text-slate-400">
                    Upcoming Sessions
                  </p>
                  <h2 className="text-5xl font-bold text-emerald-600 mt-2">
                    12
                  </h2>
                  <p className="mt-3 text-slate-500">Scheduled</p>
                </div>
                <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-4xl">
                  📅
                </div>
              </div>
            </div>
          </div>

          {/* Progress Cards */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-2xl transition">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Learning Progress
              </h2>
              <div className="flex items-center gap-8">
                <div className="relative w-36 h-36 rounded-full border-[12px] border-emerald-500 flex items-center justify-center">
                  <span className="text-4xl font-bold text-emerald-600">
                    80%
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    MERN Stack
                  </h3>
                  <p className="text-slate-500 mt-2">Completed Lessons</p>
                  <h4 className="text-3xl font-bold mt-3 text-emerald-600">
                    90 / 110
                  </h4>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-2xl transition">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Performance
              </h2>
              <div className="flex items-center gap-8">
                <div className="relative w-36 h-36 rounded-full border-[12px] border-amber-400 flex items-center justify-center">
                  <span className="text-4xl font-bold text-amber-500">
                    92%
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Success Rate
                  </h3>
                  <p className="text-slate-500 mt-2">Overall Performance</p>
                  <h4 className="text-3xl font-bold mt-3 text-amber-500">
                    Excellent
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Progress Chart */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Weekly Progress
              </h2>
              <span className="px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 font-semibold">
                +32%
              </span>
            </div>

            <div className="space-y-6">
              {(
                [
                  ["Monday", 80],
                  ["Tuesday", 65],
                  ["Wednesday", 90],
                  ["Thursday", 70],
                  ["Friday", 95],
                  ["Saturday", 75],
                  ["Sunday", 88],
                ] as [string, number][]
              ).map(([day, value]) => (
                <div key={day}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-slate-900 dark:text-white">
                      {day}
                    </span>
                    <span className="text-emerald-600 font-bold">
                      {value}%
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
