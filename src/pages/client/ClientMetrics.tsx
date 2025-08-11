import ClientOnboardedLineChart from "@/components/dashboard/client/ClientOnboardedLineChart";
import ClientOnboardingDistribution from "@/components/dashboard/client/ClientOnboardingDistribution";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/axios";
import useSWR from "swr";

interface ClientMetrics {
  totalClients: number;
  totalActiveClients: number;
  totalBoardedClients: number;
  clientsOnboardLast12Months: { createdAt: string }[];
}

const ClientMetrics = () => {
  const { data, isLoading } = useSWR("/clients/metrics", async (url) => {
    const { data } = await api.get<{
      data: ClientMetrics;
    }>(url);

    return data?.data;
  });

  return isLoading ? (
    <div className="flex flex-col gap-6 p-4 h-full">
      <div className="flex items-center gap-4">
        <Skeleton className="flex-1 h-[116px]" />
        <Skeleton className="flex-1 h-[116px]" />
        <Skeleton className="flex-1 h-[116px]" />
      </div>
      <div className="flex-1 grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-4">
          <Skeleton className="w-full flex-1" />
          <Skeleton className="w-full flex-1" />
        </div>
        <Skeleton className="col-span-2 w-full h-full" />
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardDescription>Total Clients Registered</CardDescription>
            <CardTitle className="text-4xl font-semibold">
              {data?.totalClients}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardDescription>Total Active Clients</CardDescription>
            <CardTitle className="text-4xl font-semibold">
              {data?.totalActiveClients}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardDescription>Website Registered Clients</CardDescription>
            <CardTitle className="text-4xl font-semibold">
              {data?.totalBoardedClients}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-4">
          <ClientOnboardingDistribution
            totalClients={data?.totalClients || 0}
            totalOnboardedClients={data?.totalBoardedClients || 0}
          />
          <Card className="flex-1">
            <CardHeader>
              <CardDescription>Total Revenue from clients</CardDescription>
              <CardTitle className="text-4xl font-semibold">0</CardTitle>
            </CardHeader>
          </Card>
        </div>
        <ClientOnboardedLineChart
          clientsOnboardLast12Months={data?.clientsOnboardLast12Months || []}
        />
      </div>
    </div>
  );
};

export default ClientMetrics;
