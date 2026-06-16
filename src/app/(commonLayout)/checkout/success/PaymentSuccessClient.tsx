"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function PaymentSuccessClient({
  backendUrl,
}: {
  backendUrl: string;
}) {
  const searchParams = useSearchParams();
const router = useRouter();
  const stripePaymentId = searchParams.get("stripePaymentId");
  const bookingId = searchParams.get("bookingId");

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!stripePaymentId || !bookingId) {
      setLoading(false);
      setMessage("Missing payment information");
      return;
    }

    // const verifyPayment = async () => {
    //   try {
    //     const res = await fetch(
    //       `${backendUrl}/api/v1/payments/stripe/verify`,
    //       {
    //         method: "POST",
    //         credentials: "include",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           stripePaymentId,
    //           bookingId,
    //         }),
    //       }
    //     );

    //     const result = await res.json();

    //     if (result.success) {
    //       setVerified(true);
    //       setMessage(result.message);
    //     } else {
    //       setMessage(result.message);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     setMessage("Payment verification failed");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
const verifyPayment = async () => {
  try {
    const res = await fetch(
      `${backendUrl}/api/v1/payments/stripe/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          bookingId,
          stripePaymentId,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      toast.success("Payment Successful 🎉");

      setMessage("Payment Successful ✅");

      // 🔥 redirect after short delay
      setTimeout(() => {
        router.push("/dashboard/payments"); 
        // or: "/dashboard/payments"
      }, 1500);

    } else {
      toast.error(data.message || "Payment failed");
      setMessage(data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Payment verification failed");
    setMessage("Payment verification failed");
  }
};
    verifyPayment();
  }, [stripePaymentId, bookingId, backendUrl]);

  return (
    <div className="max-w-lg mx-auto mt-20 text-center">
      {loading ? (
        <>
          <h1>Verifying Payment...</h1>
          <p>Please wait...</p>
        </>
      ) : verified ? (
        <>
          <h1>✅ Payment Successful</h1>
          <p>{message}</p>
          <p>Booking Confirmed</p>
        </>
      ) : (
        <>
          <h1>❌ Verification Failed</h1>
          <p>{message}</p>
        </>
      )}
    </div>
  );
}