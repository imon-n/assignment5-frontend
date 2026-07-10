"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
  ChevronDown,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";

import { useTheme } from "next-themes";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Tutor", href: "/tutors" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } =
    authClient.useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  const isHomePage = pathname === "/";

  const whiteNavbar =
    scrolled || !isHomePage;

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
    if (!mounted) return;

    setTheme(
      theme === "dark"
        ? "light"
        : "dark"
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        whiteNavbar
          ? "bg-white shadow-md border-b border-gray-200 dark:bg-zinc-950 dark:border-zinc-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 lg:h-24 px-4 sm:px-6 lg:px-6 flex items-center justify-between">

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
            M
          </div>

          <h1
            className={`text-2xl lg:text-3xl font-bold tracking-tight ${
              whiteNavbar
                ? "text-black dark:text-white"
                : "text-white"
            }`}
          >
            MENTORING
          </h1>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden lg:flex items-center gap-10">

          {[
            ...navItems,
            ...(session?.user
              ? [
                  {
                    name: "Dashboard",
                    href: "/dashboard",
                  },
                ]
              : []),
          ].map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname.startsWith(
                    "/dashboard"
                  )
                : pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative flex items-center gap-1 pb-3 text-[17px] font-semibold transition-all duration-300 ${
                  active
                    ? "text-emerald-500"
                    : whiteNavbar
                    ? "text-black hover:text-emerald-500 dark:text-white"
                    : "text-white hover:text-emerald-300"
                }`}
              >
                {item.name}

                <ChevronDown
                  size={16}
                  className="mt-[2px]"
                />

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
                ? "text-black hover:text-emerald-500 dark:text-white"
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

        <div className="flex items-center gap-2 lg:gap-4">

          {/* Theme Button */}

          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
            >
              {theme === "dark" ? (
                <Sun
                  size={20}
                  className="text-yellow-400"
                />
              ) : (
                <Moon
                  size={20}
                  className={
                    whiteNavbar
                      ? "text-black"
                      : "text-white"
                  }
                />
              )}
            </button>
          )}

          {/* Desktop Auth Starts */}          {isPending ? (
            <p
              className={`hidden lg:block ${
                whiteNavbar
                  ? "text-black dark:text-white"
                  : "text-white"
              }`}
            >
              Loading...
            </p>
          ) : session?.user ? (
            <>
              {/* Desktop User */}
              <div className="hidden lg:flex items-center gap-4">
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
                      whiteNavbar
                        ? "text-black dark:text-white"
                        : "text-white"
                    }`}
                  >
                    {session.user.name}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-6 py-2 rounded-full bg-black dark:bg-zinc-800 text-white hover:bg-emerald-700 transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Desktop Login/Register */}
              <div className="hidden lg:flex items-center gap-3">
                <Link href="/login">
                  <button className="px-8 py-2 rounded-full bg-black dark:bg-zinc-800 text-white hover:bg-emerald-700 transition">
                    Login
                  </button>
                </Link>

                <Link href="/register">
                  <button className="px-8 py-2 rounded-full bg-black dark:bg-zinc-800 text-white hover:bg-emerald-700 transition">
                    Register
                  </button>
                </Link>
              </div>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2"
          >
            <Menu
              size={28}
              className={
                whiteNavbar
                  ? "text-black dark:text-white"
                  : "text-white"
              }
            />
          </button>
        </div>
      </div>

      {/* ================= Mobile Drawer ================= */}

      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 ${
          mobileOpen
            ? "visible bg-black/50"
            : "invisible bg-transparent"
        }`}
      >
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85%] bg-white dark:bg-zinc-950 shadow-2xl transition-transform duration-300 ${
            mobileOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold dark:text-white">
              Menu
            </h2>

            <button
              onClick={() => setMobileOpen(false)}
            >
              <X className="dark:text-white" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex flex-col gap-2 px-4 mt-4">
            {[
              ...navItems,
              ...(session?.user
                ? [
                    {
                      name: "Dashboard",
                      href: "/dashboard",
                    },
                  ]
                : []),
              {
                name: "Contact Us",
                href: "/contact",
              },
            ].map((item) => {
              const active =
                item.href === "/dashboard"
                  ? pathname.startsWith("/dashboard")
                  : pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl px-4 py-3 transition font-medium ${
                    active
                      ? "bg-emerald-500 text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Theme Switch */}
          <div className="px-4 mt-4">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
              >
                {theme === "dark" ? (
                  <>
                    <Sun
                      size={18}
                      className="text-yellow-400"
                    />
                    <span className="dark:text-white">
                      Light Mode
                    </span>
                  </>
                ) : (
                  <>
                    <Moon size={18} />
                    <span className="dark:text-white">
                      Dark Mode
                    </span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Mobile Auth */}
          <div className="px-4 mt-4">
            {isPending ? (
              <p className="dark:text-white">
                Loading...
              </p>
            ) : session?.user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 mb-6"
                >
                  <Image
                    src={session.user.image || "/avatar.png"}
                    alt={session.user.name || "User"}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />

                  <div>
                    <p className="font-semibold dark:text-white">
                      {session.user.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Dashboard
                    </p>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-full bg-black dark:bg-zinc-800 text-white hover:bg-emerald-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2 gap-4">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                >
                  <button className="w-full py-2 rounded-full bg-black dark:bg-zinc-800 text-white hover:bg-emerald-700 transition mb-4">
                    Login
                  </button>
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                >
                  <button className="w-full py-2 rounded-full bg-black dark:bg-zinc-800 text-white hover:bg-emerald-700 transition">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Overlay */}
        <div
          className="h-full w-full"
          onClick={() => setMobileOpen(false)}
        />
      </div>
    </header>
  );
}