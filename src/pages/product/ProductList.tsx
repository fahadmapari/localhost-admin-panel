import { DataTable } from "@/components/common/DataTable";
import { Loader } from "@/components/ui/loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePaginationControl } from "@/hooks/usePaginationControl";
import api from "@/lib/axios";
import { TourListType } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import useSWR from "swr";

interface ProductType {
  products: TourListType[];
  totalProducts: number;
}

const List = () => {
  const [pagination, setPagination] = usePaginationControl();
  const columns: ColumnDef<TourListType>[] = [
    {
      accessorKey: "id",
      header: "Sr. No.",
      cell: (info) => {
        const { pageIndex, pageSize } = info.table.getState().pagination;
        return pageIndex * pageSize + info.row.index + 1;
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
    `/products?page=${pagination.pageIndex}&limit=${pagination.pageSize}`,
    async (url): Promise<ProductType> => {
      const { data } = await api.get(url);
      console.log(data?.data?.productsData);
      return data?.data?.productsData;
    },
    {
      revalidateOnFocus: false,
    }
  );

  const totalProductCount = useMemo(
    () => data?.totalProducts,
    [data?.totalProducts]
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
            {isLoading && !totalProductCount ? (
              <Loader type="dots" size="sm" />
            ) : (
              totalProductCount
            )}
          </span>
        </div>
      </div>
      <ScrollArea className="flex-1 overflow-y-hidden">
        <DataTable
          columns={columns}
          data={data?.products || []}
          isLoading={isLoading}
          pagination={pagination}
          onPaginationChange={setPagination}
          pageCount={Math.ceil((totalProductCount || 0) / pagination.pageSize)}
        />
      </ScrollArea>
    </div>
  );
};

export default List;
