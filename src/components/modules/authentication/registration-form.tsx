// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { authClient } from "@/lib/auth-client";
// import { useState } from "react";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { setAuthToken, authFetch } from "@/lib/auth-token";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://assignment5-backend-f7q4.onrender.com";

// // ✅ REGISTER API
// async function registerUser(baseUrl: string, data: {
//   name: string;
//   email: string;
//   password: string;
//   role?: string;
//   image?: string;
// }) {
//   const res = await fetch(`${baseUrl}/api/auth/sign-up/email`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//     body: JSON.stringify({
//       name: data.name,
//       email: data.email,
//       password: data.password,
//       role: data.role,
//       image: data.image,
//     }),
//   });

//   return res.json();
// }

// export function RegisterForm() {
//   const router = useRouter();
//   const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://assignment5-backend-f7q4.onrender.com";
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "STUDENT",
//     image: "",
//   });

//   // ✅ REGISTER HANDLER
//   const handleRegister = async () => {
//     try {
//       const res = await registerUser(API_URL, form);
//       console.log("register response:", res);

//       if (res?.error) {
//         toast.error(res.error.message || "Registration failed");
//         console.error("Registration error:", res.error);
//         return;
//       }

//       toast.success("Account created successfully!");

//       // Store token from response if available
//       const token = res?.token;
//       if (token) {
//         setAuthToken(token);
//         console.log("Token stored after registration:", token);
//       }

//       // Verify session with token in Authorization header
//       const verifySession = async (retries = 2, delay = 500) => {
//         for (let i = 0; i < retries; i++) {
//           try {
//             const check = await authFetch(`${API_URL}/api/me`);
//             if (check.ok) {
//               return true;
//             }
//             console.warn("session verify attempt", i + 1, "status", check.status);
//           } catch (e) {
//             console.error("session verify error", e);
//           }
//           await new Promise((r) => setTimeout(r, delay));
//         }
//         return false;
//       };

//       const ok = await verifySession();
//       if (!ok) {
//         console.error("Registration succeeded but session verification failed");
//         toast.error("Account created but session not confirmed. Please log in.");
//         router.replace("/login");
//         return;
//       }

//       // Redirect to dashboard
//       router.replace("/dashboard");
//     } catch (err) {
//       console.error("Registration error:", err);
//       toast.error("Something went wrong during registration");
//     }
//   };

//   // ✅ GOOGLE LOGIN
  
//   const handleGoogle = async () => {
//     await authClient.signIn.social({
//       provider: "google",
//      callbackURL: "https://assignment5-frontend-seven.vercel.app",
//     });
//   };


//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Register</CardTitle>
//       </CardHeader>

//       <CardContent className="space-y-3">
//         <Input
//           placeholder="Name"
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <Input
//           placeholder="Email"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         <Input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <Input
//           placeholder="Role (STUDENT/TUTOR)"
//           onChange={(e) => setForm({ ...form, role: e.target.value })}
//         />

//         <Input
//           placeholder="Image URL (optional)"
//           onChange={(e) => setForm({ ...form, image: e.target.value })}
//         />
//       </CardContent>

//       <CardFooter className="flex flex-col gap-3">
//         <Button onClick={handleRegister} className="w-full">
//           Register
//         </Button>

//         {/* <Button onClick={handleGoogle} variant="outline" className="w-full">
//           Continue with Google
//         </Button> */}
//       </CardFooter>
//     </Card>
//   );
// }

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  GraduationCap,
  Image as ImageIcon,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { authClient } from "@/lib/auth-client";
import { authFetch, setAuthToken } from "@/lib/auth-token";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://assignment5-backend-f7q4.onrender.com";

/* ---------------------------------------- */
/* Register API                             */
/* ---------------------------------------- */

async function registerUser(
  baseUrl: string,
  data: {
    name: string;
    email: string;
    password: string;
    role?: string;
    image?: string;
  }
) {
  const res = await fetch(
    `${baseUrl}/api/auth/sign-up/email`,
    {
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
    }
  );

  return res.json();
}

