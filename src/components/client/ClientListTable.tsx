import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../common/DataTable";
import useSWR from "swr";
import api from "@/lib/axios";
import { ClientProfile } from "@/types/client";
import { usePaginationControl } from "@/hooks/usePaginationControl";

const ClientListTable = () => {
  const [pagination, setPagination] = usePaginationControl({
    pageIndex: 0,
    pageSize: 15,
  });
  const columns: ColumnDef<ClientProfile>[] = [
    {
      accessorKey: "userId.name",
      header: "Name",
      cell: (info) => {
        return (
          <div className="capitalize">{info.row.original.userId.name}</div>
        );
      },
    },
    {
      accessorKey: "companyInformation.name",
      header: "Company Name",
      cell: (info) => {
        return info.row.original.companyInformation.name;
      },
    },
    {
      accessorKey: "companyInformation.country",
      header: "Country",
      cell: (info) => {
        return info.row.original.companyInformation.country;
      },
    },
    {
      accessorKey: "city",
      header: "City",
      cell: (info) => {
        return info.row.original.companyInformation.city;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        return info.row.original.status ? "Active" : "Inactive";
      },
    },
  ];

  const { data, isLoading } = useSWR(
    `/clients?$page=${pagination.pageIndex}&limit=${pagination.pageSize}`,
    async (url) => {
      const { data } = await api.get<{ data: ClientProfile[] }>(url);
      return data.data;
    },
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <div>
      <DataTable
        columns={columns}
        data={data || []}
        isLoading={isLoading}
        pagination={pagination}
        onPaginationChange={setPagination}
        // TODO: change later
        pageCount={1}
      />
    </div>
  );
};

export default ClientListTable;
