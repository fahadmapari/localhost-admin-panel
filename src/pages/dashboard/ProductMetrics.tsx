import ProductsCountCards from "@/components/dashboard/product/ProductsCountCards";
import ProductUploadBarChart from "@/components/dashboard/product/ProductUploadBarChart";
import { ScrollArea } from "@/components/ui/scroll-area";
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
          <ProductsCountCards
            totalInstantProductsCount={data?.totalUniqueProductCount}
            totalOnRequestProductsCount={data?.totalOnRequestProductsCount}
            totalProductsCount={data?.totalProductsCount}
            totalUniqueProductCount={data?.totalUniqueProductCount}
          />
          <ProductUploadBarChart />
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProductMetrics;
