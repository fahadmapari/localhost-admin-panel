import ProductionCreationForm from "@/components/product/ProductionCreationForm";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/axios";
import { CLOUD_FRONT_URL } from "@/lib/constants";
import { TourListType } from "@/types/product";
import { useParams } from "react-router";
import useSWR from "swr";

interface InitialProductState {
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
}

const ProductEdit = () => {
  const { id } = useParams();

  const { data, isLoading } = useSWR(`/products/edit/${id}`, async (url) => {
    const { data } = await api.get<{ data: TourListType }>(url);
    const product = data.data;

    const productData = {
      title: product.baseProduct.title,
      serviceType: product.baseProduct.serviceType,
      tourType: product.baseProduct.tourType,
      activityType: product.baseProduct.activityType,
      subType: product.baseProduct.subType,
      description: product.baseProduct.description,
      willSee: product.baseProduct.willSee,
      willLearn: product.baseProduct.willLearn,
      tourTextLanguage: product.baseProduct.tourTextLanguage,
      bookingType: product.bookingType,
      tourGuideLanguageInstant: product.baseProduct.tourGuideLanguageInstant,
      tourGuideLanguageOnRequest:
        product.baseProduct.tourGuideLanguageOnRequest,
      mandatoryInformation: product.baseProduct.mandatoryInformation,
      recommdendedInformation: product.baseProduct.recommdendedInformation,
      included: product.baseProduct.included,
      excluded: product.baseProduct.excluded,
      activitySuitableFor: product.baseProduct.activitySuitableFor,
      voucherType: product.baseProduct.voucherType,
      maxPax: product.baseProduct.maxPax,
      meetingPoint: {
        country: product.baseProduct.meetingPoint.country,
        city: product.baseProduct.meetingPoint.city,
        latitude: product.baseProduct.meetingPoint.latitude,
        longitude: product.baseProduct.meetingPoint.longitude,
        text: product.baseProduct.meetingPoint.text,
        pickupInstructions: product.baseProduct.meetingPoint.pickupInstructions,
      },
      endPoint: {
        latitude: undefined,
        longitude: undefined,
        text: product.baseProduct.endPoint.text,
      },
      tags: product.baseProduct.tags,
      images: product.baseProduct.images.map((img) => CLOUD_FRONT_URL + img),
      priceModel: product.priceModel,
      currency: product.currency,
      b2bRateInstant: product.b2bRateInstant,
      b2bExtraHourSupplementInsant: product.b2bExtraHourSupplementInsant,
      b2bRateOnRequest: product.b2bRateOnRequest,
      b2bExtraHourSupplementOnRequest: product.b2bExtraHourSupplementOnRequest,
      b2cRateInstant: product.b2cRateInstant,
      b2cExtraHourSupplementInstant: product.b2cExtraHourSupplementInstant,
      b2cRateOnRequest: product.b2cRateOnRequest,
      b2cExtraHourSupplementOnRequest: product.b2cExtraHourSupplementOnRequest,
      closedDates: product.baseProduct.closedDates.map(
        (date) => new Date(date)
      ),
      holidayDates: product.baseProduct.holidayDates.map(
        (date) => new Date(date)
      ),
      publicHolidaySupplementPercent: product.publicHolidaySupplementPercent,
      weekendSupplementPercent: product.weekendSupplementPercent,
      availability: {
        startTime: product.baseProduct.availability.startTime,
        endTime: product.baseProduct.availability.endTime,
        duration: {
          value: product.baseProduct.availability.duration.value,
          unit: product.baseProduct.availability.duration.unit,
        },
      },
      cancellationTerms: product.baseProduct.cancellationTerms,
      realease: product.baseProduct.realease,
      isB2B: product.isB2B,
      isB2C: product.isB2C,
      overridePriceFromContract: product.overridePriceFromContract,
      isBookingPerProduct: product.isBookingPerProduct,
      tourGuideLanguage: product.tourGuideLanguage,
    };

    return productData as InitialProductState;
  });

  return (
    <div className="h-full p-4">
      {isLoading ? (
        <Skeleton className="h-full" />
      ) : (
        <ProductionCreationForm product={data} isEdit={true} />
      )}
    </div>
  );
};

export default ProductEdit;
