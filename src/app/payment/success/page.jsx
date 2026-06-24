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
  <div className="min-h-screen bg-[#111111] flex items-center justify-center p-4">
    <div className="w-full max-w-lg">

      <div className="bg-gradient-to-br from-[#1d1d1d] to-[#242424] border border-[#343434] rounded-3xl p-8 shadow-2xl">

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-[#7f9377]/20 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#aeb8a7] flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-[#1d3b16]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="flex justify-center mt-4">
          <span className="px-4 py-1 rounded-full bg-[#aeb8a7] text-[#24361e] text-sm font-medium">
            ✓ Payment verified
          </span>
        </div>

        {/* Title */}
        <div className="text-center mt-5">
          <h1 className="text-4xl font-bold text-white">
            Payment Successful
          </h1>

          <p className="text-gray-400 mt-3">
            Your project has been funded and assigned to the freelancer.
          </p>
        </div>

        {/* Details */}
        <div className="mt-8 bg-[#181818] border border-[#2b2b2b] rounded-2xl p-5">

          <div className="flex justify-between py-3 border-b border-[#2d2d2d]">
            <span className="text-gray-400">Task</span>
            <span className="text-white font-medium">
              {data?.taskTitle}
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-[#2d2d2d]">
            <span className="text-gray-400">Freelancer</span>
            <span className="text-white font-medium">
              {data?.freelancerName}
            </span>
          </div>

          <div className="flex justify-between py-3">
            <span className="text-gray-400">Status</span>

            <span className="px-3 py-1 rounded-full bg-[#aeb8a7] text-[#24361e] text-sm">
              In Progress
            </span>
          </div>

        </div>

        {/* Amount Card */}
        <div className="mt-6 bg-[#b8c1b2] rounded-2xl p-5 flex justify-between items-center">

          <div>
            <p className="text-[#3f4d39] text-sm">
              Total charged
            </p>

            <h2 className="text-4xl font-bold text-[#24361e]">
              ${data?.amount}
            </h2>
          </div>

          <div className="text-right">
            <p className="text-[#3f4d39] text-sm">
              Transaction
            </p>

            <p className="font-semibold text-[#24361e]">
              #{session_id?.slice(-8)}
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="my-6 h-[2px] bg-[#678d58] rounded-full" />

        {/* Message */}
        <p className="text-center text-gray-400 mb-6">
          Project funded and ready to start
        </p>

        {/* Button */}
        <button
          onClick={() => router.push("/dashboard/client")}
          className="group w-full cursor-pointer border border-[#4b4b4b] rounded-2xl py-4 text-white flex items-center justify-center gap-2 hover:bg-[#678d58] hover:border-[#678d58] transition-all duration-300"
        >
          Go to Dashboard

          <MdArrowUpward className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </button>

        <p className="text-center text-gray-500 text-sm mt-5">
          A confirmation has been sent to your email.
        </p>

      </div>
    </div>
  </div>
);
}