import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";
import LandlordDashboardCardLoading from "./LandlordDashboardCardLoading";

const LandlordDashboardTotalMonthRent = ({
  totalMonthRent,
  totalUnitsInPayment,
}: {
  totalMonthRent: number | undefined;
  totalUnitsInPayment: number | undefined;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Total Month Rent</CardTitle>
        <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {typeof totalMonthRent === "number" ? (
          <>
            <div className="text-2xl font-bold">
              ${totalMonthRent.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              In {totalUnitsInPayment} units
            </p>
          </>
        ) : (
          <LandlordDashboardCardLoading />
        )}
      </CardContent>
    </Card>
  );
};

export default LandlordDashboardTotalMonthRent;
