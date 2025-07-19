import ProductsCountCards from "@/components/dashboard/product/ProductsCountCards";
import ProductUploadBarChart from "@/components/dashboard/product/ProductUploadBarChart";
import { ScrollArea } from "@/components/ui/scroll-area";

const ProductMetrics = () => {
  return (
    <div className="p-4 h-full flex flex-col">
      <h1 className="text-3xl font-semibold pb-4">Product Metrics</h1>
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="space-y-6">
          <ProductsCountCards />
          <ProductUploadBarChart />
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProductMetrics;
