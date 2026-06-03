"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { setAuthToken, authFetch } from "@/lib/auth-token";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://assignment5-backend-f7q4.onrender.com";

// ✅ REGISTER API
async function registerUser(baseUrl: string, data: {
  name: string;
  email: string;
  password: string;
  role?: string;
  image?: string;
}) {
  const res = await fetch(`${baseUrl}/api/auth/sign-up/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      image: data.image,
    }),
  });

  return res.json();
}

export function RegisterForm() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://assignment5-backend-f7q4.onrender.com";
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    image: "",
  });

  // ✅ REGISTER HANDLER
  const handleRegister = async () => {
    try {
      const res = await registerUser(API_URL, form);
      console.log("register response:", res);

      if (res?.error) {
        toast.error(res.error.message || "Registration failed");
        console.error("Registration error:", res.error);
        return;
      }

      toast.success("Account created successfully!");

      // Store token from response if available
      const token = res?.token;
      if (token) {
        setAuthToken(token);
        console.log("Token stored after registration:", token);
      }

      // Verify session with token in Authorization header
      const verifySession = async (retries = 2, delay = 500) => {
        for (let i = 0; i < retries; i++) {
          try {
            const check = await authFetch(`${API_URL}/api/me`);
            if (check.ok) {
              return true;
            }
            console.warn("session verify attempt", i + 1, "status", check.status);
          } catch (e) {
            console.error("session verify error", e);
          }
          await new Promise((r) => setTimeout(r, delay));
        }
        return false;
      };

      const ok = await verifySession();
      if (!ok) {
        console.error("Registration succeeded but session verification failed");
        toast.error("Account created but session not confirmed. Please log in.");
        router.replace("/login");
        return;
      }

      // Redirect to dashboard
      router.replace("/dashboard");
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Something went wrong during registration");
    }
  };

  // ✅ GOOGLE LOGIN
  const handleGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <Input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Input
          placeholder="Role (student/tutor)"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />

        <Input
          placeholder="Image URL (optional)"
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button onClick={handleRegister} className="w-full">
          Register
        </Button>

        <Button onClick={handleGoogle} variant="outline" className="w-full">
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
}