import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import LandlordDashboardCardLoading from "./LandlordDashboardCardLoading";

const LandlordDashboardAvailableUnitCard = ({
  totalAvailableUnits,
  percentageTotalAvailable,
}: {
  totalAvailableUnits: number | undefined;
  percentageTotalAvailable: number;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Available</CardTitle>
        <AlertCircle className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {typeof totalAvailableUnits === "number" ? (
          <>
            <div className="text-2xl font-bold">{totalAvailableUnits}</div>
            <p className="text-xs text-muted-foreground">
              {percentageTotalAvailable}% vacancy rate
            </p>
          </>
        ) : (
          <LandlordDashboardCardLoading />
        )}
      </CardContent>
    </Card>
  );
};

export default LandlordDashboardAvailableUnitCard;
