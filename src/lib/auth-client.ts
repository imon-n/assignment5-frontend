// import { createAuthClient } from "better-auth/react";
// export const authClient = createAuthClient({
//   /** The base URL of the server (optional if you're using the same domain) */
//   // baseURL: "http://localhost:5000",
//    baseURL: "https://assignment5-backend-f7q4.onrender.com",
// });

import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

export const authClient = createAuthClient({
  //you can pass client configuration here
 baseURL: "https://assignment5-backend-f7q4.onrender.com/api/auth",

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

export const signInWithGoogle = async () => {
  return await authClient.signIn.social({
    provider: "google",

    // 🔥 IMPORTANT: redirect to callback page
    callbackURL: "https://assignment5-frontend-seven.vercel.app/dashboard",
  });
};