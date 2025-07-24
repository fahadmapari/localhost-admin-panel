import ProductsCountCards from "@/components/dashboard/product/ProductsCountCards";
import ProductUploadBarChart from "@/components/dashboard/product/ProductUploadBarChart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/axios";
import useSWR from "swr";

interface ProductMetricsState {
  totalInstantProductsCount: number;
  totalOnRequestProductsCount: number;
  totalUniqueProductCount: number;
  totalProductsCount: number;
  last12MonthProducts: { createdAt: string }[];
}

const ProductMetrics = () => {
  const { data, error, isLoading } = useSWR(
    "/products/metrics",
    async (url) => {
      const { data } = await api.get<{ data: ProductMetricsState }>(url);
      return data.data;
    },
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  );

  return (
    <div className="p-4 h-full flex flex-col">
      <h1 className="text-3xl font-semibold pb-4">Product Metrics</h1>
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="space-y-6">
          {isLoading ? (
            <>
              <div className="flex gap-4 items-center">
                <Skeleton className="flex-1 h-[116px]" />
                <Skeleton className="flex-1 h-[116px]" />
                <Skeleton className="flex-1 h-[116px]" />
                <Skeleton className="flex-1 h-[116px]" />
              </div>

              <div className="flex gap-4 items-center">
                <Skeleton className="flex-1 h-[300px]" />
                <Skeleton className="flex-1 h-[300px]" />
              </div>
            </>
          ) : (
            <>
              <ProductsCountCards
                totalInstantProductsCount={data?.totalInstantProductsCount}
                totalOnRequestProductsCount={data?.totalOnRequestProductsCount}
                totalProductsCount={data?.totalProductsCount}
                totalUniqueProductCount={data?.totalUniqueProductCount}
              />
              <ProductUploadBarChart
                last12MonthsProducts={data?.last12MonthProducts || []}
              />
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProductMetrics;
