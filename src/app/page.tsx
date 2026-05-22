// "use client";

// // src/app/page.tsx

// import Image from "next/image";
// import Link from "next/link";
// import {
//   Search,
//   ArrowRight,
//   ChevronDown,
//   Phone,
//   Video,
//   Mic,
// } from "lucide-react";

// import { motion } from "framer-motion";

// export default function HomePage() {
//   return (
//     <main className="min-h-screen bg-white">
//       {/* Top Bar */}
//       <div className="bg-[#262626] text-white">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <h1 className="text-2xl font-bold">
//             <span className="text-green-500">envato</span>market
//           </h1>

//           <button className="bg-[#82b440] hover:bg-[#6f9d34] transition px-5 py-2 rounded text-sm font-medium">
//             Buy now
//           </button>
//         </div>
//       </div>

//       {/* Navbar */}
//       <header className="border-b">
//         <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
//               M
//             </div>

//             <h1 className="text-3xl font-bold tracking-tight">
//               MENTORING
//             </h1>
//           </div>

//           {/* Nav Links */}
//           <nav className="hidden lg:flex items-center gap-10">
//             {[
//               "Home",
//               "Mentor",
//               "Pages",
//               "Courses",
//               "Blog",
//             ].map((item) => (
//               <div
//                 key={item}
//                 className="flex items-center gap-1 text-[17px] font-medium cursor-pointer hover:text-emerald-600 transition"
//               >
//                 {item}
//                 <ChevronDown size={16} />
//               </div>
//             ))}

//             <Link
//               href="#"
//               className="text-[17px] font-medium hover:text-emerald-600 transition"
//             >
//               Contact us
//             </Link>
//           </nav>

//           {/* Auth Buttons */}
//           <div className="flex items-center gap-4">
//             <button className="border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white transition px-8 py-3 rounded-md font-medium">
//               Login
//             </button>

//             <button className="border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white transition px-8 py-3 rounded-md font-medium">
//               Register
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="bg-[#056f5b] relative overflow-hidden">
//         <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-10 items-center">
//           {/* Left Content */}
//           <div className="text-white">
//             <div className="inline-flex bg-[#0b7e68] px-6 py-3 rounded-full text-lg font-medium mb-8">
//               Top Rated Mentors From Around the World
//             </div>

//             <h1 className="text-6xl leading-tight font-bold">
//               Accelerate Your Success with
//               <br />
//               Expert{" "}
//               <span className="text-lime-400">
//                 Mentorship
//               </span>
//             </h1>

//             <p className="text-2xl text-gray-200 mt-8 leading-relaxed max-w-2xl">
//               Get one on one guidance from verified mentors
//               across career, business, tech, and personal
//               development.
//             </p>

//             {/* Search Box */}
//             <div className="bg-white rounded-full p-2 mt-12 flex items-center justify-between max-w-3xl shadow-2xl">
//               <div className="flex items-center gap-3 px-4 flex-1">
//                 <Search className="text-gray-500" size={22} />

//                 <input
//                   type="text"
//                   placeholder="Search for a mentor or topic..."
//                   className="w-full outline-none text-gray-700 text-lg"
//                 />
//               </div>

//               <div className="h-10 w-[1px] bg-gray-300 hidden md:block" />

//               <div className="hidden md:flex items-center gap-2 px-6 text-gray-700 font-medium">
//                 All Categories
//                 <ChevronDown size={18} />
//               </div>

//               <button className="w-16 h-16 rounded-full bg-[#056f5b] hover:bg-[#045746] transition flex items-center justify-center text-white">
//                 <ArrowRight size={28} />
//               </button>
//             </div>
//           </div>

//           {/* Right Content */}
//           <div className="relative flex justify-center">
//             <div className="absolute w-[430px] h-[430px] bg-[#045746] rounded-[40px] rotate-6 top-10" />

//             <div className="relative z-10">
//               <Image
//                 src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
//                 alt="Mentor"
//                 width={500}
//                 height={650}
//                 className="object-cover rounded-3xl"
//               />
//             </div>

//             {/* Floating Controls */}
//             <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
//               <button className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
//                 <Mic size={28} />
//               </button>

//               <button className="w-20 h-20 bg-red-500 rounded-full shadow-lg flex items-center justify-center text-white">
//                 <Phone size={28} />
//               </button>

//               <button className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
//                 <Video size={28} />
//               </button>
//             </div>

//             <div className="absolute top-10 right-10 text-yellow-400 text-7xl">
//               ✷
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="bg-[#f7f7f7] py-20">
//         <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">

//           {/* Left Side Images */}
//           <div className="relative mx-auto w-full max-w-[560px]">
//             <div className="grid grid-cols-2 gap-4">

