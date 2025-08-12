import AdminCreationLoader from "@/components/admin/AdminCreationLoader";
import PageHeading from "@/components/common/PageHeading";
import DropdownSelect from "@/components/inputs/DropdownSelect";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import api from "@/lib/axios";
import { userSchema } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const AdminRegister = () => {
  const form = useForm({
    resolver: zodResolver(userSchema),
  });
  const [isCreating, setIsCreating] = useState(false);

  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof userSchema>) {
    try {
      setIsCreating(true);
      await api.post("/admins", values);

      toast.success("Admin registered successfully", {
        position: "top-center",
        richColors: true,
      });

      setIsCreating(false);

      form.reset();

      navigate("/admin");
    } catch (error) {
      setIsCreating(false);
      // @ts-expect-error - message
      toast.error("Error while registering admin" + error?.message, {
        position: "top-center",
        richColors: true,
      });
    }
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="pb-4">
        <PageHeading label="Register New Admin" />
      </div>
      <Form {...form}>
        <form
          className="flex-1 flex flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div>
            <Card className="w-full p-4 py-6">
              <div className="flex items-start gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="John Doe" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="John@example.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Password</FormLabel>
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
                    <FormItem className="flex-1">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Admin Type</FormLabel>
                      <FormControl>
                        <DropdownSelect
                          {...field}
                          value={field.value}
                          defaultValue={field.value}
                          label="Admin Types"
                          onChange={field.onChange}
                          options={userSchema.shape.role.options}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>
          </div>
          <Button
            type="submit"
            className="w-full cursor-pointer mt-6"
            disabled={isCreating}
          >
            Register Admin
          </Button>
        </form>
      </Form>

      <AdminCreationLoader
        open={isCreating}
        label="Welcoming new member to the team."
      />
    </div>
  );
};

export default AdminRegister;
