// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";

// export default function AboutSection() {
//   return (
//     <section className="bg-white py-24">
//       <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 px-6 lg:grid-cols-2">

//         {/* LEFT VISUAL */}
//         <div className="relative mx-auto w-full max-w-[560px]">

//           <div className="grid grid-cols-2 gap-5">

//             <div className="h-[240px] overflow-hidden rounded-[30px] bg-gray-100">
//               <Image
//                 src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
//                 alt="learning"
//                 width={500}
//                 height={500}
//                 className="h-full w-full object-cover"
//               />
//             </div>

//             <div className="mt-10 h-[240px] overflow-hidden rounded-[30px] rounded-tl-[70px] bg-gray-100">
//               <Image
//                 src="https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?q=80&w=1200&auto=format&fit=crop"
//                 alt="students"
//                 width={500}
//                 height={500}
//                 className="h-full w-full object-cover"
//               />
//             </div>

//             <div className="-mt-6 h-[240px] overflow-hidden rounded-[30px] rounded-br-[70px] bg-gray-100">
//               <Image
//                 src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
//                 alt="study"
//                 width={500}
//                 height={500}
//                 className="h-full w-full object-cover"
//               />
//             </div>

//             <div className="h-[240px] overflow-hidden rounded-[30px] bg-gray-100">
//               <Image
//                 src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop"
//                 alt="mentor"
//                 width={500}
//                 height={500}
//                 className="h-full w-full object-cover"
//               />
//             </div>

//           </div>

//           {/* CENTER BADGE */}
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{
//               repeat: Infinity,
//               duration: 14,
//               ease: "linear",
//             }}
//             className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-teal-600 shadow-2xl"
//           >
//             <div className="flex h-28 w-28 items-center justify-center rounded-full border border-dashed border-white text-xs font-semibold tracking-[0.3em] text-white">
//               LEARNING
//             </div>
//           </motion.div>

//         </div>

//         {/* RIGHT CONTENT */}
//         <div>

//           <p className="text-lg font-semibold uppercase tracking-[0.3em] text-teal-600">
//             About Us
//           </p>

//           <h2 className="mt-4 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
//             Building Future Through Mentorship
//           </h2>

//           <p className="mt-6 text-lg leading-8 text-gray-600">
//             We connect students with real industry mentors to help them grow, learn, and build practical skills for the future.
//           </p>

//           {/* CARDS */}
//           <div className="mt-10 grid gap-8 md:grid-cols-2">

//             <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
//             <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-black shadow-md"> <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1f9d8b] text-[#1f9d8b]"> ✦ </div> </div>
//               <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
//               <p className="mt-2 text-gray-600">
//                 To empower learners with expert guidance and real-world experience.
//               </p>
//             </div>

//             <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
//              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-black shadow-md"> <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1f9d8b] text-[#1f9d8b]"> ✦ </div> </div>
//               <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
//               <p className="mt-2 text-gray-600">
//                 To create a global learning ecosystem driven by mentorship.
//               </p>
//             </div>

//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="bg-white py-16 transition-colors duration-300 dark:bg-zinc-950 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-20">

        {/* LEFT */}
        <div className="relative mx-auto w-full max-w-[580px]">

          <div className="grid grid-cols-2 gap-3 sm:gap-5">

            <div className="h-40 overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-800 sm:h-56 lg:h-64 lg:rounded-[30px]">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
                alt="learning"
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-6 h-40 overflow-hidden rounded-2xl rounded-tl-[50px] bg-gray-100 dark:bg-zinc-800 sm:mt-10 sm:h-56 lg:h-64 lg:rounded-tl-[70px]">
              <Image
                src="https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?q=80&w=1200&auto=format&fit=crop"
                alt="students"
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="-mt-4 h-40 overflow-hidden rounded-2xl rounded-br-[50px] bg-gray-100 dark:bg-zinc-800 sm:-mt-6 sm:h-56 lg:h-64 lg:rounded-br-[70px]">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                alt="study"
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="h-40 overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-800 sm:h-56 lg:h-64 lg:rounded-[30px]">
              <Image
                src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop"
                alt="mentor"
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>

          </div>

          {/* CENTER BADGE */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 14,
              ease: "linear",
            }}
            className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-teal-600 shadow-2xl sm:h-28 sm:w-28 lg:h-36 lg:w-36"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-white text-[9px] font-semibold tracking-[0.25em] text-white sm:h-20 sm:w-20 sm:text-[10px] lg:h-28 lg:w-28 lg:text-xs">
              LEARNING
            </div>
          </motion.div>

        </div>

        {/* RIGHT */}
        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-600 sm:text-base lg:text-lg">
            About Us
          </p>

          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-4xl lg:mt-4 lg:text-5xl">
            Building Future Through Mentorship
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 dark:text-zinc-400 sm:text-lg sm:leading-8">
            We connect students with real industry mentors to help them grow,
            learn, and build practical skills for the future.
          </p>

          {/* CARDS */}
          <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2 md:gap-6 lg:gap-8">

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-black shadow-md dark:bg-zinc-800 sm:h-16 sm:w-16">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-teal-500 text-teal-500">
                  ✦
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Our Mission
              </h3>

              <p className="mt-2 text-gray-600 dark:text-zinc-400">
                To empower learners with expert guidance and real-world
                experience.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-black shadow-md dark:bg-zinc-800 sm:h-16 sm:w-16">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-teal-500 text-teal-500">
                  ✦
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Our Vision
              </h3>

              <p className="mt-2 text-gray-600 dark:text-zinc-400">
                To create a global learning ecosystem driven by mentorship.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}