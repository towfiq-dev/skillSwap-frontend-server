"use client";

import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { toast } from "react-toastify";

export default function DeleteTaskAlert({
  taskId,
  taskTitle,
  onDeleted,
}) {
  const handleDelete = async () => {
     const {data:tokenData} = await authClient.token()

    try {
      if (!taskId) {
        throw new Error("Invalid task id");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
             "Content-Type": "application/json",
                authorization: `Bearer ${tokenData?.token}`

          },

        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Delete failed");
      }

      toast.success("Task deleted");

      // update UI instantly
      onDeleted(taskId);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <AlertDialog>
      <Button variant="danger-soft">
        Delete
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-md">

            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete Task?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                Are you sure you want to delete{" "}
                <strong>{taskTitle}</strong>?
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button
                slot="close"
                variant="danger-soft"
                onPress={handleDelete}
              >
                Confirm Delete
              </Button>
            </AlertDialog.Footer>

          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}