import { ClientProfile } from "./client";
import { TourListType } from "./product";
import { SupplierSearchResult } from "./supplier";

export interface AdminUserRef {
  _id: string;
  name: string;
  email: string;
}

export interface ItineraryFile {
  key: string;
  filename: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  uploadedBy?: AdminUserRef | string | null;
}

export interface BookingOrderItemOperations {
  internalComment?: string;
  accountingComment?: string;
  transportDetails?: string;
  supplierRemark?: string;
  finalDetailsToProvider?: boolean;
  finalDetailsByEmail?: boolean;
  finalDetailsToClient?: boolean;
  controlCallPicId?: AdminUserRef | string | null;
  picId?: AdminUserRef | string | null;
}

export interface BookingOrderItem {
  productId: string | TourListType;
  productTitle: string;
  quantity: number;
  price: number;
  paxCount: number;
  meetingPoint: string;
  endPoint: string;
  startTime: string;
  duration: number;
  details?: string;
  date: string;
  operations?: BookingOrderItemOperations;
  guideItinerary?: ItineraryFile | null;
  guideAssignments?: GuideAssignment[];
}

export type GuideAssignmentStatus =
  | "invited"
  | "confirmed"
  | "declined"
  | "completed";

export interface GuideAssignment {
  _id: string;
  supplierId: SupplierSearchResult | string;
  status: GuideAssignmentStatus;
  notes?: string;
  assignedAt: string;
  respondedAt?: string;
  assignedBy?: AdminUserRef | string | null;
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export type PaymentStatus = "unpaid" | "paid" | "partiallyPaid";

export interface Booking {
  _id: string;
  bookingRef: string;
  clientId: ClientProfile | string;
  leadFirstName: string;
  leadLastName: string;
  leadEmail: string;
  leadMobile: {
    countryCode: string;
    number: string;
  };
  agencyRef?: string;
  comments?: string;
  orderItems: BookingOrderItem[];
  discountCode?: string;
  totalPrice: number;
  status: BookingStatus;
  bookedFrom: "website" | "admin";
  bookedBy?: { _id: string; name: string; email: string } | string;
  paymentStatus: PaymentStatus;
  clientItinerary?: ItineraryFile | null;
  createdAt: string;
  updatedAt: string;
}

export interface BookingsListResponse {
  bookings: Booking[];
  total: number;
}
