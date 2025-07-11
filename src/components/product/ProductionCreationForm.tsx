import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productSchema } from "@/schemas/product.schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";

import DropdownSelect from "../inputs/DropdownSelect";

const ProductionCreationForm = () => {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      serviceType: "guide",
      tourType: "private",
      activityType: "city tours",
      subType: "walking tours",
      description: "",
      willSee: [],
      willLearn: [],
      tourTextLanguage: "english",
      bookingType: "instant",
      tourGuideLanguage: "english",
      mandatoryInformation: [],
      recommdendedInformation: [],
      included: [],
      excluded: [], // optional in schema, initialize as empty array
      activitySuitableFor: "all",
      voucherType: "printed or e-voucher accepted",
      maxPax: 1, // Must be a positive number
      meetingPoint: {
        latitude: 0, // Using 0 as a placeholder
        longitude: 0,
        text: "",
        pickupInstructions: [],
      },
      endPoint: {
        // optional in schema, but good to initialize
        latitude: undefined,
        longitude: undefined,
        text: undefined,
      },
      tags: [], // optional in schema, initialize as empty array
      images: [],
      priceModel: "fixed",
      currency: "EUR",
      b2bRate: 0, // Must be a number
      b2bExtraHourSupplement: 0,
      b2cRate: 0,
      b2cExtraHourSupplement: 0,
      closedDates: [],
      holidayDates: [],
      publicHolidaySupplementPercent: 0,
      weekendSupplementPercent: 0,
      availability: {
        startTime: "",
        endTime: "",
        duration: {
          value: 0,
          unit: "hours",
        },
      },
      cancellationTerms: [],
      realease: "", // optional in schema, initialize as empty string
      isB2B: true,
      isB2C: false,
      overridePriceFromContract: true,
      isBookingPerProduct: false,
    },
  });

  function onSubmit(values: z.infer<typeof productSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        className="h-full flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <Accordion
              type="single"
              collapsible
              className="space-y-4"
              defaultValue="item-1"
            >
              <AccordionItem
                className="border p-4 rounded-xl"
                value="item-1"
                defaultChecked={true}
              >
                <AccordionTrigger className="text-2xl">
                  Product Information
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex w-full gap-4">
                      <FormField
                        control={form.control}
                        name="serviceType"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Service Type</FormLabel>
                            <FormControl>
                              <DropdownSelect
                                value={field.value}
                                onChange={field.onChange}
                                defaultValue={field.value}
                                options={
                                  productSchema.shape.serviceType.options
                                }
                                label="Service Types"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tourType"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Tour Type</FormLabel>
                            <FormControl>
                              <DropdownSelect
                                value={field.value}
                                onChange={field.onChange}
                                defaultValue={field.value}
                                options={productSchema.shape.tourType.options}
                                label="Tour Types"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="activityType"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Activity Type</FormLabel>
                            <FormControl>
                              <DropdownSelect
                                value={field.value}
                                onChange={field.onChange}
                                defaultValue={field.value}
                                options={
                                  productSchema.shape.activityType.options
                                }
                                label="Activity Types"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subType"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Activity Type</FormLabel>
                            <FormControl>
                              <DropdownSelect
                                value={field.value}
                                onChange={field.onChange}
                                defaultValue={field.value}
                                options={productSchema.shape.subType.options}
                                label="Activity Types"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea className="w-full h-[250px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex w-full gap-4">
                      <FormField
                        control={form.control}
                        name="willSee"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>
                              You will see (Press enter for multple values)
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                className="w-full h-[150px]"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(e.target.value.split("\n"))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="willLearn"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>
                              You will Learn (Press enter for multple values)
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                className="w-full h-[150px]"
                                {...field}
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

              <AccordionItem className="border p-4 rounded-xl" value="item-2">
                <AccordionTrigger className="text-2xl">
                  Product Images
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem className="!border p-4 rounded-xl" value="item-3">
                <AccordionTrigger className="text-2xl">
                  Pricing & Schedule Information
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
        </div>
        <div className="flex justify-center mt-6">
          <Button className="mx-auto cursor-pointer" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductionCreationForm;
