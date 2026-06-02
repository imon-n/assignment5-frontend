"use client";

import React, { useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

function CheckoutForm({
  clientSecret,
  stripePaymentId,
  bookingId,
  backendUrl,
  frontendUrl,
}: {
  clientSecret: string;
  stripePaymentId: string;
  bookingId: string;
  backendUrl: string;
  frontendUrl: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const verifyPayment = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/v1/payments/stripe/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          stripePaymentId,
          bookingId,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage("Payment completed and verified successfully.");
      } else {
        setError(data.message || "Payment verification failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error verifying the payment.");
    }
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setError(null);
    setMessage(null);

    const baseUrl = frontendUrl || window.location.origin;
    const returnUrl = `${baseUrl}/checkout/success?stripePaymentId=${encodeURIComponent(
      stripePaymentId
    )}&bookingId=${encodeURIComponent(bookingId)}`;

    const confirmResult = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
      redirect: "if_required",
    });

    if (confirmResult.error) {
      setError(confirmResult.error.message || "Payment confirmation failed.");
      setProcessing(false);
      return;
    }

    const paymentIntent = confirmResult.paymentIntent;

    if (paymentIntent && paymentIntent.status === "succeeded") {
      await verifyPayment();
    } else if (paymentIntent && paymentIntent.status === "requires_action") {
      setMessage(
        "Additional authentication required. Please complete the payment flow in the Stripe popup."
      );
    } else {
      setMessage(
        "Payment submitted. If the page redirects, follow the Stripe flow. Otherwise, verify later."
      );
    }

    setProcessing(false);
  };

  return (
    <div>
      <form onSubmit={handlePay}>
        <PaymentElement />
        {error && <div style={{ color: "red" }}>{error}</div>}
        {message && <div style={{ color: "green" }}>{message}</div>}
        <button type="submit" disabled={!stripe || processing}>
          {processing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
}

export default function CheckoutPageClient({
  backendUrl,
  frontendUrl,
  stripePublicKey,
}: {
  backendUrl: string;
  frontendUrl: string;
  stripePublicKey: string;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [stripePaymentId, setStripePaymentId] = useState<string>("");
  const [paymentId, setPaymentId] = useState<string>("");
  const [bookingId, setBookingId] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stripePromise = useMemo(
    () => loadStripe(stripePublicKey),
    [stripePublicKey]
  );

  if (!stripePublicKey) {
    return (
      <div>
        <h1>Stripe Checkout</h1>
        <div style={{ color: "red" }}>
          Missing Stripe public key. Set `NEXT_PUBLIC_STRIPE_PK` or `STRIPE_PK` in your environment.
        </div>
      </div>
    );
  }

  const createPaymentIntent = async () => {
    setLoading(true);
    setError(null);

    if (!bookingId) {
      setError("Booking ID is required.");
      setLoading(false);
      return;
    }
    if (!amount || amount <= 0) {
      setError("Amount must be greater than 0.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/api/v1/payments/stripe/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ bookingId, amount, description }),
      });

      const data = await res.json();
      if (res.ok && data.data && data.data.clientSecret) {
        setClientSecret(data.data.clientSecret);
        setStripePaymentId(data.data.stripePaymentId);
        setPaymentId(data.data.paymentId);
      } else {
        setError(data.message || "Failed to create payment intent");
      }
    } catch (err) {
      console.error(err);
      setError("Network error creating payment intent");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Stripe Checkout</h1>
      {!clientSecret ? (
        <div>
          <div>
            <label>
              Booking ID
              <input
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Amount (USD)
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </label>
          </div>
          <div>
            <label>
              Description
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button onClick={createPaymentIntent} disabled={loading}>
            {loading ? "Creating payment intent..." : "Create Payment"}
          </button>
        </div>
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            clientSecret={clientSecret}
            stripePaymentId={stripePaymentId}
            bookingId={bookingId}
            backendUrl={backendUrl}
            frontendUrl={frontendUrl}
          />
        </Elements>
      )}
    </div>
  );
}
