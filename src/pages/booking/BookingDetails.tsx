import api from "@/lib/axios";
import { Booking } from "@/types/booking";
import { ClientProfile } from "@/types/client";
import { TourListType } from "@/types/product";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import useSWR from "swr";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import InfoField from "@/components/booking/InfoField";
import OrderItemOperations from "@/components/booking/OrderItemOperations";
import ItineraryUpload from "@/components/booking/ItineraryUpload";
import GuideAssignments from "@/components/booking/GuideAssignments";
import ProductRemarksDialog from "@/components/booking/ProductRemarksDialog";
import dayjs from "dayjs";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const BookingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [remarksOpenFor, setRemarksOpenFor] = useState<{
    productId: string;
    productTitle: string;
  } | null>(null);

  const { data, error, isLoading, mutate } = useSWR(
    id ? `/bookings/${id}` : null,
    async (url) => {
      const { data } = await api.get<{ data: Booking }>(url);
      return data.data;
    },
    { revalidateOnFocus: false }
  );

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Link
            to="/bookings"
            className="text-sm text-primary inline-flex items-center gap-1 hover:underline"
          >
            <ArrowLeft className="size-4" /> Back to Bookings
          </Link>
        </div>
        <Card className="p-6 text-center text-muted-foreground">
          Booking not found.
        </Card>
      </div>
    );
  }

  const client =
    typeof data.clientId === "object" ? (data.clientId as ClientProfile) : null;

  return (
    <div className="h-full p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground mb-1">
            <Link to="/bookings" className="hover:underline">
              Bookings
            </Link>{" "}
            &nbsp;|&nbsp; Booking Details
          </div>
          <h3 className="text-3xl font-semibold">Booking Details</h3>
        </div>
        <Link
          to="/bookings"
          className="text-sm text-primary inline-flex items-center gap-1 hover:underline"
        >
          <ArrowLeft className="size-4" /> Back to Bookings
        </Link>
      </div>

      <ScrollArea className="flex-1 overflow-hidden">
        <div className="flex flex-col gap-4">
          <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoField label="Booking Reference">{data.bookingRef}</InfoField>
          <InfoField label="Lead Passenger Name">
            <span className="capitalize">
              {data.leadFirstName} {data.leadLastName}
            </span>
          </InfoField>
          <InfoField label="Lead Passenger Email">{data.leadEmail}</InfoField>
          <InfoField label="Lead Passenger Mobile">
            {data.leadMobile?.countryCode} {data.leadMobile?.number}
          </InfoField>

          <InfoField label="Client Name" className="md:col-span-2">
            {client ? (
              <span className="capitalize">
                {client.companyInformation?.name} — {client.firstName}{" "}
                {client.lastName}
              </span>
            ) : null}
          </InfoField>
          <InfoField label="Agency Reference">{data.agencyRef}</InfoField>
          <InfoField label="Booked From">
            <span className="capitalize">{data.bookedFrom}</span>
          </InfoField>

          <InfoField label="Booking Remarks" className="md:col-span-4">
            <div className="whitespace-pre-wrap text-sm">
              {data.comments || (
                <span className="text-muted-foreground">n.a.</span>
              )}
            </div>
          </InfoField>

          <InfoField label="Status">
            <Badge className="capitalize">{data.status}</Badge>
          </InfoField>
          <InfoField label="Payment Status">
            <Badge variant="secondary" className="capitalize">
              {data.paymentStatus}
            </Badge>
          </InfoField>
          <InfoField label="Discount Code">{data.discountCode}</InfoField>
          <InfoField label="Total Price">
            <span className="text-xl font-bold">
              {data.totalPrice?.toFixed(2)} EUR
            </span>
          </InfoField>

          <InfoField label="Booked On">
            {data.createdAt
              ? dayjs(data.createdAt).format("ddd DD MMM YYYY HH:mm")
              : null}
          </InfoField>

          <div className="md:col-span-4 pt-2 border-t border-border">
            <div className="text-xs text-muted-foreground mb-2">
              Tour Itinerary (Client)
            </div>
            <ItineraryUpload
              label="Client Itinerary"
              file={data.clientItinerary}
              uploadUrl={`/bookings/${data._id}/itinerary/client`}
              deleteUrl={`/bookings/${data._id}/itinerary/client`}
              onUpdated={() => mutate()}
            />
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-4">
        <h4 className="text-xl font-semibold">Order Items</h4>
        {data.orderItems.map((item, idx) => {
          const product =
            typeof item.productId === "object"
              ? (item.productId as TourListType)
              : null;
          const productCode = product?.productCode;
          const subtotal = (item.price || 0) * (item.quantity || 0);

          return (
            <Card
              key={`${item.productTitle}-${idx}`}
              className="p-6 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="text-base font-medium">
                  {productCode ? `Product Code: ${productCode} • ` : ""}
                  {item.productTitle}
                </div>
                {typeof item.productId === "string" ||
                (typeof item.productId === "object" &&
                  item.productId !== null) ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setRemarksOpenFor({
                        productId:
                          typeof item.productId === "object"
                            ? (item.productId as { _id: string })._id
                            : (item.productId as string),
                        productTitle: item.productTitle,
                      })
                    }
                  >
                    <MessageSquare />
                    Product Remarks
                  </Button>
                ) : null}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <InfoField label="Title">{item.productTitle}</InfoField>
                <InfoField label="Confirmation Type">
                  <span className="capitalize">
                    {product?.bookingType === "instant"
                      ? "Instant"
                      : product?.bookingType === "request"
                        ? "On Request"
                        : "-"}
                  </span>
                </InfoField>
                <InfoField label="Service Date">
                  {item.date
                    ? dayjs(item.date).format("ddd DD MMM YYYY")
                    : null}
                </InfoField>
                <InfoField label="Start Time">{item.startTime}</InfoField>

                <InfoField label="No Of Passengers">{item.paxCount}</InfoField>
                <InfoField label="Quantity">{item.quantity}</InfoField>
                <InfoField label="Duration (Hrs)">{item.duration}</InfoField>
                <InfoField label="Price (per unit)">
                  {item.price?.toFixed(2)} EUR
                </InfoField>

                <InfoField label="Start Point" className="md:col-span-2">
                  {item.meetingPoint}
                </InfoField>
                <InfoField label="End Point" className="md:col-span-2">
                  {item.endPoint}
                </InfoField>

                <InfoField label="Subtotal">
                  <span className="font-bold">{subtotal.toFixed(2)} EUR</span>
                </InfoField>
                {item.details ? (
                  <InfoField label="Details" className="md:col-span-3">
                    <div className="whitespace-pre-wrap">{item.details}</div>
                  </InfoField>
                ) : null}
              </div>

              <GuideAssignments
                bookingId={data._id}
                itemIdx={idx}
                assignments={item.guideAssignments || []}
                onUpdated={() => mutate()}
              />

              <div className="pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground mb-2">
                  Final Itinerary For Guide
                </div>
                <ItineraryUpload
                  label="Guide Itinerary"
                  file={item.guideItinerary}
                  uploadUrl={`/bookings/${data._id}/order-items/${idx}/itinerary/guide`}
                  deleteUrl={`/bookings/${data._id}/order-items/${idx}/itinerary/guide`}
                  onUpdated={() => mutate()}
                />
              </div>

              <OrderItemOperations
                bookingId={data._id}
                itemIdx={idx}
                operations={item.operations}
                onUpdated={() => mutate()}
              />
            </Card>
          );
        })}
      </div>
        </div>
      </ScrollArea>

      {remarksOpenFor ? (
        <ProductRemarksDialog
          open={!!remarksOpenFor}
          onOpenChange={(open) => {
            if (!open) setRemarksOpenFor(null);
          }}
          productId={remarksOpenFor.productId}
          productTitle={remarksOpenFor.productTitle}
        />
      ) : null}
    </div>
  );
};

export default BookingDetails;
