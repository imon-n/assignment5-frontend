import CheckoutPageClient from "./CheckoutPageClient";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.BACKEND_URL ||
  "http://localhost:5001";
const frontendUrl =
  process.env.NEXT_PUBLIC_FRONTEND_URL ||
  process.env.FRONTEND_URL ||
  "http://localhost:3000";
const stripePublicKey =
  process.env.NEXT_PUBLIC_STRIPE_PK || process.env.STRIPE_PK || "";

export default function CheckoutPage() {
  return (
    <CheckoutPageClient
      backendUrl={backendUrl}
      frontendUrl={frontendUrl}
      stripePublicKey={stripePublicKey}
    />
  );
}
