import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const weeklyData = [
  { day: "Monday", products: 186 },
  { day: "Tuesday", products: 305 },
  { day: "Wednesday", products: 237 },
  { day: "Thrusday", products: 73 },
  { day: "Friday", products: 209 },
  { day: "Saturday", products: 214 },
  { day: "Sunday", products: 500 },
];

const monthlyData = [
  { day: "January", products: 186 },
  { day: "February", products: 305 },
  { day: "March", products: 237 },
  { day: "April", products: 73 },
  { day: "May", products: 209 },
  { day: "June", products: 214 },
  { day: "July", products: 500 },
  { day: "August", products: 186 },
  { day: "September", products: 305 },
  { day: "October", products: 237 },
  { day: "November", products: 73 },
  { day: "December", products: 209 },
];

const chartConfig = {
  products: {
    label: "Products",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const ProductUploadBarChart = () => {
  return (
    <div className="flex gap-4">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Weekly Uploaded Products</CardTitle>
          <CardDescription>Last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={weeklyData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey={"products"}
                fill="var(--color-products)"
                radius={8}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Monthly Uploaded Products</CardTitle>
          <CardDescription>Last 12 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={monthlyData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey={"products"}
                fill="var(--color-products)"
                radius={8}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductUploadBarChart;
