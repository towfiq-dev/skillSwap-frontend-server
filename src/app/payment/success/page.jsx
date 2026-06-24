"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MdArrowUpward } from "react-icons/md";

export default function SuccessPage() {
  const params = useSearchParams();
  const router = useRouter();

  const session_id = params.get("session_id");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (!session_id) {
    router.replace("/unauthorized");
    return;
  }

  const confirmPayment = async () => {
    try {
      setLoading(true);

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

      if (!res.ok) {
        router.replace("/unauthorized");
        return;
      }

      setData(result);
    } catch (err) {
      router.replace("/unauthorized");
    } finally {
      setLoading(false);
    }
  };

  confirmPayment();
}, [session_id]);

  if (loading) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-gray-50">
      
      <div className="flex flex-col items-center gap-6">

        {/* Floating dots animation */}
        <div className="flex gap-3">
          <span className="h-3 w-3 bg-[#678d58] rounded-full animate-bounce"></span>
          <span className="h-3 w-3 bg-[#74d3ae] rounded-full animate-bounce [animation-delay:150ms]"></span>
          <span className="h-3 w-3 bg-[#678d58] rounded-full animate-bounce [animation-delay:300ms]"></span>
        </div>

        {/* Main animated text */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Loading your tasks
          </h2>

          <p className="text-gray-500 mt-1 animate-pulse">
            organizing your workspace...
          </p>
        </div>

        {/* Fun rotating ring */}
        <div className="relative mt-2">
          <div className="h-14 w-14 rounded-full border-4 border-gray-200"></div>
          <div className="h-14 w-14 rounded-full border-4 border-t-[#678d58] border-l-[#74d3ae] border-r-transparent border-b-transparent animate-spin absolute top-0 left-0"></div>
        </div>

      </div>
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
          className="mt-6 w-full bg-linear-to-r from-[#678d58] to-[#74d3ae] text-white py-2 rounded-full hover:opacity-90"
        >
          Go to Dashboard
        </button>

      </div>
    </div>
  );
}