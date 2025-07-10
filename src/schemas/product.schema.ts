import { z } from "zod";

// --- Sub-schemas remain the same ---
const meetingPointSchema = z.object({
  latitude: z.number({ message: "Latitude is required." }),
  longitude: z.number({ message: "Longitude is required." }),
  text: z.string().min(1, "Meeting point text is required."),
  pickupInstructions: z.array(z.string()).optional(),
});

const endPointSchema = z.object({
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  text: z.string().optional(),
});

const availabilitySchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  startTime: z.string().min(1, "Start time is required."),
  endTime: z.string().min(1, "End time is required."),
  duration: z.object({
    value: z.number({ message: "Duration value is required." }),
    unit: z.enum(["minutes", "hours", "days"]),
  }),
});

// --- Main Product Schema with corrections ---
export const productSchema = z.object({
  title: z.string().min(1, "Title is required."),
  serviceType: z.enum(["guide", "assistant"]),
  tourType: z.enum(["shared", "private"]),
  activityType: z.enum(["city tours"]),
  subType: z.enum(["walking tours"]),
  description: z.string().min(1, "Description is required."),
  willSee: z
    .array(z.string())
    .min(1, "At least one 'will see' item is required."),
  willLearn: z
    .array(z.string())
    .min(1, "At least one 'will learn' item is required."),
  tourTextLanguage: z.enum(["english", "spanish"]),
  bookingType: z.enum(["instant", "request"]),
  tourGuideLanguage: z.enum(["english", "spanish"]),
  mandatoryInformation: z
    .array(z.string())
    .min(1, "At least one mandatory information is required."),
  recommdendedInformation: z
    .array(z.string())
    .min(1, "At least one recommended information is required."),
  included: z
    .array(z.string())
    .min(1, "At least one included item is required."),
  excluded: z.array(z.string()).optional(),
  activitySuitableFor: z.enum(["all", "adults", "children"]),
  voucherType: z.enum([
    "printed or e-voucher accepted",
    "printed",
    "e-voucher accepted",
  ]),
  maxPax: z
    .number({ message: "Max pax is required." })
    .positive("Max pax must be a positive number."),
  meetingPoint: meetingPointSchema,
  endPoint: endPointSchema.optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).min(1, "At least one image is required."),
  priceModel: z.enum(["fixed"]),
  currency: z.enum(["USD", "EUR", "GBP", "INR"]),
  b2bRate: z.number({ message: "B2B rate is required." }),
  b2bExtraHourSupplement: z.number(),
  // Apply .default() to optional numbers to ensure their type is `number` not `number | undefined`
  b2cRate: z.number(),
  b2cExtraHourSupplement: z.number(),
  closedDates: z.array(z.date()).optional(),
  holidayDates: z.array(z.date()).optional(),
  // Also apply .default() here
  publicHolidaySupplementPercent: z.number(),
  weekendSupplementPercent: z.number(),
  availability: availabilitySchema,
  cancellationTerms: z
    .array(z.string())
    .min(1, "At least one cancellation term is required."),
  realease: z.string().optional(), // Correctly optional string
  isB2B: z.boolean(),
  isB2C: z.boolean(),
  overridePriceFromContract: z.boolean(),
  isBookingPerProduct: z.boolean(), // Correctly included
});

export type ProductFormValues = z.infer<typeof productSchema>;
