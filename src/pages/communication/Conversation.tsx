import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/lib/axios";
import { SERVER_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import { MessageType } from "@/types/conversation";
import { Player } from "@lottiefiles/react-lottie-player";
import { ChevronLeft, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { io } from "socket.io-client";
import { toast } from "sonner";
import useSWR from "swr";

const Conversation = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const socket = io(SERVER_URL);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    {
      message: string;
      sender: string;
    }[]
  >([]);

  const handleSendMessage = (message: string) => {
    try {
      socket.emit("send-message", {
        conversationId: id,
        message: message,
        userId: user?.id,
      });

      setMessage("");
    } catch {
      toast.error("Something went wrong", {
        position: "top-center",
        richColors: true,
      });
    }
  };

  useEffect(() => {
    socket.emit("join-convo", {
      conversationId: id,
    });

    socket.on("new-message", (data) => {
      console.log(data, "received");
      setMessages((prev) => [
        ...prev,
        {
          message: data.message,
          sender: data.sender,
        },
      ]);
    });

    return () => {
      socket.off("join-convo");
      socket.off("new-message");
    };
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  const { isLoading } = useSWR(
    `/conversations/messages/${id}`,
    async (url) => {
      const { data } = await api.get<{
        data: MessageType[];
      }>(url);

      const messageHistory =
        data.data.map((m) => ({ message: m.text, sender: m.sender })) || [];

      setMessages((prev) => [...prev, ...messageHistory]);

      return data.data;
    },
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <div className="h-full p-4 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div>
          <ChevronLeft
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="w-12 h-12 bg-ring rounded-full flex justify-center items-center font-medium">
          FM
        </div>

        <div className=" flex flex-col gap-1">
          <div className="uppercase text-xl font-bold">{id}</div>
          <span className="text-sm capitalize text-secondary-foreground">
            PARTICIPANT NAME
          </span>
        </div>
      </div>

      <ScrollArea
        className="w-full flex-1 border border-border rounded-md px-4 space-y-4 flex flex-col overflow-y-hidden"
        ref={scrollAreaRef}
      >
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Player src="/lotties/abstract-loading.json" autoplay loop />
          </div>
        ) : (
          messages.map((message, i) => (
            <Message
              message={message.message}
              ownMessage={message.sender === user?.id}
              key={i}
            />
          ))
        )}
      </ScrollArea>

      <div className="flex gap-2">
        <Input
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage(message)}
        />
        <Button disabled={isLoading} onClick={() => handleSendMessage(message)}>
          Send <Send />
        </Button>
      </div>
    </div>
  );
};

interface MessageProps {
  ownMessage?: boolean;
  message: string;
}

const Message = ({ ownMessage = false, message }: MessageProps) => {
  return (
    <div
      className={cn(
        "relative max-w-[500px] bg-accent rounded-lg px-4 py-2 text-base font-semibold my-4 flex flex-col gap-2 mx-2",
        ownMessage ? "self-end ml-auto rounded-tr-md" : "rounded-tl-md"
      )}
    >
      <div
        className={cn(
          "w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[10px] border-r-accent absolute top-1 z-20",
          ownMessage ? "-right-2 -scale-100" : "-left-2 !rounded-tl-none"
        )}
      />
      {message}
      <span className="ml-auto text-xs text-muted-foreground">
        12/02/1999 - 12:00 PM
      </span>
    </div>
  );
};

export default Conversation;
