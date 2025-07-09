import "./App.css";
import { AppSidebar } from "./components/app-sidebar";
import ThemeSwitcher from "./components/common/ThemeSwitcher";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { THEME_KEY } from "./lib/constants";
import { ThemeProvider } from "./providers/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey={THEME_KEY}>
      <SidebarProvider>
        <AppSidebar variant="sidebar" />
        <SidebarInset>
          <header className="flex h-12 justify-end shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 px-4">
            <ThemeSwitcher />
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
