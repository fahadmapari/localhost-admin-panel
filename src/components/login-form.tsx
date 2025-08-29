import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { loginSchema, LoginType } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import z from "zod";
import api from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError, isAxiosError } from "axios";
import { setAuthToken } from "@/lib/axios/token";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router";
import { Player } from "@lottiefiles/react-lottie-player";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const { setAccessToken, setIsLoggedIn, setUser } = useAuthStore();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginType) {
    try {
      setIsLoading(true);
      const { data } = await api.post("/auth/signin", {
        email: values.email,
        password: values.password,
      });
      setAuthToken(data.data.accessToken);
      setAccessToken(data.data.accessToken);
      setIsLoggedIn(true);
      setUser({
        id: data.data.user.userId,
        name: data.data.user.name,
        role: data.data.user.role,
        email: data.data.user.email,
      });

      navigate("/");
      setIsLoading(false);
    } catch (err) {
      if (isAxiosError(err)) {
        const error = err as AxiosError;

        // @ts-expect-error - error property is not present in the axios error
        toast.error(error.response?.data?.error || "Something went wrong", {
          richColors: true,
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong", {
          richColors: true,
          position: "top-center",
        });
      }

      setAuthToken(null);
      setAccessToken("");
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Have a productive day!</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} autoComplete="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full cursor-pointer disabled:opacity-60"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Player
                        src="/lotties/lock-animation.json"
                        speed={3}
                        loop
                        autoplay
                        style={{
                          height: "100%",
                          width: "60px",
                        }}
                      />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
                <div className="text-center text-sm flex flex-col gap-1">
                  Don&apos;t have an account?{" "}
                  <span className="underline underline-offset-4 cursor-pointer">
                    Ask your manager for one.
                  </span>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
