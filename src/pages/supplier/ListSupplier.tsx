import { DataTable } from "@/components/common/DataTable";
import PageHeading from "@/components/common/PageHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePaginationControl } from "@/hooks/usePaginationControl";
import api from "@/lib/axios";
import {
  SupplierRecord,
  SuppliersListResponse,
  SupplierStatus,
} from "@/types/supplier";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import useSWR from "swr";

const statusVariant: Record<
  SupplierStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  Active: "default",
  Inactive: "secondary",
  Pending: "outline",
  Suspended: "destructive",
};

const ListSupplier = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = usePaginationControl({
    pageIndex: 0,
    pageSize: 15,
  });

  const { data, isLoading } = useSWR(
    `/suppliers?page=${pagination.pageIndex}&limit=${pagination.pageSize}`,
    async (url) => {
      const { data } = await api.get<{ data: SuppliersListResponse }>(url);
      return data.data;
    },
    { revalidateOnFocus: false }
  );

  const columns: ColumnDef<SupplierRecord>[] = [
    {
      accessorKey: "personalInfo.firstName",
      header: "Name",
      cell: (info) => {
        const s = info.row.original;
        return (
          <span className="capitalize">
            {s.personalInfo.firstName} {s.personalInfo.lastName}
          </span>
        );
      },
    },
    {
      accessorKey: "contact.email",
      header: "Email",
      cell: (info) => info.row.original.contact?.email,
    },
    {
      accessorKey: "contact.mobile",
      header: "Mobile",
      cell: (info) => {
        const m = info.row.original.contact?.mobile;
        if (!m?.number) return "-";
        return `${m.code || ""} ${m.number}`.trim();
      },
    },
    {
      accessorKey: "contract.serviceType",
      header: "Service Type",
      cell: (info) => info.row.original.contract?.serviceType || "-",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (
        <Badge
          variant={statusVariant[info.row.original.status] || "secondary"}
        >
          {info.row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Registered",
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
    <div className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <PageHeading label="Suppliers" />
        <Button onClick={() => navigate("/supplier/create")}>
          <Plus />
          Register Supplier
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data?.suppliers || []}
        isLoading={isLoading}
        pagination={pagination}
        onPaginationChange={setPagination}
        pageCount={pageCount}
        onRowClick={(row) => navigate(`/supplier/${row._id}`)}
      />
    </div>
  );
};

export default ListSupplier;
