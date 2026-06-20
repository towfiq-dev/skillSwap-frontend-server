"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

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
  }, [user]);

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
     window.location.reload();
    } catch (err) {
      toast.error(err.message);
    }
    

  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

      <input
        name="name"
        placeholder="Name"
        value={form?.name}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="photo"
        placeholder="Photo URL"
        value={form?.photo}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

    <div className="mb-2">
  <div className="flex gap-2">
    <input
      value={skillInput}
      onChange={(e) => setSkillInput(e.target.value)}
      placeholder="Add skill"
      className="border p-2 flex-1"
    />
    <button onClick={addSkill} className="bg-green-500 px-3 text-white">
      Add
    </button>
  </div>

  <div className="flex gap-2 flex-wrap mt-2">
    {form.skills.map((skill, i) => (
      <span
        key={i}
        className="bg-gray-200 px-2 py-1 rounded cursor-pointer"
        onClick={() => removeSkill(i)}
      >
        {skill} ✕
      </span>
    ))}
  </div>
</div>

      <textarea
        name="bio"
        placeholder="Bio"
        value={form?.bio}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="hourlyRate"
        placeholder="Hourly Rate"
        value={form?.hourlyRate}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <button
        onClick={saveProfile}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Profile
      </button>
    </div>
  );
}