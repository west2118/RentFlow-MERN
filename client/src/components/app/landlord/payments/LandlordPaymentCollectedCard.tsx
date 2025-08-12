import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";

type LandlordPaymentCollectedCardProps = {
  totalPaid: number | undefined;
  totalRent: number | undefined;
};

const LandlordPaymentCollectedCard = ({
  totalPaid,
  totalRent,
}: LandlordPaymentCollectedCardProps) => {
  const percentage = Math.round(
    Math.min(((totalPaid ?? 0) / (totalRent || 1)) * 100, 100)
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Collected</CardTitle>
        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${totalPaid?.toFixed(2)}</div>
        <p className="text-xs text-muted-foreground">{percentage}% collected</p>
        <Progress value={percentage} className="h-2 mt-2" />
      </CardContent>
    </Card>
  );
};

export default LandlordPaymentCollectedCard;
