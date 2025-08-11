import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import dayjs from "dayjs";

const chartConfig = {
  clients: {
    label: "Clients",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface Props {
  clientsOnboardLast12Months: { createdAt: string }[];
}

function ClientOnboardedLineChart({ clientsOnboardLast12Months }: Props) {
  const chartData = useMemo(() => {
    const last12Months: Record<string, number> = {};

    for (let i = 11; i >= 0; i--) {
      const monthName = dayjs().subtract(i, "month").format("MMMM");
      last12Months[monthName] = 0;
    }

    for (const client of clientsOnboardLast12Months) {
      const monthName = dayjs(client.createdAt).format("MMMM");
      last12Months[monthName] += 1;
    }

    const last12MonthsData = Object.entries(last12Months).map(
      ([key, value]) => {
        return { month: key, clients: value };
      }
    );

    return last12MonthsData;
  }, [clientsOnboardLast12Months]);
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Clients Onboarded in Last 12 Months</CardTitle>
        <CardDescription>
          {dayjs().subtract(11, "months").format("MMM")} -{" "}
          {dayjs().format("MMM")} {dayjs().format("YYYY")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              axisLine={false}
              allowDecimals={false}
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="clients"
              type="natural"
              stroke="var(--color-clients)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ClientOnboardedLineChart;
