import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FieldErrors, useForm } from "react-hook-form";
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
import { useEffect, useMemo, useState } from "react";
import { difference } from "lodash";
import ProductUploadLoader from "./ProductUploadLoader";
import { MultiValueTextarea } from "../ui/MultiValueTextarea";

import languages from "../../assets/json/languages.v1.json";
import axios from "axios";
import useSWR from "swr";
import AlertModal from "../common/AlertModal";
import MultipleProductEditModal from "./MultipleProductEditModal";
import VirtualDropdownSelect from "../inputs/VirtualDropdownSelect";
import VirtualizedSelect from "../inputs/VirtualDropdownSelect";

interface ProductFormProps {
  isEdit?: boolean;
  product?: {
    title: string;
    serviceType: "guide" | "assistant";
    tourType: "shared" | "private";
    activityType: "city tours";
    subType: "walking tours";
    description: string;
    willSee: string[];
    willLearn: string[];
    tourTextLanguage: "english";
    bookingType: "instant" | "request";
    tourGuideLanguageInstant: string[];
    tourGuideLanguageOnRequest: string[];
    mandatoryInformation: string[];
    recommdendedInformation: string[];
    included: string[];
    excluded: string[];
    activitySuitableFor: "all" | "adults" | "children";
    voucherType:
      | "printed or e-voucher accepted"
      | "printed"
      | "e-voucher accepted";
    maxPax: number;
    meetingPoint: {
      country: string;
      city: string;
      latitude: number;
      longitude: number;
      text: string;
      pickupInstructions: string[];
    };
    endPoint: {
      latitude: number | undefined;
      longitude: number | undefined;
      text: string;
    };
    tags: (
      | "walk"
      | "museum"
      | "palace"
      | "science"
      | "technology"
      | "beer"
      | "christmas"
      | undefined
    )[];
    images: (File | string | undefined)[] | undefined;
    priceModel: "fixed rate" | "per pax";
    currency: "USD" | "EUR" | "GBP" | "INR";
    b2bRateInstant: number;
    b2bExtraHourSupplementInsant: number | undefined;
    b2bRateOnRequest: number | undefined;
    b2bExtraHourSupplementOnRequest: number | undefined;
    b2cRateInstant: number;
    b2cExtraHourSupplementInstant: number | undefined;
    b2cRateOnRequest: number | undefined;
    b2cExtraHourSupplementOnRequest: number | undefined;
    closedDates: Date[];
    holidayDates: Date[];
    publicHolidaySupplementPercent: number;
    weekendSupplementPercent: number;
    availability: {
      startTime: string;
      endTime: string;
      duration: {
        value: number;
        unit: "minutes" | "hours" | "days";
      };
    };
    cancellationTerms: string[];
    realease: string;
    isB2B: boolean;
    isB2C: boolean;
    overridePriceFromContract: boolean;
    isBookingPerProduct: boolean;
    productCode: string;
  };
}

interface CountryCityType {
  name: string;
  cities: string[];
}

