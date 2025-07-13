import { z } from "zod";
import languages from "../assets/json/languages.v1.json";

// --- Sub-schemas remain the same ---
const meetingPointSchema = z.object({
  country: z.string({ message: "Country is required." }),
  city: z.string({ message: "City is required." }),
  latitude: z
    .number("Latitude is required.")
    .min(-90, { error: "Latitude must be greater than or equal to -90" })
    .max(90, { error: "Latitude must be less than or equal to 90" }),
  longitude: z
    .number("Longitude is required.")
    .min(-180, { error: "Longitude must be greater than or equal to -180" })
    .max(180, { error: "Longitude must be less than or equal to 180" }),
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
    value: z.number("Duration value is required."),
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
  tourTextLanguage: z.enum(["english"]),
  bookingType: z.enum(["instant", "request"]),
  tourGuideLanguageInstant: z
    .array(z.enum([...Object.values(languages)]))
    .min(1, "At least one 'tour guide language' item is required."),
  tourGuideLanguageOnRequest: z
    .array(z.enum([...Object.values(languages)]))
    .optional(),
  mandatoryInformation: z
    .array(z.string())
    .min(1, "At least one mandatory information is required."),
  recommdendedInformation: z
    .array(z.string())
    .min(1, "At least one recommended information is required."),
  included: z
    .array(z.string())
    .min(1, "At least one included item is required."),
  excluded: z
    .array(z.string())
    .min(1, "At least one excluded item is required."),
  activitySuitableFor: z.enum(["all", "adults", "children"]),
  voucherType: z.enum([
    "printed or e-voucher accepted",
    "printed",
    "e-voucher accepted",
  ]),
  maxPax: z
    .number("Max pax is required.")
    .positive("Max pax must be a positive number."),
  meetingPoint: meetingPointSchema,
  endPoint: endPointSchema.optional(),
  tags: z
    .array(
      z.enum([
        "walk",
        "museum",
        "palace",
        "science",
        "technology",
        "beer",
        "christmas",
      ])
    )
    .min(1, "At least one tag is required."),
  images: z
    .array(
      z
        .file()
        .mime(["image/jpeg", "image/png", "image/webp"], {
          error: "Only JPG, PNG, and WebP images are allowed.",
        })
        .max(1024 * 1024 * 5, "Image size must be less than 5MB.")
    )
    .min(1, "At least one image is required."),
  priceModel: z.enum(["fixed rate", "per pax"]),
  currency: z.enum(["USD", "EUR", "GBP", "INR"]),
  b2bRateInstant: z.number({ message: "B2B rate is required." }),
  b2bExtraHourSupplementInsant: z.number(),
  b2bRateOnRequest: z.number({ message: "B2B rate is required." }),
  b2bExtraHourSupplementOnRequest: z.number(),
  // Apply .default() to optional numbers to ensure their type is `number` not `number | undefined`
  b2cRateInstant: z.number(),
  b2cExtraHourSupplementInstant: z.number(),
  b2cRateOnRequest: z.number(),
  b2cExtraHourSupplementOnRequest: z.number(),
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
