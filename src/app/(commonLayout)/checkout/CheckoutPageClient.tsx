// "use client";

// import { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   PaymentElement,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PK!
// );

// function CheckoutForm({
//   bookingId,
//   stripePaymentId,
//   backendUrl,
// }: {
//   bookingId: string;
//   stripePaymentId: string;
//   backendUrl: string;
// }) {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const verifyPayment = async () => {
//     try {
//       const res = await fetch(
//         `${backendUrl}/api/v1/payments/stripe/verify`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify({
//             bookingId,
//             stripePaymentId,
//           }),
//         }
//       );

//       const data = await res.json();

//       if (data.success) {
//         setMessage("Payment Successful ✅");
//       } else {
//         setMessage(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage("Payment verification failed");
//     }
//   };

//   const handleSubmit = async (
//     e: React.FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     setLoading(true);

//     const result = await stripe.confirmPayment({
//       elements,
//       redirect: "if_required",
//     });

//     if (result.error) {
//       setMessage(result.error.message || "Payment Failed");
//     } else if (
//       result.paymentIntent?.status === "succeeded"
//     ) {
//       await verifyPayment();
//     }

//     setLoading(false);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-4"
//     >
//       <PaymentElement />

//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="bg-green-700 text-white px-5 py-2 rounded"
//       >
//         {loading ? "Processing..." : "Pay Now"}
//       </button>

//       {message && (
//         <p className="font-medium">
//           {message}
//         </p>
//       )}
//     </form>
//   );
// }

// export default function CheckoutPageClient({
//   bookingId,
//   amount,
//   backendUrl,
// }: {
//   bookingId: string;
//   amount: number;
//   backendUrl: string;
// }) {
//   const [clientSecret, setClientSecret] =
//     useState("");

//   const [stripePaymentId, setStripePaymentId] =
//     useState("");

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const createIntent = async () => {
//       try {
//         const res = await fetch(
//           `${backendUrl}/api/v1/payments/stripe/checkout`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             credentials: "include",
//             body: JSON.stringify({
//               bookingId,
//               amount,
//             }),
//           }
//         );

//         const data = await res.json();

//         console.log(data);

//         if (data.success) {
//           setClientSecret(data.data.clientSecret);
//           setStripePaymentId(
//             data.data.stripePaymentId
//           );
//         } else {
//           alert(data.message);
//         }
//       } catch (error) {
//         console.error(error);
//       }

//       setLoading(false);
//     };

//     createIntent();
//   }, [bookingId, amount, backendUrl]);

//   if (loading) {
//     return (
//       <div className="p-10">
//         Creating payment...
//       </div>
//     );
//   }

//   if (!clientSecret) {
//     return (
//       <div className="p-10 text-red-500">
//         Failed to create payment intent
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-xl mx-auto mt-20 p-6 border rounded">
//       <h1 className="text-2xl font-bold mb-4">
//         Stripe Payment
//       </h1>

//       <p className="mb-4">
//         Booking ID: {bookingId}
//       </p>

//       <p className="mb-6">
//         Amount: ${amount}
//       </p>

//       <Elements
//         stripe={stripePromise}
//         options={{ clientSecret }}
//       >
//         <CheckoutForm
//           bookingId={bookingId}
//           stripePaymentId={stripePaymentId}
//           backendUrl={backendUrl}
//         />
//       </Elements>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PK!
);

function CheckoutForm({
  bookingId,
  stripePaymentId,
  backendUrl,
}: {
  bookingId: string;
  stripePaymentId: string;
  backendUrl: string;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
        setMessage("Payment Successful ✅");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Payment verification failed");
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      setMessage(result.error.message || "Payment Failed");
    } else if (result.paymentIntent?.status === "succeeded") {
      await verifyPayment();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />

      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-green-700 text-white px-5 py-2 rounded w-full"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {message && (
        <p className="text-center font-medium">{message}</p>
      )}
    </form>
  );
}

export default function CheckoutPageClient({
  bookingId,
  amount,
  backendUrl,
}: {
  bookingId: string;
  amount: number;
  backendUrl: string;
}) {
  const [clientSecret, setClientSecret] = useState("");
  const [stripePaymentId, setStripePaymentId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createIntent = async () => {
      try {
        const res = await fetch(
          `${backendUrl}/api/v1/payments/stripe/checkout`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              bookingId,
              amount,
            }),
          }
        );

        const data = await res.json();

        if (data.success) {
          setClientSecret(data.data.clientSecret);
          setStripePaymentId(data.data.stripePaymentId);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    createIntent();
  }, [bookingId, amount, backendUrl]);

  if (loading) {
    return <div className="p-10">Creating payment...</div>;
  }

  if (!clientSecret) {
    return (
      <div className="p-10 text-red-500">
        Failed to create payment intent
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 border rounded bg-white">

      {/* 🔥 ONLY UI IMPROVED - NO LOGIC CHANGE */}

      <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4 text-center font-bold">
        💳 PAYMENT REQUIRED TO CONFIRM BOOKING
      </div>

      <div className="flex justify-between mb-6 text-sm">
        <span className="text-green-600">✓ Booking Created</span>
        <span className="text-red-600 font-bold">
          ● Pay Now
        </span>
        <span>Complete</span>
      </div>

      <h1 className="text-2xl font-bold mb-4 text-center">
        Complete Your Tutor Booking
      </h1>

      <div className="bg-yellow-100 p-4 rounded mb-6 text-center">
        <p className="font-semibold">Amount to Pay</p>
        <p className="text-2xl font-bold text-green-700">
          ${amount}
        </p>
      </div>

      <div className="mb-4 text-center text-gray-600 text-sm">
        Your booking will be confirmed only after payment.
      </div>

      <div className="mb-6">
        <p>
          <strong>Booking ID:</strong> {bookingId}
        </p>
      </div>

      <Elements
        stripe={stripePromise}
        options={{ clientSecret }}
      >
        <CheckoutForm
          bookingId={bookingId}
          stripePaymentId={stripePaymentId}
          backendUrl={backendUrl}
        />
      </Elements>
    </div>
  );
}