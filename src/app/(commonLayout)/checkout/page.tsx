import CheckoutPageClient from "./CheckoutPageClient";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{
    bookingId?: string;
    amount?: string;
  }>;
}) {
  const params = await searchParams;

  const bookingId = params.bookingId;
  const amount = Number(params.amount);

  const backendUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.BACKEND_URL ||
    "http://localhost:5000";

  if (!bookingId || !amount) {
    return <div>Invalid payment request</div>;
  }

  return (
    <CheckoutPageClient
      bookingId={bookingId}
      amount={amount}
      backendUrl={backendUrl}
    />
  );
}