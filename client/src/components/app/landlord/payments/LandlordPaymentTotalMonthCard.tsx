import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import React from "react";

type LandlordPaymentTotalMonthCardProps = {
  totalDue: number | undefined;
  totalUnits: number | undefined;
};

const LandlordPaymentTotalMonthCard = ({
  totalDue,
  totalUnits,
}: LandlordPaymentTotalMonthCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Total Month Rent</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${totalDue?.toFixed(2)}</div>
        <p className="text-xs text-muted-foreground">From {totalUnits} units</p>
      </CardContent>
    </Card>
  );
};

export default LandlordPaymentTotalMonthCard;
