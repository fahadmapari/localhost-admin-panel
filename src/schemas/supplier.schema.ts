import { z } from "zod";

// Personal Information Schema
const personalInfoSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.date(),
  nationality: z.string().min(1, "Nationality is required"),
  familyStatus: z.enum(["Single", "Married", "Divorced", "Widowed"]).optional(),
  birthPlace: z.string().min(1, "Birth place is required"),
  remunerationExpectation: z.number().min(0).optional(),
  availabilityTime: z
    .enum(["Full Time", "Part Time", "Weekends Only", "Flexible"])
    .optional(),
  howDidYouHearAboutUs: z
    .enum(["Social Media", "Website", "Referral", "Advertisement", "Other"])
    .optional(),
  typeOfServicesProvided: z
    .enum([
      "City Tours",
      "Museum Tours",
      "Adventure Tours",
      "Cultural Tours",
      "Multiple",
    ])
    .optional(),
  hobbies: z.array(z.string()).optional(),
  memberOfAssociation: z.enum(["Yes", "No", "Applied"]).optional(),
  associationName: z.string().optional(),
});

// Address Schema
const addressSchema = z.object({
  streetAndNumber: z.string().min(1, "Street and number is required"),
  city: z.string().min(1, "City is required"),
  municipality: z.string().optional(),
  district: z.string().optional(),
  state: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  isPrimary: z.boolean(),
});

// Phone Schema (reusable)
const phoneSchema = z.object({
  code: z.string().optional(),
  number: z.string().optional(),
});

// Contact Schema
const contactSchema = z.object({
  preferredFormOfContact: z.enum(["Email", "Phone", "WhatsApp", "SMS"]),
  email: z.string().email("Please enter a valid email").toLowerCase(),
  alternateEmail: z
    .string()
    .email("Please enter a valid email")
    .toLowerCase()
    .optional(),
  mobile: z.object({
    code: z.string().optional(),
    number: z.string().min(1, "Mobile number is required"),
  }),
  officePhone: phoneSchema.optional(),
  homePhone: phoneSchema.optional(),
  otherPhone: phoneSchema.optional(),
  fax: phoneSchema.optional(),
  whatsapp: z.string().optional(),
  skype: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  socialMedia: z
    .object({
      facebook: z.string().optional(),
      linkedin: z.string().optional(),
      instagram: z.string().optional(),
      twitter: z.string().optional(),
      tiktok: z.string().optional(),
    })
    .optional(),
  profileVideo: z.string().url().optional().or(z.literal("")),
  otherProfile: z.string().url().optional().or(z.literal("")),
  sampleTourVideo: z.string().url().optional().or(z.literal("")),
  review: z.string().url().optional().or(z.literal("")),
});

// Experience Schema
const experienceSchema = z.object({
  shortDescription: z.string().max(1000).optional(),
  aboutYourself: z.string().max(1000).optional(),
  references: z.string().max(500).optional(),
  yearsOfExperience: z.number().min(0).optional(),
  nonFormalEducation: z.string().optional(),
  formalEducation: z.string().optional(),
  professionalCourses: z.array(z.string()).optional(),
  tourType: z
    .enum([
      "Walking Tours",
      "Bus Tours",
      "Bike Tours",
      "Boat Tours",
      "Adventure Tours",
      "Cultural Tours",
    ])
    .optional(),
  tourTopic: z
    .enum([
      "Historical",
      "Cultural",
      "Adventure",
      "Food & Wine",
      "Art & Architecture",
      "Nature",
    ])
    .optional(),
  guidingLocation: z.array(z.string()).optional(),
  guidingLanguages: z.array(z.string()).optional(),
});

// Billing Schema
const billingSchema = z.object({
  bic: z.string().optional(),
  taxNo: z.string().optional(),
  vatNo: z.string().optional(),
  vat: z.string().optional(),
  bankAccountHolder: z.string().optional(),
  iban: z.string().optional(),
  currency: z.string(),
  otherPaymentOptions: z.string().optional(),
  vatType: z
    .enum([
      "I hereby confirm my status as a freelance, self employed tour guide with respect to income tax and social security",
      "I am a small business owner and thus V.A.T. exempt according to European law",
      "Taxable not in Country of Origin, Reverse Charge",
    ])
    .optional(),
});

// Contract Schema
const contractSchema = z.object({
  contractStartDate: z.date(),
  contractEndDate: z.date().optional(),
  serviceType: z.enum(["Guide", "Assistant"]),
});

// Cancellation Terms Schema
const cancellationTermsSchema = z
  .object({
    hours: z
      .object({
        percentage: z.number().optional(),
        days: z.number().optional(),
      })
      .optional(),
    days1: z
      .object({
        percentage: z.number().optional(),
        days: z.number().optional(),
      })
      .optional(),
    days2: z
      .object({
        percentage: z.number().optional(),
        days: z.number().optional(),
      })
      .optional(),
  })
  .optional();

// Location Supplement Schema
const locationSupplementSchema = z
  .object({
    currentLocation: z.string().optional(),
    locationSupplement: z.array(z.string()).optional(),
  })
  .optional();

// Language Supplement Schema
const languageSupplementSchema = z
  .object({
    currentLanguage: z.string().optional(),
    languageSupplement: z.array(z.string()).optional(),
  })
  .optional();

// Documents Schema
const docsSchema = z
  .object({
    identificationNumber: z.string().optional(),
    photoUpload: z.string().optional(),
    cvUpload: z.string().optional(),
    licenced: z.boolean(),
    insured: z.boolean(),
    criminalRecord: z.boolean(),
    confirmed: z.boolean(),
    whisperSystem: z.boolean(),
    vatAmount: z.number().optional(),
    commission: z.boolean(),
  })
  .optional();

