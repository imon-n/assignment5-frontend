"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://assignment5-backend-f7q4.onrender.com";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      // 🔥 STEP 1: LOGIN
      const res = await fetch(`${API_URL}/api/auth/sign-in/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Login failed");
        return;
      }

      toast.success("Login successful!");

      // 🔥 STEP 2: WAIT একটু (cookie settle হওয়ার জন্য)
      await new Promise((r) => setTimeout(r, 800));

      // 🔥 STEP 3: VERIFY SESSION (retry system)
      const verifySession = async () => {
        for (let i = 0; i < 3; i++) {
          try {
            const check = await fetch(
              `${API_URL}/api/auth/session`,
              {
                credentials: "include",
              }
            );

            if (check.ok) {
              const sessionData = await check.json();

              if (sessionData?.user) {
                return sessionData.user;
              }
            }

            console.warn("session retry:", i + 1);
          } catch (err) {
            console.error(err);
          }

          // retry delay
          await new Promise((r) => setTimeout(r, 500));
        }

        return null;
      };

      const user = await verifySession();

      // 🔥 STEP 4: REDIRECT
      if (user) {
        console.log("USER:", user);

        if (user.role === "TUTOR") {
          router.replace("/dashboard/tutor/sessions");
        } else if (user.role === "ADMIN") {
          router.replace("/dashboard/admin/users");
        } else {
          router.replace("/dashboard");
        }
      } else {
        toast.error("Session not ready. Refresh page.");
      }

    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}