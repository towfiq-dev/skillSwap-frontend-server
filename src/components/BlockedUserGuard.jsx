"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function BlockedUserGuard() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    const checkBlocked = async () => {
      if (!session?.user?.email) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/status/${session.user.email}`
      );

      const data = await res.json();

      if (data.blocked) {
        await authClient.signOut();

      
        router.replace("/login");
      }
    };

    checkBlocked();
  }, [session]);

  return null;
}