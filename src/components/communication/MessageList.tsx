import { Conversation } from "@/types/conversation";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router";

interface Props {
  conversations: Conversation[];
  isLoading: boolean;
}

const MessageList = ({ conversations, isLoading }: Props) => {
  return (
    <ScrollArea className="flex-1 overflow-hidden">
      {isLoading
        ? Array.from({ length: 15 }).map((_, i) => (
            <Skeleton
              className="w-full h-[100px] my-4 first-of-type:mt-0"
              key={i}
            />
          ))
        : conversations.map((c, i) => (
            <MessageListItem
              name={c.participants[1].name}
              title={c.title}
              id={c._id}
              key={i}
            />
          ))}
    </ScrollArea>
  );
};

interface MessageListItemProps {
  name: string;
  title: string;
  id: string;
}

const MessageListItem = ({ name, title, id }: MessageListItemProps) => {
  return (
    <Link
      to={"/messages/" + id}
      className="px-4 flex items-center gap-4 border-y border-border py-2 first-of-type:border-t-0 hover:bg-secondary cursor-pointer"
    >
      <div className="w-12 h-12 bg-ring rounded-full flex justify-center items-center font-medium">
        {name.charAt(0)}
        {name.split(" ")[1]?.charAt(0)}
      </div>
      <div>
        <div className="font-bold text-base uppercase">
          {title} - {name}
        </div>
        <div className="text-sm font-normal">Message preview.</div>
      </div>
    </Link>
  );
};

export default MessageList;
