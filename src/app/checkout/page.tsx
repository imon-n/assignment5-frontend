import CheckoutPageClient from "./CheckoutPageClient";

const backendUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.BACKEND_URL ||
  "http://localhost:5000";

export default function CheckoutPage() {
  return (
    <div>
   <h1>Hello everyone</h1>
    <CheckoutPageClient
      bookingId="BOOKING123"
      amount={50}
      backendUrl={backendUrl}
    />
    </div>
  );
}