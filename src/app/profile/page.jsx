"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/profile/${session.user.email}`
        );

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setProfile(null);
      }
    };

    loadProfile();
  }, [session?.user?.email]);

  useEffect(() => {
  if (!isPending && !session) {
    router.replace("/login");
  }
}, [isPending, session, router]);

  if (isPending || !profile) {
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
          Loading your profile...
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
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl p-8">

        {/* HEADER */}
        <div className="flex items-center gap-6">

          {profile.image ? (
            <Image
              src={profile.image}
              alt={profile.name}
              width={500}
              height={500}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#678d58] to-[#74d3ae] flex items-center justify-center text-white text-3xl font-bold shadow-md">
              {profile?.name?.charAt(0)?.toUpperCase()}
            </div>
          )}

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {profile.name}
            </h1>

            <p className="text-gray-500">{profile.email}</p>

            <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-[#74d3ae]/20 text-[#2f6f57] capitalize">
              {profile.role}
            </span>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-6 border-t"></div>

        {/* INFO GRID */}
        <div className="grid sm:grid-cols-2 gap-4 text-sm">

          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-gray-500">Email</p>
            <p className="font-medium text-gray-800">{profile.email}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-gray-500">Role</p>
            <p className="font-medium text-gray-800 capitalize">
              {profile.role}
            </p>
          </div>

        </div>

        {/* FOOTER NOTE */}
        <p className="text-xs text-gray-400 mt-6 text-center">
          Manage your account details from your dashboard
        </p>

      </div>
    </div>
  );
}