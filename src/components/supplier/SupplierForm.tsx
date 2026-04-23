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
} from "@/schemas/supplier.schema";
import DropdownSelect from "@/components/inputs/DropdownSelect";
import { DatePicker } from "@/components/date-picker";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";

interface Props {
  defaultValues?: Partial<Supplier>;
  submitting?: boolean;
  submitLabel?: string;
  onSubmit: (values: Supplier) => void | Promise<void>;
}

const SupplierForm = ({
  defaultValues,
  submitting = false,
  submitLabel = "SUBMIT",
  onSubmit,
}: Props) => {
  const form = useForm<Supplier>({
    resolver: zodResolver(supplierSchema),
    defaultValues: { ...supplierDefaultValues, ...defaultValues },
  });

  return (
    <Form {...form}>
      <form
        className="flex-1 flex flex-col h-full overflow-hidden"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
                          <FormLabel>Gender</FormLabel>
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
                            <Input
                              {...field}
                              type="number"
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value === ""
                                    ? undefined
                                    : Number(e.target.value)
                                )
                              }
                            />
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
                          <FormLabel>Association name</FormLabel>
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
                          <FormLabel>Street and number</FormLabel>
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
                      name="address.postalCode"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Postal code</FormLabel>
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
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    {(
                      [
                        ["docs.licenced", "Licenced"],
                        ["docs.insured", "Insured"],
                        ["docs.criminalRecord", "Criminal Record"],
                        ["docs.contracted", "Contracted"],
                        ["docs.whisperSystem", "Whisper System"],
                        ["docs.vatAmount", "VAT Amount"],
                        ["docs.commission", "Commission"],
                      ] as const
                    ).map(([name, label]) => (
                      <FormField
                        key={name}
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem className="flex-1 min-w-32">
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                              <Switch
                                checked={!!field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
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
              <AccordionContent>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="contact.preferredFormOfContact"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Preferred form of contact</FormLabel>
                          <FormControl>
                            <DropdownSelect
                              options={
                                supplierSchema.shape.contact.shape
                                  .preferredFormOfContact.options
                              }
                              onChange={field.onChange}
                              defaultValue={field.value as string}
                              value={field.value as string}
                              label="Method of contact"
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
                      name="contact.email"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contact.alternateEmail"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Alternate email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1 flex gap-2">
                      <FormField
                        control={form.control}
                        name="contact.mobile.code"
                        render={({ field }) => (
                          <FormItem className="w-28">
                            <FormLabel>Country code</FormLabel>
                            <FormControl>
                              <Input {...field} type="tel" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contact.mobile.number"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Mobile</FormLabel>
                            <FormControl>
                              <Input {...field} type="tel" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              className={cn("border !border-b p-4 rounded-xl")}
              value="item-3"
            >
              <AccordionTrigger className="text-2xl cursor-pointer">
                Experience
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="experience.aboutYourself"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>About yourself</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="experience.shortDescription"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Short description of tours</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="experience.yearsOfExperience"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Years of experience</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value === ""
                                    ? undefined
                                    : Number(e.target.value)
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="experience.tourType"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Tour type</FormLabel>
                          <FormControl>
                            <DropdownSelect
                              options={
                                supplierSchema.shape.experience
                                  .unwrap()
                                  .shape.tourType.unwrap().options
                              }
                              onChange={field.onChange}
                              defaultValue={field.value as string}
                              value={field.value as string}
                              label="Tour type"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="experience.tourTopic"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Tour topic</FormLabel>
                          <FormControl>
                            <DropdownSelect
                              options={
                                supplierSchema.shape.experience
                                  .unwrap()
                                  .shape.tourTopic.unwrap().options
                              }
                              onChange={field.onChange}
                              defaultValue={field.value as string}
                              value={field.value as string}
                              label="Tour topic"
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
              value="item-4"
            >
              <AccordionTrigger className="text-2xl cursor-pointer">
                Billing Information
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="billing.bic"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>BIC</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="billing.iban"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>IBAN</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="billing.currency"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Currency</FormLabel>
                          <FormControl>
                            <DropdownSelect
                              options={
                                supplierSchema.shape.billing.unwrap().shape
                                  .currency.options
                              }
                              onChange={field.onChange}
                              defaultValue={field.value as string}
                              value={field.value as string}
                              label="Currency"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="billing.vatType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pb-2">VAT type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            {supplierSchema.shape.billing
                              .unwrap()
                              .shape.vatType.unwrap()
                              .options.map((option) => (
                                <div
                                  className="flex items-center gap-3"
                                  key={option}
                                >
                                  <RadioGroupItem
                                    value={option}
                                    id={option}
                                  />
                                  <Label htmlFor={option}>{option}</Label>
                                </div>
                              ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              className={cn("border !border-b p-4 rounded-xl")}
              value="item-5"
            >
              <AccordionTrigger className="text-2xl cursor-pointer">
                Contract Information
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="contract.contractStartDate"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Contract start date</FormLabel>
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
                      name="contract.contractEndDate"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Contract end date</FormLabel>
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
                      name="contract.serviceType"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Service type</FormLabel>
                          <FormControl>
                            <DropdownSelect
                              options={["Guide", "Assistant"]}
                              onChange={field.onChange}
                              defaultValue={field.value as string}
                              value={field.value as string}
                              label="Service type"
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
              value="item-6"
            >
              <AccordionTrigger className="text-2xl cursor-pointer">
                Status & Comments
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <DropdownSelect
                            options={supplierSchema.shape.status.options}
                            onChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                            label="Status"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Comments</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>

        <div className="flex items-center justify-center mt-4">
          <Button type="submit" disabled={submitting}>
            {submitting && <Loader className="animate-spin" />}
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SupplierForm;
