import { DataTable } from "@/components/common/DataTable";
import { Loader } from "@/components/ui/loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/lib/axios";
import { TourListType } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import useSWR from "swr";

interface ProductType {
  products: TourListType[];
  totalProducts: number;
}

const List = () => {
  const columns: ColumnDef<TourListType>[] = [
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
        return info.row.original.baseProduct.title;
      },
    },
    {
      accessorKey: "tourGuideLanguage",
      header: "Language",
    },
    {
      accessorKey: "baseProduct.meetingPoint.country",
      header: "Country",
    },
    {
      accessorKey: "baseProduct.meetingPoint.city",
      header: "City",
    },
  ];

  const { data, error, isLoading } = useSWR(
    "/products",
    async (url): Promise<ProductType> => {
      const { data } = await api.get(url);
      console.log(data?.data?.productsData);
      return data?.data?.productsData;
    }
  );

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold pb-4">Product List</h1>
        <div className="flex gap-2 items-center text-sm">
          <span>Total Products: </span>
          <span className="font-medium">
            {isLoading ? <Loader type="dots" size="sm" /> : data?.totalProducts}
          </span>
        </div>
      </div>
      <ScrollArea className="flex-1 overflow-y-hidden">
        <DataTable
          columns={columns}
          data={data?.products || []}
          isLoading={isLoading}
        />
      </ScrollArea>
    </div>
  );
};

export default List;
