import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProductsCountCards = () => {
  return (
    <div className="flex gap-4">
      <Card className="flex-1">
        <CardHeader>
          <CardDescription>Total Products</CardDescription>
          <CardTitle className="text-4xl font-semibold">28950</CardTitle>
        </CardHeader>
      </Card>

      <Card className="flex-1">
        <CardHeader>
          <CardDescription>Total Instant Products </CardDescription>
          <CardTitle className="text-4xl font-semibold">10000</CardTitle>
        </CardHeader>
      </Card>

      <Card className="flex-1">
        <CardHeader>
          <CardDescription>Total On Request Products</CardDescription>
          <CardTitle className="text-4xl font-semibold">5000</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ProductsCountCards;
