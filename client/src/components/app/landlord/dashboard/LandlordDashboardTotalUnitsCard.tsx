import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";
import React from "react";
import LandlordDashboardCardLoading from "./LandlordDashboardCardLoading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore";
import { fetchData } from "@/constants/fetchData";

const LandlordDashboardTotalUnitsCard = ({
  totalUnits,
}: {
  totalUnits: number | undefined;
}) => {
  const token = useUserStore((state) => state.userToken);

  const { data, isLoading } = useQuery({
    queryKey: ["count-units"],
    queryFn: fetchData("http://localhost:8080/api/last-month-count", token),
    enabled: !!token,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Total Units</CardTitle>
        <Home className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {typeof totalUnits === "number" || isLoading ? (
          <>
            <div className="text-2xl font-bold">{totalUnits}</div>
            <p className="text-xs text-muted-foreground">
              +{data} from last month
            </p>
          </>
        ) : (
          <LandlordDashboardCardLoading />
        )}
      </CardContent>
    </Card>
  );
};

export default LandlordDashboardTotalUnitsCard;
