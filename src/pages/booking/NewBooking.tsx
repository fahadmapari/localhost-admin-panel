import BookingForm from "@/components/booking/BookingForm";
import PageHeading from "@/components/common/PageHeading";

const NewBooking = () => {
  return (
    <div className="h-full p-4 flex flex-col">
      <PageHeading label="New Booking" />
      <BookingForm />
    </div>
  );
};

export default NewBooking;
