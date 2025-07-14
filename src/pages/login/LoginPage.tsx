import { LoginForm } from "@/components/login-form";
import { THEME_KEY } from "@/lib/constants";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { GalleryVerticalEnd } from "lucide-react";

const LoginPage = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey={THEME_KEY}>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a
            href="#"
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="bg-primary text-primary-foreground flex size-11 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-8" />
            </div>
            <div className="flex flex-col">
              <span>LocalHost</span>
              <span className="text-xs font-normal">Admin Panel</span>
            </div>
          </a>
          <LoginForm />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default LoginPage;
