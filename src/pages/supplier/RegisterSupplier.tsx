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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
                              <Input {...field} type="text" />
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
                              <Input {...field} type="text" />
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

                      <div className="flex-1 flex gap-2">
                        <FormField
                          control={form.control}
                          name="contact.officePhone.code"
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
                          name="contact.officePhone.number"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Office phone</FormLabel>
                              <FormControl>
                                <Input {...field} type="tel" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex-1 flex gap-2">
                        <FormField
                          control={form.control}
                          name="contact.homePhone.code"
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
                          name="contact.homePhone.number"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Home phone</FormLabel>
                              <FormControl>
                                <Input {...field} type="tel" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="contact.skype"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Skype</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact.website"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact.socialMedia.facebook"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Facebook (URL)</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact.socialMedia.linkedin"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Linkedin (URL)</FormLabel>
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
                        name="contact.socialMedia.instagram"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Instagram (URL)</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact.socialMedia.twitter"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Twitter (URL)</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact.tripAdvisor"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>TripAdvisor (URL)</FormLabel>
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
                        name="contact.profileVideo"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Profile video (URL)</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact.otherProfile"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Other profile (URL)</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact.review"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Review (URL)</FormLabel>
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
                        name="contact.sampleTourVideo"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Sample tour video (URL)</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
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
                value="item-3"
              >
                <AccordionTrigger className="text-2xl cursor-pointer">
                  Experience
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="flex gap-4">
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
                    </div>

                    <div className="flex gap-4">
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
                    </div>

                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="experience.references"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>References</FormLabel>
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
                        name="experience.yearsOfExperience"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Years of experience</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="experience.formalEducation"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Formal education</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="experience.nonFormalEducation"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Non-Formal education</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="experience.professionalCourses"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Professional courses</FormLabel>
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
                        name="billing.taxNo"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>TAX No</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="billing.vatNo"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>VAT No</FormLabel>
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
                        name="billing.vat"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>VAT</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="billing.bankAccountHolder"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Bank account holder</FormLabel>
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
                    </div>

                    <div className="flex gap-4">
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

                      <FormField
                        control={form.control}
                        name="billing.otherPaymentOptions"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Other payment options</FormLabel>
                            <FormControl>
                              <DropdownSelect
                                options={["Cash", "Credit Card", "Debit Card"]}
                                onChange={field.onChange}
                                defaultValue={field.value as string}
                                value={field.value as string}
                                label="Payment options"
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
                        name="billing.vatType"
                        render={({ field }) => (
                          <FormItem className="flex-1">
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
                                    <div className="flex items-center gap-3">
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
                    </div>

                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="contract.serviceType"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Service type</FormLabel>
                            <FormControl>
                              <DropdownSelect
                                options={[
                                  "Travel",
                                  "Accommodation",
                                  "Food",
                                  "Other",
                                ]}
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

                    <Separator />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem className="flex-1 pt-4">
                  <FormLabel>Comments</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
