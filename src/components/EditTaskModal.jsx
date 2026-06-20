"use client";

import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Input,
  TextArea,
  TextField,
  Label,
  Surface,
  Select,
  ListBox,
} from "@heroui/react";
import { toast } from "react-toastify";
import { Edit } from "lucide-react";

export default function EditTaskModal({ task, onUpdated }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    category: "",
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        budget: task.budget || "",
        deadline: task.deadline || "",
        category: task.category || "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${task._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      toast.success("Task updated");

      onUpdated({ ...task, ...form });

      setOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      {/* OPEN BUTTON */}
      <Button
       className="bg-linear-to-r from-[#678d58] to-[#74d3ae]"
        disabled={task.status !== "open"}
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading >
                <div className="flex gap-4">
                   <Edit></Edit>
                Edit Task
                </div>
               </Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <Surface className="p-2 space-y-4">

                <TextField>
                  <Label>Title</Label>
                  <Input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                  />
                </TextField>

                <div className="flex flex-col gap-1">
                  <Label>Category</Label>

                  <Select
                    selectedKey={form.category}
                    onSelectionChange={(key) =>
                      setForm((prev) => ({
                        ...prev,
                        category: String(key),
                      }))
                    }
                  >
                    <Select.Trigger>
                      <Select.Value placeholder="Select category" />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                      <ListBox>
                        <ListBox.Item id="Design">Design</ListBox.Item>
                        <ListBox.Item id="Development">Development</ListBox.Item>
                        <ListBox.Item id="Writing">Writing</ListBox.Item>
                        <ListBox.Item id="Marketing">Marketing</ListBox.Item>
                        <ListBox.Item id="Other">Other</ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <div className="flex flex-col gap-1">
                  <Label>Description</Label>
                  <TextArea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                  />
                </div>

                <TextField>
                  <Label>Budget</Label>
                  <Input
                    type="number"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                  />
                </TextField>

                <TextField>
                  <Label>Deadline</Label>
                  <Input
                    type="date"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleChange}
                  />
                </TextField>

              </Surface>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onPress={() => setOpen(false)}>
                Cancel
              </Button>

              <Button color="primary" onPress={handleUpdate}>
                Save Changes
              </Button>
            </Modal.Footer>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}