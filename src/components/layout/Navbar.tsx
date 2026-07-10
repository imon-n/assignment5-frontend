// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";
//  import { ChevronDown } from "lucide-react";
// const navItems = [
//   { name: "Home", href: "/" },
//   { name: "Tutor", href: "/tutors" },
//   { name: "Blog", href: "/blog" },
// ];

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);

//   const pathname = usePathname();
//   const router = useRouter();

//   const { data: session, isPending } = authClient.useSession();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const isHomePage = pathname === "/";
//   const whiteNavbar = scrolled || !isHomePage;

//   const handleLogout = async () => {
//     try {
//       await authClient.signOut();
//       router.push("/");
//       router.refresh();
//     } catch (error) {
//       console.error(error);
//     }
//   };

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
//         <Link href="/" className="flex items-center gap-3">
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
//         </Link>

//         {/* Navigation */}
  

// <nav className="hidden lg:flex items-center gap-10">
//   {[...navItems, ...(session?.user ? [{ name: "Dashboard", href: "/dashboard" }] : [])]
//     .map((item) => {
//       const active =
//         item.href === "/dashboard"
//           ? pathname.startsWith("/dashboard")
//           : pathname === item.href;

//       return (
//         <Link
//           key={item.name}
//           href={item.href}
//           className={`group relative flex items-center gap-1 pb-3 text-[17px] font-semibold transition-all duration-300 ${
//             active
//               ? "text-emerald-500"
//               : whiteNavbar
//               ? "text-black hover:text-emerald-500"
//               : "text-white hover:text-emerald-300"
//           }`}
//         >
//           {item.name}

//           <ChevronDown size={16} className="mt-[2px]" />

//           {/* Underline */}
//           <span
//             className={`absolute left-0 bottom-0 h-[3px] rounded-full bg-emerald-400 transition-all duration-300 ${
//               active
//                 ? "w-full"
//                 : "w-0 group-hover:w-full"
//             }`}
//           />
//         </Link>
//       );
//     })}

//   <Link
//     href="/contact"
//     className={`group relative flex items-center gap-1 pb-3 text-[17px] font-semibold transition-all duration-300 ${
//       pathname === "/contact"
//         ? "text-emerald-500"
//         : whiteNavbar
//         ? "text-black hover:text-emerald-500"
//         : "text-white hover:text-emerald-300"
//     }`}
//   >
//     Contact Us

//     <span
//       className={`absolute left-0 bottom-0 h-[3px] rounded-full bg-emerald-400 transition-all duration-300 ${
//         pathname === "/contact"
//           ? "w-full"
//           : "w-0 group-hover:w-full"
//       }`}
//     />
//   </Link>
// </nav>

//         {/* Right Side */}
//         <div className="flex items-center gap-4">
//           {isPending ? (
//             <p className={whiteNavbar ? "text-black" : "text-white"}>
//               Loading...
//             </p>
//           ) : session?.user ? (
//             <>
//               <Link
//                 href="/dashboard"
//                 className="flex items-center gap-3"
//               >
//                 <Image
//                   src={session.user.image || "/avatar.png"}
//                   alt={session.user.name || "User"}
//                   width={42}
//                   height={42}
//                   className="rounded-full object-cover"
//                 />

//                 <span
//                   className={`font-medium ${
//                     whiteNavbar ? "text-black" : "text-white"
//                   }`}
//                 >
//                   {session.user.name}
//                 </span>
//               </Link>

//               <button
//                 onClick={handleLogout}
//                 className="px-6 py-2 rounded-full bg-black text-white hover:bg-emerald-700 transition"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link href="/login">
//                 <button className="px-9 py-2 rounded-full bg-black text-white hover:bg-emerald-700 transition">
//                   Login
//                 </button>
//               </Link>

