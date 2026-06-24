"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Form,
  TextField,
  Input,
  Label,
  FieldError,
  Description,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    role: "client",
  });

  const [error, setError] = useState("");

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    setError("");

    if (!form.name || !form.email || !form.password) {
      return setError("All required fields must be filled");
    }

    if (!passwordRegex.test(form.password)) {
      return setError(
        "Password must be 6+ chars, include uppercase & lowercase"
      );
    }

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image,
      role: user.role,
    });

    if (data) {
      toast.success("Sign up Successful! 🎊");
      router.push("/");
    }
    if (error) {
      toast.error(error.message);
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

      {/* ── TOP MOBILE BANNER ── */}
      <div className="lg:hidden w-full bg-gradient-to-r from-[#678d58] via-[#4a6e3d] to-[#2e4a26] px-6 py-7 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-[#74d3ae]/20 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#dd9787]/15 blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-xl mx-auto mb-3">
            🌿
          </div>
          <h2 className="text-lg font-bold text-white leading-snug mb-1">
            Start your journey today
          </h2>
          <p className="text-xs text-white/65 max-w-[260px] mx-auto mb-4">
            Join as a client or freelancer and unlock your potential.
          </p>
          <div className="flex gap-6 justify-center">
            {[
              { num: "12k+", label: "Members" },
              { num: "5k+", label: "Projects" },
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
      <div className="hidden lg:flex lg:w-[42%] relative overflow-hidden flex-col justify-center items-center px-12 py-16 bg-gradient-to-br from-[#678d58] via-[#4a6e3d] to-[#2e4a26]">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#74d3ae]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#dd9787]/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        <div className="relative z-10 text-center text-white">
          <div className="w-20 h-20 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-4xl mx-auto mb-7">
            🌿
          </div>
          <h2 className="text-3xl font-bold leading-snug tracking-tight mb-3">
            Start your<br />journey today.
          </h2>
          <p className="text-sm text-white/65 leading-relaxed max-w-[270px] mx-auto mb-10">
            Create an account as a client or freelancer and unlock a world of opportunities.
          </p>

          <div className="flex gap-8 justify-center">
            {[
              { num: "12k+", label: "Members" },
              { num: "5k+", label: "Projects" },
              { num: "4.9★", label: "Rating" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-[#74d3ae]">{num}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/50 mt-1">{label}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex gap-3 justify-center flex-wrap">
            {["Design", "Development", "Marketing"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-white/10 border border-white/15 text-white/75"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Role cards */}
          <div className="mt-10 flex gap-4 justify-center">
            {[
              { icon: "mdi:briefcase-outline", title: "Client", desc: "Post jobs & hire" },
              { icon: "mdi:laptop", title: "Freelancer", desc: "Find work & earn" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white/10 border border-white/15 rounded-2xl px-4 py-3 text-left w-32">
                <Icon icon={icon} className="text-[#74d3ae] text-xl mb-1" />
                <div className="text-sm font-semibold text-white">{title}</div>
                <div className="text-[10px] text-white/55 mt-0.5">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-10 lg:py-12">
        <div className="w-full max-w-[420px]">

          {/* Header */}
          <div className="mb-6">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#74d3ae] mb-2">
              Get started
            </p>
            <h1 className="text-2xl sm:text-[28px] font-bold text-[#1a2416] tracking-tight leading-tight mb-1.5">
              Create your account
            </h1>
            <p className="text-sm text-[#6b7a65]">
              Fill in the details below to join the community
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
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* NAME */}
            <TextField name="name" isRequired className="flex flex-col gap-1.5">
              <Label className="text-[13px] font-semibold text-[#2e4026]">Full Name</Label>
              <div className="relative">
                <Icon
                  icon="mdi:account-outline"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9aab93] text-base pointer-events-none z-10"
                />
                <Input
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#dde8d8] bg-[#f9fbf8] text-sm text-[#1a2416] placeholder:text-[#b2c3aa] outline-none focus:border-[#678d58] focus:bg-white focus:ring-2 focus:ring-[#678d58]/15 transition-all"
                />
              </div>
              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* EMAIL */}
            <TextField
              name="email"
              type="email"
              isRequired
              validate={(value) => {
                if (!value.includes("@")) return "Enter a valid email address";
                return null;
              }}
              className="flex flex-col gap-1.5"
            >
              <Label className="text-[13px] font-semibold text-[#2e4026]">Email Address</Label>
              <div className="relative">
                <Icon
                  icon="mdi:email-outline"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9aab93] text-base pointer-events-none z-10"
                />
                <Input
                  placeholder="you@example.com"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#dde8d8] bg-[#f9fbf8] text-sm text-[#1a2416] placeholder:text-[#b2c3aa] outline-none focus:border-[#678d58] focus:bg-white focus:ring-2 focus:ring-[#678d58]/15 transition-all"
                />
              </div>
              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* IMAGE URL */}
            <TextField name="image" className="flex flex-col gap-1.5">
              <Label className="text-[13px] font-semibold text-[#2e4026]">
                Image URL{" "}
                <span className="text-[#9aab93] font-normal">(optional)</span>
              </Label>
              <div className="relative">
                <Icon
                  icon="mdi:image-outline"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9aab93] text-base pointer-events-none z-10"
                />
                <Input
                  placeholder="https://example.com/photo.jpg"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#dde8d8] bg-[#f9fbf8] text-sm text-[#1a2416] placeholder:text-[#b2c3aa] outline-none focus:border-[#678d58] focus:bg-white focus:ring-2 focus:ring-[#678d58]/15 transition-all"
                />
              </div>
              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* PASSWORD */}
            <TextField
              name="password"
              type="password"
              isRequired
              validate={(value) => {
                if (value.length < 6) return "Minimum 6 characters required";
                if (!/[A-Z]/.test(value)) return "Must include at least 1 uppercase letter";
                if (!/[a-z]/.test(value)) return "Must include at least 1 lowercase letter";
                return null;
              }}
              className="flex flex-col gap-1.5"
            >
              <Label className="text-[13px] font-semibold text-[#2e4026]">Password</Label>
              <div className="relative">
                <Icon
                  icon="mdi:lock-outline"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9aab93] text-base pointer-events-none z-10"
                />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#dde8d8] bg-[#f9fbf8] text-sm text-[#1a2416] placeholder:text-[#b2c3aa] outline-none focus:border-[#678d58] focus:bg-white focus:ring-2 focus:ring-[#678d58]/15 transition-all"
                />
              </div>
              <Description className="text-[11px] text-[#9aab93] leading-snug mt-0.5">
                Min 6 characters with at least one uppercase & lowercase letter
              </Description>
              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* ROLE */}
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-semibold text-[#2e4026]">Account Type</span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "client", label: "Client", icon: "mdi:briefcase-outline", desc: "Post jobs & hire" },
                  { value: "freelancer", label: "Freelancer", icon: "mdi:laptop", desc: "Find work & earn" },
                ].map(({ value, label, icon, desc }) => (
                  <label
                    key={value}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                      form.role === value
                        ? "border-[#678d58] bg-[#678d58]/5"
                        : "border-[#dde8d8] bg-[#f9fbf8] hover:border-[#b8d4af]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={value}
                      checked={form.role === value}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <Icon
                      icon={icon}
                      className={`text-xl shrink-0 ${form.role === value ? "text-[#678d58]" : "text-[#9aab93]"}`}
                    />
                    <div>
                      <div className={`text-[13px] font-semibold ${form.role === value ? "text-[#2e4026]" : "text-[#6b7a65]"}`}>
                        {label}
                      </div>
                      <div className="text-[10px] text-[#9aab93]">{desc}</div>
                    </div>
                    {form.role === value && (
                      <Icon icon="mdi:check-circle" className="text-[#678d58] text-base ml-auto shrink-0" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* SUBMIT */}
            <Button
              type="submit"
              className="w-full py-3 mt-1 rounded-xl bg-gradient-to-r from-[#678d58] to-[#74d3ae] text-white text-[15px] font-semibold tracking-wide shadow-[0_4px_16px_rgba(103,141,88,0.32)] hover:shadow-[0_6px_22px_rgba(103,141,88,0.42)] hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Create Account
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
            onClick={handleGoogleSignIn}
            variant="bordered"
            className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-[#dde8d8] bg-white text-[#2e4026] text-sm font-medium hover:bg-[#f4f9f2] hover:border-[#b8d4af] hover:shadow-sm transition-all"
          >
            <Icon icon="devicon:google" className="text-lg" />
            Sign up with Google
          </Button>

          {/* Footer */}
          <p className="text-center text-[13px] sm:text-[13.5px] text-[#6b7a65] mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#dd9787] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
