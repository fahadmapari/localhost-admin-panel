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
import dayjs from "dayjs";

const chartConfig = {
  products: {
    label: "Products",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface ProductUploadBarChartProps {
  last12MonthsProducts: { createdAt: string }[];
}

const buildWeeklyData = (data: { createdAt: string }[]) => {
  const weeklyData: Record<string, number> = {};

  for (let i = 7; i >= 0; i--) {
    const monthName = dayjs().subtract(i, "day").format("dddd");
    weeklyData[monthName] = 0;
  }

  for (const product of data) {
    const day = dayjs(product.createdAt).format("dddd");
    weeklyData[day] += 1;
  }

  const weeklyDataArray = Object.entries(weeklyData).map(([key, value]) => {
    return { day: key, products: value };
  });

  return weeklyDataArray;
};

const buildMonthlyData = (data: { createdAt: string }[]) => {
  const last12Months: Record<string, number> = {};

  for (let i = 11; i >= 0; i--) {
    const monthName = dayjs().subtract(i, "month").format("MMMM");
    last12Months[monthName] = 0;
  }

  for (const product of data) {
    const monthName = dayjs(product.createdAt).format("MMMM");
    last12Months[monthName] += 1;
  }

  const last12MonthsData = Object.entries(last12Months).map(([key, value]) => {
    return { day: key, products: value };
  });

  return last12MonthsData;
};

const ProductUploadBarChart = ({
  last12MonthsProducts,
}: ProductUploadBarChartProps) => {
  const weeklyData = buildWeeklyData(last12MonthsProducts);
  const monthlyData = buildMonthlyData(last12MonthsProducts);
  return (
    <div className="flex gap-4">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Weekly Uploaded Unique Products</CardTitle>
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
          <CardTitle>Monthly Uploaded Unique Products</CardTitle>
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
                radius={5}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductUploadBarChart;
