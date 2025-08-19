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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import useSWR from "swr";
import api from "@/lib/axios";
import { TourListType } from "@/types/product";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { Plus, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import DropdownSelect from "../inputs/DropdownSelect";
import { se } from "date-fns/locale";
import { toast } from "sonner";

const BookingForm = () => {
  const form = useForm({
    resolver: zodResolver(bookingSchema),
  });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProduct, setselectedProduct] = useState<string>("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const { data, mutate } = useSWR("/products/search", async (url) => {
    const { data } = await api.post<{
      data: TourListType[];
    }>(url, {
      searchTerm: searchTerm,
    });

    console.log(searchTerm);

    return data?.data;
  });

  useEffect(() => {
    if (searchTerm) {
      mutate();
    }
  }, [searchTerm]);

  const handleAddProduct = (product?: TourListType) => {
    if (!product) {
      toast.error("Please select a product", {
        richColors: true,
        position: "top-center",
      });
      return;
    }

    form.setValue("orderItems", [
      {
        productId: product._id,
        quantity: 1,
        price:
          product.bookingType === "instant"
            ? product.b2bRateInstant
            : product.b2bRateOnRequest,
        meetingPoint: product.meetingPoint.text,
        endPoint: product.endPoint.text,
        startTime: product.availability.startTime,
        duration: product.availability.duration.unit,
        paxCount: 1,
        details: "",
        Date: new Date(),
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
              >
                <Search />
                Search
              </Button>
            </div>
          </div>

          {/* <div>
            {data?.map((d) => (
              <div key={d._id}>
                {d.baseProduct.title} - {d.bookingType} - {d.tourGuideLanguage}{" "}
                - {d.productCode}
              </div>
            ))}
          </div> */}

          <div className="flex flex-col gap-2">
            <Label>Select Product</Label>
            <div className="flex items-center gap-2">
              <DropdownSelect
                value={selectedProduct}
                defaultValue={selectedProduct}
                label="Select Product"
                onChange={(value) => setselectedProduct(value)}
                options={
                  data?.map(
                    (d) =>
                      d.baseProduct.title +
                      "-" +
                      d.bookingType +
                      "-" +
                      d.tourGuideLanguage +
                      "-" +
                      d.productCode
                  ) || []
                }
              />
              <Button
                type="button"
                onClick={() =>
                  handleAddProduct(
                    data?.find(
                      (d) =>
                        d.baseProduct.title +
                          "-" +
                          d.bookingType +
                          "-" +
                          d.tourGuideLanguage +
                          "-" +
                          d.productCode ===
                        selectedProduct
                    )
                  )
                }
              >
                <Plus />
                ADD
              </Button>
            </div>
          </div>

          <div>
            <FormField
              control={form.control}
              name="orderItems"
              render={({ field }) => (
                <>
                  {field.value?.map((f) => (
                    <FormItem className="flex-1">
                      <FormLabel>Product Title</FormLabel>
                      <FormControl>
                        <Input
                          value={f.productId}
                          type="text"
                          readOnly
                          className="read-only:opacity-60"
                        />
                        <Input value={f.quantity} type="number" step={1} />
                      </FormControl>
                    </FormItem>
                  ))}
                </>
              )}
            />
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default BookingForm;