//               {/* Top Left */}
//               <div className="overflow-hidden rounded-[40px] bg-[#ead9e6] h-[260px]">
//                 <Image
//                   src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
//                   alt="Students"
//                   width={500}
//                   height={500}
//                   className="h-full w-full object-cover"
//                 />
//               </div>

//               {/* Top Right */}
//               <div className="overflow-hidden rounded-[40px] rounded-tl-[80px] bg-[#d9d9f3] h-[260px] mt-10">
//                 <Image
//                   src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
//                   alt="Student"
//                   width={500}
//                   height={500}
//                   className="h-full w-full object-cover"
//                 />
//               </div>

//               {/* Bottom Left */}
//               <div className="overflow-hidden rounded-[40px] rounded-br-[80px] bg-[#ece7dd] h-[260px] -mt-6">
//                 <Image
//                   src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df"
//                   alt="Writing"
//                   width={500}
//                   height={500}
//                   className="h-full w-full object-cover"
//                 />
//               </div>

//               {/* Bottom Right */}
//               <div className="overflow-hidden rounded-[40px] bg-[#eedad7] h-[260px]">
//                 <Image
//                   src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
//                   alt="Mentor"
//                   width={500}
//                   height={500}
//                   className="h-full w-full object-cover"
//                 />
//               </div>
//             </div>

