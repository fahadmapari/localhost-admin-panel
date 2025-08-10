import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ClientMetrics = () => {
  return (
    <div className="p-4">
      <Card className="flex-1">
        <CardHeader>
          <CardDescription>Total Clients Registered</CardDescription>
          <CardTitle className="text-4xl font-semibold">200+</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ClientMetrics;
