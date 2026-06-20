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

      // 🔥 Role-based redirect (you can adjust later)
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center mb-6 text-[#678d58]">
          Welcome Back
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        {/* FORM */}
        <Form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* EMAIL */}
          <TextField name="email" isRequired type="email">
            <Label>Email</Label>
            <Input placeholder="Enter your email" />
            <FieldError />
          </TextField>

          {/* PASSWORD */}
          <TextField name="password" isRequired type="password">
            <Label>Password</Label>
            <Input type="password" placeholder="Enter your password" />
            <FieldError />
          </TextField>

          {/* LOGIN BUTTON */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-[#678d58] to-[#74d3ae] text-white font-medium"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>
<div className="flex items-center my-4">
  <div className="flex-1 border-t border-gray-300"></div>

  <span className="px-4 text-sm text-gray-500 font-medium">
    OR
  </span>

  <div className="flex-1 border-t border-gray-300"></div>
</div>
        {/* GOOGLE LOGIN (READY FOR LATER) */}
       <Button onClick={handleGoogleSignIn} className="w-full my-2" variant="tertiary">
               <Icon icon="devicon:google" />
               Sign in with Google
             </Button>

        {/* SIGNUP LINK */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-[#dd9787] font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}