// Service Config Schema
const serviceConfigSchema = z
  .object({
    extraHour: z.number().optional(),
    workingDays: z.array(z.string()).optional(),
    workingMonths: z.array(z.string()).optional(),
    workingHoursStartTime: z.string().optional(),
    workingHoursEndTime: z.string().optional(),
    supplementNeeded: z.boolean().optional(),
    meetingPointNotCentralSupplement: z.number().optional(),
    publicTransportSupplementRateInEUR: z.number().optional(),
    paymentAgreement: z.enum(["Pre-Service", "Post-Service"]).optional(),
    callOffTimeInDaysBeforeService: z.number().optional(),
    alsoFax: z.boolean().optional(),
  })
  .optional();

// Amendments Schema
const amendmentsSchema = z
  .object({
    canBeAddedByClicking: z.boolean().optional(),
    buttonFill: z.boolean().optional(),
  })
  .optional();

// Rating Schema
const ratingSchema = z
  .object({
    averageRating: z.number().min(0).max(5),
    totalReviews: z.number(),
  })
  .optional();

// Main Supplier Schema
export const supplierSchema = z.object({
  personalInfo: personalInfoSchema,
  address: addressSchema,
  contact: contactSchema,
  experience: experienceSchema.optional(),
  billing: billingSchema.optional(),
  contract: contractSchema,
  cancellationTerms: cancellationTermsSchema,
  locationSupplement: locationSupplementSchema,
  languageSupplement: languageSupplementSchema,
  docs: docsSchema,
  serviceConfig: serviceConfigSchema,
  amendments: amendmentsSchema,
  rating: ratingSchema,
  comments: z.string().optional(),
  autoBookings: z.boolean(),
  employee: z.boolean(),
  status: z.enum(["Active", "Inactive", "Pending", "Suspended"]),
  createdBy: z.string().optional(), // ObjectId as string
  updatedBy: z.string().optional(), // ObjectId as string
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Export type inference
export type Supplier = z.infer<typeof supplierSchema>;

// For partial updates
export const supplierUpdateSchema = supplierSchema.partial();

// For creation (without timestamps)
export const supplierCreateSchema = supplierSchema.omit({
  createdAt: true,
  updatedAt: true,
});

// Default values for React Hook Form
export const supplierDefaultValues: Partial<Supplier> = {
  personalInfo: {
    firstName: "",
    lastName: "",
    gender: "Male",
    dateOfBirth: new Date(),
    nationality: "",
    familyStatus: undefined,
    birthPlace: "",
    remunerationExpectation: undefined,
    availabilityTime: undefined,
    howDidYouHearAboutUs: undefined,
    typeOfServicesProvided: undefined,
    hobbies: [],
    memberOfAssociation: undefined,
    associationName: "",
  },
  address: {
    streetAndNumber: "",
    city: "",
    municipality: "",
    district: "",
    state: "",
    country: "Germany",
    postalCode: "",
    isPrimary: false,
  },
  contact: {
    preferredFormOfContact: "Email",
    email: "",
    alternateEmail: "",
    mobile: {
      code: "",
      number: "",
    },
    officePhone: {
      code: "",
      number: "",
    },
    homePhone: {
      code: "",
      number: "",
    },
    otherPhone: {
      code: "",
      number: "",
    },
    fax: {
      code: "",
      number: "",
    },
    whatsapp: "",
    skype: "",
    website: "",
    socialMedia: {
      facebook: "",
      linkedin: "",
      instagram: "",
      twitter: "",
      tiktok: "",
    },
    profileVideo: "",
    otherProfile: "",
    sampleTourVideo: "",
    review: "",
  },
  experience: {
    shortDescription: "",
    aboutYourself: "",
    references: "",
    yearsOfExperience: undefined,
    nonFormalEducation: "",
    formalEducation: "",
    professionalCourses: [],
    tourType: undefined,
    tourTopic: undefined,
    guidingLocation: [],
    guidingLanguages: [],
  },
  billing: {
    bic: "",
    taxNo: "",
    vatNo: "",
    vat: "",
    bankAccountHolder: "",
    iban: "",
    currency: "EUR",
    otherPaymentOptions: "",
    vatType: undefined,
  },
  contract: {
    contractStartDate: new Date(),
    contractEndDate: undefined,
    serviceType: "Guide",
  },
  cancellationTerms: {
    hours: {
      percentage: undefined,
      days: undefined,
    },
    days1: {
      percentage: undefined,
      days: undefined,
    },
    days2: {
      percentage: undefined,
      days: undefined,
    },
  },
  locationSupplement: {
    currentLocation: "",
    locationSupplement: [],
  },
  languageSupplement: {
    currentLanguage: "",
    languageSupplement: [],
  },
  docs: {
    identificationNumber: "",
    photoUpload: "",
    cvUpload: "",
    licenced: false,
    insured: false,
    criminalRecord: false,
    confirmed: false,
    whisperSystem: false,
    vatAmount: undefined,
    commission: false,
  },
  serviceConfig: {
    extraHour: undefined,
    workingDays: [],
    workingMonths: [],
    workingHoursStartTime: "",
    workingHoursEndTime: "",
    supplementNeeded: false,
    meetingPointNotCentralSupplement: undefined,
    publicTransportSupplementRateInEUR: undefined,
    paymentAgreement: undefined,
    callOffTimeInDaysBeforeService: undefined,
    alsoFax: false,
  },
  amendments: {
    canBeAddedByClicking: false,
    buttonFill: false,
  },
  rating: {
    averageRating: 0,
    totalReviews: 0,
  },
  comments: "",
  autoBookings: false,
  employee: false,
  status: "Pending",
  createdBy: undefined,
  updatedBy: undefined,
};
