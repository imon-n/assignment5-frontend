
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Tutor } from "@/types/tutor";

export default function TutorsPage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  // 🔍 filters (NEW)
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchTutors = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams();

      if (search) query.append("search", search);
      if (category) query.append("category", category);
      if (minRating) query.append("minRating", minRating);
      if (maxPrice) query.append("maxPrice", maxPrice);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tutors?${query.toString()}`
      );
      console.log(process.env.NEXT_PUBLIC_API_URL)

      const data = await res.json();

      setTutors(data.data || []);
      setPage(1); // reset page on filter
    } catch (err) {
      console.error("Error fetching tutors:", err);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  fetchTutors();
}, []);

  const totalPages = Math.ceil(tutors.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const paginatedData = tutors.slice(start, start + itemsPerPage);

  if (loading) {
    return <p className="p-6">Loading tutors...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 mt-28">

      {/* LEFT FILTER (UNCHANGED DESIGN + only added state) */}
   <div className="w-full md:w-1/4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm h-fit">
  {/* HEADER */}
  <div className="mb-5">
    <h2 className="text-xl font-semibold text-gray-800">
      Search Filter
    </h2>

    <p className="text-sm text-gray-500 mt-1">
     
    </p>
  </div>

  {/* SEARCH */}
  <input
    className="w-full border border-gray-200 focus:border-green-700 focus:ring-2 focus:ring-green-100 outline-none px-4 py-3 rounded-xl mb-3 text-sm transition"
    placeholder="Search tutor or subject"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  {/* CATEGORY */}
  <select
    className="w-full border border-gray-200 focus:border-green-700 focus:ring-2 focus:ring-green-100 outline-none px-4 py-3 rounded-xl mb-3 text-sm transition"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="">All Categories</option>
    <option value="Web Development">
      Web Development
    </option>
    <option value="Full Stack">
      Full Stack
    </option>
    <option value="UI/UX Design">
      UI/UX Design
    </option>
  </select>

  {/* RATING */}
  <select
    className="w-full border border-gray-200 focus:border-green-700 focus:ring-2 focus:ring-green-100 outline-none px-4 py-3 rounded-xl mb-3 text-sm transition"
    value={minRating}
    onChange={(e) => setMinRating(e.target.value)}
  >
    <option value="">Any Rating</option>
    <option value="4">4★ & Above</option>
    <option value="3">3★ & Above</option>
  </select>

  {/* PRICE */}
  <input
    type="number"
    className="w-full border border-gray-200 focus:border-green-700 focus:ring-2 focus:ring-green-100 outline-none px-4 py-3 rounded-xl mb-4 text-sm transition"
    placeholder="Max Price"
    value={maxPrice}
    onChange={(e) => setMaxPrice(e.target.value)}
  />

  {/* BUTTON */}
  <button
    onClick={fetchTutors}
    className="w-full bg-[#005C53] hover:bg-[#004840] text-white py-3 rounded-xl text-sm font-medium transition-all duration-300"
  >
    Search Tutors
  </button>
</div>

      {/* RIGHT CONTENT (UNCHANGED) */}
      <div className="w-full md:w-3/4 space-y-6">

        {paginatedData.map((tutor) => (
          <div
            key={tutor.id}
            className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row justify-between"
          >
            <div className="flex gap-4">
              <img
                src={tutor.image}
                className="w-28 h-28 rounded object-cover"
                alt={tutor.user.name}
              />

              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  {tutor.user.name}
                  <span className="text-green-500">✔</span>
                </h2>

                <p className="text-gray-500">{tutor.category.name}</p>

                <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>

                <p className="text-sm">{tutor.rating} Rating</p>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
              <p className="font-semibold">${tutor.hourlyRate}/hr</p>

              <p className="text-gray-500 text-sm max-w-xs text-right">
                {tutor.bio}
              </p>

<Link
  href={`/tutors/${tutor.id}`}
  className="bg-green-900 text-white px-4 py-2 rounded mt-2 inline-block"
>
  View Profile
</Link>
            </div>
          </div>
        ))}

        {/* PAGINATION (UNCHANGED) */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1 ? "bg-green-900 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}


// app/profile/page.tsx

// import { MapPin } from "lucide-react";

// export default function ProfilePage() {
//   return (
//     <div className="bg-[#f5f5f5] min-h-screen p-6 mt-24">
      
//             <div className="w-full bg-[#006B5E] hover:bg-[#00564c] text-white text-xl font-semibold py-4 rounded-md transition mt-4 mb-8">
//               Add Feedback
//             </div>
           
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
//         {/* LEFT SIDE */}
//         <div className="lg:col-span-2 space-y-6">
          
//           {/* ABOUT ME */}
//           <div className="bg-white border border-gray-200 rounded-md p-6">
//             <div className="bg-gray-100 rounded-md px-5 py-4 mb-6">
//               <h2 className="text-3xl font-bold text-[#111827]">
//                 About Me
//               </h2>
//             </div>

//             <p className="text-gray-600 leading-8 text-lg">
//               Lorem Ipsum is simply dummy text of the printing and
//               typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown
//               printer took a galley of type and scrambled it to make a
//               type specimen book. It has survived not only five centuries,
//               but also the leap into electronic typesetting, remaining
//               essentially unchanged.
//             </p>
//           </div>

//           {/* LOCATION */}
//           <div className="bg-white border border-gray-200 rounded-md p-6">
//             <div className="bg-gray-100 rounded-md px-5 py-4 mb-6">
//               <h2 className="text-3xl font-bold text-[#111827]">
//                 Location
//               </h2>
//             </div>

//             <div>
//               <h3 className="text-2xl font-bold text-[#1F2A5A] mb-3">
//                 Dreamguys Institute
//               </h3>

//               <div className="flex items-start gap-2 text-gray-600 text-lg">
//                 <MapPin className="w-5 h-5 mt-1 text-gray-500" />
//                 <p>No : 5 ABC Avenue,National highway road.</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="space-y-6">
          
//           {/* BUTTONS */}
//           <div className="space-y-4">
//             <button className="w-full bg-[#006B5E] hover:bg-[#00564c] text-white text-xl font-semibold py-4 rounded-md transition">
//               Add Feedback
//             </button>

//             <button className="w-full border-2 border-[#006B5E] text-[#006B5E] hover:bg-[#006B5E] hover:text-white text-xl font-semibold py-4 rounded-md transition">
//               Book Appointment
//             </button>
//           </div>

//           {/* LANGUAGES */}
//           <div className="bg-white border border-gray-200 rounded-md p-6">
//             <div className="bg-gray-100 rounded-md px-5 py-4 mb-6">
//               <h2 className="text-3xl font-bold text-[#111827]">
//                 Languages
//               </h2>
//             </div>

//             <div className="flex gap-4 flex-wrap">
//               <span className="bg-[#EAF4F7] text-[#006B5E] px-6 py-3 rounded-md text-lg font-medium">
//                 English
//               </span>

//               <span className="bg-[#EAF4F7] text-[#006B5E] px-6 py-3 rounded-md text-lg font-medium">
//                 German
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }