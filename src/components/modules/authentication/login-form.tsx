"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { setAuthToken, authFetch } from "@/lib/auth-token";

export function LoginForm() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://assignment5-backend-f7q4.onrender.com";
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/sign-in/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("login response:", res.status, data);

      if (!res.ok) {
        toast.error(data?.message || "Login failed");
        return;
      }

      toast.success("Login successful!");

      // Backend returns token in response body, store it for auth header
      const token = data?.token;
      const role = data?.user?.role || data?.data?.role || data?.role;

      if (token) {
        // Store token in localStorage for use in other requests
        setAuthToken(token);
        console.log("Token stored:", token);
      }

      // Verify session with Authorization header
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
        console.error("Login succeeded but session verification failed. Response data:", data);
        toast.error("Login succeeded but session not confirmed. Try refreshing.");
        return;
      }

      // Redirect to role-specific route
      if (role === "TUTOR") {
        router.replace("/dashboard/tutor/sessions");
      } else if (role === "ADMIN") {
        router.replace("/dashboard/admin/users");
      } else {
        router.replace("/dashboard");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // ✅ GOOGLE LOGIN
  const handleGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "https://skillbridge-frontend-ten-nu.vercel.app/dashboard",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Input placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input type="password" placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>

        <Button onClick={handleGoogle} variant="outline" className="w-full">
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
}