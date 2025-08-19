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

const BookingForm = () => {
  const form = useForm({
    resolver: zodResolver(bookingSchema),
  });

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

  return (
    <Card className="mt-4 p-4">
      <Form {...form}>
        <form className="space-y-4">
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
                  setSearchTerm(searchInputRef.current?.value.trim() || "");
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
                onClick={() => handleAddProduct(productsMap[selectedProduct])}
              >
                <Plus />
                ADD
              </Button>
            </div>
          </div>

          <div className="w-full flex-1 flex flex-col border-dashed border rounded-md border-border p-4">
            <div className="text-2xl font-medium mb-4">Order Items</div>
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
                  {field.value?.map((f) => (
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
                                value={f.quantity}
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
                                value={f.value}
                                onChange={f.onChange}
                                defaultValue={f.date}
                                type="date"
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
                        >
                          <X />
                          Remove
                        </Button>
                      </div>
                    </FormItem>
                  ))}
                </div>
              )}
            />
          </div>
          <div>
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
          </div>
          <div>
            <FormField
              control={form.control}
              name="totalPrice"
              render={({ field }) => (
                <FormItem className="flex-1 ">
                  <FormLabel>Total Price</FormLabel>
                  <div className="text-2xl font-bold">{field.value}312 EUR</div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default BookingForm;
