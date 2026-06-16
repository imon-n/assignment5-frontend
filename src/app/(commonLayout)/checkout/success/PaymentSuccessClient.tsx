// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// export default function PaymentSuccessClient({
//   backendUrl,
// }: {
//   backendUrl: string;
// }) {
//   const searchParams = useSearchParams();
// const router = useRouter();
//   const stripePaymentId = searchParams.get("stripePaymentId");
//   const bookingId = searchParams.get("bookingId");

//   const [loading, setLoading] = useState(true);
//   const [verified, setVerified] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (!stripePaymentId || !bookingId) {
//       setLoading(false);
//       setMessage("Missing payment information");
//       return;
//     }

//     // const verifyPayment = async () => {
//     //   try {
//     //     const res = await fetch(
//     //       `${backendUrl}/api/v1/payments/stripe/verify`,
//     //       {
//     //         method: "POST",
//     //         credentials: "include",
//     //         headers: {
//     //           "Content-Type": "application/json",
//     //         },
//     //         body: JSON.stringify({
//     //           stripePaymentId,
//     //           bookingId,
//     //         }),
//     //       }
//     //     );

//     //     const result = await res.json();

//     //     if (result.success) {
//     //       setVerified(true);
//     //       setMessage(result.message);
//     //     } else {
//     //       setMessage(result.message);
//     //     }
//     //   } catch (error) {
//     //     console.error(error);
//     //     setMessage("Payment verification failed");
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };
// const verifyPayment = async () => {
//   try {
//     const res = await fetch(
//       `${backendUrl}/api/v1/payments/stripe/verify`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           bookingId,
//           stripePaymentId,
//         }),
//       }
//     );

//     const data = await res.json();

//     if (data.success) {
//       toast.success("Payment Successful 🎉");

//       setMessage("Payment Successful ✅");

//       // 🔥 redirect after short delay
//       setTimeout(() => {
//         router.push("/dashboard/payments"); 
//         // or: "/dashboard/payments"
//       }, 1500);

//     } else {
//       toast.error(data.message || "Payment failed");
//       setMessage(data.message);
//     }
//   } catch (error) {
//     console.error(error);
//     toast.error("Payment verification failed");
//     setMessage("Payment verification failed");
//   }
// };
//     verifyPayment();
//   }, [stripePaymentId, bookingId, backendUrl]);

//   return (
//     <div className="max-w-lg mx-auto mt-20 text-center">
//       {loading ? (
//         <>
//           <h1>Verifying Payment...</h1>
//           <p>Please wait...</p>
//         </>
//       ) : verified ? (
//         <>
//           <h1>✅ Payment Successful</h1>
//           <p>{message}</p>
//           <p>Booking Confirmed</p>
//         </>
//       ) : (
//         <>
//           <h1>❌ Verification Failed</h1>
//           <p>{message}</p>
//         </>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

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
      setVerified(false);
      setMessage("Missing payment information");
      toast.error("Missing payment information");
      return;
    }

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
              stripePaymentId,
              bookingId,
            }),
          }
        );

        const data = await res.json();

       if (data.success) {
  toast.success("Payment Successful 🎉");

  setMessage(data.message || "Payment Successful");
  setVerified(true);

  setLoading(false);

  console.log("REDIRECTING...");

  setTimeout(() => {
    router.push("/dashboard/payments");
    router.refresh(); // 🔥 force update
  }, 1200);
} else {
          setVerified(false);
          setMessage(data.message || "Payment failed");

          toast.error(data.message || "Payment failed");
          setLoading(false);
        }
      } catch (error) {
        console.error(error);

        setVerified(false);
        setMessage("Payment verification failed");

        toast.error("Payment verification failed");
        setLoading(false);
      }
    };

    verifyPayment();
  }, [stripePaymentId, bookingId, backendUrl, router]);

  return (
    <div className="max-w-lg mx-auto mt-20 text-center p-6 border rounded bg-white shadow">

      {loading ? (
        <>
          <h1 className="text-xl font-bold">
            Verifying Payment...
          </h1>
          <p className="text-gray-500 mt-2">
            Please wait while we confirm your payment
          </p>
        </>
      ) : verified ? (
        <>
          <h1 className="text-2xl font-bold text-green-600">
            ✅ Payment Successful
          </h1>

          <p className="mt-3 text-gray-700">{message}</p>

          <p className="mt-2 text-sm text-gray-500">
            Booking Confirmed 🎉
          </p>

          <button
            onClick={() => router.push("/dashboard/payments")}
            className="mt-5 bg-green-700 text-white px-5 py-2 rounded"
          >
            Go to Payments
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-red-600">
            ❌ Verification Failed
          </h1>

          <p className="mt-3 text-gray-700">{message}</p>

          <button
            onClick={() => router.push("/dashboard")}
            className="mt-5 bg-red-600 text-white px-5 py-2 rounded"
          >
            Go Back
          </button>
        </>
      )}
    </div>
  );
}