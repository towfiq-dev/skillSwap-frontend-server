"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { Button } from "@heroui/react";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [form, setForm] = useState({
    name: "",
    photo: "",
    skills: [],
    bio: "",
    hourlyRate: "",
  });

  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (!skillInput.trim()) return;

    setForm({
      ...form,
      skills: [...form.skills, skillInput.trim()],
    });

    setSkillInput("");
  };

  const removeSkill = (index) => {
    const updated = form.skills.filter((_, i) => i !== index);
    setForm({ ...form, skills: updated });
  };

  const loadProfile = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/profile/${user.email}`
    );

    const data = await res.json();

    if (data) {
      setForm({
        name: data.name || "",
        photo: data.image || "",
        skills: Array.isArray(data.skills)
          ? data.skills
          : data.skills
          ? data.skills.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        bio: data.bio || "",
        hourlyRate: data.hourlyRate || "",
      });
    }
  };

  useEffect(() => {
    if (user?.email) loadProfile();
  }, [user?.email]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/profile/${user.email}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      toast.success("Profile updated!");
      window.dispatchEvent(new Event("profile-updated"));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Edit Profile
        </h1>

        {/* Name */}
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {/* Photo */}
        <input
          name="photo"
          placeholder="Profile Photo URL"
          value={form.photo}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {/* Skills */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Skills
          </label>

          <div className="flex gap-2">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Add skill (e.g. React)"
              className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />

            <button
              onClick={addSkill}
              className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-lg transition"
            >
              Add
            </button>
          </div>

          {/* Skill Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {form.skills.map((skill, i) => (
              <span
                key={i}
                onClick={() => removeSkill(i)}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-red-100 hover:text-red-600 transition"
              >
                {skill} ✕
              </span>
            ))}
          </div>
        </div>

        {/* Bio */}
        <textarea
          name="bio"
          placeholder="Write something about yourself..."
          value={form.bio}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded-lg h-28 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {/* Hourly Rate */}
        <input
          name="hourlyRate"
          placeholder="Hourly Rate ($)"
          value={form.hourlyRate}
          onChange={handleChange}
          className="w-full mb-6 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {/* Save Button */}
        <Button
          onClick={saveProfile}
          className="w-full bg-gradient-to-r from-[#678d58] to-[#74d3ae] text-white py-2 rounded-full hover:opacity-90 font-semibold transition"
        >
          Save Profile
        </Button>
      </div>
    </div>
  );
}