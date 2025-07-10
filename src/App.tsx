import { Outlet } from "react-router";
import "./App.css";
import { AppSidebar } from "./components/app-sidebar";
import ThemeSwitcher from "./components/common/ThemeSwitcher";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { THEME_KEY } from "./lib/constants";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey={THEME_KEY}>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar variant="sidebar" />
          <SidebarInset>
            <header className="flex h-12 justify-between shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 pr-4">
              <div></div>
              <ThemeSwitcher />
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pb-0 pt-0">
              <main className="bg-muted/50 h-full max-h-full overflow-hidden rounded-xl">
                <Outlet />
              </main>
              <Toaster />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
