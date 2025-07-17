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
import { Separator } from "../ui/separator";
import { MultiSelect } from "../multi-select";
import { MultiImageUpload } from "../multi-image-upload";
import { toast } from "sonner";
import { cn, objectToFormData } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { MultiDateSelect } from "../multi-date-select";
import { DatePicker } from "../date-picker";
import api from "@/lib/axios";

const ProductionCreationForm = () => {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
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
      tourGuideLanguageInstant: [],
      tourGuideLanguageOnRequest: ["English"],
      mandatoryInformation: [],
      recommdendedInformation: [],
      included: [],
      excluded: [],
      activitySuitableFor: "all",
      voucherType: "printed or e-voucher accepted",
      maxPax: 15,
      meetingPoint: {
        country: "germany",
        city: "berlin",
        latitude: undefined,
        longitude: undefined,
        text: "",
        pickupInstructions: [],
      },
      endPoint: {
        latitude: undefined,
        longitude: undefined,
        text: undefined,
      },
      tags: ["walk"],
      images: [],
      priceModel: "fixed rate",
      currency: "EUR",
      b2bRateInstant: 0,
      b2bExtraHourSupplementInsant: undefined,
      b2bRateOnRequest: 0,
      b2bExtraHourSupplementOnRequest: undefined,
      b2cRateInstant: 0,
      b2cExtraHourSupplementInstant: undefined,
      b2cRateOnRequest: 0,
      b2cExtraHourSupplementOnRequest: undefined,
      closedDates: [],
      holidayDates: [],
      publicHolidaySupplementPercent: 0,
      weekendSupplementPercent: 0,
      availability: {
        startTime: "06:00",
        endTime: "",
        duration: {
          value: 0,
          unit: "hours",
        },
      },
      cancellationTerms: [],
      realease: "",
      isB2B: true,
      isB2C: true,
      overridePriceFromContract: false,
      isBookingPerProduct: false,
    },
  });

  const {
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof productSchema>) {
    const formData = objectToFormData(values);

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const res = await api.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await form.trigger();

    if (!isValid) {
      toast.error("Please fix all the errors", {
        position: "top-center",
        richColors: true,
      });

      const errors = form.formState.errors;

      return;
    }

    form.handleSubmit(onSubmit);
  };
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
                <AccordionTrigger className="text-2xl cursor-pointer">
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
                                  field.onChange(
                                    e.target.value
                                      ? e.target.value.split("\n")
                                      : []
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
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? e.target.value.split("\n")
                                      : []
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="flex gap-4 items-start">
                      <FormField
                        control={form.control}
                        name="tourTextLanguage"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Tour Text Language</FormLabel>
                            <FormControl>
                              <DropdownSelect
                                value={field.value}
                                onChange={field.onChange}
                                defaultValue={field.value}
                                options={
                                  productSchema.shape.tourTextLanguage.options
                                }
                                label="Tour Text Languages"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tourGuideLanguageInstant"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Tour Guide Language (Instant)</FormLabel>
                            <FormControl>
                              <MultiSelect
                                value={field.value}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                options={
                                  productSchema.shape.tourGuideLanguageInstant
                                    .element.options
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tourGuideLanguageOnRequest"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>
                              Tour Guide Language (On Request)
                            </FormLabel>
                            <FormControl>
                              <MultiSelect
                                value={field.value}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                options={
                                  productSchema.shape.tourGuideLanguageInstant
                                    .element.options
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="flex w-full gap-4">
                      <FormField
                        control={form.control}
                        name="mandatoryInformation"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>
                              Mandatory Information (Press enter for multple
                              values)
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                className="w-full h-[150px]"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? e.target.value.split("\n")
                                      : []
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
                        name="recommdendedInformation"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>
                              Recommended Information (Press enter for multple
                              values)
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                className="w-full h-[150px]"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? e.target.value.split("\n")
                                      : []
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex w-full gap-4">
                      <FormField
                        control={form.control}
                        name="included"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>
                              Included (Press enter for multple values)
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                className="w-full h-[150px]"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? e.target.value.split("\n")
                                      : []
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
                        name="excluded"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>
                              Excluded (Press enter for multple values)
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                className="w-full h-[150px]"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? e.target.value.split("\n")
                                      : []
                                  )
                                }
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
                        name="activitySuitableFor"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Activity For</FormLabel>
                            <FormControl>
                              <DropdownSelect
                                value={field.value}
                                onChange={field.onChange}
                                defaultValue={field.value}
                                options={
                                  productSchema.shape.activitySuitableFor
                                    .options
                                }
                                label="Suitable For"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="voucherType"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Voucher Type</FormLabel>
                            <FormControl>
                              <DropdownSelect
                                value={field.value}
                                onChange={field.onChange}
                                defaultValue={field.value}
                                options={
                                  productSchema.shape.voucherType.options
                                }
                                label="Voucher Types"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="maxPax"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>No of Pax</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <h3 className="text-lg font-medium">
                      Meeting Point & Tags
                    </h3>

                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="meetingPoint.country"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <DropdownSelect
                                value={field.value}
                                onChange={field.onChange}
                                defaultValue={field.value}
                                options={[
                                  "germany",
                                  "europe",
                                  "asia",
                                  "africa",
                                ]}
                                label="countries"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="meetingPoint.city"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <DropdownSelect
                                value={field.value}
                                onChange={field.onChange}
                                defaultValue={field.value}
                                options={["berlin", "munich", "frankfurt"]}
                                label="cities"
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
                        name="meetingPoint.latitude"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    e ? parseFloat(e.target.value) : undefined
                                  )
                                }
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="meetingPoint.longitude"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    e ? parseFloat(e.target.value) : undefined
                                  )
                                }
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="meetingPoint.text"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Meeting Point</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="meetingPoint.pickupInstructions"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Pickup Instructions</FormLabel>
                          <FormControl>
                            <Textarea
                              className="w-full h-[80px]"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? e.target.value.split("\n")
                                    : []
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
                      name="endPoint.text"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>End Point</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Tags</FormLabel>
                          <FormControl>
                            <MultiSelect
                              value={field.value}
                              onValueChange={field.onChange}
                              options={productSchema.shape.tags.element.options}
                              placeholder="Type to search tags..."
                              defaultValue={field.value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                className={cn(
                  "border p-4 rounded-xl",
                  form.formState.errors.images && "border-destructive"
                )}
                value="item-2"
              >
                <AccordionTrigger className="text-2xl cursor-pointer">
                  Product Images
                </AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Images</FormLabel>
                        <FormControl>
                          <MultiImageUpload
                            value={field.value}
                            onChange={field.onChange}
                            maxFiles={5}
                            maxSize={5}
                          />
                        </FormControl>
                        <FormDescription>
                          Upload up to 5 images (max 5MB each)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem className="!border p-4 rounded-xl" value="item-3">
                <AccordionTrigger className="text-2xl cursor-pointer">
                  Pricing & Schedule Information
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="priceModel"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Price Model</FormLabel>
                          <FormControl>
                            <DropdownSelect
                              value={field.value}
                              onChange={field.onChange}
                              defaultValue={field.value}
                              options={productSchema.shape.priceModel.options}
                              label="Price Models"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Currency</FormLabel>
                          <FormControl>
                            <DropdownSelect
                              value={field.value}
                              onChange={field.onChange}
                              defaultValue={field.value}
                              options={productSchema.shape.currency.options}
                              label="Currencies"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="b2bRateInstant"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Rate B2B (Instant)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="b2bExtraHourSupplementInsant"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>
                            Extra Hour Supplement(Not "Charges") B2B (Instant)
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="b2cRateInstant"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Rate B2C (Instant)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="b2cExtraHourSupplementInstant"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>
                            Extra Hour Supplement(Not "Charges") B2C (Instant)
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="b2bRateOnRequest"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Rate B2C (On Request)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="b2bExtraHourSupplementOnRequest"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>
                            Extra Hour Supplement(Not "Charges") B2C (On
                            Request)
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="b2cRateOnRequest"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Rate B2C (On Request)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="b2cExtraHourSupplementOnRequest"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>
                            Extra Hour Supplement(Not "Charges") B2C (On
                            Request)
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-start gap-4">
                    <FormField
                      control={form.control}
                      name="closedDates"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Closed Dates</FormLabel>
                          <FormControl>
                            <MultiDateSelect
                              value={field.value}
                              onValueChange={field.onChange}
                              minDate={new Date()}
                              placeholder="Click to select dates..."
                              showPresets={false}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="holidayDates"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Holiday Dates</FormLabel>
                          <FormControl>
                            <MultiDateSelect
                              value={field.value}
                              onValueChange={field.onChange}
                              minDate={new Date()}
                              placeholder="Click to select dates..."
                              showPresets={false}
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
                      name="publicHolidaySupplementPercent"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>
                            Public Holiday Supplement in Percentage
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="weekendSupplementPercent"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>
                            Weekend Supplement in Percentage
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              type="number"
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
                      name="availability.startDate"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Start Date</FormLabel>
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
                      name="availability.endDate"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>End Date</FormLabel>
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
                      name="availability.startTime"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <Input {...field} type="time" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="availability.endTime"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>End Time</FormLabel>
                          <FormControl>
                            <Input {...field} type="time" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-2">
                      <FormField
                        control={form.control}
                        name="availability.duration.value"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Duration</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="availability.duration.unit"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Duration Unit</FormLabel>
                            <FormControl>
                              <DropdownSelect
                                value={field.value}
                                onChange={field.onChange}
                                options={
                                  productSchema.shape.availability.shape
                                    .duration.shape.unit.options
                                }
                                defaultValue={field.value}
                                label="Duration Units"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="cancellationTerms"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          Cancellation Terms (Press enter for multple values)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value ? e.target.value.split("\n") : []
                              )
                            }
                            className="w-full h-[150px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="realease"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Realease</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
        </div>
        <div className="flex flex-col items-center justify-center mt-6 w-full">
          <div className="flex items-center justify-between w-full mb-4 border border-border rounded-xl p-4">
            <FormField
              control={form.control}
              name="isB2B"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-center items-center gap-2">
                  <FormLabel>B2B Enabled</FormLabel>
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
              name="isB2C"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-center items-center gap-2">
                  <FormLabel>B2C Enabled</FormLabel>
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
              name="overridePriceFromContract"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-center items-center gap-2">
                  <FormLabel>Override Price From Contract</FormLabel>
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
              name="isBookingPerProduct"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-center items-center gap-2">
                  <FormLabel>Booking Per Product</FormLabel>
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
          <Button className="mx-auto cursor-pointer" type="submit">
            Create New Product
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductionCreationForm;
