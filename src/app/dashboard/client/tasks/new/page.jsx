"use client";

import { useState } from "react";
import {
  Button,
  Input,
  ListBox,
  TextArea,
  Select,
  Label,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function NewTaskPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    budget: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);
 
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const validateForm = () => {
  const newErrors = {};

  if (!form.title.trim()) {
    newErrors.title = "Task title is required";
  }

  if (!form.category) {
    newErrors.category = "Please select a category";
  }

  if (!form.description.trim()) {
    newErrors.description = "Description is required";
  }

  if (!form.budget) {
    newErrors.budget = "Budget is required";
  } else if (Number(form.budget) <= 0) {
    newErrors.budget = "Budget must be greater than 0";
  }

  if (!form.deadline) {
    newErrors.deadline = "Deadline is required";
  } else {
    const selectedDate = new Date(form.deadline);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      newErrors.deadline = "Deadline cannot be in the past";
    }
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setLoading(true);
  


  try {
   const payload = {
  ...form,
  category: form.category,

  userId: user?.id,
  clientName: user?.name,
  clientEmail: user?.email,
};

    // DEBUG (VERY IMPORTANT)
    console.log("FINAL PAYLOAD:", payload);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

   if (!res.ok) throw new Error(data.error || "Failed to create task");

toast.success("Task posted successfully 🎉");

setForm({
  title: "",
  category: "",
  description: "",
  budget: "",
  deadline: "",
});

setErrors({});
  } catch (err) {
   toast.error(err.message || "Failed to create task");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#678d58]">
        Post a New Task
      </h1>

    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

  {/* TITLE */}
  <div className="flex flex-col gap-1 w-full">
    <Label>Task Title</Label>
   <Input
  name="title"
  placeholder="Task Title"
  value={form.title}
  onChange={handleChange}
 
/>

{errors.title && (
  <p className="text-red-500 text-sm">{errors.title}</p>
)}
  </div>

  {/* CATEGORY */}
  <div className="flex flex-col gap-1 w-full">
   
    <Select
  className="w-full"
  selectedKey={form.category}
  onSelectionChange={(key) =>
    setForm((prev) => ({
      ...prev,
      category: String(key),
    }))
  }
>
  <Label>Category</Label>

  <Select.Trigger>
    <Select.Value placeholder="Select category" />
    <Select.Indicator />
  </Select.Trigger>

  <Select.Popover>
    <ListBox>
      <ListBox.Item id="Design">
        Design
        <ListBox.ItemIndicator />
      </ListBox.Item>

      <ListBox.Item id="Development">
        Development
        <ListBox.ItemIndicator />
      </ListBox.Item>

      <ListBox.Item id="Writing">
        Writing
        <ListBox.ItemIndicator />
      </ListBox.Item>

      <ListBox.Item id="Marketing">
        Marketing
        <ListBox.ItemIndicator />
      </ListBox.Item>

      <ListBox.Item id="Video Editing">
        Video Editing
        <ListBox.ItemIndicator />
      </ListBox.Item>

      <ListBox.Item id="Data Entry">
        Data Entry
        <ListBox.ItemIndicator />
      </ListBox.Item>

      <ListBox.Item id="Other">
        Other
        <ListBox.ItemIndicator />
      </ListBox.Item>
    </ListBox>
  </Select.Popover>
</Select>
{errors.category && (
  <p className="text-red-500 text-sm">{errors.category}</p>
)}
  </div>

  {/* DESCRIPTION */}
  <div className="flex flex-col gap-1 w-full">
    <Label>Description</Label>
   <TextArea
  name="description"
  placeholder="Task Description"
  value={form.description}
  onChange={handleChange}

/>

{errors.description && (
  <p className="text-red-500 text-sm">{errors.description}</p>
)}
  </div>

  {/* BUDGET */}
  <div className="flex flex-col gap-1 w-full">
    <Label>Budget (USD)</Label>
    <Input
  name="budget"
  type="number"
  min="1"
  placeholder="Budget (USD)"
  value={form.budget}
  onChange={handleChange}
 
/>

{errors.budget && (
  <p className="text-red-500 text-sm">{errors.budget}</p>
)}
  </div>

  {/* DEADLINE */}
  <div className="flex flex-col gap-1 w-full">
    <Label>Deadline</Label>
    <Input
  name="deadline"
  type="date"
  value={form.deadline}
  onChange={handleChange}
 
/>

{errors.deadline && (
  <p className="text-red-500 text-sm">{errors.deadline}</p>
)}
  </div>

  {/* SUBMIT */}
  <Button
    type="submit"
    disabled={loading}
    className="bg-linear-to-r from-[#678d58] to-[#74d3ae] text-white"
  >
    {loading ? "Posting..." : "Post Task"}
  </Button>

  
</form>
    </div>
  );
}