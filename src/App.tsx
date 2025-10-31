import { Outlet } from "react-router";
import "./App.css";
import { AppSidebar } from "./components/app-sidebar";
import ThemeSwitcher from "./components/common/ThemeSwitcher";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { THEME_KEY } from "./lib/constants";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import Greeting from "./components/common/Greeting";
import Welcome from "./components/common/Welcome";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey={THEME_KEY}>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar variant="sidebar" />
          <SidebarInset className="max-h-screen h-screen overflow-hidden">
            <header className="flex h-12 justify-between shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 px-4">
              <Greeting />
              <ThemeSwitcher />
            </header>
            <main className="h-full gap-4 m-4 mt-0 bg-muted/50 flex-1 overflow-hidden rounded-xl">
              <Welcome />
              <Outlet />
              <Toaster />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
