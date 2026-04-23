import BookingListTable from "@/components/booking/BookingListTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

const BookingList = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="flex justify-between items-end mb-3">
        <h3 className="text-3xl font-semibold">Bookings</h3>
        <Button onClick={() => navigate("/bookings/create")}>
          <Plus />
          New Booking
        </Button>
      </div>
      <BookingListTable />
    </div>
  );
};

export default BookingList;
