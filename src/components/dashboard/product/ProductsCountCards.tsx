import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProductMetricsProps {
  totalInstantProductsCount?: number;
  totalOnRequestProductsCount?: number;
  totalUniqueProductCount?: number;
  totalProductsCount?: number;
}

const formatter = new Intl.NumberFormat("en", {
  notation: "compact",
  compactDisplay: "short",
});

const ProductsCountCards = ({
  totalInstantProductsCount,
  totalOnRequestProductsCount,
  totalProductsCount,
  totalUniqueProductCount,
}: ProductMetricsProps) => {
  return (
    <div className="flex gap-4">
      <Card className="flex-1">
        <CardHeader>
          <CardDescription>Total Unique Products</CardDescription>
          <CardTitle className="text-4xl font-semibold">
            {totalUniqueProductCount
              ? formatter.format(totalUniqueProductCount)
              : "-"}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="flex-1">
        <CardHeader>
          <CardDescription>Total Products</CardDescription>
          <CardTitle className="text-4xl font-semibold">
            {totalProductsCount ? formatter.format(totalProductsCount) : "-"}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="flex-1">
        <CardHeader>
          <CardDescription>Total Instant Products </CardDescription>
          <CardTitle className="text-4xl font-semibold">
            {totalInstantProductsCount
              ? formatter.format(totalInstantProductsCount)
              : "-"}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="flex-1">
        <CardHeader>
          <CardDescription>Total On Request Products</CardDescription>
          <CardTitle className="text-4xl font-semibold">
            {totalOnRequestProductsCount
              ? formatter.format(totalOnRequestProductsCount)
              : "-"}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ProductsCountCards;
