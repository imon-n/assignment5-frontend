"use client";

import { useEffect, useState } from "react";

type Payment = {
  id: string;
  amount: number;
  status: string;
  method: string;
  createdAt: string;
  bookingId: string;
};

export default function PaymentHistoryPage() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch(`${API}/api/payments/history`, {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setPayments(data.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [API]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Payment History 💳</h1>

      {payments.length === 0 ? (
        <div className="bg-white p-6 border rounded-md text-gray-500">
          No payments found
        </div>
      ) : (
        <div className="grid gap-4">
          {payments.map((p) => (
            <div
              key={p.id}
              className="bg-white border rounded-md p-5 flex justify-between items-center"
            >
              {/* LEFT */}
              <div>
                <p className="font-semibold">
                  Booking ID: {p.bookingId}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(p.createdAt).toLocaleString()}
                </p>

                <p className="text-xs text-gray-400">
                  Method: {p.method}
                </p>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <p className="text-green-600 font-bold text-lg">
                  ${p.amount}
                </p>

                <p
                  className={`text-xs font-semibold ${
                    p.status === "COMPLETED"
                      ? "text-green-600"
                      : p.status === "FAILED"
                      ? "text-red-500"
                      : p.status === "REFUNDED"
                      ? "text-purple-600"
                      : "text-yellow-500"
                  }`}
                >
                  {p.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}