"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form, TextField, Input, Label, FieldError } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (error) {
        toast.error(error.message || "Login failed");
        setError(error.message);
        setLoading(false);
        return;
      }

      const statusRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/status/${user.email}`
      );
      const status = await statusRes.json();

      if (status.blocked) {
        await authClient.signOut();
        toast.error("Your account has been blocked");
        setLoading(false);
        return;
      }

      const role = data?.user?.role;
      if (role === "admin") {
        router.push("/dashboard/admin");
      } else if (role === "freelancer") {
        router.push("/dashboard/freelancer");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f7f8f5]">

      {/* ── TOP MOBILE BANNER (visible only on small screens) ── */}
      <div className="lg:hidden w-full bg-gradient-to-r from-[#678d58] via-[#4a6e3d] to-[#2e4a26] px-6 py-8 flex flex-col items-center text-center relative overflow-hidden">
        {/* Blobs */}
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-[#74d3ae]/20 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#dd9787]/15 blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="w-14 h-14 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-2xl mx-auto mb-3">
            🌿
          </div>
          <h2 className="text-xl font-bold text-white leading-snug mb-1">
            Your work. Your terms.
          </h2>
          <p className="text-xs text-white/65 max-w-[260px] mx-auto mb-4">
            Join thousands of freelancers building meaningful careers.
          </p>
          {/* Stats row */}
          <div className="flex gap-6 justify-center">
            {[
              { num: "12k+", label: "Freelancers" },
              { num: "98%", label: "Satisfaction" },
              { num: "4.9★", label: "Rating" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="text-base font-bold text-[#74d3ae]">{num}</div>
                <div className="text-[9px] uppercase tracking-widest text-white/50 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── LEFT DECORATIVE PANEL (desktop only) ── */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col justify-center items-center px-12 py-16 bg-gradient-to-br from-[#678d58] via-[#4a6e3d] to-[#2e4a26]">
        {/* Blobs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#74d3ae]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#dd9787]/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 text-center text-white">
          <div className="w-20 h-20 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-4xl mx-auto mb-7">
            🌿
          </div>
          <h2 className="text-3xl font-bold leading-snug tracking-tight mb-3">
            Your work.<br />Your terms.
          </h2>
          <p className="text-sm text-white/65 leading-relaxed max-w-[270px] mx-auto mb-10">
            Join thousands of freelancers building meaningful careers on their own schedule.
          </p>

          {/* Stats */}
          <div className="flex gap-8 justify-center">
            {[
              { num: "12k+", label: "Freelancers" },
              { num: "98%", label: "Satisfaction" },
              { num: "4.9★", label: "Rating" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-[#74d3ae]">{num}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/50 mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Tag strip */}
          <div className="mt-14 flex gap-3 justify-center flex-wrap">
            {["Design", "Development", "Marketing"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-white/10 border border-white/15 text-white/75"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-10 lg:py-16">
        <div className="w-full max-w-[420px]">

          {/* Header */}
          <div className="mb-7">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#74d3ae] mb-2">
              Welcome back
            </p>
            <h1 className="text-2xl sm:text-[28px] font-bold text-[#1a2416] tracking-tight leading-tight mb-1.5">
              Sign in to continue
            </h1>
            <p className="text-sm text-[#6b7a65]">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Error alert */}
          {error && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
              <Icon icon="mdi:alert-circle-outline" className="text-red-500 text-lg shrink-0 mt-0.5" />
              <span className="text-sm text-red-600 leading-snug">{error}</span>
            </div>
          )}

          {/* Form */}
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">

            {/* EMAIL */}
            <TextField name="email" isRequired type="email" className="flex flex-col gap-1.5">
              <Label className="text-[13px] font-semibold text-[#2e4026]">
                Email address
              </Label>
              <div className="relative">
                <Icon
                  icon="mdi:email-outline"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9aab93] text-base pointer-events-none z-10"
                />
                <Input
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#dde8d8] bg-[#f9fbf8] text-sm text-[#1a2416] placeholder:text-[#b2c3aa] outline-none focus:border-[#678d58] focus:bg-white focus:ring-2 focus:ring-[#678d58]/15 transition-all"
                />
              </div>
              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* PASSWORD */}
            <TextField name="password" isRequired type="password" className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <Label className="text-[13px] font-semibold text-[#2e4026]">
                  Password
                </Label>
                <Link
                  href="/forgetPassword"
                  className="text-xs font-medium text-[#678d58] hover:text-[#4a6e3d] hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Icon
                  icon="mdi:lock-outline"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9aab93] text-base pointer-events-none z-10"
                />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#dde8d8] bg-[#f9fbf8] text-sm text-[#1a2416] placeholder:text-[#b2c3aa] outline-none focus:border-[#678d58] focus:bg-white focus:ring-2 focus:ring-[#678d58]/15 transition-all"
                />
              </div>
              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* SUBMIT */}
            <Button
              type="submit"
              isDisabled={loading}
              className="w-full py-3 mt-1 rounded-xl bg-gradient-to-r from-[#678d58] to-[#74d3ae] text-white text-[15px] font-semibold tracking-wide shadow-[0_4px_16px_rgba(103,141,88,0.32)] hover:shadow-[0_6px_22px_rgba(103,141,88,0.42)] hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Icon icon="mdi:loading" className="animate-spin text-lg" />
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </Form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#dde8d8]" />
            <span className="text-xs text-[#9aab93] font-medium">or continue with</span>
            <div className="flex-1 h-px bg-[#dde8d8]" />
          </div>

          {/* Google */}
          <Button
            onPress={handleGoogleSignIn}
            variant="bordered"
            className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-[#dde8d8] bg-white text-[#2e4026] text-sm font-medium hover:bg-[#f4f9f2] hover:border-[#b8d4af] hover:shadow-sm transition-all"
          >
            <Icon icon="devicon:google" className="text-lg" />
            Sign in with Google
          </Button>

          {/* Footer */}
          <p className="text-center text-[13px] sm:text-[13.5px] text-[#6b7a65] mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#dd9787] font-semibold hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
