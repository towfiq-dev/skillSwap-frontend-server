import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white border rounded-2xl p-10 text-center shadow-sm max-w-md">
        <div className="text-6xl mb-4">🚫</div>

        <h1 className="text-2xl font-bold text-gray-800">
          Access Denied
        </h1>

        <p className="text-gray-500 mt-2">
          You do not have permission to access this page.
        </p>

        <Link
          href="/"
          className="inline-block mt-6 px-6 py-2 rounded-lg text-white bg-gradient-to-r from-[#678d58] to-[#74d3ae]"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}