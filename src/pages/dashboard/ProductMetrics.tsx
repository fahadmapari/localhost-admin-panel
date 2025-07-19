import ProductsCountCards from "@/components/dashboard/product/ProductsCountCards";
import ProductUploadBarChart from "@/components/dashboard/product/ProductUploadBarChart";

const ProductMetrics = () => {
  return (
    <div className="p-4 h-full">
      <h1 className="text-3xl font-semibold pb-4">Product Metrics</h1>
      <div className="space-y-6">
        <ProductsCountCards />
        <ProductUploadBarChart />
      </div>
    </div>
  );
};

export default ProductMetrics;
