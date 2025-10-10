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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

const RegisterSupplier = () => {
  const form = useForm<Supplier>({
    resolver: zodResolver(supplierSchema),
    defaultValues: supplierDefaultValues,
  });
  return (
    <div className="p-4 h-full flex flex-col">
      <PageHeading label="Register Supplier" />
      <Form {...form}>
        <form className="flex-1 flex flex-col h-full overflow-hidden">
          <ScrollArea className="h-full overflow-y-hidden">
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

                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="personalInfo.howDidYouHearAboutUs"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>How did you hear about us</FormLabel>
                            <FormControl>
                              <DropdownSelect
                                options={
                                  supplierSchema.shape.personalInfo.shape.howDidYouHearAboutUs.unwrap()
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

                      <FormField
                        control={form.control}
                        name="personalInfo.typeOfServicesProvided"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Type of services provided</FormLabel>
                            <FormControl>
                              <DropdownSelect
                                options={
                                  supplierSchema.shape.personalInfo.shape.typeOfServicesProvided.unwrap()
                                    .options
                                }
                                onChange={field.onChange}
                                defaultValue={field.value as string}
                                value={field.value as string}
                                label="Type of services provided"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="personalInfo.hobbies"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Hobbies</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="personalInfo.memberOfAssociation"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Member of association</FormLabel>
                            <FormControl>
                              <DropdownSelect
                                options={
                                  supplierSchema.shape.personalInfo.shape.memberOfAssociation.unwrap()
                                    .options
                                }
                                onChange={field.onChange}
                                defaultValue={field.value as string}
                                value={field.value as string}
                                label="Member of association"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="personalInfo.associationName"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>
                              Association name (If applicable)
                            </FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />
                    <p className="text-lg font-bold">Address</p>
                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="address.streetAndNumber"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Streeet and number</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address.city"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address.municipality"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Municipality</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="address.district"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>District</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address.state"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address.country"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="address.postalCode"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Postal code</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address.isPrimary"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Is primary</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                defaultChecked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex-1" />
                    </div>

                    <Separator />

                    <p className="text-lg font-bold">Docs</p>

                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="docs.identificationNumber"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Identification number</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex gap-4 flex-wrap">
                      <FormField
                        control={form.control}
                        name="docs.licenced"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Licenced</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="docs.insured"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Insured</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="docs.criminalRecord"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Criminal Record</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="docs.contracted"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Contracted</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="docs.whisperSystem"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Whisper System</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="docs.vatAmount"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>VAT Amount</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="docs.commission"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Commission</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
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
          </ScrollArea>
          <div className="flex items-center justify-center mt-4">
            <Button>SUBMIT</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterSupplier;
