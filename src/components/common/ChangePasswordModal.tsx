import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { changePasswordSchema } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

interface ChangePasswordModalProps {
  open: boolean;
  close: () => void;
}

const ChangePasswordModal = ({ close, open }: ChangePasswordModalProps) => {
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
  });
  const [isChanging, setIsChanging] = useState(false);

  async function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    try {
      setIsChanging(true);
      await api.put("/admins/change-password", values);

      setIsChanging(false);
    } catch (error) {
      toast.error("Error while changing password" + error, {
        position: "top-center",
        richColors: true,
      });
      setIsChanging(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px]" showCloseButton={!isChanging}>
        <DialogHeader>
          <DialogTitle>Change Your Account Password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button variant="outline" disabled={isChanging}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={isChanging}
              >
                {isChanging ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
