"use client";

export default function Loading() {
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