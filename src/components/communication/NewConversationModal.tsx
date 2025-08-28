import useSWR from "swr";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import api from "@/lib/axios";
import DropdownSelect from "../inputs/DropdownSelect";
import { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "super amdmin";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const NewConversationModal = ({ open, onClose }: Props) => {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [conversationTitle, setConversationTitle] = useState<string>("");
  const { user } = useAuthStore();
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);

  const { data: admins } = useSWR("/admins", async (url) => {
    const { data } = await api.get<{
      data: AdminUser[];
    }>(url);
    return data.data;
  });

  const handleSubmit = async () => {
    if (!selectedUser) {
      toast.error("Please select a user", {
        position: "top-center",
        richColors: true,
      });
    }

    if (!conversationTitle) {
      toast.error("Please enter a conversation name", {
        position: "top-center",
        richColors: true,
      });
    }

    setIsCreatingConversation(true);

    const selectedUserEmail = selectedUser.split(" - ")[1];
    const selectedUserId = admins?.find(
      (admin) => admin.email === selectedUserEmail
    )?._id;

    try {
      await api.post("/conversations", {
        title: conversationTitle,
        participantId: selectedUserId,
      });

      toast.success("Conversation created", {
        position: "top-center",
        richColors: true,
      });

      onClose();

      setIsCreatingConversation(false);
    } catch {
      toast.error("Error creating conversation", {
        position: "top-center",
        richColors: true,
      });
      setIsCreatingConversation(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new conversation</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label>Select a user</Label>
          <DropdownSelect
            options={
              admins
                ?.filter((admin) => admin.email !== user?.email)
                .map((admin) => admin.name + " - " + admin.email) || []
            }
            className="lowercase"
            label="Users"
            value={selectedUser}
            onChange={(value) => setSelectedUser(value)}
            defaultValue={selectedUser}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Conversation name</Label>
          <Input
            value={conversationTitle}
            onChange={(e) => setConversationTitle(e.target.value)}
            defaultValue={selectedUser + " - Chat"}
          />
        </div>

        <DialogFooter>
          <Button
            disabled={isCreatingConversation}
            className="w-full"
            onClick={handleSubmit}
          >
            Start Chat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewConversationModal;
