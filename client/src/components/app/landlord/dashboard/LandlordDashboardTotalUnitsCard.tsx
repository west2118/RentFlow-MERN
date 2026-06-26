import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";
import React from "react";
import LandlordDashboardCardLoading from "./LandlordDashboardCardLoading";

const LandlordDashboardTotalUnitsCard = ({
  totalUnits = 10,
}: {
  totalUnits: number | undefined;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Total Units</CardTitle>
        <Home className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {typeof totalUnits === "number" ? (
          <>
            <div className="text-2xl font-bold">{totalUnits}</div>
            <p className="text-xs text-muted-foreground">
              +10 from last month
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
