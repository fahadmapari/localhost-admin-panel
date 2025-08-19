import { z } from "zod";

export const bookingSchema = z.object({
  leadFirstName: z.string("Lead first name is required"),
  leadLastName: z.string("Lead last name is required"),
  leadMobile: z.object({
    countryCode: z.string("Country code is required"),
    number: z.string("Number is required"),
  }),
  agencyRef: z.string("Agency ref is required").optional(),
  comments: z.string().optional(),
  orderItems: z.array(
    z.object({
      productId: z.string("Product id is required"),
      quantity: z.number("Quantity is required"),
      price: z.number("Price is required"),
      meetingPoint: z.string("Meeting point is required"),
      endPoint: z.string("End point is required"),
      startTime: z.string("Start time is required"),
      duration: z.string("Duration is required"),
      paxCount: z.number("Number of travellers is required"),
      details: z.string().optional(),
      Date: z.date("Date is required"),
    })
  ),
  totalPrice: z.number("Total price is required"),
  discountCode: z.string().optional(),
});
