import { useTheme } from "@/providers/ThemeProvider";
import { Switch } from "../ui/switch";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center gap-1 text-xs p-2 rounded-xl  bg-secondary border-border font-normal">
      <Switch
        id="theme-mode"
        checked={theme === "dark"}
        onCheckedChange={(e) => setTheme(e ? "dark" : "light")}
      />
      <span>Dark Mode</span>
    </div>
  );
};

export default ThemeSwitcher;
