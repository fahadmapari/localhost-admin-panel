import { DataTable } from "@/components/common/DataTable";
import PageHeading from "@/components/common/PageHeading";
import { ColumnDef } from "@tanstack/react-table";

const ListSupplier = () => {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
  ];

  return (
    <div className="p-4 flex flex-col gap-4">
      <PageHeading label="Suppliers" />

      <DataTable columns={columns} data={[]} />
    </div>
  );
};

export default ListSupplier;
