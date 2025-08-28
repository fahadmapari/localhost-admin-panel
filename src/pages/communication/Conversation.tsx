import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChevronLeft, Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";

const Conversation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

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
        <Message />
        <Message ownMessage={true} />
        <Message ownMessage={true} />
        <Message ownMessage={true} />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message ownMessage={true} />
      </ScrollArea>

      <div className="flex gap-2">
        <Input placeholder="Type a message" />
        <Button>
          Send <Send />
        </Button>
      </div>
    </div>
  );
};

interface MessageProps {
  ownMessage?: boolean;
}

const Message = ({ ownMessage = false }: MessageProps) => {
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
      qdqhwu qh uqwhd qwudhqwduhqwudhuqwd quwhduqwhudhqwdqwd uqiwhdhqw
      <span className="ml-auto text-xs text-muted-foreground">
        12/02/1999 - 12:00 PM
      </span>
    </div>
  );
};

export default Conversation;