//             {/* Center Circle */}
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{
//                 repeat: Infinity,
//                 duration: 12,
//                 ease: "linear",
//               }}
//               className="absolute left-1/2 top-1/2 z-10 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1f9d8b] shadow-xl"
//             >
//               <div className="flex h-28 w-28 items-center justify-center rounded-full border border-dashed border-white text-center text-sm font-semibold tracking-[0.3em] text-white">
//                 MENTORING
//               </div>
//             </motion.div>
//           </div>

//           {/* Right Side Content */}
//           <div>
//             <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#1f9d8b]">
//               About Us
//             </p>

//             <h2 className="max-w-xl text-4xl font-extrabold leading-tight text-[#111] md:text-6xl">
//               Learn More About Who We Are
//             </h2>

//             <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
//               We are a dedicated mentoring platform connecting learners with
//               experienced industry professionals.
//             </p>

//             {/* Mission & Vision */}
//             <div className="mt-14 grid gap-10 md:grid-cols-2">

//               {/* Mission */}
//               <div>
//                 <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-black shadow-md">
//                   <div className="h-8 w-8 rounded-full border border-[#1f9d8b] flex items-center justify-center text-[#1f9d8b]">
//                     ✦
//                   </div>
//                 </div>

//                 <h3 className="text-3xl font-bold text-[#111]">
//                   Our Mission
//                 </h3>

//                 <p className="mt-4 text-lg leading-8 text-gray-600">
//                   Our mission is to connect learners with expert mentors.
//                 </p>
//               </div>

//               {/* Vision */}
//               <div>
//                 <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-black shadow-md">
//                   <div className="h-8 w-8 rounded-full border border-[#1f9d8b] flex items-center justify-center text-[#1f9d8b]">
//                     ✦
//                   </div>
//                 </div>

//                 <h3 className="text-3xl font-bold text-[#111]">
//                   Our Vision
//                 </h3>

//                 <p className="mt-4 text-lg leading-8 text-gray-600">
//                   Our vision is to transform the way people learn and grow.
//                 </p>
//               </div>

//             </div>
//           </div>
//         </div>
//       </section>
//       {/* How It Works Section */}
// {/* How It Works Section */}
// <section className="bg-[#f5f7ef] py-24 overflow-hidden">
//   <div className="max-w-7xl mx-auto px-6">

//     {/* Section Heading */}
//     <div className="text-center">

//       {/* Booking Journey */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         viewport={{ once: true }}
//         className="flex items-center justify-center gap-4 mb-5"
//       >
//         <span className="text-[#0b6b5b] font-semibold text-xl">
//           Booking Journey
//         </span>

//         {/* Animated Line */}
//         <motion.div
//           initial={{ width: 0 }}
//           whileInView={{ width: 60 }}
//           transition={{ duration: 1 }}
//           viewport={{ once: true }}
//           className="h-[2px] bg-[#0b6b5b]"
//         />
//       </motion.div>

//       <h2 className="text-5xl font-extrabold text-[#15151d]">
//         See How It Works
//       </h2>
//     </div>

//     {/* Cards */}
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-24">

//       {/* Card 1 */}
//       <motion.div
//         whileHover={{ y: -10 }}
//         transition={{ duration: 0.3 }}
//         className="relative bg-[#f7f4f4] rounded-[30px] px-10 pt-24 pb-14 text-center overflow-visible"
//       >

//         {/* Icon */}
//         <div className="absolute left-1/2 -top-14 -translate-x-1/2 w-28 h-28 rounded-[28px] bg-black flex items-center justify-center shadow-2xl z-20">
//           <Search size={46} className="text-white" />
//         </div>

//         {/* Number */}
//         <h1 className="absolute right-7 top-7 text-6xl font-extrabold text-transparent [-webkit-text-stroke:2px_#1dd1a1]">
//           01
//         </h1>

//         <h3 className="text-4xl font-bold text-[#1a1a22] mt-2">
//           Discover Mentors
//         </h3>

//         <p className="text-gray-500 text-lg leading-9 mt-5">
//           Browse experts across career, tech, and personal
//           development.
//         </p>

//         {/* Decoration */}
//         <div className="absolute bottom-0 right-0 text-6xl opacity-70">
//           🍃
//         </div>
//       </motion.div>

//       {/* Card 2 */}
//       <motion.div
//         whileHover={{ y: -10 }}
//         transition={{ duration: 0.3 }}
//         className="relative bg-[#f7f4f4] rounded-[30px] px-10 pt-24 pb-14 text-center overflow-visible"
//       >

//         {/* Icon */}
//         <div className="absolute left-1/2 -top-14 -translate-x-1/2 w-28 h-28 rounded-[28px] bg-black flex items-center justify-center shadow-2xl z-20">
//           <Video size={46} className="text-white" />
//         </div>

//         {/* Number */}
//         <h1 className="absolute right-7 top-7 text-6xl font-extrabold text-transparent [-webkit-text-stroke:2px_#1dd1a1]">
//           02
//         </h1>

//         <h3 className="text-4xl font-bold text-[#1a1a22] mt-2">
//           Book Your Session
//         </h3>

//         <p className="text-gray-500 text-lg leading-9 mt-5">
//           Schedule one-on-one mentoring sessions with your
//           preferred experts.
//         </p>

//         {/* Decoration */}
//         <div className="absolute bottom-0 right-0 text-6xl opacity-70">
//           🍃
//         </div>
//       </motion.div>

//       {/* Card 3 */}
//       <motion.div
//         whileHover={{ y: -10 }}
//         transition={{ duration: 0.3 }}
//         className="relative bg-[#f7f4f4] rounded-[30px] px-10 pt-24 pb-14 text-center overflow-visible"
//       >

//         {/* Icon */}
//         <div className="absolute left-1/2 -top-14 -translate-x-1/2 w-28 h-28 rounded-[28px] bg-black flex items-center justify-center shadow-2xl z-20">
//           <Mic size={46} className="text-white" />
//         </div>

//         {/* Number */}
//         <h1 className="absolute right-7 top-7 text-6xl font-extrabold text-transparent [-webkit-text-stroke:2px_#1dd1a1]">
//           03
//         </h1>

//         <h3 className="text-4xl font-bold text-[#1a1a22] mt-2">
//           Get Guidance
//         </h3>

//         <p className="text-gray-500 text-lg leading-9 mt-5">
//           Receive valuable insights, mentorship, and career
//           guidance.
//         </p>

//         {/* Decoration */}
//         <div className="absolute bottom-0 right-0 text-6xl opacity-70">
//           🍃
//         </div>
//       </motion.div>
//     </div>
//   </div>
// </section>
//     </main>
//   );
// }

// src/app/page.tsx
// src/app/page.tsx


import Navbar from "@/components/layout/Navbar";

import HeroSection from "@/components/ui/home/HeroSection";

// import AboutSection from "@/components/home/AboutSection";
// import HowItWorksSection from "@/components/home/HowItWorksSection";

import { TutorCard } from "@/components/tutor/TutorCard";

import { getTutors } from "@/services/tutor.service";
import { Tutor } from "@/types/tutor";
import AboutSection from "@/components/ui/home/AboutSection";
import HowItWorksSection from "@/components/ui/home/HowItWorksSection";
import Footer from "@/components/layout/Footer";

export default async function HomePage() {

const response = await getTutors();

const tutors = response.data;

  return (
    <main className="min-h-screen bg-white">

      {/* Top */}


      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* Featured Tutors */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        {/* Heading */}
        <div className="text-center mb-16">

          <p className="text-emerald-600 font-semibold uppercase tracking-[0.2em]">
            Featured Tutors
          </p>

          <h2 className="text-5xl font-bold mt-4 text-[#111]">
            Meet Our Best Teachers
          </h2>

          <p className="text-gray-500 mt-6 text-lg max-w-2xl mx-auto">
            Learn from experienced professionals
            across technology, business, and design.
          </p>

        </div>

        {/* Tutor Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

  {tutors?.map((tutor: Tutor) => (
    <TutorCard
      key={tutor.id}
      tutor={tutor}
    />
  ))}

        </div>

      </section>

      {/* About */}
      <AboutSection />

      {/* How It Works */}
      <HowItWorksSection />
      <Footer/>

    </main>
  );
}