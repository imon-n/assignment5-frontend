// app/components/Footer.tsx

import Link from "next/link";
import { ArrowUp } from "lucide-react";

import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050505] text-white">
      {/* Background Lines */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(
                120deg,
                transparent 0%,
                rgba(255,255,255,0.04) 50%,
                transparent 100%
              )
            `,
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-3">
          {/* LEFT */}
          <div>
            {/* Logo */}
             <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
            M
          </div>

          <h1
            className="text-3xl font-bold tracking-tight"
            //    ${
            //    whiteNavbar ? "text-black" : "text-white"
            // }`
            // }
          >
            MENTORING
          </h1>
        </div>

            {/* Text */}
            <p className="max-w-md text-lg leading-8 text-gray-300">
              We connect learners with experienced mentors who offer
              personalised guidance, real world insights to help you achieve
              your goals faster.
            </p>

            {/* Social */}
            <div className="mt-8 flex items-center gap-4">
              <SocialIcon icon={<FaFacebookF />} />
              <SocialIcon icon={<FaXTwitter />} />
              <SocialIcon icon={<FaInstagram />} />
              <SocialIcon icon={<FaYoutube />} />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="md:pl-20">
            <h3 className="mb-8 text-3xl font-bold">Quick Links</h3>

            <ul className="space-y-5 text-lg text-gray-300">
              {[
                "About Us",
                "Checkout",
                "Mentors",
                "Mentee",
                "Contact us",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="transition-all duration-300 hover:text-lime-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="mb-8 text-3xl font-bold">Support</h3>

            <ul className="space-y-5 text-lg text-gray-300">
              {[
                "Help center",
                "FAQs",
                "Terms & Conditions",
                "Privacy Policy",
                "Refund Policy",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="transition-all duration-300 hover:text-lime-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-16 border-t border-white/10" />
      </div>

      {/* Scroll Top */}
      <button className="absolute bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00c896] text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-emerald-400">
        <ArrowUp size={30} />
      </button>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-all duration-300 hover:bg-lime-400 hover:scale-110">
      <span className="text-lg">{icon}</span>
    </button>
  );
}