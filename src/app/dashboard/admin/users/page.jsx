"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { data: tokenData } = await authClient.token();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${tokenData.token}`,
      },
    });

    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const blockUser = async (id) => {
    const { data: tokenData } = await authClient.token();

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/block/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${tokenData.token}`,
      },
    });

    fetchUsers();
  };

  const unblockUser = async (id) => {
    const { data: tokenData } = await authClient.token();

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/unblock/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${tokenData.token}`,
      },
    });

    fetchUsers();
  };

  return (
    <div>
      <h1>Manage Users</h1>

      {users.map((u) => (
        <div key={u._id} className="border p-2 my-2">
          <p>{u.name}</p>
          <p>{u.email}</p>
          <p>{u.role}</p>
          <p>Blocked: {String(u.blocked)}</p>

          {!u.blocked ? (
            <button onClick={() => blockUser(u._id)}>
              Block
            </button>
          ) : (
            <button onClick={() => unblockUser(u._id)}>
              Unblock
            </button>
          )}
        </div>
      ))}
    </div>
  );
}