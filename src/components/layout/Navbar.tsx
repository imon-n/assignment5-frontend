

// "use client";

// import Link from "next/link";
// import { ChevronDown } from "lucide-react";
// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// const navItems = [
//   { name: "Home", href: "/" },

//   { name: "Tutor", href: "/tutors" },        // ✅ added
//   { name: "Dashboard", href: "/dashboard" }, // ✅ added

//   { name: "Blog", href: "/blog" },
// ];
// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);

//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Home page check
//   const isHomePage = pathname === "/";

//   // Navbar white condition
//   const whiteNavbar = scrolled || !isHomePage;

//   return (
//     <header
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//         whiteNavbar
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
//               whiteNavbar ? "text-black" : "text-white"
//             }`}
//           >
//             MENTORING
//           </h1>
//         </div>

//         {/* Nav */}
//         <nav className="hidden lg:flex items-center gap-10">
//           {navItems.map((item) => (
//         <Link
//           key={item.name}
//           href={item.href}
//           className={`flex items-center gap-1 text-[17px] font-medium cursor-pointer transition ${
//             whiteNavbar
//               ? "text-black hover:text-emerald-600"
//               : "text-white hover:text-emerald-300"
//           }`}
//         >
//           {item.name}

          
//         </Link>
//       ))}

//           <Link
//             href="/contact"
//             className={`text-[17px] font-medium transition ${
//               whiteNavbar
//                 ? "text-black hover:text-emerald-600"
//                 : "text-white hover:text-emerald-300"
//             }`}
//           >
//             Contact us
//           </Link>
//         </nav>

//         {/* Buttons */}
//        <div className="flex items-center gap-4">

//   {/* LOGIN */}
//   <Link href="/login">
//     <button
//       className={`px-9 py-2 rounded-4xl  transition  text-lg ${
//         whiteNavbar
//           ? " text-white hover:bg-emerald-700 hover:text-white bg-black text-white"
//           : " text-white hover:bg-white hover:text-black bg-black text-white"
//       }`}
//     >
//       Login
//     </button>
//   </Link>

//   {/* REGISTER */}
//   <Link href="/register">
//     <button
//       className={`px-9 py-2 rounded-4xl  transition  text-lg  ${
//         whiteNavbar
//        ? " text-white hover:bg-emerald-700 hover:text-white bg-black text-white"
//           : " text-white hover:bg-white hover:text-black bg-black text-white"
//       }`}
//     >
//       Register
//     </button>
//   </Link>

// </div>
//       </div>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Tutor", href: "/tutors" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHomePage = pathname === "/";
  const whiteNavbar = scrolled || !isHomePage;

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

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
        <Link href="/" className="flex items-center gap-3">
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
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-[17px] font-medium transition ${
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
            Contact
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {isPending ? (
            <p className={whiteNavbar ? "text-black" : "text-white"}>
              Loading...
            </p>
          ) : session?.user ? (
            <>
              <Link
                href="/dashboard"
                className=""
              >
                <Image
                  src={session.user.image || "/avatar.png"}
                  alt={session.user.name || "User"}
                  width={42}
                  height={40}
                  className="rounded-full  object-cover"
                />

                <span
                  className={`font-medium ${
                    whiteNavbar ? "text-black mr-4" : "text-white"
                  }`}
                >
                  {session.user.name}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-full bg-black text-white hover:bg-emerald-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button
                  className="px-9 py-2 rounded-full bg-black text-white hover:bg-emerald-700 transition"
                >
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button
                  className="px-9 py-2 rounded-full bg-black text-white hover:bg-emerald-700 transition"
                >
                  Register
                </button>
              </Link>
            </>
          )}

        </div>
      </div>
    </header>
  );
}