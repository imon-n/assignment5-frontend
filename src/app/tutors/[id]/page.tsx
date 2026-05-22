// import TutorClient from "@/components/tutor/TutorClient";
// import { MapPin } from "lucide-react";

// type Props = {
//   params: Promise<{
//     id: string;
//   }>;
// };

// async function getTutor(id: string) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/tutors/${id}`,
//     { cache: "no-store" }
//   );
// console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/tutors/${id}`)
//   const data = await res.json();

//   return data;
// }

// // export default async function TutorDetailsPage({ params }: Props) {
// //   const { id } = await params;
// // // ✅ IMPORTANT FIX

// //   const response = await getTutor(id);
// // console.log(response)



// //   const tutor = response.data;

// //   return (
// //     <div className="bg-[#f5f5f5] min-h-screen p-6 mt-24">

// //       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

// //         {/* LEFT */}
// //         <div className="lg:col-span-2 space-y-6">

// //           <div className="bg-white border rounded-md p-6 flex gap-6 items-center">
// //             <img
// //               src={tutor?.image}
// //               alt={tutor?.user?.name}
// //               className="w-40 h-40 object-cover rounded-lg"
// //             />

// //             <div>
// //               <h1 className="text-4xl font-bold">
// //                 {tutor?.user?.name}
// //               </h1>

// //               <p className="text-gray-500">
// //                 {tutor?.category?.name}

// //               </p>

// //               <p className="text-green-700 font-semibold mt-2">
// //                 ${tutor?.hourlyRate}/hr
// //               </p>
// //             </div>
// //           </div>

// //           <div className="bg-white p-6 rounded-md">
// //             <h2 className="text-2xl font-bold mb-3">About Me</h2>
// //             <p>{tutor?.bio}</p>
// //             <p>
// //                 Passionate educator dedicated to making learning simple, clear, and engaging for every student.
// // Focuses on building strong conceptual understanding rather than memorization.
// // Encourages curiosity, confidence, and consistent improvement in academic performance.
// // Committed to guiding students with patience, care, and real-world teaching experience.</p>
// //           </div>

// //         </div>

// //         {/* RIGHT */}
// //         <div className="space-y-4">
// //           <button className="w-full bg-green-700 text-white py-3 rounded-md">
// //             Add Feedback
// //           </button>

// //           <button className="w-full border border-green-700 text-green-700 py-3 rounded-md">
// //             Book Appointment
// //           </button>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// export default async function TutorDetailsPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const data = await getTutor(params.id);

//   return <TutorClient tutor={data.data} id={params.id} />;
// }


import TutorClient from "@/components/tutor/TutorClient";

async function getTutor(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tutors/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getTutor(id);

  return (
    <TutorClient
      tutor={data.data}
      id={id}
    />
  );
}