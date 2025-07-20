import { DataTable } from "@/components/common/DataTable";
import api from "@/lib/axios";
import { TourProduct } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import useSWR from "swr";

const List = () => {
  const columns: ColumnDef<TourProduct>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: (info) => {
        return info.row.original.title;
      },
    },
    {
      accessorKey: "meetingPoint.country",
      header: "Country",
    },
    {
      accessorKey: "meetingPoint.city",
      header: "City",
    },
  ];

  const {
    data: products,
    error,
    isLoading,
  } = useSWR("/products", async (url): Promise<TourProduct[]> => {
    const { data } = await api.get(url);
    return data?.data?.products;
  });

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold pb-4">Product List</h1>
      <DataTable
        columns={columns}
        data={products || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default List;
