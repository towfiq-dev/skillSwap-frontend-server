"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();
  const router = useRouter();

  const session_id = params.get("session_id");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session_id) return;

    const confirmPayment = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/confirm-session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ session_id }),
          }
        );

        const result = await res.json();

        if (!res.ok) throw new Error(result.error);

        setData(result);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [session_id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Confirming payment...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="border rounded-xl p-8 text-center bg-white shadow-md max-w-md w-full">

        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful 🎉
        </h1>

        <div className="mt-4 text-gray-700 space-y-2">
          <p><b>Task:</b> {data?.taskTitle}</p>
          <p><b>Freelancer:</b> {data?.freelancerName}</p>
          <p><b>Amount Paid:</b> ${data?.amount}</p>
        </div>

        <button
          onClick={() => router.push("/dashboard/client")}
          className="mt-6 w-full bg-[#678d58] text-white py-2 rounded hover:opacity-90"
        >
          Go to Dashboard
        </button>

      </div>
    </div>
  );
}