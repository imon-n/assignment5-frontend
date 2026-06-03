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
      // STEP 1: LOGIN
      const res = await fetch(`${API_URL}/api/auth/sign-in/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Login failed");
        return;
      }

      // 🔥 STEP 2: SAVE TOKEN
      localStorage.setItem("auth_token", data.token);

      // STEP 3: CHECK USER
      const meRes = await fetch(`${API_URL}/api/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`, // 🔥 send token
        },
      });

      const meData = await meRes.json();

      if (!meRes.ok) {
        toast.error("Session failed");
        return;
      }

      console.log("USER:", meData);
      toast.success("Login success");

      // STEP 4: REDIRECT
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