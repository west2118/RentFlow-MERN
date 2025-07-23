import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

type LandlordPaymentTotalOverdueProps = {
  totalOverdue: number | undefined;
  totalUnitOverdue: number | undefined;
};

const LandlordPaymentTotalOverdue = ({
  totalOverdue,
  totalUnitOverdue,
}: LandlordPaymentTotalOverdueProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Overdue</CardTitle>
        <AlertCircle className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${totalOverdue?.toFixed(2)}</div>
        <p className="text-xs text-muted-foreground">
          From {totalUnitOverdue} units
        </p>
      </CardContent>
    </Card>
  );
};

export default LandlordPaymentTotalOverdue;
