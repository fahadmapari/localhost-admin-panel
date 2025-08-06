import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { clientSchema } from "@/schemas/client.schema";
import { Input } from "../ui/input";
import DropdownSelect from "../inputs/DropdownSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWR from "swr";
import axios from "axios";
import { toast } from "sonner";
import VirtualDropdownSelect from "../inputs/VirtualDropdownSelect";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import api from "@/lib/axios";

interface CountryCityType {
  name: string;
  cities: string[];
}

const RegisterClientForm = () => {
  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
  });
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const { watch } = form;

  const watchedCountry = watch("companyCountry");

  const { data: countriesAndCities } = useSWR(
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

  const { data: countryCodes, isLoading } = useSWR(
    "/json/country_codes.json",
    async (url) => {
      try {
        const { data } = await axios.get<
          {
            name: string;
            dial_code: string;
            code: string;
          }[]
        >(url);

        const codes = data.map(
          (countryCode) => `${countryCode.name} ` + countryCode["dial_code"]
        );

        return codes;
      } catch (err) {
        // @ts-expect-error - TODO: fix this
        toast.error(err?.message, {
          position: "top-center",
          richColors: true,
        });

        return [];
      }
    },
    {
      revalidateOnFocus: false,
    }
  );

  async function onSubmit(values: z.infer<typeof clientSchema>) {
    try {
      setIsUploading(true);
      await api.post("/clients", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      form.reset();

      setIsUploading(false);

      toast.success("Product created successfully", {
        position: "top-center",
        richColors: true,
      });

      navigate("/client/list");
    } catch (error) {
      setIsUploading(false);
      console.log(error);
      toast.error("Error while creating product" + error, {
        position: "top-center",
        richColors: true,
      });
    }
  }

  useEffect(() => {
    form.setValue("companyCity", "");
  }, [watchedCountry]);

  const cities = useMemo(() => {
    return countriesAndCities?.cities[watchedCountry] || [];
  }, [watchedCountry, isLoading, countriesAndCities?.cities]);

  return (
    <div className="h-full">
      <Form {...form}>
        <form
          className="h-full flex flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h3 className="text-3xl font-semibold pb-4 pl-1">
            Register New Client
          </h3>
          <div className="flex-1">
            <Accordion
              type="single"
              collapsible
              className="space-y-4"
              defaultValue="item-1"
            >
              <AccordionItem
                className={cn("border p-4 rounded-xl")}
                value="item-1"
                defaultChecked={true}
              >
                <AccordionTrigger className="text-2xl cursor-pointer">
                  Client Account Information
                </AccordionTrigger>
                <AccordionContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex items-start gap-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="flex-1 flex gap-2 items-end">
                      <FormField
                        control={form.control}
                        name="mobile.code"
                        render={({ field }) => (
                          <FormItem className="min-w-40">
                            <FormLabel>Mobile</FormLabel>
                            <FormControl>
                              <DropdownSelect
                                value={field.value || ""}
                                onChange={field.onChange}
                                options={countryCodes || []}
                                label="Dial Codes"
                                defaultValue={field.value || ""}
                                placeholder={"Country Code"}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="mobile.number"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                placeholder="Mobile Number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex-1 flex gap-2 items-end">
                      <FormField
                        control={form.control}
                        name="whatsapp.code"
                        render={({ field }) => (
                          <FormItem className="min-w-40">
                            <FormLabel>Whatsapp</FormLabel>
                            <FormControl>
                              <DropdownSelect
                                value={field.value || ""}
                                onChange={field.onChange}
                                options={countryCodes || []}
                                label="Dial Codes"
                                defaultValue={field.value || ""}
                                placeholder={"Country Code"}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="whatsapp.number"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                placeholder="Fax Number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      name="teamsId"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Teams ID</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                className={cn("!border p-4 rounded-xl")}
                value="item-2"
                defaultChecked={true}
              >
                <AccordionTrigger className="text-2xl cursor-pointer">
                  Client Company Information
                </AccordionTrigger>
                <AccordionContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <FormField
                      name="companyName"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="companyAddress"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Company Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-start gap-4">
                    <FormField
                      name="companyZipCode"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Zip/postal Code</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="companyCountry"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <VirtualDropdownSelect
                              {...field}
                              onValueChange={field.onChange}
                              options={countriesAndCities?.countries || []}
                              placeholder="Select Country"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="companyCity"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <VirtualDropdownSelect
                              {...field}
                              value={field.value}
                              onValueChange={field.onChange}
                              options={cities}
                              placeholder="Select City"
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
                      name="companyPreferredPaymentMethod"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Preferred Payment Method</FormLabel>
                          <FormControl>
                            <DropdownSelect
                              value={field.value}
                              onChange={field.onChange}
                              options={
                                clientSchema.shape.companyPreferredPaymentMethod
                                  .options
                              }
                              label="Payment Methods"
                              defaultValue={field.value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="companyVATNumber"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>VAT Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="companyPaymentAgreement"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Payment Agreement</FormLabel>
                          <FormControl>
                            <DropdownSelect
                              value={field.value}
                              onChange={field.onChange}
                              options={
                                clientSchema.shape.companyPaymentAgreement
                                  .options
                              }
                              label="Payment Agreements"
                              defaultValue={field.value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-1 flex gap-2 items-end">
                      <FormField
                        control={form.control}
                        name="companyFaxCode"
                        render={({ field }) => (
                          <FormItem className="min-w-40">
                            <FormLabel>Fax</FormLabel>
                            <FormControl>
                              <DropdownSelect
                                value={field.value || ""}
                                onChange={field.onChange}
                                options={countryCodes || []}
                                label="Dial Codes"
                                defaultValue={field.value || ""}
                                placeholder={"Country Code"}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="companyFax"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                placeholder="Fax Number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex-1 flex gap-2 items-end">
                      <FormField
                        control={form.control}
                        name="companyTelephoneCode"
                        render={({ field }) => (
                          <FormItem className="min-w-40">
                            <FormLabel>Telephone</FormLabel>
                            <FormControl>
                              <DropdownSelect
                                value={field.value}
                                onChange={field.onChange}
                                options={countryCodes || []}
                                label="Dial Codes"
                                defaultValue={field.value}
                                placeholder={"Country Code"}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="companyTelephone"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                placeholder="Telephone Number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <FormField
                      control={form.control}
                      name="companyCurrency"
                      render={({ field }) => (
                        <FormItem className="min-w-40">
                          <FormLabel>Currency</FormLabel>
                          <FormControl>
                            <DropdownSelect
                              value={field.value || ""}
                              onChange={field.onChange}
                              options={["EUR", "USD", "INR"]}
                              label="Currencies"
                              defaultValue={field.value || ""}
                              placeholder={"Currency"}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="companyEmail"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Company Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="companyAssociationName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Association Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder="Association Name - Member ID"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="w-full flex justify-center mt-4">
            <Button className="cursor-pointer">Register Client</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterClientForm;
