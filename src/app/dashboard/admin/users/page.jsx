"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { AlertDialog, Button } from "@heroui/react";
import { toast } from "react-toastify";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
 const fetchUsers = async () => {
  try {
    setLoading(true);

    const { data: tokenData } = await authClient.token();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
      }
    );

    const data = await res.json();
    setUsers(data);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

 const blockUser = async (id) => {
  try {
    const { data: tokenData } = await authClient.token();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/block/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
      }
    );

    if (!res.ok) throw new Error();

    toast.success("User blocked successfully 🚫");
    fetchUsers();
  } catch (err) {
    toast.error("Failed to block user");
  }
};

 const unblockUser = async (id) => {
  try {
    const { data: tokenData } = await authClient.token();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/unblock/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
      }
    );

    if (!res.ok) throw new Error();

    toast.success("User unblocked successfully ✅");
    fetchUsers();
  } catch (err) {
    toast.error("Failed to unblock user");
  }
};
  if (loading) {
  return (
    <div>
             <div className="min-h-screen flex items-center justify-center bg-gray-50">
      
      <div className="flex flex-col items-center gap-4">
        
        {/* Animated ring loader */}
        <div className="relative">
          <div className="h-14 w-14 rounded-full border-4 border-gray-200"></div>
          <div className="h-14 w-14 rounded-full border-4 border-t-[#678d58] border-r-transparent border-b-transparent border-l-transparent animate-spin absolute top-0 left-0"></div>
        </div>

        {/* Text */}
        <p className="text-gray-600 font-medium tracking-wide">
          Loading your users...
        </p>

        {/* subtle dots animation */}
        <div className="flex gap-1 mt-1">
          <span className="h-2 w-2 bg-[#678d58] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="h-2 w-2 bg-[#678d58] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="h-2 w-2 bg-[#678d58] rounded-full animate-bounce"></span>
        </div>

      </div>
    </div>
        </div>
  );
}

 return (
  <div className="p-6">
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Manage Users
      </h1>
      <p className="text-gray-500 mt-1">
        View, block, and manage platform users
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {users?.map((u) => (
        <div
          key={u._id}
          className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md transition"
        >
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-5">
           <div className="w-14 h-14 rounded-full overflow-hidden border">
  {u?.image ? (
    <Image
      src={u?.image}
      alt={u?.name}
      width={100}
      height={100}
      className="w-full h-full object-cover rounded-full"
    />
  ) : (
    <div className="w-full h-full bg-[#678d58] text-white flex items-center justify-center text-xl font-bold">
      {u?.name?.charAt(0)?.toUpperCase() || "U"}
    </div>
  )}
</div>

            <div>
              <h2 className="font-semibold text-lg text-gray-800">
                {u.name}
              </h2>

              <p className="text-sm text-gray-500">
                {u.email}
              </p>
            </div>
          </div>

          {/* Role */}
          <div className="flex items-center justify-between mb-3 mt-6">
            <span className="text-gray-500 font-semibold text-xs">
              Role
            </span>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                u.role === "admin"
                  ? "bg-purple-100 text-purple-700"
                  : u.role === "freelancer"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {u.role}
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-500 font-semibold text-xs">
              Status
            </span>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                u.blocked
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {u.blocked ? "Blocked" : "Active"}
            </span>
          </div>

        
        {/* Action */}
{!u.blocked ? (
  <AlertDialog>
    <Button
      variant="danger-soft"
      className="w-full py-2.5 rounded-full border-2 border-red-600"
    >
      Block User
    </Button>

    <AlertDialog.Backdrop>
      <AlertDialog.Container>
        <AlertDialog.Dialog className="sm:max-w-md">

          <AlertDialog.CloseTrigger />

          <AlertDialog.Header>
            <AlertDialog.Icon status="danger" />
            <AlertDialog.Heading>
              Block User?
            </AlertDialog.Heading>
          </AlertDialog.Header>

          <AlertDialog.Body>
            <p>
              Are you sure you want to block{" "}
              <strong>{u.name}</strong>?
            </p>
            <p className="text-sm text-gray-500 mt-2">
              This user will lose access to the platform.
            </p>
          </AlertDialog.Body>

          <AlertDialog.Footer>
            <Button slot="close" variant="tertiary">
              Cancel
            </Button>

            <Button
              slot="close"
              variant="danger-soft"
              onPress={() => blockUser(u._id)}
            >
              Yes, Block
            </Button>
          </AlertDialog.Footer>

        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  </AlertDialog>
) : (
  <Button
    onClick={() => unblockUser(u._id)}
    className="w-full bg-gradient-to-r from-[#678d58] to-[#74d3ae] text-white py-2.5 rounded-xl font-medium transition"
  >
    Unblock User
  </Button>
)}
        </div>
      ))}
    </div>
  </div>
);
}