import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import LandlordDashboardCardLoading from "./LandlordDashboardCardLoading";

const LandlordDashboardTotalOccupiedCard = ({
  totalOccupiedUnits,
  percentageTotalOccupied,
}: {
  totalOccupiedUnits: number | undefined;
  percentageTotalOccupied: number;
}) => {
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Occupied</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {typeof totalOccupiedUnits === "number" ? (
            <>
              <div className="text-2xl font-bold">{totalOccupiedUnits}</div>
              <p className="text-xs text-muted-foreground">
                {percentageTotalOccupied}% occupancy rate
              </p>
            </>
          ) : (
            <LandlordDashboardCardLoading />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LandlordDashboardTotalOccupiedCard;
