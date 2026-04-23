import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../common/DataTable";
import useSWR from "swr";
import api from "@/lib/axios";
import { useNavigate } from "react-router";
import { usePaginationControl } from "@/hooks/usePaginationControl";
import { Booking, BookingsListResponse } from "@/types/booking";
import { ClientProfile } from "@/types/client";
import { Badge } from "../ui/badge";
import dayjs from "dayjs";

const statusVariant: Record<
  Booking["status"],
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "secondary",
  confirmed: "default",
  cancelled: "destructive",
  completed: "outline",
};

const paymentVariant: Record<
  Booking["paymentStatus"],
  "default" | "secondary" | "destructive" | "outline"
> = {
  unpaid: "destructive",
  paid: "default",
  partiallyPaid: "secondary",
};

const BookingListTable = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = usePaginationControl({
    pageIndex: 0,
    pageSize: 15,
  });

  const { data, isLoading } = useSWR(
    `/bookings?page=${pagination.pageIndex}&limit=${pagination.pageSize}`,
    async (url) => {
      const { data } = await api.get<{ data: BookingsListResponse }>(url);
      return data.data;
    },
    { revalidateOnFocus: false }
  );

  const columns: ColumnDef<Booking>[] = [
    {
      accessorKey: "bookingRef",
      header: "Reference",
      cell: (info) => (
        <span className="font-medium">{info.row.original.bookingRef}</span>
      ),
    },
    {
      accessorKey: "clientId",
      header: "Client",
      cell: (info) => {
        const client = info.row.original.clientId as ClientProfile | null;
        return (
          <span className="capitalize">
            {client && typeof client === "object"
              ? client.companyInformation?.name
              : "-"}
          </span>
        );
      },
    },
    {
      accessorKey: "leadFirstName",
      header: "Lead Passenger",
      cell: (info) => {
        const b = info.row.original;
        return (
          <span className="capitalize">
            {b.leadFirstName} {b.leadLastName}
          </span>
        );
      },
    },
    {
      accessorKey: "orderItems",
      header: "Items",
      cell: (info) => info.row.original.orderItems?.length || 0,
    },
    {
      accessorKey: "totalPrice",
      header: "Total",
      cell: (info) =>
        `${(info.row.original.totalPrice || 0).toFixed(2)} EUR`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (
        <Badge
          variant={statusVariant[info.row.original.status] || "secondary"}
          className="capitalize"
        >
          {info.row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      cell: (info) => (
        <Badge
          variant={
            paymentVariant[info.row.original.paymentStatus] || "secondary"
          }
          className="capitalize"
        >
          {info.row.original.paymentStatus}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Booked On",
      cell: (info) =>
        info.row.original.createdAt
          ? dayjs(info.row.original.createdAt).format("DD MMM YYYY")
          : "-",
    },
  ];

  const pageCount = data?.total
    ? Math.ceil(data.total / pagination.pageSize)
    : 1;

  return (
    <DataTable
      columns={columns}
      data={data?.bookings || []}
      isLoading={isLoading}
      pagination={pagination}
      onPaginationChange={setPagination}
      pageCount={pageCount}
      onRowClick={(row) => navigate(`/bookings/${row._id}`)}
    />
  );
};

export default BookingListTable;
