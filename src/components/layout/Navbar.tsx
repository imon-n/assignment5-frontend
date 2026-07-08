"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
 import { ChevronDown } from "lucide-react";
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
  {[...navItems, ...(session?.user ? [{ name: "Dashboard", href: "/dashboard" }] : [])]
    .map((item) => {
      const active =
        item.href === "/dashboard"
          ? pathname.startsWith("/dashboard")
          : pathname === item.href;

      return (
        <Link
          key={item.name}
          href={item.href}
          className={`group relative flex items-center gap-1 pb-3 text-[17px] font-semibold transition-all duration-300 ${
            active
              ? "text-emerald-500"
              : whiteNavbar
              ? "text-black hover:text-emerald-500"
              : "text-white hover:text-emerald-300"
          }`}
        >
          {item.name}

          <ChevronDown size={16} className="mt-[2px]" />

          {/* Underline */}
          <span
            className={`absolute left-0 bottom-0 h-[3px] rounded-full bg-emerald-400 transition-all duration-300 ${
              active
                ? "w-full"
                : "w-0 group-hover:w-full"
            }`}
          />
        </Link>
      );
    })}

  <Link
    href="/contact"
    className={`group relative flex items-center gap-1 pb-3 text-[17px] font-semibold transition-all duration-300 ${
      pathname === "/contact"
        ? "text-emerald-500"
        : whiteNavbar
        ? "text-black hover:text-emerald-500"
        : "text-white hover:text-emerald-300"
    }`}
  >
    Contact Us

    <span
      className={`absolute left-0 bottom-0 h-[3px] rounded-full bg-emerald-400 transition-all duration-300 ${
        pathname === "/contact"
          ? "w-full"
          : "w-0 group-hover:w-full"
      }`}
    />
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
                className="flex items-center gap-3"
              >
                <Image
                  src={session.user.image || "/avatar.png"}
                  alt={session.user.name || "User"}
                  width={42}
                  height={42}
                  className="rounded-full object-cover"
                />

                <span
                  className={`font-medium ${
                    whiteNavbar ? "text-black" : "text-white"
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
                <button className="px-9 py-2 rounded-full bg-black text-white hover:bg-emerald-700 transition">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="px-9 py-2 rounded-full bg-black text-white hover:bg-emerald-700 transition">
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