//               <Link href="/register">
//                 <button className="px-9 py-2 rounded-full bg-black text-white hover:bg-emerald-700 transition">
//                   Register
//                 </button>
//               </Link>
//             </>
//           )}
//         </div>
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
import { ChevronDown, Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Tutor", href: "/tutors" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
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
          <h1 className={`text-3xl font-bold tracking-tight ${whiteNavbar ? "text-black" : "text-white"}`}>
            MENTORING
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {[...navItems, ...(session?.user ? [{ name: "Dashboard", href: "/dashboard" }] : [])].map((item) => {
            const active = item.href === "/dashboard" ? pathname.startsWith("/dashboard") : pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative flex items-center gap-1 pb-3 text-[17px] font-semibold transition-all duration-300 ${
                  active ? "text-emerald-500" : whiteNavbar ? "text-black hover:text-emerald-500" : "text-white hover:text-emerald-300"
                }`}
              >
                {item.name}
                <ChevronDown size={16} className="mt-[2px]" />
                <span className={`absolute left-0 bottom-0 h-[3px] rounded-full bg-emerald-400 transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            );
          })}

          <Link
            href="/contact"
            className={`group relative flex items-center gap-1 pb-3 text-[17px] font-semibold transition-all duration-300 ${
              pathname === "/contact" ? "text-emerald-500" : whiteNavbar ? "text-black hover:text-emerald-500" : "text-white hover:text-emerald-300"
            }`}
          >
            Contact Us
            <span className={`absolute left-0 bottom-0 h-[3px] rounded-full bg-emerald-400 transition-all duration-300 ${pathname === "/contact" ? "w-full" : "w-0 group-hover:w-full"}`} />
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition">
            {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
          </button>

          {isPending ? (
            <p className={whiteNavbar ? "text-black" : "text-white"}>Loading...</p>
          ) : session?.user ? (
            <>
              <Link href="/dashboard" className="flex items-center gap-3">
                <Image
                  src={session.user.image || "/avatar.png"}
                  alt={session.user.name || "User"}
                  width={42}
                  height={42}
                  className="rounded-full object-cover"
                />
                <span className={`font-medium ${whiteNavbar ? "text-black" : "text-white"}`}>{session.user.name}</span>
              </Link>
              <button onClick={handleLogout} className="px-6 py-2 rounded-full bg-black text-white hover:bg-emerald-700 transition">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="px-9 py-2 rounded-full bg-black text-white hover:bg-emerald-700 transition">Login</button>
              </Link>
              <Link href="/register">
                <button className="px-9 py-2 rounded-full bg-black text-white hover:bg-emerald-700 transition">Register</button>
              </Link>
            </>
          )}

          {/* Mobile Hamburger */}
          <button onClick={() => setMobileOpen(true)} className="lg:hidden">
            <Menu size={30} className={whiteNavbar ? "text-black" : "text-white"} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[100] transition-all duration-300 ${mobileOpen ? "visible bg-black/40" : "invisible bg-transparent"}`}>
        <div className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold">Menu</h2>
            <button onClick={() => setMobileOpen(false)}>
              <X className="text-black" />
            </button>
          </div>

          <nav className="flex flex-col px-6 gap-4 mt-4">
            {[...navItems, ...(session?.user ? [{ name: "Dashboard", href: "/dashboard" }] : []), { name: "Contact Us", href: "/contact" }].map((item) => {
              const active = item.href === "/dashboard" ? pathname.startsWith("/dashboard") : pathname === item.href;

              return (
                <Link key={item.name} href={item.href} className={`px-4 py-2 rounded-lg transition ${active ? "bg-emerald-500 text-white" : "hover:bg-gray-100"}`}>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col items-center gap-4 mt-4">
            <button onClick={toggleTheme} className="flex items-center gap-3 px-4 py-2 rounded-lg border w-full hover:bg-gray-100 transition">
              {theme === "dark" ? (
                <>
                  <Sun size={18} />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={18} />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            {isPending ? (
              <p className="text-center">Loading...</p>
            ) : session?.user ? (
              <Link href="/dashboard" className="flex items-center gap-3 mb-5">
                <Image
                  src={session.user.image || "/avatar.png"}
                  alt={session.user.name || "User"}
                  width={45}
                  height={45}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">{session.user.name}</p>
                  <p className="text-sm text-gray-500">Dashboard</p>
                </div>
              </Link>
            ) : (
              <div className="space-y-3">
                <Link href="/login">
                  <button className="w-full py-3 rounded-full bg-black text-white hover:bg-emerald-700 transition">Login</button>
                </Link>
                <Link href="/register">
                  <button className="w-full py-3 rounded-full bg-black text-white hover:bg-emerald-700 transition">Register</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}