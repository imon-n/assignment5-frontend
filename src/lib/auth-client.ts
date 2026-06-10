// // import { createAuthClient } from "better-auth/react";
// // export const authClient = createAuthClient({
// //   /** The base URL of the server (optional if you're using the same domain) */
// //   // baseURL: "http://localhost:5000",
// //    baseURL: "https://assignment5-backend-f7q4.onrender.com",
// // });

// import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// export const authClient = createAuthClient({
//   //you can pass client configuration here
//  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
//     ? process.env.NEXT_PUBLIC_BACKEND_URL
//     : "/api/auth",

//   plugins: [
//     {
//       id: "next-cookies-request",
//       fetchPlugins: [
//         {
//           id: "next-cookies-request-plugin",
//           name: "next-cookies-request-plugin",
//           hooks: {
//             async onRequest(ctx) {
//               if (typeof window === "undefined") {
//                 const { cookies } = await import("next/headers");
//                 const headers = await cookies();
//                 ctx.headers.set("cookie", headers.toString());
//               }
//             },
//           },
//         },
//       ],
//     },
//   ],
// });
// const API_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
// export const signInWithGoogle = async () => {
//     const router = useRouter();
//   try {
//     await authClient.signIn.social({
//       provider: "google",
//     });

//     const sessionRes = await fetch(`${API_URL}/api/auth/get-session`, {
//       method: "GET",
//       credentials: "include",
//     });

//     if (!sessionRes.ok) {
//       toast.error("Session not found");
//       return;
//     }

//     const sessionData = await sessionRes.json();
//     console.log("SESSION1:", sessionData);

//     if (!sessionData?.user) {
//       toast.error("User not found");
//       return;
//     }

//     toast.success("Login successful");

//     const role = sessionData.user.role;
//     if (role === "ADMIN") {
//       router.replace("/admin");
//     } else if (role === "TUTOR") {
//       router.replace("/tutors");
//     } else {
//       router.replace("/dashboard");
//     }
//   } catch (error) {
//     console.error(error);
//     toast.error("Something went wrong");
//   }
// };

import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : "/api/auth",

  plugins: [
    {
      id: "next-cookies-request",
      fetchPlugins: [
        {
          id: "next-cookies-request-plugin",
          name: "next-cookies-request-plugin",
          hooks: {
            async onRequest(ctx) {
              if (typeof window === "undefined") {
                const { cookies } = await import("next/headers");
                const headers = await cookies();
                ctx.headers.set("cookie", headers.toString());
              }
            },
          },
        },
      ],
    },
  ],
});

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL; // 👈 fixed: backend, not frontend

// 👇 Accept router as a parameter instead of calling useRouter() here
export const signInWithGoogle = async (router: ReturnType<typeof useRouter>) => {
  try {
    await authClient.signIn.social({
      provider: "google",
    });

    const sessionRes = await fetch(`${API_URL}/api/auth/get-session`, {
      method: "GET",
      credentials: "include",
    });

    if (!sessionRes.ok) {
      toast.error("Session not found");
      return;
    }

    const sessionData = await sessionRes.json();
    console.log("SESSION1:", sessionData);

    if (!sessionData?.user) {
      toast.error("User not found");
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
  }
};