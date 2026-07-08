import Image from "next/image";
import {
  BadgeCheck,
  CalendarDays,
  LayoutGrid,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Verified Experts",
    description:
      "Only the most trusted and qualified mentors make our platform each one selected with care and precision.",
  },
  {
    icon: CalendarDays,
    title: "Flexible Sessions",
    description:
      "Connect anytime through video, audio, or chat, and get instant whenever you need support.",
  },
  {
    icon: LayoutGrid,
    title: "Diverse Categories",
    description:
      "Expert Guidance Across Every Skill and Interest, helping you learn faster, grow smarter, and reach your next milestone.",
  },
  {
    icon: Wallet,
    title: "Affordable Plans",
    description:
      "Experience premium level mentoring at a budget friendly cost, designed to make expert guidance accessible.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-[#f7faf7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Image */}
          <div className="relative h-[620px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1584697964358-3e14ca57658b?q=80&w=1200&auto=format&fit=crop"
              alt="Mentoring"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-8 text-lg">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}