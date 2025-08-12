import { DataTable } from "@/components/common/DataTable";
import PageHeading from "@/components/common/PageHeading";
import api from "@/lib/axios";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import useSWR from "swr";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "super amdmin";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const columns: ColumnDef<AdminUser>[] = [
  {
    accessorKey: "_id",
    header: "Sr. No.",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.name}</span>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return row.original.email;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return row.original.role.toUpperCase();
    },
  },
  {
    accessorKey: "createdAt",
    header: "Registered on",
    cell: ({ row }) => {
      return dayjs(row.original.createdAt).format("DD/MM/YYYY");
    },
  },
];

const AdminList = () => {
  const { data: admins } = useSWR("/admins", async (url) => {
    const { data } = await api.get<{
      data: AdminUser[];
    }>(url);
    return data.data;
  });

  return (
    <div className="p-4">
      <div className="pb-4">
        <PageHeading label="Admins" />
      </div>
      <DataTable columns={columns} data={admins || []} />
    </div>
  );
};

export default AdminList;
