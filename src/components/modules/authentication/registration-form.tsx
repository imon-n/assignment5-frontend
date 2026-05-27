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

const BASE_URL = "https://skillbridge-backend-6mpi.onrender.com/api/auth";

// ✅ REGISTER API
async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  role?: string;
  image?: string;
}) {
  const res = await fetch(`${BASE_URL}/sign-up/email`, {
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
  // const handleGoogle = async () => {
  //   await authClient.signIn.social({
  //     provider: "google",
  //    callbackURL: "https://skillbridge-frontend-ten-nu.vercel.app",
  //   });
  // };

  const handleGoogle = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "https://skillbridge-frontend-ten-nu.vercel.app/dashboard", // 👈 /dashboard add করো
  });
};
export function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    image: "",
  });

  // ✅ REGISTER HANDLER
  const handleRegister = async () => {
    const res = await registerUser(form);

    if (res?.error) {
      toast.error(res.error.message || "Registration failed");
    } else {
      toast.success("Account created successfully!");
    }
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