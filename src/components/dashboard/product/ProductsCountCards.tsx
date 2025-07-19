import {
  Card,
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
          <CardDescription>Total Products</CardDescription>
          <CardTitle className="text-4xl font-semibold">28950</CardTitle>
        </CardHeader>
      </Card>

      <Card className="flex-1">
        <CardHeader>
          <CardDescription>Total Products</CardDescription>
          <CardTitle className="text-4xl font-semibold">28950</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ProductsCountCards;
