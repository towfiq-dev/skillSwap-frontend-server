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
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
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
    name: user.name, // required
    email: user.email, // required
    password: user.password, // required
    image: user.image,
    role: user.role,
   
});  

if(data){
   toast.success("Sign up Successful! 🎊")
   router.push("/")
  
}

if(error){
    toast.error(error.message)
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-5">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg py-5">

        <h1 className="text-2xl font-bold text-center mb-6 text-[#678d58]">
          Create Account
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        {/* HEROUI FORM */}
        <Form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* NAME */}
          <TextField name="name" isRequired>
            <Label>Full Name</Label>
            <Input
              placeholder="Enter your name"
              onChange={handleChange}
            />
            <FieldError />
          </TextField>

          {/* EMAIL */}
          <TextField
            name="email"
            type="email"
            isRequired
            validate={(value) => {
              if (!value.includes("@")) {
                return "Enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input
              placeholder="Enter your email"
              onChange={handleChange}
            />
            <FieldError />
          </TextField>

          {/* IMAGE */}
          <TextField name="image">
            <Label>Image URL (optional)</Label>
            <Input
              placeholder="Enter image URL"
              onChange={handleChange}
            />
           
            <FieldError />
          </TextField>

          {/* PASSWORD */}
          <TextField
            name="password"
            type="password"
            isRequired
            validate={(value) => {
              if (value.length < 6) {
                return "Minimum 6 characters required";
              }
              if (!/[A-Z]/.test(value)) {
                return "Must include at least 1 uppercase letter";
              }
              if (!/[a-z]/.test(value)) {
                return "Must include at least 1 lowercase letter";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
            />
            <Description>
             Password should be at least 6 characters long with one uppercase letter and one lowercase letter
            </Description>
            <FieldError />
          </TextField>

          {/* ROLE */}
          <div className="flex flex-col gap-2">
            <Label>Account Type</Label>

            <div className="flex gap-6 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="client"
                  checked={form.role === "client"}
                  onChange={handleChange}
                />
                Client
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="freelancer"
                  onChange={handleChange}
                />
                Freelancer
              </label>
            </div>
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            className="w-full bg-linear-to-r from-[#678d58] to-[#74d3ae] text-white font-medium"
          >
            Sign Up
          </Button>
        </Form>
<div className="flex items-center my-4">
  <div className="flex-1 border-t border-gray-300"></div>

  <span className="px-4 text-sm text-gray-500 font-medium">
    OR
  </span>

  <div className="flex-1 border-t border-gray-300"></div>
</div>
        {/* GOOGLE BUTTON */}
        <Button onClick={handleGoogleSignIn} className="w-full my-2" variant="tertiary">
        <Icon icon="devicon:google" />
        Sign in with Google
      </Button>

        {/* LOGIN LINK */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-[#dd9787] font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}