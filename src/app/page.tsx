import Navbar from "@/components/layout/Navbar";

import HeroSection from "@/components/ui/home/HeroSection";

import { TutorCard } from "@/components/tutor/TutorCard";
import Features from "@/components/ui/home/Features";
import { getTutors } from "@/services/tutor.service";
import { Tutor } from "@/types/tutor";
import AboutSection from "@/components/ui/home/AboutSection";
import HowItWorksSection from "@/components/ui/home/HowItWorksSection";
import Footer from "@/components/layout/Footer";
import FAQ from "@/components/ui/home/FAQ";
import Testimonials from "@/components/ui/home/TestimonialsTestimonials";
import BlogSection from "@/components/ui/home/BlogSection";

export default async function HomePage() {
  const response = await getTutors();

  const tutors = response.data;

  return (
    <main className="min-h-screen bg-white transition-colors duration-300 dark:bg-zinc-950">

      {/* Top */}
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* Featured Tutors */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        {/* Heading */}
        <div className="mb-12 text-center lg:mb-16">

          <div className="flex items-center justify-center gap-3 mb-3">

            <span className="text-sm font-semibold uppercase tracking-[4px] text-[#1f9d8b] sm:text-base">
              Featured Tutors
            </span>

            <div className="relative h-[2px] w-16 overflow-hidden rounded-full bg-[#1f9d8b]/20">
              <span className="absolute inset-y-0 left-0 w-8 rounded-full bg-[#1f9d8b] animate-[slide_2s_linear_infinite]" />
            </div>

          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Meet Our Best Teachers
          </h2>

        </div>

        {/* Tutor Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {tutors?.slice(0, 4).map((tutor: Tutor) => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
            />
          ))}

        </div>

      </section>

      <Features />

      <Testimonials />

      <FAQ />

      {/* About */}
      <AboutSection />

      {/* How It Works */}
      <HowItWorksSection />

      <BlogSection />

      <Footer />

    </main>
  );
}