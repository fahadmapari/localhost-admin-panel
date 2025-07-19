import { DataTable } from "@/components/common/DataTable";
import api from "@/lib/axios";
import useSWR from "swr";

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

  const { data, error, isLoading } = useSWR("/products", async (url) => {
    const { data } = await api.get(url);
    return data?.data;
  });

  console.log(data);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold pb-4">Product List</h1>
      <DataTable columns={columns} data={[]} />
    </div>
  );
};

export default List;
