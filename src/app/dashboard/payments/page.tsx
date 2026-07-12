"use client";

import { useEffect, useState } from "react";
import {
  CreditCard,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Clock3,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

type Payment = {
  id: string;
  amount: number;
  status: string;
  method: string;
  createdAt: string;
  bookingId: string;
};

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch(
          `${API}/api/v1/payments/history`,
          {
            credentials: "include",
          }
        );

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
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return {
          color:
            "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
          icon: <CheckCircle2 size={16} />,
        };

      case "FAILED":
        return {
          color:
            "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
          icon: <XCircle size={16} />,
        };

      case "REFUNDED":
        return {
          color:
            "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
          icon: <RotateCcw size={16} />,
        };

      default:
        return {
          color:
            "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
          icon: <Clock3 size={16} />,
        };
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#169B87] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-3xl bg-gradient-to-r from-[#005C53] to-[#169B87] p-8 text-white shadow-xl">

        <div className="flex items-center gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xl">
            <CreditCard size={34} />
          </div>

          <div>

            <h1 className="text-4xl font-bold">
              Payment History
            </h1>

            <p className="mt-2 text-white/90">
              View all your completed tutoring payments.
            </p>

          </div>

        </div>

      </div>

      {/* Empty */}

      {payments.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">

          <CreditCard
            className="mx-auto text-slate-400"
            size={60}
          />

          <h2 className="mt-5 text-3xl font-bold dark:text-white">
            No Payments Yet
          </h2>

          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Your payment history will appear here.
          </p>

        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-[#005C53] text-white">

                <tr>

                  <th className="px-6 py-5 text-left font-semibold">
                    Booking ID
                  </th>

                  <th className="px-6 py-5 text-left font-semibold">
                    Date
                  </th>

                  <th className="px-6 py-5 text-left font-semibold">
                    Method
                  </th>

                  <th className="px-6 py-5 text-center font-semibold">
                    Amount
                  </th>

                  <th className="px-6 py-5 text-center font-semibold">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {payments.map((payment) => {
                  const status = getStatusStyle(
                    payment.status
                  );

                  return (
                    <tr
                      key={payment.id}
                      className="border-b border-slate-200 transition-all duration-300 hover:bg-emerald-50 dark:border-slate-800 dark:hover:bg-slate-800"
                    >
                      <td className="px-6 py-5 font-medium text-slate-900 dark:text-white">
                        {payment.bookingId}
                      </td>

                      <td className="px-6 py-5 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {new Date(
                          payment.createdAt
                        ).toLocaleDateString()}
                        <br />
                        <span className="text-xs">
                          {new Date(
                            payment.createdAt
                          ).toLocaleTimeString()}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium dark:bg-slate-800 dark:text-slate-300">
                          {payment.method}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-center text-lg font-bold text-emerald-600">
                        ${payment.amount}
                      </td>

                      <td className="px-6 py-5">

                        <div className="flex justify-center">

                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${status.color}`}
                          >
                            {status.icon}
                            {payment.status}
                          </span>

                        </div>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </div>
      )}
    </div>
  );
}