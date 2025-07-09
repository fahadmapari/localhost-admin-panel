import { useTheme } from "@/providers/ThemeProvider";
import { Switch } from "../ui/switch";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center gap-1 text-xs">
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
