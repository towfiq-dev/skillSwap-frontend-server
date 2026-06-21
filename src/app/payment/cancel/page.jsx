export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border rounded-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-red-500">
          Payment Cancelled
        </h1>

        <p className="mt-3">
          No changes were made.
        </p>
      </div>
    </div>
  );
}