"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  const API_URL = "https://assignment5-backend-f7q4.onrender.com";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      // 🔥 STEP 1: LOGIN (with cookie)
      const res = await fetch(`${API_URL}/api/auth/sign-in/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 MUST
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        toast.error("Login failed");
        return;
      }

      // 🔥 STEP 2: CHECK USER
      const meRes = await fetch(`${API_URL}/api/me`, {
        method: "GET",
        credentials: "include", // 🔥 MUST
      });

      const meData = await meRes.json();

      console.log("USER:", meData);

      if (!meRes.ok) {
        toast.error("Session failed");
        return;
      }

      toast.success("Login success");

      // 🔥 STEP 3: REDIRECT
      router.replace("/dashboard");

    } catch (err) {
      console.error(err);
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

      <CardFooter>
        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}