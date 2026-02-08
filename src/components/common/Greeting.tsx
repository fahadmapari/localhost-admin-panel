import dayjs from "dayjs";
import { Moon, Sun } from "lucide-react";

const Greeting = () => {
  const time = dayjs().format("dddd hh:mm A");
  const getGreetingFromTime = (): string => {
    const time = Number(dayjs().format("H"));

    if (time < 12 && time > 5) {
      return "Good Morning";
    } else if (time < 17 && time > 12) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const getTimeIcon = () => {
    const time = Number(dayjs().format("H"));

    if (time < 17 && time > 12) {
      return <Sun size={14} />;
    } else {
      return <Moon size={14} />;
    }
  };

  return (
    <div className="gap-2 flex items-center justify-center pl-4">
      <span className="font-semibold text-xs text-muted-foreground">
        {time}
      </span>
      <div className="h-4 w-0.5 bg-muted" />
      <div className="flex items-center gap-1">
        {getTimeIcon()}
        <span className="text-xs font-bold text-muted-foreground capitalize">
          {getGreetingFromTime()}
        </span>
      </div>
    </div>
  );
};

export default Greeting;
