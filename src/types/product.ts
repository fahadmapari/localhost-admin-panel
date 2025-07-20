interface MeetingPoint {
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  text: string;
  pickupInstructions: string[];
  _id: string;
}

interface EndPoint {
  text: string;
  _id: string;
}

interface Duration {
  value: number;
  unit: string;
}

interface Availability {
  duration: Duration;
  startTime: string;
  endTime: string;
  _id: string;
}

export interface TourProduct {
  _id: string;
  title: string;
  serviceType: string;
  tourType: string;
  activityType: string;
  subType: string;
  description: string;
  willSee: string[];
  willLearn: string[];
  tourTextLanguage: string;
  bookingType: string;
  tourGuideLanguageInstant: string[];
  tourGuideLanguageOnRequest: string[];
  mandatoryInformation: string[];
  recommdendedInformation: string[];
  included: string[];
  excluded: string[];
  activitySuitableFor: string;
  voucherType: string;
  maxPax: number;
  meetingPoint: MeetingPoint;
  endPoint: EndPoint;
  tags: string[];
  images: string[];
  priceModel: string;
  currency: string;
  b2bRateInstant: number;
  b2bExtraHourSupplementInsant: number;
  b2bRateOnRequest: number;
  b2bExtraHourSupplementOnRequest: number;
  b2cRateInstant: number;
  b2cExtraHourSupplementInstant: number;
  b2cRateOnRequest: number;
  b2cExtraHourSupplementOnRequest: number;
  closedDates: string[];
  holidayDates: string[];
  publicHolidaySupplementPercent: number;
  weekendSupplementPercent: number;
  availability: Availability;
  cancellationTerms: string[];
  realease: string;
  isB2B: boolean;
  isB2C: boolean;
  overridePriceFromContract: boolean;
  isBookingPerProduct: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
