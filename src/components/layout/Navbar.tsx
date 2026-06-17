// "use client";

// import Link from "next/link";
// import { ChevronDown } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <header
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//         scrolled
//           ? "bg-white shadow-md border-b"
//           : "bg-transparent"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">

//         {/* Logo */}
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
//             M
//           </div>

//           <h1
//             className={`text-3xl font-bold tracking-tight ${
//               scrolled ? "text-black" : "text-white"
//             }`}
//           >
//             MENTORING
//           </h1>
//         </div>

//         {/* Nav */}
//         <nav className="hidden lg:flex items-center gap-10">
//           {["Home", "Mentor", "Pages", "Courses", "Blog"].map(
//             (item) => (
//               <div
//                 key={item}
//                 className={`flex items-center gap-1 text-[17px] font-medium cursor-pointer transition ${
//                   scrolled
//                     ? "text-black hover:text-emerald-600"
//                     : "text-white hover:text-emerald-300"
//                 }`}
//               >
//                 {item}
//                 <ChevronDown size={16} />
//               </div>
//             )
//           )}

//           <Link
//             href="#"
//             className={`text-[17px] font-medium transition ${
//               scrolled
//                 ? "text-black hover:text-emerald-600"
//                 : "text-white hover:text-emerald-300"
//             }`}
//           >
//             Contact us
//           </Link>
//         </nav>

//         {/* Buttons */}
//         <div className="flex items-center gap-4">
//           <button
//             className={`px-8 py-3 rounded-md font-medium transition border-2 ${
//               scrolled
//                 ? "border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white"
//                 : "border-white text-white hover:bg-white hover:text-black"
//             }`}
//           >
//             Login
//           </button>

//           <button
//             className={`px-8 py-3 rounded-md font-medium transition border-2 ${
//               scrolled
//                 ? "border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white"
//                 : "border-white text-white hover:bg-white hover:text-black"
//             }`}
//           >
//             Register
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
const navItems = [
  { name: "Home", href: "/" },

  { name: "Tutor", href: "/tutors" },        // ✅ added
  { name: "Dashboard", href: "/dashboard" }, // ✅ added

  { name: "Blog", href: "/blog" },
];
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Home page check
  const isHomePage = pathname === "/";

  // Navbar white condition
  const whiteNavbar = scrolled || !isHomePage;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        whiteNavbar
          ? "bg-white shadow-md border-b"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
            M
          </div>

          <h1
            className={`text-3xl font-bold tracking-tight ${
              whiteNavbar ? "text-black" : "text-white"
            }`}
          >
            MENTORING
          </h1>
        </div>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`flex items-center gap-1 text-[17px] font-medium cursor-pointer transition ${
            whiteNavbar
              ? "text-black hover:text-emerald-600"
              : "text-white hover:text-emerald-300"
          }`}
        >
          {item.name}

          
        </Link>
      ))}

          <Link
            href="/contact"
            className={`text-[17px] font-medium transition ${
              whiteNavbar
                ? "text-black hover:text-emerald-600"
                : "text-white hover:text-emerald-300"
            }`}
          >
            Contact us
          </Link>
        </nav>

        {/* Buttons */}
       <div className="flex items-center gap-4">

  {/* LOGIN */}
  <Link href="/login">
    <button
      className={`px-9 py-2 rounded-4xl  transition  text-lg ${
        whiteNavbar
          ? " text-white hover:bg-emerald-700 hover:text-white bg-black text-white"
          : " text-white hover:bg-white hover:text-black bg-black text-white"
      }`}
    >
      Login
    </button>
  </Link>

  {/* REGISTER */}
  <Link href="/register">
    <button
      className={`px-9 py-2 rounded-4xl  transition  text-lg  ${
        whiteNavbar
       ? " text-white hover:bg-emerald-700 hover:text-white bg-black text-white"
          : " text-white hover:bg-white hover:text-black bg-black text-white"
      }`}
    >
      Register
    </button>
  </Link>

</div>
      </div>
    </header>
  );
}