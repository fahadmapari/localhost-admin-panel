import PageHeading from "@/components/common/PageHeading";
import MessageList from "@/components/communication/MessageList";
import NewConversationModal from "@/components/communication/NewConversationModal";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import api from "@/lib/axios";
import { Conversation } from "@/types/conversation";
import { Edit } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

const Messages = () => {
  const [showCreateNewConversationModal, setShowCreateNewConversationModal] =
    useState(false);

  const { data: conversations, isLoading } = useSWR(
    "/conversations",
    async (url) => {
      const { data } = await api.get<{
        data: Conversation[];
      }>(url);
      return data.data;
    }
  );

  return (
    <div className="p-4 h-full flex flex-col gap-4 relative">
      <PageHeading label="Messages" />
      <MessageList conversations={conversations || []} isLoading={isLoading} />
      <Button
        className="rounded-full w-12 h-12 p-2 absolute bottom-5 right-5"
        onClick={() => setShowCreateNewConversationModal(true)}
      >
        <Tooltip>
          <TooltipTrigger>
            <Edit />
          </TooltipTrigger>
          <TooltipContent>Start a new chat</TooltipContent>
        </Tooltip>
      </Button>

      <NewConversationModal
        open={showCreateNewConversationModal}
        onClose={() => setShowCreateNewConversationModal(false)}
      />
    </div>
  );
};

export default Messages;
