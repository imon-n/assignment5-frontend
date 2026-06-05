import { Suspense } from "react";
import PaymentSuccessClient from "./PaymentSuccessClient";

export const dynamic = "force-dynamic";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.BACKEND_URL ||
  "http://localhost:5001";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading payment result...</div>}>
      <PaymentSuccessClient backendUrl={backendUrl} />
    </Suspense>
  );
}
