"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



export function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });



const handleLogin = async () => {
  try {
    const res = await fetch("https://assignment5-backend-f7q4.onrender.com/api/auth/sign-in/email", {
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
router.push("/dashboard"); // 👈 full URL না, relative path দাও
  } catch (err) {
    toast.error("Something went wrong");
  }
};

  // ✅ GOOGLE LOGIN
  // const handleGoogle = async () => {
  //   await authClient.signIn.social({
  //     provider: "google",
  //    callbackURL: "https://skillbridge-frontend-ten-nu.vercel.app",
  //   });
  // };

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