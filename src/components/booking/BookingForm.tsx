import { useForm } from "react-hook-form";
import { Card } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "@/schemas/booking.schema";
import { Textarea } from "../ui/textarea";

import useSWR from "swr";
import api from "@/lib/axios";
import { TourListType } from "@/types/product";
import { useEffect, useMemo, useRef, useState } from "react";
import { Loader, Plus, Search, ShoppingCart, X } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import DropdownSelect from "../inputs/DropdownSelect";
import { toast } from "sonner";
import { DatePicker } from "../date-picker";
import PageHeading from "../common/PageHeading";
import { ScrollArea } from "../ui/scroll-area";
import { ClientProfile } from "@/types/client";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

const BookingForm = () => {
  const form = useForm({
    resolver: zodResolver(bookingSchema),
  });

  const { watch } = form;

  const watchedOrderItems = watch("orderItems");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProduct, setselectedProduct] = useState<string>("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const {
    data,
    mutate,
    isLoading: productSearching,
  } = useSWR(searchTerm ? "/products/search" : null, async (url) => {
    const { data } = await api.post<{
      data: TourListType[];
    }>(url, {
      searchTerm: searchTerm,
    });

    return data?.data;
  });

  const { data: clients, isLoading: clientsLoading } = useSWR(
    "/clients/all",
    async (url) => {
      const { data } = await api.get<{
        data: ClientProfile[];
      }>(url);

      return data?.data;
    }
  );

  const productsMap = useMemo(() => {
    const products: Record<string, TourListType> = {};

    data?.forEach(
      (d) =>
        (products[
          d.baseProduct.title +
            "-" +
            d.bookingType +
            "-" +
            d.tourGuideLanguage +
            "-" +
            d.productCode
        ] = d)
    );

    return products;
  }, [data]);

  useEffect(() => {
    if (searchTerm) {
      mutate();
    }
  }, [searchTerm]);

  useEffect(() => {
    if (productsMap) {
      setselectedProduct(Object.keys(productsMap)[0]);
    }
  }, [productSearching]);

  const onSubmit = async (values: z.infer<typeof bookingSchema>) => {};

  const handleAddProduct = (product?: TourListType) => {
    if (!product) {
      toast.error("Please select a product", {
        richColors: true,
        position: "top-center",
      });
      return;
    }
    const prevOrderItems = form.getValues("orderItems") || [];

    form.setValue("orderItems", [
      ...prevOrderItems,
      {
        productId: product._id,
        productTitle: product.baseProduct.title,
        quantity: 1,
        price:
          product.bookingType === "instant"
            ? product.b2bRateInstant
            : product.b2bRateOnRequest,
        meetingPoint: product.meetingPoint.text,
        endPoint: product.endPoint.text,
        startTime: product.availability.startTime,
        duration: product.availability.duration.value,
        paxCount: 1,
        details: "",
        date: new Date(),
      },
    ]);
  };

  const handleRemoveProduct = (index: number) => {
    form.setValue(
      "orderItems",
      form.getValues("orderItems").filter((_, i) => i !== index)
    );
  };

  useEffect(() => {
    const totalPrice = watchedOrderItems?.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );

    form.setValue("totalPrice", totalPrice);
  }, [watchedOrderItems]);

  const handleDateChange = (date: Date, index: number) => {
    form.setValue(
      "orderItems",
      form
        .getValues("orderItems")
        .map((item, i) => (i === index ? { ...item, date } : item))
    );
  };

  const handleStartTimeChange = (time: string, index: number) => {
    form.setValue(
      "orderItems",
      form
        .getValues("orderItems")
        .map((item, i) => (i === index ? { ...item, startTime: time } : item))
    );
  };

  const handlePaxCountChange = (paxCount: number, index: number) => {
    form.setValue(
      "orderItems",
      form
        .getValues("orderItems")
        .map((item, i) => (i === index ? { ...item, paxCount } : item))
    );
  };

  const handleQuantityChange = (quantity: number, index: number) => {
    form.setValue(
      "orderItems",
      form
        .getValues("orderItems")
        .map((item, i) => (i === index ? { ...item, quantity } : item))
    );
  };

  return (
    <div className="h-full flex flex-col">
      <PageHeading label="New Booking" />

      {clientsLoading ? (
        <Skeleton className="flex-1 w-full" />
      ) : (
        <ScrollArea className="flex-1 overflow-hidden">
          <Form {...form}>
            <form
              className="flex-1 flex flex-col"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex-1 overflow-y-auto">
                <Card className="flex-1 mt-4 p-4 flex flex-col">
                  <div className="flex flex-col gap-4">
                    <div>
                      <FormField
                        control={form.control}
                        name="clientId"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Client</FormLabel>
                            <FormControl>
                              <DropdownSelect
                                options={
                                  clients?.map(
                                    (c) =>
                                      c.companyInformation.name +
                                      " - " +
                                      c.firstName +
                                      " " +
                                      c.lastName +
                                      " - " +
                                      c.companyInformation.country
                                  ) || []
                                }
                                label="Select Client"
                                value={field.value}
                                onChange={field.onChange}
                                defaultValue={field.value}
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
                        name="leadFirstName"
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
                        name="leadLastName"
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
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex flex-1 items-end gap-2">
                        <FormField
                          control={form.control}
                          name="leadMobile.countryCode"
                          render={({ field }) => (
                            <FormItem className="min-w-52">
                              <FormLabel>Mobile</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="text"
                                  placeholder="Country Code"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="leadMobile.number"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  {...field}
                                  type="tel"
                                  placeholder="Mobile Number"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="agencyRef"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Agency Ref</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="comments"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Comments</FormLabel>
                            <FormControl>
                              <Textarea {...field} className="h-[150px]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label>Search Products</Label>
                      <div className="flex items-start gap-2">
                        <Input
                          placeholder="Search by title or product code"
                          ref={searchInputRef}
                        />
                        <Button
                          className="flex items-center gap-1"
                          onClick={() => {
                            setSearchTerm(
                              searchInputRef.current?.value.trim() || ""
                            );
                          }}
                          type="button"
                          disabled={productSearching}
                        >
                          {productSearching ? (
                            <Loader className="animate-spin" />
                          ) : (
                            <Search />
                          )}
                          Search
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label>Select Product</Label>
                      <div className="flex items-center gap-2">
                        <DropdownSelect
                          value={selectedProduct}
                          defaultValue={selectedProduct}
                          label="Select Product"
                          onChange={(value) => setselectedProduct(value)}
                          options={Object.keys(productsMap)}
                        />
                        <Button
                          type="button"
                          onClick={() =>
                            handleAddProduct(productsMap[selectedProduct])
                          }
                        >
                          <Plus />
                          ADD
                        </Button>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "w-full flex-1 flex flex-col border-dashed border rounded-md border-border p-4",
                        form.getFieldState("orderItems")?.error
                          ? "border-destructive"
                          : ""
                      )}
                    >
                      <div className="text-2xl font-medium mb-4">
                        Order Items
                      </div>
                      <FormField
                        control={form.control}
                        name="orderItems"
                        render={({ field }) => (
                          <div className="flex flex-col gap-4">
                            {!field.value?.length && (
                              <div className="flex gap-4 text-muted-foreground">
                                <ShoppingCart />
                                Cart is empty
                              </div>
                            )}
                            {field.value?.map((f, i) => (
                              <FormItem
                                key={f.productId}
                                className="flex items-center gap-4 border border-border rounded-md p-4"
                              >
                                <div className="w-full flex flex-col gap-4">
                                  <div className="flex flex-1 gap-4">
                                    <div className="flex-1 flex flex-col gap-2">
                                      <FormLabel>Product Title</FormLabel>
                                      <FormControl>
                                        <Input
                                          defaultValue={f.productTitle}
                                          type="text"
                                          readOnly
                                          className="read-only:opacity-60"
                                        />
                                      </FormControl>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                      <FormLabel>Price</FormLabel>
                                      <FormControl>
                                        <Input
                                          className="w-full read-only:opacity-60"
                                          defaultValue={f.price}
                                          type="number"
                                          step={1}
                                          readOnly
                                        />
                                      </FormControl>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                      <FormLabel>Pax</FormLabel>
                                      <FormControl>
                                        <Input
                                          className="w-full"
                                          value={f.paxCount}
                                          onChange={(e) =>
                                            handlePaxCountChange(
                                              Number(e.target.value),
                                              i
                                            )
                                          }
                                          type="number"
                                          step={1}
                                        />
                                      </FormControl>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                      <FormLabel>Quantity</FormLabel>
                                      <FormControl>
                                        <Input
                                          className="w-full"
                                          value={f.quantity}
                                          type="number"
                                          onChange={(e) =>
                                            handleQuantityChange(
                                              Number(e.target.value),
                                              i
                                            )
                                          }
                                          step={1}
                                        />
                                      </FormControl>
                                    </div>
                                  </div>

                                  <div className="flex gap-4">
                                    <div className="flex-1 flex flex-col gap-2">
                                      <FormLabel>Meeting Point</FormLabel>
                                      <FormControl>
                                        <Input
                                          className="w-full read-only:opacity-60"
                                          defaultValue={f.meetingPoint}
                                          type="text"
                                          readOnly
                                        />
                                      </FormControl>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                      <FormLabel>End Point</FormLabel>
                                      <FormControl>
                                        <Input
                                          className="w-full read-only:opacity-60"
                                          defaultValue={f.endPoint}
                                          type="text"
                                          readOnly
                                        />
                                      </FormControl>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                      <FormLabel>Start Time</FormLabel>
                                      <FormControl>
                                        <Input
                                          className="w-full"
                                          value={f.startTime}
                                          onChange={(time) =>
                                            handleStartTimeChange(
                                              time.target.value,
                                              i
                                            )
                                          }
                                          type="time"
                                        />
                                      </FormControl>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                      <FormLabel>Duration (Hrs)</FormLabel>
                                      <FormControl>
                                        <Input
                                          className="w-full read-only:opacity-60"
                                          defaultValue={f.duration}
                                          type="number"
                                          readOnly
                                        />
                                      </FormControl>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                      <FormLabel>Date</FormLabel>
                                      <FormControl>
                                        <DatePicker
                                          className="w-full"
                                          value={f.date}
                                          onChange={(date) =>
                                            handleDateChange(
                                              date || new Date(),
                                              i
                                            )
                                          }
                                        />
                                      </FormControl>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    className="cursor-pointer hover:opacity-80"
                                    onClick={() => handleRemoveProduct(i)}
                                  >
                                    <X />
                                    Remove
                                  </Button>
                                </div>
                              </FormItem>
                            ))}
                            <FormMessage />
                          </div>
                        )}
                      />
                    </div>
                    <div className="flex items-end gap-2">
                      <FormField
                        control={form.control}
                        name="discountCode"
                        render={({ field }) => (
                          <FormItem className="flex-1 ">
                            <FormLabel>Discount Code</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="button">Apply</Button>
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="totalPrice"
                        render={({ field }) => (
                          <FormItem className="flex-1 ">
                            <FormLabel>Total Price</FormLabel>
                            <div className="text-2xl font-bold">
                              {field.value || 0} EUR
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex items-center justify-center pt-4">
                <Button type="submit">Create New Booking</Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      )}
    </div>
  );
};

export default BookingForm;
