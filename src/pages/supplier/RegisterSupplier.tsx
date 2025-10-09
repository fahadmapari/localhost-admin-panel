import PageHeading from "@/components/common/PageHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Supplier,
  supplierDefaultValues,
  supplierSchema,
} from "../../schemas/supplier.schema";
import DropdownSelect from "@/components/inputs/DropdownSelect";
import { DatePicker } from "@/components/date-picker";

const RegisterSupplier = () => {
  const form = useForm<Supplier>({
    resolver: zodResolver(supplierSchema),
    defaultValues: supplierDefaultValues,
  });
  return (
    <div className="p-4 h-full">
      <PageHeading label="Register Supplier" />
      <Form {...form}>
        <form>
          <Accordion
            type="single"
            collapsible
            className="space-y-4 mt-4"
            defaultValue="item-1"
          >
            <AccordionItem
              className={cn("border p-4 rounded-xl")}
              value="item-1"
              defaultChecked={true}
            >
              <AccordionTrigger className="text-2xl cursor-pointer">
                Personal Information
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="personalInfo.firstName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.lastName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.gender"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <DropdownSelect
                              options={
                                supplierSchema.shape.personalInfo.shape.gender
                                  .options
                              }
                              onChange={field.onChange}
                              defaultValue={field.value}
                              value={field.value}
                              label="Gender"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="personalInfo.dateOfBirth"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Date of birth</FormLabel>
                          <FormControl>
                            <DatePicker
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.nationality"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Nationality</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.familyStatus"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Family status</FormLabel>
                          <FormControl>
                            <DropdownSelect
                              options={
                                supplierSchema.shape.personalInfo.shape.familyStatus.unwrap()
                                  .options
                              }
                              onChange={field.onChange}
                              defaultValue={field.value as string}
                              value={field.value as string}
                              label="Family status"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="personalInfo.birthPlace"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Birth place</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.remunerationExpectation"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>
                            Remuneration expectation (EUR per hour)
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.availabilityTime"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Availability time</FormLabel>
                          <FormControl>
                            <DropdownSelect
                              options={
                                supplierSchema.shape.personalInfo.shape.availabilityTime.unwrap()
                                  .options
                              }
                              onChange={field.onChange}
                              defaultValue={field.value as string}
                              value={field.value as string}
                              label="Availability time"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              className={cn("border !border-b p-4 rounded-xl")}
              value="item-2"
            >
              <AccordionTrigger className="text-2xl cursor-pointer">
                Communication Information
              </AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>

            <AccordionItem
              className={cn("border !border-b p-4 rounded-xl")}
              value="item-3"
            >
              <AccordionTrigger className="text-2xl cursor-pointer">
                Experience
              </AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>

            <AccordionItem
              className={cn("border !border-b p-4 rounded-xl")}
              value="item-4"
            >
              <AccordionTrigger className="text-2xl cursor-pointer">
                Billing Information
              </AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>

            <AccordionItem
              className={cn("border !border-b p-4 rounded-xl")}
              value="item-5"
            >
              <AccordionTrigger className="text-2xl cursor-pointer">
                Contract Information
              </AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex items-center justify-center mt-4">
            <Button>SUBMIT</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterSupplier;