export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [accepted, setAccepted] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
    image: "",
  });

  const emailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const passwordStrength = useMemo(() => {
    let score = 0;

    if (form.password.length >= 8) score++;
    if (/[A-Z]/.test(form.password)) score++;
    if (/[a-z]/.test(form.password)) score++;
    if (/\d/.test(form.password)) score++;
    if (/[@$!%*?&]/.test(form.password))
      score++;

    return score;
  }, [form.password]);

    const validateForm = () => {
    if (!form.name.trim()) {
      toast.error("Full name is required.");
      return false;
    }

    if (form.name.trim().length < 3) {
      toast.error("Name must be at least 3 characters.");
      return false;
    }

    if (!form.email.trim()) {
      toast.error("Email is required.");
      return false;
    }

    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (!form.password) {
      toast.error("Password is required.");
      return false;
    }

    if (!passwordRegex.test(form.password)) {
      toast.error(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
      );
      return false;
    }



    if (!form.role) {
      toast.error("Please select your role.");
      return false;
    }

    if (!accepted) {
      toast.error("Please accept the Terms & Conditions.");
      return false;
    }

    return true;
  };

  const verifySession = async (
    retries = 3,
    delay = 600
  ) => {
    for (let i = 0; i < retries; i++) {
      try {
        const check = await authFetch(`${API_URL}/api/me`);

        if (check.ok) {
          return true;
        }
      } catch (err) {
        console.error(err);
      }

      await new Promise((resolve) =>
        setTimeout(resolve, delay)
      );
    }

    return false;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await registerUser(API_URL, {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        image: form.image,
      });

      console.log("Register Response:", res);

      if (res?.error) {
        toast.error(
          res.error.message || "Registration failed."
        );
        return;
      }

      toast.success("Account created successfully.");

      if (res?.token) {
        setAuthToken(res.token);
      }

      const ok = await verifySession();

      if (!ok) {
        toast.error(
          "Account created. Please login again."
        );

        router.replace("/login");

        return;
      }

      router.replace("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong during registration."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL:
          "https://assignment5-frontend-seven.vercel.app/dashboard",
      });
    } catch (error) {
      console.error(error);
      toast.error("Google Sign Up failed.");
    }
  };
  return (
  <div className="flex h-screen items-center justify-center overflow-hidden bg-muted/40 px-4 py-6 mt-2 md:mt-2">
    <Card className="w-full max-w-2xl border shadow-xl dark:border-slate-800">

      <CardContent className="">
<h1 className="text-2xl font-bold text-center">
          Create Account
        </h1>
        {/* Name */}

        <div className="space-y-0.5">
          <Label className="text-xm">Full Name</Label>

          <div className="relative">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

            <Input
              className="h-9 pl-10"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Email */}

        <div className="space-y-0.5 mt-2">
          <Label className="text-xm">Email Address</Label>

          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

            <Input
              type="email"
              className="h-9 pl-10"
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Password */}

        <div className="space-y-0.5 mt-2">
          <Label className="text-xm">Password</Label>

          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

            <Input
              type={showPassword ? "text" : "password"}
              className="h-9 pl-10 pr-10"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-primary"
            >
              {showPassword ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          </div>

          {/* Password Strength */}

          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full transition-all duration-300 ${
                passwordStrength <= 1
                  ? "w-1/4 bg-red-500"
                  : passwordStrength === 2
                  ? "w-2/4 bg-orange-500"
                  : passwordStrength === 3
                  ? "w-3/4 bg-yellow-500"
                  : passwordStrength >= 4
                  ? "w-full bg-green-500"
                  : "w-0"
              }`}
            />
          </div>

          <p className="text-[10px] leading-tight text-muted-foreground">
            Password must contain uppercase,
            lowercase, number and special
            character.
          </p>
        </div>

        {/* Confirm Password */}

        {/* <div className="space-y-2">
          <Label>Confirm Password</Label>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

            <Input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              className="pl-10 pr-10"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword:
                    e.target.value,
                })
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div> */}
                {/* Role */}

        <div className="space-y-0.5 mt-2">
          <Label className="text-xm">Select Role</Label>

          <div className="relative">
            <GraduationCap className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

            <select
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.value,
                })
              }
              className="flex h-9 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="STUDENT">
                Student
              </option>

              <option value="TUTOR">
                Tutor
              </option>
            </select>
          </div>
        </div>

        {/* Image */}

        <div className="space-y-0.5 mt-2">
          <Label className="text-xm">Profile Image (Optional)</Label>

          <div className="relative">
            <ImageIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

            <Input
              className="h-9 pl-10"
              placeholder="https://example.com/photo.jpg"
              value={form.image}
              onChange={(e) =>
                setForm({
                  ...form,
                  image: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Terms */}

        {/* <div className="flex items-start gap-3 pt-2">
          <input
            id="terms"
            type="checkbox"
            checked={accepted}
            onChange={(e) =>
              setAccepted(e.target.checked)
            }
            className="mt-1 h-4 w-4 rounded border"
          />

          <label
            htmlFor="terms"
            className="text-sm text-muted-foreground"
          >
            I agree to the{" "}
            <span className="font-semibold text-primary">
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span className="font-semibold text-primary">
              Privacy Policy
            </span>.
          </label>
        </div> */}

      </CardContent>

      <CardFooter className="flex flex-col gap-1 py-3">

        <Button
          onClick={handleRegister}
          disabled={loading}
          className="w-full h-9"
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </Button>

        <div className="flex items-center gap-3 w-full">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">
            OR
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
{/* 
        <Button
          type="button"
          variant="outline"
          className="w-full h-11"
          onClick={handleGoogle}
        >
          Continue with Google
        </Button> */}

        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Login
          </Link>
        </p>

      </CardFooter>

    </Card>
  </div>
);
}
