import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  // baseURL: "http://localhost:5000",
   baseURL: "https://assignment5-backend-f7q4.onrender.com",
});