import { DataTable } from "@/components/common/DataTable";

const List = () => {
  const columns = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "serviceType",
      header: "Service Type",
    },
    {
      accessorKey: "tourType",
      header: "Tour Type",
    },
    {
      accessorKey: "activityType",
      header: "Activity Type",
    },
  ];

  return (
    <div className="p-4">
      <DataTable columns={columns} data={[]} />
    </div>
  );
};

export default List;
