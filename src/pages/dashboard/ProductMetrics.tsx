import ProductsCountCards from "@/components/dashboard/product/ProductsCountCards";
import ProductUploadBarChart from "@/components/dashboard/product/ProductUploadBarChart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import api from "@/lib/axios";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { RefreshCcw } from "lucide-react";
import useSWR from "swr";

interface ProductMetricsState {
  totalInstantProductsCount: number;
  totalOnRequestProductsCount: number;
  totalUniqueProductCount: number;
  totalProductsCount: number;
  last12MonthProducts: { createdAt: string }[];
  topCountriesAndCities: {
    topCountries: { _id: string; count: number }[];
    topCities: { _id: string; count: number }[];
  }[];
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

  if (error) {
    return <div className="p-4">Something went wrong</div>;
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex justify-between pb-4 items-end">
        <h1 className="text-3xl font-semibold ">Product Metrics</h1>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          Updates Every 1 Hour
          <span>
            <Tooltip>
              <TooltipTrigger className="flex hover:animate-spin hover:text-primary items-center justify-center cursor-pointer">
                <RefreshCcw size={16} />
              </TooltipTrigger>
              <TooltipContent className="text-primary mb-2">
                Force Update (Under Construction)
              </TooltipContent>
            </Tooltip>
          </span>
        </div>
      </div>
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

              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <Skeleton className="flex-1 h-[300px]" />
                  <Skeleton className="flex-1 h-[300px]" />
                </div>
                <div className="flex gap-4 items-center">
                  <Skeleton className="flex-1 h-[300px]" />
                  <Skeleton className="flex-1 h-[300px]" />
                </div>
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
                topCountries={
                  data?.topCountriesAndCities[0]?.topCountries || []
                }
                topCities={data?.topCountriesAndCities[0]?.topCities || []}
              />
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProductMetrics;