const ProductionCreationForm = ({
  product,
  isEdit = false,
}: ProductFormProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showMultipleEditModal, setShowMultipleEditModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      title: "",
      serviceType: "guide",
      tourType: "private",
      activityType: "city tours",
      subType: "walking tours",
      description: "",
      willSee: [],
      willLearn: [],
      tourTextLanguage: "english",
      bookingType: "request",
      tourGuideLanguage: "English",
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
        country: undefined,
        city: undefined,
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

  const { data: countriesAndCities, isLoading } = useSWR(
    ["countries", "cities"],
    async () => {
      const response = await axios.get<CountryCityType[]>(
        "/json/countries_cities.json"
      );

      // TODO: optimize the json file later
      const countries = response.data.map((country) => country.name);
      const cities: Record<string, string[]> = {};
      response.data.forEach((country) => {
        cities[country.name] = country.cities;
      });

      return { countries, cities };
    },
    {
      revalidateOnFocus: false,
    }
  );

  const {
    formState: { errors },
    watch,
  } = form;

  const watchedCountry = watch("meetingPoint.country");

  const cities = useMemo(() => {
    return countriesAndCities?.cities[watchedCountry] || [];
  }, [watchedCountry]);

  useEffect(() => {
    form.setValue("meetingPoint.city", "");
  }, [watchedCountry]);

  const isPricingScheduleError = (
    errors: FieldErrors<z.infer<typeof productSchema>>
  ) => {
    return errors.b2bRateInstant ||
      errors.b2bExtraHourSupplementInsant ||
      errors.b2cRateInstant ||
      errors.b2cExtraHourSupplementInstant ||
      errors.b2bRateOnRequest ||
      errors.b2bExtraHourSupplementOnRequest ||
      errors.b2cRateOnRequest ||
      errors.b2cExtraHourSupplementOnRequest ||
      errors.availability ||
      errors.priceModel ||
      errors.currency
      ? true
      : false;
  };

  const isProductInfoError = (
    errors: FieldErrors<z.infer<typeof productSchema>>
  ) => {
    return errors.title ||
      errors.serviceType ||
      errors.tourType ||
      errors.activityType ||
      errors.subType ||
      errors.description ||
      errors.willSee ||
      errors.willLearn ||
      errors.tourTextLanguage ||
      errors.tourGuideLanguageInstant ||
      errors.tourGuideLanguageOnRequest ||
      errors.mandatoryInformation ||
      errors.recommdendedInformation ||
      errors.included ||
      errors.excluded ||
      errors.activitySuitableFor ||
      errors.voucherType ||
      errors.maxPax ||
      errors.meetingPoint ||
      errors.endPoint ||
      errors.tags
      ? true
      : false;
  };

  async function onEditSubmit(values: z.infer<typeof productSchema>) {
    values.existingImages = values.images.filter(
      (image) => typeof image === "string"
    );
    values.images = values.images.filter((image) => image instanceof File);

    if (values.images.length === 0 && values.existingImages.length === 0) {
      toast.error("Please upload atleast one image", {
        position: "top-center",
        richColors: true,
      });
      return;
    }

    const formData = objectToFormData(values);

    try {
      setIsUploading(true);
      await api.post("/products/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      form.reset();

      setIsUploading(false);

      toast.success("Product created successfully", {
        position: "top-center",
        richColors: true,
      });
    } catch (error) {
      setIsUploading(false);
      console.log(error);
      toast.error("Error while creating product" + error, {
        position: "top-center",
        richColors: true,
      });
    }
  }

  async function onSubmit(values: z.infer<typeof productSchema>) {
    const formData = objectToFormData(values);

    try {
      setIsUploading(true);
      await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      form.reset();

      setIsUploading(false);

      toast.success("Product created successfully", {
        position: "top-center",
        richColors: true,
      });
    } catch (error) {
      setIsUploading(false);
      console.log(error);
      toast.error("Error while creating product" + error, {
        position: "top-center",
        richColors: true,
      });
    }
  }

  const onError = () => {
    toast.error("Please check and fix all the errors.", {
      position: "top-center",
      richColors: true,
    });
  };

  return (
    <div className="h-full">
      <Form {...form}>
        <form
          className="h-full flex flex-col"
          onSubmit={form.handleSubmit(
            isEdit ? onEditSubmit : onSubmit,
            onError
          )}
        >
          {isEdit && (
            <div className="flex items-center gap-2 text-sm px-2 mb-2">
              <span className="font-medium">Product Code:</span>
              <span className="uppercase">{product?.productCode || "-"}</span>
            </div>
          )}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <Accordion
                type="single"
                collapsible
                className="space-y-4"
                defaultValue="item-1"
              >
                <AccordionItem
                  className={cn(
                    "border p-4 rounded-xl",
                    isProductInfoError(errors) && "border-destructive"
                  )}
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
                              <Input
                                {...field}
                                className="read-only:opacity-60 read-only:cursor-not-allowed"
                                readOnly={isEdit}
                              />
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
                                  className="disabled:opacity-60"
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
                                  className="disabled:opacity-60"
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
                                  className="disabled:opacity-60"
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
                              <FormLabel>Sub Type</FormLabel>
                              <FormControl>
                                <DropdownSelect
                                  value={field.value}
                                  onChange={field.onChange}
                                  defaultValue={field.value}
                                  options={productSchema.shape.subType.options}
                                  label="Activity Types"
                                  className="disabled:opacity-60"
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
                              <Textarea
                                className="w-full h-[250px] disabled:opacity-60"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-start w-full gap-4">
                        <FormField
                          control={form.control}
                          name="willSee"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>
                                You will see (Press enter for multple values)
                              </FormLabel>
                              <FormControl>
                                <MultiValueTextarea
                                  className="w-full h-[150px]"
                                  {...field}
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
                                <MultiValueTextarea
                                  className="w-full h-[150px]"
                                  {...field}
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

                        {isEdit && (
                          <FormField
                            control={form.control}
                            name="tourGuideLanguage"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Tour Guide Language</FormLabel>
                                <FormControl>
                                  <DropdownSelect
                                    value={field.value}
                                    onChange={field.onChange}
                                    defaultValue={field.value}
                                    options={Object.values(languages)}
                                    label="Tour Guide Languages"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {isEdit && (
                          <FormField
                            control={form.control}
                            name="bookingType"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Booking Type</FormLabel>
                                <FormControl>
                                  <DropdownSelect
                                    value={field.value}
                                    onChange={field.onChange}
                                    defaultValue={field.value}
                                    options={
                                      productSchema.shape.bookingType.options
                                    }
                                    label="Booking Types"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {!isEdit && (
                          <FormField
                            control={form.control}
                            name="tourGuideLanguageInstant"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>
                                  Tour Guide Language (Instant)
                                </FormLabel>
                                <FormControl>
                                  <MultiSelect
                                    value={field.value}
                                    onValueChange={(value) => {
                                      const uniqueValues = difference(
                                        value,
                                        form.getValues()
                                          .tourGuideLanguageOnRequest
                                      );
                                      field.onChange(uniqueValues);
                                    }}
                                    defaultValue={field.value}
                                    options={
                                      productSchema.shape
                                        .tourGuideLanguageInstant.element
                                        .options
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {!isEdit && (
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
                                    onValueChange={(value) => {
                                      const uniqueValues = difference(
                                        value,
                                        form.getValues()
                                          .tourGuideLanguageInstant
                                      );
                                      field.onChange(uniqueValues);
                                    }}
                                    defaultValue={field.value}
                                    options={
                                      productSchema.shape
                                        .tourGuideLanguageInstant.element
                                        .options
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
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
                                <MultiValueTextarea
                                  className="w-full h-[150px]"
                                  {...field}
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
                                <MultiValueTextarea
                                  className="w-full h-[150px]"
                                  {...field}
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
                                <MultiValueTextarea
                                  className="w-full h-[150px]"
                                  {...field}
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
                                <MultiValueTextarea
                                  className="w-full h-[150px]"
                                  {...field}
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
                                  className="read-only:opacity-60 read-only:cursor-not-allowed"
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

                      <div className="flex gap-4 items-start">
                        <FormField
                          control={form.control}
                          name="meetingPoint.country"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <VirtualDropdownSelect
                                  {...field}
                                  onValueChange={field.onChange}
                                  options={countriesAndCities?.countries || []}
                                  placeholder="Select Country"
                                  disabled={isEdit || isLoading}
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
                                <VirtualizedSelect
                                  {...field}
                                  onValueChange={field.onChange}
                                  options={cities}
                                  placeholder="Select City"
                                  disabled={isEdit || isLoading}
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
                                  className="read-only:opacity-60 read-only:cursor-not-allowed"
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
                                  className="read-only:opacity-60 read-only:cursor-not-allowed"
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
                              <Input
                                {...field}
                                type="text"
                                className="read-only:opacity-60 read-only:cursor-not-allowed"
                              />
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
                              <MultiValueTextarea
                                className="w-full h-[80px]"
                                {...field}
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
                              <Input
                                {...field}
                                type="text"
                                className="read-only:opacity-60 read-only:cursor-not-allowed"
                              />
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
                                options={
                                  productSchema.shape.tags.element.options
                                }
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
                    errors.images && "border-destructive"
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

                <AccordionItem
                  className={cn(
                    "!border p-4 rounded-xl",
                    isPricingScheduleError(errors) && "border-destructive"
                  )}
                  value="item-3"
                >
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
                            <FormLabel>Rate B2B (On Request)</FormLabel>
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
                              Extra Hour Supplement(Not "Charges") B2B (On
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
                                disabled={() => isEdit}
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
                                disabled={() => isEdit}
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
                              <Input
                                {...field}
                                type="time"
                                className="read-only:opacity-60 read-only:cursor-not-allowed"
                              />
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
                              <Input
                                {...field}
                                type="time"
                                className="read-only:opacity-60 read-only:cursor-not-allowed"
                              />
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
                                  className="read-only:opacity-60 read-only:cursor-not-allowed"
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
                            <MultiValueTextarea
                              {...field}
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
                            <Input
                              {...field}
                              className="read-only:opacity-60 read-only:cursor-not-allowed"
                            />
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
            <div className="flex items-center gap-4">
              <Button
                className={cn(
                  "mx-auto cursor-pointer",
                  isUploading && "opacity-50"
                )}
                type="submit"
                disabled={isUploading}
              >
                {isEdit ? "Update Current" : "Create New Product"}
              </Button>

              {isEdit && (
                <Button
                  className={cn(
                    "mx-auto cursor-pointer",
                    isUploading && "opacity-50"
                  )}
                  type="button"
                  disabled={isUploading}
                  onClick={() => setShowMultipleEditModal(true)}
                >
                  Update Multiple
                </Button>
              )}

              {isEdit && (
                <Button
                  className={cn(
                    "mx-auto hover:bg-destructive hover:text-primary cursor-pointer border border-destructive bg-transparent text-destructive",
                    isUploading && "opacity-50"
                  )}
                  type="button"
                  disabled={isUploading}
                  onClick={() => setShowDeleteAlert(true)}
                >
                  Delete Current
                </Button>
              )}
              {isEdit && (
                <Button
                  className={cn(
                    "mx-auto hover:bg-destructive hover:text-primary cursor-pointer border border-destructive bg-transparent text-destructive",
                    isUploading && "opacity-50"
                  )}
                  type="button"
                  disabled={isUploading}
                >
                  Delete Multiple
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
      <ProductUploadLoader open={isUploading} />
      {isEdit && (
        <AlertModal
          open={showDeleteAlert}
          close={() => setShowDeleteAlert(false)}
        />
      )}

      {Boolean(isEdit && product) && (
        <MultipleProductEditModal
          open={showMultipleEditModal}
          close={() => setShowMultipleEditModal(false)}
          instantLanguages={product?.tourGuideLanguageInstant || []}
          requestLanguages={product?.tourGuideLanguageOnRequest || []}
        />
      )}
    </div>
  );
};

export default ProductionCreationForm;
