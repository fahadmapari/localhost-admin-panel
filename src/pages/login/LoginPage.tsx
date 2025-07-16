import { LoginForm } from "@/components/login-form";
import { Toaster } from "@/components/ui/sonner";
import { THEME_KEY } from "@/lib/constants";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { useAuthStore } from "@/store/auth.store";

import { GalleryVerticalEnd } from "lucide-react";
import { useEffect, useLayoutEffect } from "react";
import { redirect, useNavigate } from "react-router";

const LoginPage = () => {
  const { isLoggedIn, accessToken } = useAuthStore();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    console.log(isLoggedIn, accessToken);
    if (isLoggedIn || accessToken) {
      navigate("/");
    }
  }, [isLoggedIn, accessToken]);

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
        <Toaster />
      </div>
    </ThemeProvider>
  );
};

export default LoginPage;
