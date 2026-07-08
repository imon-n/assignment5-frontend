


import Navbar from "@/components/layout/Navbar";

import HeroSection from "@/components/ui/home/HeroSection";


import { TutorCard } from "@/components/tutor/TutorCard";
import Features from "@/components/home/Features";
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

 {tutors?.slice(0, 4).map((tutor: Tutor) => (
  <TutorCard
    key={tutor.id}
    tutor={tutor}
  />
))}

        </div>

      </section>
   <Features />
      {/* About */}
      <AboutSection />

      {/* How It Works */}
      <HowItWorksSection />
      <Footer/>

    </main>
  );
}