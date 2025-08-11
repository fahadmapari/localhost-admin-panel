import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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

const chartConfig = {
  clients: {
    label: "Clients",
  },
  offline: {
    label: "Offline",
    color: "var(--chart-1)",
  },
  website: {
    label: "Website",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface Props {
  totalClients: number;
  totalOnboardedClients: number;
}

function ClientOnboardingDistribution({
  totalClients,
  totalOnboardedClients,
}: Props) {
  const chartData = React.useMemo(
    () => [
      {
        portal: "offline",
        clients: totalClients - totalOnboardedClients,
        fill: "var(--color-offline)",
      },
      {
        portal: "website",
        clients: totalOnboardedClients,
        fill: "var(--color-website)",
      },
    ],
    [totalClients, totalOnboardedClients]
  );
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Clients Onboarded from Website vs Offline</CardTitle>
        <CardDescription>
          Total clients onboarded from website vs offline
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="clients"
              nameKey="portal"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalClients.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Clients
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ClientOnboardingDistribution;
