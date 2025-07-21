import { DataTable } from "@/components/common/DataTable";
import { Loader } from "@/components/ui/loader";
import api from "@/lib/axios";
import { TourProduct } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import useSWR from "swr";

interface ProductType {
  products: TourProduct[];
  totalProducts: number;
}

const List = () => {
  const columns: ColumnDef<TourProduct>[] = [
    {
      accessorKey: "id",
      header: "Sr. No.",
      cell: (info) => {
        return info.row.index + 1;
      },
    },
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

  const { data, error, isLoading } = useSWR(
    "/products",
    async (url): Promise<ProductType> => {
      const { data } = await api.get(url);
      console.log(data.data);
      return data?.data?.products;
    }
  );

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold pb-4">Product List</h1>
        <div className="flex gap-2 items-center text-sm">
          <span>Total Products: </span>
          <span className="font-medium">
            {isLoading ? <Loader type="dots" size="sm" /> : data?.totalProducts}
          </span>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data?.products || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default List;
