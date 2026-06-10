"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const API_URL = "https://assignment5-backend-f7q4.onrender.com";

export default function GoogleCallback() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      try {
        const sessionRes = await fetch(
          `${API_URL}/api/auth/get-session`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!sessionRes.ok) {
          toast.error("Session not found");
          router.replace("/login");
          return;
        }

        const sessionData = await sessionRes.json();

        console.log("GOOGLE SESSION:", sessionData);

        if (!sessionData?.user) {
          toast.error("User not found");
          router.replace("/login");
          return;
        }

        toast.success("Login successful");

        const role = sessionData.user.role;

        if (role === "ADMIN") {
          router.replace("/admin");
        } else if (role === "TUTOR") {
          router.replace("/tutors");
        } else {
          router.replace("/dashboard");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
        router.replace("/login");
      }
    };

    run();
  }, [router]);

  return <p>Signing in with Google...</p>;
}