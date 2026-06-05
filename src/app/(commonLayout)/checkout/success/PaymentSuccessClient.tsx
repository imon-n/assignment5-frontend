"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccessClient({
  backendUrl,
}: {
  backendUrl: string;
}) {
  const searchParams = useSearchParams();
  const stripePaymentId = searchParams.get("stripePaymentId");
  const bookingId = searchParams.get("bookingId");
  const [status, setStatus] = useState(
    !stripePaymentId || !bookingId
      ? "Payment completed. If you do not see confirmation, please check your orders."
      : "Verifying payment..."
  );
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!backendUrl || !stripePaymentId || !bookingId) {
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/v1/payments/stripe/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ stripePaymentId, bookingId }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setStatus("Payment verified successfully.");
        } else {
          setError(data.message || "Payment verification failed.");
          setStatus("Verification error.");
        }
      } catch (err) {
        console.error(err);
        setError("Network error verifying payment.");
        setStatus("Verification error.");
      }
    };

    verifyPayment();
  }, [stripePaymentId, bookingId, backendUrl]);

  if (!isReady) {
    return <div>Loading payment details...</div>;
  }

  return (
    <div>
      <h1>Payment Success</h1>
      <p>{status}</p>
      {!stripePaymentId || !bookingId ? (
        <p>
          This page is intended to be used after a Stripe redirect. Ensure the URL includes
          `stripePaymentId` and `bookingId`.
        </p>
      ) : null}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
