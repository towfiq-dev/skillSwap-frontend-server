"use client";

import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-gray-900 to-black px-6">
      <div className="max-w-xl w-full text-center">
        {/* Error Icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-white mb-4">
          Oops!
        </h1>

        <h2 className="text-2xl font-semibold text-gray-300 mb-4">
          Something went wrong
        </h2>

        {/* Description */}
        <p className="text-gray-400 leading-relaxed mb-8">
          We encountered an unexpected error while processing your request.
          Please try again or return to the homepage.
        </p>

        {/* Error Message (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-8 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-left">
            <p className="text-red-400 text-sm break-words">
              {error?.message}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="group flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-white font-medium transition-all duration-300 hover:bg-red-600 hover:scale-105"
          >
            <RefreshCcw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </button>

          <Link
            href="/"
            className="group flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-800/50 px-6 py-3 text-white font-medium transition-all duration-300 hover:bg-gray-700 hover:scale-105"
          >
            <Home className="h-5 w-5" />
            Back Home
          </Link>
        </div>

        {/* Footer Text */}
        <p className="mt-10 text-sm text-gray-500">
          Error Code: 500 • Internal Server Error
        </p>
      </div>
    </div>
  );
}