import { CheckoutPageClient } from "./CheckoutPageClient";
const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.BACKEND_URL ||
  "http://localhost:5001";
const frontendUrl =
  process.env.NEXT_PUBLIC_FRONTEND_URL ||
  process.env.FRONTEND_URL ||
  "https://assignment5-frontend-seven.vercel.app";

export default function CheckoutPage() {
  return (
    <CheckoutPageClient backendUrl={backendUrl} frontendUrl={frontendUrl} />
  );
}
